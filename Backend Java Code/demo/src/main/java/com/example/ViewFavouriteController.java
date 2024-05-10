package com.example;

import org.bson.Document;
import java.util.List;
import java.util.ArrayList;


public class ViewFavouriteController {
    public List<Document> viewFavourite(String username) {
        User user = new User();
        return user.getFavourites(username);
    }
}

//create a boundary