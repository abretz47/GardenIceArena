using Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Web.Server.Models.Dtos;

namespace Web.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(SignInManager<ApplicationUser> signInManager)
        {
            _signInManager = signInManager;
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
    }
}
