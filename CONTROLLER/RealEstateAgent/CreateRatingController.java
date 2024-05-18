package com.example;

public class CreateRatingController {
    public void createRating(String name, Integer rating) {
        Rating ratingObj = new Rating();
        ratingObj.addRating(name, rating);
    }
}