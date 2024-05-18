package com.example;

import org.bson.Document;
import java.util.ArrayList;

// public class CreateUserController {
//     public void createUser(Document newUser) {
//         User user = new User();
//         user.addUser(newUser);
//     }
// }

public class CreateUserController {
    public void createUser(Document newUser) {
        newUser.append("favProperties", new ArrayList<String>());
        User user = new User();
        user.addUser(newUser);
    }
}