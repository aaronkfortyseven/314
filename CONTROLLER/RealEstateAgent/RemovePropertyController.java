package com.example;

public class RemovePropertyController {
    public void removeProperty(String propertyTitle) {
        Property property = new Property();
        property.deleteProperty(propertyTitle);
    }
}