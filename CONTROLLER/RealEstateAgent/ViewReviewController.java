package com.example;

import org.bson.Document;
import java.util.List;
import java.util.ArrayList;


public class ViewReviewController {
    public List<Document> viewReview(String username) {
        Review review = new Review();
        return review.getReviews(username);
    }
}