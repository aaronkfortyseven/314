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
import com.mongodb.client.FindIterable;

public class ViewAllController {
    private MongoCollection<Document> collection;

    public ViewAllController() {
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("314_db");
        this.collection = database.getCollection("properties");
    }

    public List<Document> execute() {
        List<Document> properties = new ArrayList<>();
        FindIterable<Document> documents = collection.find();
        for (Document document : documents) {
            properties.add(document);
        }
        return properties;
    }
}