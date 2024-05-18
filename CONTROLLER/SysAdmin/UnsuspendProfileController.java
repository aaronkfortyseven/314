package com.example;

public class UnsuspendProfileController {
    public boolean unsuspendProfile(String username) {
        Profile profile = new Profile();
        return profile.unsuspendProfile(username);
    }
}