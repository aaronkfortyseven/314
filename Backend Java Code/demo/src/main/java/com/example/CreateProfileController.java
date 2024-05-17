package com.example;
import org.bson.Document;

public class CreateProfileController {
    public void addProfile(Document newProfile) {
        Profile profile = new Profile();
        profile.addProfile(newProfile);
    }
}


