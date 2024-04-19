package com.example;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class Main {

    public static void main(String[] args) {
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("314_db");
        MongoCollection<Document> collection = database.getCollection("users");

        String username = "example_user";
        String password = "hashed_password";

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