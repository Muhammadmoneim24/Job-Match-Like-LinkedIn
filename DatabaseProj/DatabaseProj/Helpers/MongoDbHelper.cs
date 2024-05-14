using MongoDB.Bson;
using MongoDB.Driver;

namespace DatabaseProj.Helpers
{
    public class MongoDbHelper
    {
        private readonly IMongoDatabase _database;

        public MongoDbHelper(IMongoDatabase database)
        {
            _database = database;
        }

        public int GetNextSequenceValue(string sequenceName)
        {
            var sequencesCollection = _database.GetCollection<BsonDocument>("sequences");
            var filter = Builders<BsonDocument>.Filter.Eq("_id", sequenceName);
            var update = Builders<BsonDocument>.Update.Inc("value", 1);
            var options = new FindOneAndUpdateOptions<BsonDocument>
            {
                IsUpsert = true,
                ReturnDocument = ReturnDocument.After
            };

            var sequenceDocument = sequencesCollection.FindOneAndUpdate(filter, update, options);
            return sequenceDocument["value"].AsInt32;
        }
    }
}
