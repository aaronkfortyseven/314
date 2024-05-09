package com.example;

import org.bson.Document;


public class FavPropertyController {
    public void favProperty(String username, Document favProperty) {
        User user = new User();
        user.addFavProperty(username, favProperty);
    }
}