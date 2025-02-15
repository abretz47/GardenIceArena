using Infrastructure.Data;

namespace Web.Server.Models;

public class UserInfo
{
    public static readonly UserInfo Anonymous = new();
    public bool IsAuthenticated { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;

    public static UserInfo FromEntity(ApplicationUser appUser)
    {
        return new UserInfo
        {
            IsAuthenticated = true,
            UserName = appUser.UserName!,
            Role = appUser.Role!
        };
    }
}
