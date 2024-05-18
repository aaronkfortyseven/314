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
import com.mongodb.client.result.UpdateResult;
import com.mongodb.client.FindIterable;

public class Profile {
    private MongoClient mongoClient;
    private MongoDatabase database;
    private MongoCollection<Document> collection;

    public Profile() {
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
        this.mongoClient = MongoClients.create(connectionString);
        this.database = mongoClient.getDatabase("314_db");
        this.collection = database.getCollection("profiles");
    }

    public void addProfile(Document newProfile) {
        collection.insertOne(newProfile);
    }

    public List<Document> getAllProfiles() {
        List<Document> profiles = new ArrayList<>();
        FindIterable<Document> documents = collection.find();
        for (Document document : documents) {
            profiles.add(document);
        }
        return profiles;
    }

    public void editProfile(String username, Document updatedProfile) {
        collection.updateOne(
            Filters.eq("username", username),
            new Document("$set", updatedProfile)
        );
    }



    public boolean suspendProfile(String username) {
        Document updatedProfile = new Document("suspended", true);
        UpdateResult result = collection.updateOne(
            Filters.eq("username", username),
            new Document("$set", updatedProfile)
        );
        return result.getModifiedCount() > 0;
    }
    

    public boolean unsuspendProfile(String username) {
        Document updatedProfile = new Document("suspended", false);
        UpdateResult result = collection.updateOne(
            Filters.eq("username", username),
            new Document("$set", updatedProfile)
        );
        return result.getModifiedCount() > 0;
    }
}