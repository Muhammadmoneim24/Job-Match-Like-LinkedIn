using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace DatabaseProj.Models
{
    public class Comment
    {
        [BsonId]
       
        public int Id { get; set; }

        public string Content { get; set; }
        public int PostId { get; set; }
        public string UserId { get; set; }
    }
}
