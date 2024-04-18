import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class Main {

    public static void main(String[] args) {
        MongoClientURI uri = new MongoClientURI("mongodb://localhost:27017");
        MongoClient mongoClient = new MongoClient(uri);
        MongoDatabase database = mongoClient.getDatabase("yourDatabaseName");
        MongoCollection<Document> collection = database.getCollection("users");

        String username = "yourUsername";
        String password = "yourPassword";

        Document user = collection.find(new Document("username", username)).first();

        if (user != null && user.getString("password").equals(password)) {
            System.out.println("Login successful.");
            // User is logged in. You can create a session or token here.
        } else {
            System.out.println("Invalid username or password.");
        }

        mongoClient.close();
    }
}