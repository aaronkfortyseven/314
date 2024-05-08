package com.example;

public class RemovePropertyController {
    public void removeProperty(String username, String propertyTitle) {
        User user = new User();
        user.deleteProperty(username, propertyTitle);
    }
}