package com.example;

import org.bson.Document;

public class UpdateProfileController {
    public void updateProfile(String username, Document updatedProfile) {
        Profile profile = new Profile();
        profile.editProfile(username, updatedProfile);
    }
}