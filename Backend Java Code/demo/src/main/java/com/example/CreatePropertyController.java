import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import com.mongodb.ConnectionString;
import org.bson.Document;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;

public class CreatePropertyController {
    private MongoCollection<Document> collection;

    public CreatePropertyController() {
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("314_db");
        this.collection = database.getCollection("users");
    }

    public void execute(String username, Document newProperty) {
        collection.updateOne(
            Filters.eq("username", username), 
            Updates.push("listings", newProperty)
        );
    }
}