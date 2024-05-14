namespace DatabaseProj.Models
{
    public class AuthModel
    {
        public string Message { get; set; }
        public bool IsAuthenticated { get; set; }
        public string Email { get; set; }

        public string Name { get; set; }
        public string Token { get; set; }
        public DateTime ExpiresOn { get; set; }

        public string id { get; set; }

        public byte[]? Photo { get; set; }

    }
}
