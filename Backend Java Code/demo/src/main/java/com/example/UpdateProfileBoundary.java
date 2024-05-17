package com.example;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.bson.Document;
import java.io.IOException;
import com.google.gson.Gson;

@WebServlet("/myapp/UpdateProfileBoundary")
public class UpdateProfileBoundary extends HttpServlet {
    private UpdateProfileController updateProfileController;

    public UpdateProfileBoundary() {
        this.updateProfileController = new UpdateProfileController();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        Document updatedProfile = new Gson().fromJson(request.getReader(), Document.class);

        updateProfileController.updateProfile(username, updatedProfile);
    }
}