package com.example;

import org.bson.Document;
import java.util.List;
import java.util.ArrayList;


public class ViewAllController {
    public List<Document> viewAll() {
        Property property = new Property();
        return property.getAllProperties();
    }
}