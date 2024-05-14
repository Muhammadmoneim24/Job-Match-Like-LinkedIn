namespace DatabaseProj.Dtos
{
    public class PostModel
    {
        public string? Title { get; set; }
        public string Content { get; set; }
        public string Tags { get; set; }

        public IFormFile? File { get; set; } = null;
        public string UserId { get; set; }
    }
}
