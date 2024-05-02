package com.example;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.List;
import java.util.ArrayList;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;

public class AgentController {
    private MongoCollection<Document> collection;

    public AgentController() {
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("314_db");
        this.collection = database.getCollection("users");
    }

    public List<Document> getProperties(String username) {
        // Get the properties of the agent
        Document user = collection.find(new Document("username", username)).first();
        if (user != null) {
            return (List<Document>) user.get("listings");
        }
        return new ArrayList<>();  // return an empty list if no agent is found
    }
// class of it's own. boundary calling controller which is unique to the entity. 
    public void removeProperty(String username, String propertyId) {
        collection.updateOne(
            Filters.eq("username", username), 
            Updates.pull("listings", new Document("id", propertyId))
        );
    }
}