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

public class User {
    private String username;
    private String password;
    private String role;
    private MongoClient mongoClient;
    private MongoDatabase database;
    private MongoCollection<Document> collection;

    public User() {
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
        this.mongoClient = MongoClients.create(connectionString);
        this.database = mongoClient.getDatabase("314_db");
        this.collection = database.getCollection("users");
    }

    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    //methods

    public User login(String username, String password) {
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

    //ViewPropertyController method
    public List<Document> getListings(String username) {
        Document user = collection.find(new Document("username", username)).first();
        if (user != null) {
            return (List<Document>) user.get("listings");
        }
        return new ArrayList<>();
    }

    //CreatePropertyController method
    public void addProperty(String username, Document newProperty) {
        collection.updateOne(
            Filters.eq("username", username), 
            Updates.push("listings", newProperty)
        );
    }
    //RemovePropertyController method
    public void deleteProperty(String username, String propertyTitle) {
        collection.updateOne(
            Filters.eq("username", username), 
            Updates.pull("listings", new Document("title", propertyTitle))
        );
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

