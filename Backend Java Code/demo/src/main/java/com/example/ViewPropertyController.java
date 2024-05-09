package com.example;

import org.bson.Document;
import java.util.List;
import java.util.ArrayList;


public class ViewPropertyController {
    public List<Document> viewProperty(String username) {
        Property property = new Property();
        return property.getPropertyByAgent(username);
    }
}