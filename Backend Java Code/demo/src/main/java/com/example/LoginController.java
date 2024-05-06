package com.example;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import com.example.User; 

public class LoginController {
    public User login(String username, String password) {
        // Connect to MongoDB and get the users collection
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("314_db");
        MongoCollection<Document> collection = database.getCollection("users");

        // Check if the login is successful
        Document user = collection.find(new Document("username", username)).first();
        if (user != null) {
            String dbPassword = user.getString("password");
            String role = user.getString("role");
            if (dbPassword.equals(password)) {
                return new User(username, password, role);
            }
        }
        return null;
    }
    }
