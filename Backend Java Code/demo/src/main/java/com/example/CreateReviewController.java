package com.example;

import org.bson.Document;

public class CreateReviewController {
    public void createReview(String name, Document newReview) {
        Review review = new Review();
        review.addReview(name, newReview);
    }
}