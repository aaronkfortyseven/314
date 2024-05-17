package com.example;

public class SuspendProfileController {
    public boolean suspendProfile(String username) {
        Profile profile = new Profile();
        return profile.suspendProfile(username);
    }
}