package com.example;

import org.bson.Document;

public class CreateReviewController {
    public void createReview(String username, Document newReview) {
        Review review = new Review();
        review.addReview(username, newReview);
    }
}