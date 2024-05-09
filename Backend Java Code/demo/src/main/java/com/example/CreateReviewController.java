package com.example;

import org.bson.Document;

public class CreateReviewController {
    public void createReview(String name, Document newReview) {
        User user = new User();
        user.addReview(name, newReview);
    }
}