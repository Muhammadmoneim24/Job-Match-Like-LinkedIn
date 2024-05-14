using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace DatabaseProj.Models
{
    public class Message
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public int Id { get; set; }

        public string Content { get; set; }
        public string SenderId { get; set; }
        public string ReceiverId { get; set; }
    }
}
