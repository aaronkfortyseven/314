package com.example;

public class ViewRatingController {
    public Double viewRating(String username) {
        Rating rating = new Rating();
        return rating.getAverageRating(username);
    }
}