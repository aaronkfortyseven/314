package com.example;

public class User {
    private String username;
    private String password;
    private String role;

    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // getters and setters
    public String getUsername() {
        return this.username;
    }

    public String getRole() {
        return this.role;
    }
}