using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Runtime.InteropServices;

namespace DatabaseProj.Models
{
    public class Post
    {
        [BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        
        public int Id { get; set; }  

        public string? Title { get; set; }
        public string Content { get; set; }
        public string Tags { get; set; }


        public byte[]? File {  get; set; } = null;
        public string UserId { get; set; }
    }
}
