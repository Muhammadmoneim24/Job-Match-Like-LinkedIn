using MongoDB.Driver;
using DatabaseProj.Helpers;
using DatabaseProj.Models;
using DatabaseProj.Dtos;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using System.Security.Cryptography.X509Certificates;

namespace DatabaseProj.Services
{
    public class AuthService : IAuthService
    {
        private readonly IMongoCollection<User> _user;
        private readonly JWT _jwt;

        private List<string> _allowedExtensions = new List<string> { ".png", ".jpg","" };

        public AuthService(IMongoCollection<User> user, IOptions<JWT> jwt)
        {
            _user = user;
            _jwt = jwt.Value;
        }

        public async Task<AuthModel> RegisterAsync(RegisterModel model)
        {
            var userWithEmail = await _user.Find(u => u.Email == model.Email).FirstOrDefaultAsync();
            if (userWithEmail != null)
                return new AuthModel { Message = "Email is Already registered." };

            var userWithName = await _user.Find(u => u.UserName == model.UserName).FirstOrDefaultAsync();
            if (userWithName != null)
                return new AuthModel { Message = "Username is Already registered." };

            var extension = " " ; 
            using var dataStream = new MemoryStream();

            if (model.Photo != null)
            {
                extension = Path.GetExtension(model.Photo.FileName).ToLower();


                if (!_allowedExtensions.Contains(extension))
                    return new AuthModel { Message = "File extension is not allowed." };

                
                await model.Photo.CopyToAsync(dataStream);
            }

            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email,
                PasswordHash = model.Password,
                FullName = model.FullName,
                Photo = model.Photo==null? null:dataStream.ToArray(),
            };

            await _user.InsertOneAsync(user);

            var jwtSecurityToken = await CreateJwtToken(user);

            return new AuthModel
            {
                id = user.Id,
                Email = user.Email,
                ExpiresOn = jwtSecurityToken.ValidTo,
                IsAuthenticated = true,
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                Name = user.UserName ,
                Photo = user.Photo,
            };
        }

        public async Task<AuthModel> LoginAsync(LoginModel model)
        {
            var user = await _user.Find(u => u.Email == model.Email).FirstOrDefaultAsync();

            if (user == null || user.PasswordHash != model.Password)
            {
                return new AuthModel { Message = "Email or Password is incorrect." };
            }

            var jwtSecurityToken = await CreateJwtToken(user);

            return new AuthModel
            {
                IsAuthenticated = true,
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                Email = user.Email,
                Name = user.UserName,
                ExpiresOn = jwtSecurityToken.ValidTo
            };
        }

        private async Task<JwtSecurityToken> CreateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            };

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.Now.AddDays(_jwt.DurationInDays),
                signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }
    }
}
