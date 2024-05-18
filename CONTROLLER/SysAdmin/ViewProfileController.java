package com.example;

import org.bson.Document;
import java.util.List;

public class ViewProfileController {
    public List<Document> viewProfile() {
        Profile profile = new Profile();
        return profile.getAllProfiles();
    }
}