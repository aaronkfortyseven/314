package com.example;

public class LoginController {
    public User login(String username, String password) {
        return User.login(username, password);
    }

    // Other methods for handling login-related operations...
}
