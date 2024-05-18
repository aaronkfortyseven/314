package com.example;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.bson.Document;
import java.io.IOException;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet("/myapp/CreateRatingBoundary")
public class CreateRatingBoundary extends HttpServlet {
    private CreateRatingController createRatingController;

    public CreateRatingBoundary() {
        this.createRatingController = new CreateRatingController();
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JsonObject json = new Gson().fromJson(request.getReader(), JsonObject.class);
        String name = json.get("name").getAsString();
        Integer rating = json.get("rating").getAsInt();
    
        createRatingController.createRating(name, rating);
    }
}