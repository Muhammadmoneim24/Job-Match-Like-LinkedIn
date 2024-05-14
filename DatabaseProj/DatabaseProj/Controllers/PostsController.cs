using DatabaseProj.Dtos;
using DatabaseProj.Helpers;
using DatabaseProj.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Driver.Core.Misc;

namespace DatabaseProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        //private readonly IMongoCollection<Post> _posts;
        private readonly AppDbContext _context;
        private readonly IMongoDatabase database;
        private List<string> _allowedExtensions = new List<string> { ".pdf", ".doc", ".docx", ".png", ".jpg" };

        public PostsController( IMongoDatabase database, AppDbContext context)
        {
            this.database = database;
            _context = context;
        }

        [HttpPost]
        public async Task <IActionResult> AddPost([FromForm]PostModel post)
        {

            if (post == null || !ModelState.IsValid)
                return NotFound("Model is not found");

            using var datastrem = new MemoryStream();
            
            if(post.File != null) {
                
                if (!_allowedExtensions.Contains(Path.GetExtension(post.File.FileName).ToLower()))
                return BadRequest("File extension is not allowed");
                await post.File.CopyToAsync(datastrem);
                 
            }

            var mongoHelper = new MongoDbHelper(database); 
            var postId = mongoHelper.GetNextSequenceValue("postIdSequence");

            var newpost = new Post 
            { 
                Id = postId,
                Title = post.Title , 
                Content=post.Content,
                Tags = post.Tags,
                UserId = post.UserId, 
                File= post.File is null ? null: datastrem.ToArray()
            };

             await _context.Posts.InsertOneAsync(newpost);

            return Ok(newpost);
        
        }

        [HttpGet]
        public async Task<IActionResult> GetPost( [FromQuery]int id) 
        {
            var filter = Builders<Post>.Filter.Eq(p => p.Id, id);
            var post = await _context.Posts.Find(filter).FirstOrDefaultAsync();

            var commentfilter = Builders<Comment>.Filter.Eq(p => p.PostId, id);
            var postcomments = _context.Comments.Find(commentfilter).ToList();

            var postwithcomments = new {post,postcomments };

            if (post == null)
                return NotFound("Post is not found");

            return Ok(postwithcomments);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllPosts()
        {
            //var filter = Builders<Post>.Filter.Eq(p => p.Id, id);
            var posts = await _context.Posts.Find(Posts=>true).ToListAsync();

            var postcomments = new List<Comment>();
            foreach (var post in posts)
            {
                var commentfilter = Builders<Comment>.Filter.Eq(p => p.PostId, post.Id);

                postcomments = _context.Comments.Find(commentfilter).ToList();
            }

            var postswithcomments = new { posts, postcomments };

            if (posts == null)
                return NotFound("Post is not found");

            return Ok(postswithcomments);
        }


        [HttpPut]
        public async Task<IActionResult> EditPost([FromQuery] int id, [FromBody] PostModel editpost)
        {
            var filter = Builders<Post>.Filter.Eq(p => p.Id, id);
            var post = await _context.Posts.Find(filter).FirstOrDefaultAsync();

            if (post is null)
                return NotFound("Post is not found");

            using var datastream = new MemoryStream();
            await editpost.File.CopyToAsync(datastream);
            
            post.Title = editpost.Title;
            post.Content = editpost.Content;
            post.Tags = editpost.Tags;
            post.File = datastream.ToArray();

            await _context.Posts.ReplaceOneAsync(e=>e.Id == id, post);
            

            if (post == null)
                return NotFound("Post is not found");

            return Ok(post);
        }

    }
}
