package com.example;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import com.example.User; 

public class UserService {
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
            if (dbPassword.equals(password)) {
                return new User(username, password);
            }
            //For different roles
            // if (dbPassword.equals(password)) {
            //     switch (role) {
            //         case "Agent":
            //             return new Agent(username, password);
            //         // case "Buyer":
            //         //     return new Buyer(username, password);
            //         // case "Seller":
            //         //     return new Seller(username, password);
            //         // case "SysAdmin":
            //         //     return new SysAdmin(username, password);
            //         default:
            //             throw new IllegalArgumentException("Invalid user type");
            //     }
            // }
        }
        return null;
    }
    }
