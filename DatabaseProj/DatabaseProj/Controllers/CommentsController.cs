using DatabaseProj.Dtos;
using DatabaseProj.Helpers;
using DatabaseProj.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace DatabaseProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {

        private readonly AppDbContext _context;
        private readonly IMongoDatabase _database;


        public CommentsController(AppDbContext context, IMongoDatabase database)
        {
            _context = context;
            _database = database;
        }


        [HttpPost]
        public async Task<IActionResult> AddComment(int postId , [FromBody] CommentModel comment) 
        {
            if (await _context.Posts.FindAsync(e => e.Id == postId) is null )
                return NotFound("Post is not found");


            var mongoHelper = new MongoDbHelper(_database);
            var commentId = mongoHelper.GetNextSequenceValue("commentIdSequence");

            var newcomment = new Comment { Id = commentId, PostId = postId, Content=comment.Content,UserId=comment.UserId }; 
            await _context.Comments.InsertOneAsync(newcomment);  
            

            return Ok(newcomment);
            
        }


    }
}
