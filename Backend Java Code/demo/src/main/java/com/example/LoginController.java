package com.example;

public class LoginController {
    public User login(String username, String password) {
        User user = new User();
        User loggedInUser = user.login(username, password);
        return loggedInUser;
    }
}
