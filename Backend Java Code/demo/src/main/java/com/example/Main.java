package com.example;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class Main {

    public static void main(String[] args) {
        try {
            ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
            MongoClient mongoClient = MongoClients.create(connectionString);
            System.out.println("Connected to MongoDB");

            MongoDatabase database = mongoClient.getDatabase("314_db");
            MongoCollection<Document> collection = database.getCollection("users");
            System.out.println("Got users collection");

            String username = "example_user";
            String password = "hashed_password";

            boolean loginSuccessful = loginUser(collection, username, password);
            if (loginSuccessful) {
                System.out.println("Login successful.");
                // User is logged in. You can create a session or token here.
            } else {
                System.out.println("Invalid username or password.");
            }

            mongoClient.close();
        } catch (Exception e) {
            System.out.println("An error occurred: " + e.getMessage());
        }
    }

    public static boolean loginUser(MongoCollection<Document> collection, String username, String password) {
        Document user = collection.find(new Document("username", username)).first();
        System.out.println("User query result: " + user);
        if (user != null) {
            String dbPassword = user.getString("password");
            //System.out.println("Password from database: " + dbPassword);
            if (dbPassword.equals(password)) {
                return true;
            }
        }
        return false;
    }
}