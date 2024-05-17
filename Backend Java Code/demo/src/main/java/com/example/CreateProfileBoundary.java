package com.example;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.bson.Document;
import java.io.IOException;
import com.google.gson.Gson;

@WebServlet("/myapp/CreateProfileBoundary")
public class CreateProfileBoundary extends HttpServlet {
    private CreateProfileController createProfileController;

    public CreateProfileBoundary() {
        this.createProfileController = new CreateProfileController();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    
        Document newProfile = new Gson().fromJson(request.getReader(), Document.class);

        createProfileController.addProfile(newProfile);
    }
}