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
    public void addRating(String name, Integer rating) {
        collection.updateOne(
            Filters.eq("name", name), 
            Updates.push("ratings", rating)
        );
    }

    public Double getAverageRating(String username) {
        Document user = collection.find(Filters.eq("username", username)).first();
        if (user != null) {
            List<Integer> ratings = (List<Integer>) user.get("ratings");
            if (ratings != null && !ratings.isEmpty()) {
                double sum = 0;
                for (Integer rating : ratings) {
                    sum += rating;
                }
                return sum / ratings.size();
            }
        }
        return null;
    }


}