package com.example;

import org.bson.Document;


    public class CreatePropertyController {
        public void createProperty(String username, Document newProperty) {
            User user = new User();
            user.addProperty(username, newProperty);
        }
    }

// import com.mongodb.client.MongoClients;
// import com.mongodb.client.MongoClient;
// import com.mongodb.client.MongoDatabase;
// import com.mongodb.client.MongoCollection;
// import com.mongodb.ConnectionString;

// import com.mongodb.client.model.Filters;
// import com.mongodb.client.model.Updates;
    // public CreatePropertyController() {
    //     ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
    //     MongoClient mongoClient = MongoClients.create(connectionString);
    //     MongoDatabase database = mongoClient.getDatabase("314_db");
    //     this.collection = database.getCollection("users");
    // }

    // public void execute(String username, Document newProperty) {
    //     collection.updateOne(
    //         Filters.eq("username", username), 
    //         Updates.push("listings", newProperty)
    //     );
    // }