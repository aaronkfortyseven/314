package com.example;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.List;
import java.util.ArrayList;

public class AgentService {
    public List<Document> getProperties(String username) {
        // Connect to MongoDB and get the users collection
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("314_db");
        MongoCollection<Document> collection = database.getCollection("users");

        // Get the properties of the agent
        Document user = collection.find(new Document("username", username)).first();
        if (user != null) {
            return (List<Document>) user.get("listings");
        }
        return new ArrayList<>();  // return an empty list if no agent is found
    }
}