package com.example;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.bson.Document;
import java.io.IOException;
import com.google.gson.Gson;

@WebServlet("/myapp/FavPropertyBoundary")
public class FavPropertyBoundary extends HttpServlet {
    private FavPropertyController favPropertyController;

    public FavPropertyBoundary() {
        this.favPropertyController = new FavPropertyController();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        Document favProperty = new Gson().fromJson(request.getReader(), Document.class);

        favPropertyController.favProperty(username, favProperty);
    }
}