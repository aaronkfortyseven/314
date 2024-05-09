package com.example;

public class CreateRatingController {
    public void createRating(String username, Double rating) {
        Rating ratingObj = new Rating();
        ratingObj.addRating(username, rating);
    }
}