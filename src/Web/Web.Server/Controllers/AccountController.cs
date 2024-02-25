using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Web.Server.Models.Dtos;

namespace Web.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager) : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly SignInManager<ApplicationUser> _signInManager = signInManager;

        [HttpPost]
        [Authorize]
        [Route("/logout")]
        public async Task<IActionResult> Logout([FromBody]object empty)
        {
            if (empty == null)
            {
                return Unauthorized();
            }

            await _signInManager.SignOutAsync();
            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("/getauth")]
        public async Task<IActionResult> GetAuth() 
        {
            var appUser = await _userManager.GetUserAsync(HttpContext.User);
            if (appUser == null)
            {
                return BadRequest();
            }

            return Ok(ApplicationUserDto.FromEntity(appUser));    
        }
    }
}
