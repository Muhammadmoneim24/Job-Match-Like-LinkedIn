using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Microsoft.AspNetCore.Identity;

public class User : IdentityUser
{
    //[BsonId]
    //[BsonRepresentation(BsonType.Int32)]
    //public int MYUserId { get; set; }

    public string FullName { get; set; }
    public byte[]? Photo { get; set; } = null;
    public override string Email { get; set; }
}