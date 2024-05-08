package com.example;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.bson.Document;
import java.io.IOException;
import java.util.List;
import java.io.PrintWriter;
import com.google.gson.Gson;

@WebServlet("/myapp/RemovePropertyBoundary")
public class RemovePropertyBoundary extends HttpServlet {
    private RemovePropertyController removePropertyController;

    public RemovePropertyBoundary() {
        this.removePropertyController = new RemovePropertyController();
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String propertyTitle = request.getParameter("propertyTitle");

        removePropertyController.removeProperty(propertyTitle);
    }
}