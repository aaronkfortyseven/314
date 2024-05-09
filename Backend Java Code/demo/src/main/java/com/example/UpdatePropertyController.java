package com.example;

import org.bson.Document;

public class UpdatePropertyController {
    public void updateProperty(String username, String propertyTitle, Document updatedProperty) {
        Property property = new Property();
        property.editProperty(username, propertyTitle, updatedProperty);
    }
}