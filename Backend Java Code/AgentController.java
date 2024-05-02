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

public class AgentController {
    private ViewPropertyController viewPropertyController;
    private RemovePropertyController removePropertyController;

    public AgentController() {
        this.viewPropertyController = new ViewPropertyController();
        this.removePropertyController = new RemovePropertyController();
    }

    public List<Document> viewProperty(String username) {
        return viewPropertyController.execute(username);
    }

    public void removeProperty(String username, String propertyId) {
        removePropertyController.execute(username, propertyId);
    }
}