package com.example;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.bson.Document;
import java.io.IOException;
import com.google.gson.Gson;

@WebServlet("/myapp/UpdateUserBoundary")
public class UpdateUserBoundary extends HttpServlet {
    private UpdateUserController updateUserController;

    public UpdateUserBoundary() {
        this.updateUserController = new UpdateUserController();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        Document updatedUser = new Gson().fromJson(request.getReader(), Document.class);

        updateUserController.updateUser(username, updatedUser);
    }
}