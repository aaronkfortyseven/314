package com.example;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.ConnectionString;
import java.util.List;
import java.util.ArrayList;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import com.mongodb.client.FindIterable;
import java.util.stream.StreamSupport;
import java.util.stream.Collectors;

public class Rating {
    private MongoCollection<Document> collection;

    public Rating() {
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("314_db");
        this.collection = database.getCollection("ratings");
    }

    //controller boundary to be created
    public void addRating(String username, Double rating) {
        Document newRating = new Document("username", username)
            .append("rating", rating);
        collection.insertOne(newRating);
    }

    public Double getAverageRating(String username) {
        List<Document> ratings = collection.find(Filters.eq("username", username)).into(new ArrayList<>());
        if (!ratings.isEmpty()) {
            double sum = 0;
            for (Document rating : ratings) {
                sum += rating.getDouble("rating");
            }
            return sum / ratings.size();
        }
        return null;
    }


}