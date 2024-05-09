package com.example;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.bson.Document;
import java.io.IOException;
import com.google.gson.Gson;

@WebServlet("/myapp/UpdatePropertyBoundary")
public class UpdatePropertyBoundary extends HttpServlet {
    private UpdatePropertyController updatePropertyController;

    public UpdatePropertyBoundary() {
        this.updatePropertyController = new UpdatePropertyController();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String propertyTitle = request.getParameter("propertyTitle");
        Document updatedProperty = new Gson().fromJson(request.getReader(), Document.class);

        updatePropertyController.updateProperty(username, propertyTitle, updatedProperty);
    }
}