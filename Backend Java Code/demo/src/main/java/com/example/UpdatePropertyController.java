import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import com.mongodb.ConnectionString;
import org.bson.Document;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;

public class UpdatePropertyController {
    private MongoCollection<Document> collection;

    public UpdatePropertyController() {
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("314_db");
        this.collection = database.getCollection("users");
    }

    public void execute(String username, String propertyTitle, Document updatedProperty) {
        collection.updateOne(
            Filters.and(Filters.eq("username", username), Filters.eq("listings.title", propertyTitle)),
            new Document("$set", new Document("listings.$", updatedProperty))
        );
    }
}