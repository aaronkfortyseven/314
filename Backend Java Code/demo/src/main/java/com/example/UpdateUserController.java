package com.example;

import org.bson.Document;

public class UpdateUserController {
    public void updateUser(String username, Document updatedUser) {
        User user = new User();
        user.editUser(username, updatedUser);
    }
}