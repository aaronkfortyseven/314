package com.example;

import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

public class User {
    private String username;
    private String password;
    private String role;

    public User() {
        // No-argument constructor
    }

    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public User login(String username, String password) {
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

    // getters and setters
    public String getUsername() {
        return this.username;
    }

    public String getRole() {
        return this.role;
    }


}





//ORIGINAL WORKING CODE
// public class User {
//     private String username;
//     private String password;
//     private String role;

//     public User(String username, String password, String role) {
//         this.username = username;
//         this.password = password;
//         this.role = role;
//     }

//     public static User login(String username, String password) {
//         // Connect to MongoDB and get the users collection
//         ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
//         MongoClient mongoClient = MongoClients.create(connectionString);
//         MongoDatabase database = mongoClient.getDatabase("314_db");
//         MongoCollection<Document> collection = database.getCollection("users");

//         // Check if the login is successful
//         Document user = collection.find(new Document("username", username)).first();
//         if (user != null) {
//             String dbPassword = user.getString("password");
//             String role = user.getString("role");
//             if (dbPassword.equals(password)) {
//                 return new User(username, password, role);
//             }
//         }
//         return null;
//     }


// }

