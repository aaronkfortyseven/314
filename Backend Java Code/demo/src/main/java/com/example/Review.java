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


public class Review {
    private MongoCollection<Document> collection;

    public Review() {
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("314_db");
        this.collection = database.getCollection("reviews");
    }

    public void addReview(String username, Document newReview) {
        String reviewText = newReview.getString("review");
        collection.updateOne(
            Filters.eq("username", username), 
            Updates.push("reviews", reviewText)
        );
    }

    public List<Document> getReviews(String username) {
        Document review = collection.find(new Document("username", username)).first();
        if (review != null) {
            return (List<Document>) review.get("reviews");
        }
        return new ArrayList<>();
    }
}