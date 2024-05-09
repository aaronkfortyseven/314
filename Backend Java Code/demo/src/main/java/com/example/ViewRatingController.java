package com.example;

public class ViewRatingController {
    public Double viewRating(String username) {
        User user = new User();
        return user.getAverageRating(username);
    }
}