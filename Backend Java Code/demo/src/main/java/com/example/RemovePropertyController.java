package com.example;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;

public class RemovePropertyController {
    private MongoCollection<Document> collection;

    public RemovePropertyController() {
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("314_db");
        this.collection = database.getCollection("users");
    }

    public void execute(String username, String propertyTitle) {
        collection.updateOne(
            Filters.eq("username", username), 
            Updates.pull("listings", new Document("title", propertyTitle))
        );
    }
}