package com.example;

public class CreateRatingController {
    public void createRating(String username, Double rating) {
        Rating rating = new Rating();
        rating.addRating(username, rating);
    }
}