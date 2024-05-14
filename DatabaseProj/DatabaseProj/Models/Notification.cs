using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace DatabaseProj.Models
{
    public class Notification
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public int Id { get; set; }

        public string Content { get; set; }
        public string UserId { get; set; }
    }
}
