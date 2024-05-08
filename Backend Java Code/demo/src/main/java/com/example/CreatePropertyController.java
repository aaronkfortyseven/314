package com.example;

import org.bson.Document;

public class CreatePropertyController {
    public void createProperty(String username, Document newProperty) {
        Property property = new Property();
        newProperty.append("agent", username);
        property.addProperty(newProperty);
    }
}

