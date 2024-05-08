package com.example;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.List;
import java.util.ArrayList;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;

public class ViewPropertyController {
    public List<Document> viewProperty(String username) {
        Property property = new Property();
        return property.getPropertyByAgent(username);
    }
}












// public class ViewPropertyController {
//     public List<Document> viewProperty(String username) {
//         User user = new User();
//         return user.getListings(username);
//     }
// }
