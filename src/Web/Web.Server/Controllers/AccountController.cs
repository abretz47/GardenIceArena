using Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Security.Claims;
using Web.Server.Models.Dtos;

namespace Web.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private static readonly EmailAddressAttribute _emailAddressAttribute = new();

        public AccountController(SignInManager<ApplicationUser> signInManager)
        {
            _signInManager = signInManager;

        }

        [HttpPost("register")]
        public async Task<Results<Ok, ValidationProblem>> Register([FromBody] RegisterRequestModel registration)
        {
            var userManager = _signInManager.UserManager;

            var email = registration.Email;

            if (string.IsNullOrEmpty(email) || !_emailAddressAttribute.IsValid(email))
            {
                return CreateValidationProblem(IdentityResult.Failed(userManager.ErrorDescriber.InvalidEmail(email)));
            }

            var user = new ApplicationUser
            {
                UserName = registration.Email,
                FirstName = registration.FirstName,
                LastName = registration.LastName,
                Role = Constants.Role.USER
            };

            var result = await userManager.CreateAsync(user, registration.Password);

            if (!result.Succeeded)
            {
                return CreateValidationProblem(result);
            }

            return TypedResults.Ok();
        }

        [HttpPost("sign-in")]
        public async Task<Results<Ok<AccessTokenResponse>, EmptyHttpResult, ProblemHttpResult>> Login([FromBody] LoginRequest login, [FromQuery] bool? useCookies, [FromQuery] bool? useSessionCookies)
        {
            var useCookieScheme = (useCookies == true) || (useSessionCookies == true);
            var isPersistent = (useCookies == true) && (useSessionCookies != true);
            _signInManager.AuthenticationScheme = useCookieScheme ? IdentityConstants.ApplicationScheme : IdentityConstants.BearerScheme;

            var user = await _signInManager.UserManager.FindByNameAsync(login.Email);

            if (user == null)
            {
                return TypedResults.Problem($"Could not find user with email {login.Email}", statusCode: StatusCodes.Status401Unauthorized);
            }

            bool isValid = await _signInManager.UserManager.CheckPasswordAsync(user, login.Password);

            if (isValid)
            {
                if (user!.Role != null)
                {
                    var customClaim = new[] { new Claim(user.Role, user.Role) };
                    await _signInManager.SignInWithClaimsAsync(user, isPersistent, customClaim);
                    return TypedResults.Empty;
                }
            }

            return TypedResults.Problem("Incorrect password", statusCode: StatusCodes.Status401Unauthorized);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] object empty)
        {
            if (empty == null)
            {
                return Unauthorized();
            }
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [Authorize]
        [HttpGet("get-auth")]
        public async Task<IActionResult> GetAuth()
        {
            var appUser = await _signInManager.UserManager.GetUserAsync(HttpContext.User);
            if (appUser == null)
            {
                return BadRequest();
            }

            return Ok(ApplicationUserDto.FromEntity(appUser));
        }

        private static ValidationProblem CreateValidationProblem(IdentityResult result)
        {
            // We expect a single error code and description in the normal case.
            // This could be golfed with GroupBy and ToDictionary, but perf! :P
            Debug.Assert(!result.Succeeded);
            var errorDictionary = new Dictionary<string, string[]>(1);

            foreach (var error in result.Errors)
            {
                string[] newDescriptions;

                if (errorDictionary.TryGetValue(error.Code, out var descriptions))
                {
                    newDescriptions = new string[descriptions.Length + 1];
                    Array.Copy(descriptions, newDescriptions, descriptions.Length);
                    newDescriptions[descriptions.Length] = error.Description;
                }
                else
                {
                    newDescriptions = [error.Description];
                }

                errorDictionary[error.Code] = newDescriptions;
            }

            return TypedResults.ValidationProblem(errorDictionary);
        }
    }

}
