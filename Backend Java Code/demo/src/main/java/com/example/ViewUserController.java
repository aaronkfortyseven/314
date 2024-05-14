package com.example;

import org.bson.Document;
import java.util.List;

public class ViewUserController {
    public List<Document> viewUser() {
        User user = new User();
        return user.getAllUsers();
    }
}