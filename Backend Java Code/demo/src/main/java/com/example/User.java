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
import org.bson.conversions.Bson;
import com.mongodb.client.FindIterable;

public class User {
    private String username;
    private String password;
    private String role;
    private boolean suspended;
    private MongoClient mongoClient;
    private MongoDatabase database;
    private ArrayList<String> favProperties;
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
        this.favProperties = new ArrayList<>();
    }
    public User(String username, String password, String role, boolean suspended) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.suspended = suspended;
    }


//LOGIN ENTITY

    // public User login(String username, String password) {
    //     MongoCollection<Document> collection = database.getCollection("users");

    //     // Check if the login is successful
    //     Document user = collection.find(new Document("username", username)).first();
    //     if (user != null) {
    //         String dbPassword = user.getString("password");
    //         String role = user.getString("role");
    //         if (dbPassword.equals(password)) {
    //             return new User(username, password, role);
    //         }
    //     }
    //     return null;
    // }

    public User login(String username, String password) {
        MongoCollection<Document> collection = database.getCollection("users");

        // Check if the login is successful
        Document user = collection.find(new Document("username", username)).first();
        if (user != null) {
            String dbPassword = user.getString("password");
            String role = user.getString("role");
            boolean suspended = user.getBoolean("suspended");
            if (dbPassword.equals(password) && !suspended) {
                return new User(username, password, role, suspended);
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




//RATING ENTITY

    public Double getAverageRating(String username) {
        Document user = collection.find(new Document("username", username)).first();
        if (user != null) {
            Number averageRating = (Number) user.get("averageRating");
            return averageRating.doubleValue();
        }
        return null;
    }


//view Favourites

    public List<Document> getFavourites(String username) {
        Document user = collection.find(new Document("username", username)).first();
        if (user != null) {
            return (List<Document>) user.get("favProperties");
        }
        return new ArrayList<>();
    }


//FAVPROPERTY ENTITY

    public void addFavProperty(String username, Document favProperty) {
        collection.updateOne(
            Filters.eq("username", username), 
            Updates.push("favProperties", favProperty)
        );
    }


//SysAdmin Functionality
    public void addUser(Document newUser) {
        collection.insertOne(newUser);
    }

    public List<Document> getAllUsers() {
        List<Document> users = new ArrayList<>();
        FindIterable<Document> documents = collection.find();
        for (Document document : documents) {
            users.add(document);
        }
        return users;
    }

    public void editUser(String username, Document updatedUser) {
        collection.updateOne(
            Filters.eq("username", username),
            new Document("$set", updatedUser)
        );
    }

    public boolean isSuspended() {
        return this.suspended;
    }

    public boolean suspend(String username) {
        MongoCollection<Document> collection = database.getCollection("users");
    
        Bson filter = Filters.eq("username", username);
        Bson update = Updates.set("suspended", true);
    
        UpdateResult result = collection.updateOne(filter, update);
    
        return result.getModifiedCount() > 0;
    }

    public boolean unsuspend(String username) {
        MongoCollection<Document> collection = database.getCollection("users");
    
        Bson filter = Filters.eq("username", username);
        Bson update = Updates.set("suspended", false);
    
        UpdateResult result = collection.updateOne(filter, update);
    
        return result.getModifiedCount() > 0;
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

