package com.example;

import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import java.util.List;
import java.util.ArrayList;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import com.mongodb.client.FindIterable;
import java.util.stream.StreamSupport;
import java.util.stream.Collectors;

public class Property {
    private MongoClient mongoClient;
    private MongoDatabase database;
    private MongoCollection<Document> collection;

    public Property() {
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
        this.mongoClient = MongoClients.create(connectionString);
        this.database = mongoClient.getDatabase("314_db");
        this.collection = database.getCollection("properties");
    }

    //Controller methods

    public List<Document> getPropertyByAgent(String username) {
        FindIterable<Document> properties = collection.find(new Document("agent", username));
        return StreamSupport.stream(properties.spliterator(), false).collect(Collectors.toList());
    }

    public void addProperty(Document newProperty) {
        collection.insertOne(newProperty);
    }

    public void deleteProperty(String propertyTitle) {
        collection.deleteOne(new Document("title", propertyTitle));
    }

    //check that it doesn't clear out agent field in .js
    // public void editProperty(String agent, String propertyTitle, Document updatedProperty) {
    //     collection.updateOne(
    //         Filters.and(Filters.eq("agent", agent), Filters.eq("title", propertyTitle)),
    //         new Document("$set", updatedProperty)
    //     );
    // }
    public void editProperty(String agent, String originalTitle, Document updatedProperty) {
        collection.updateOne(
            Filters.and(Filters.eq("agent", agent), Filters.eq("title", originalTitle)),
            new Document("$set", updatedProperty)
        );
    }

//viewALLproperties page
    public List<Document> getAllProperties() {
        List<Document> properties = new ArrayList<>();
        FindIterable<Document> documents = collection.find();
        for (Document document : documents) {
            properties.add(document);
        }
        return properties;
    }
}