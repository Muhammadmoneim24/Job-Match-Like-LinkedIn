using Microsoft.AspNetCore.Identity;
using DatabaseProj.Models;
using DatabaseProj.Dtos;

namespace DatabaseProj.Services
{
    public interface IAuthService
    {
        Task<AuthModel> RegisterAsync(RegisterModel model);
        Task<AuthModel> LoginAsync(LoginModel model);
    }
}
