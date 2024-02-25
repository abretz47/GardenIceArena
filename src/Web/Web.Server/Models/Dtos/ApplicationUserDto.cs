using Infrastructure.Data;

namespace Web.Server.Models.Dtos
{
    public class ApplicationUserDto
    {
        public string UserName { get; set; } = string.Empty;

        public static ApplicationUserDto FromEntity(ApplicationUser appUser)
        {
            return new ApplicationUserDto
            {
                UserName = appUser.UserName!
            };
        }
    }
}
