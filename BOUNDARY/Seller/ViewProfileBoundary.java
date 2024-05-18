package com.example;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.bson.Document;
import java.io.IOException;
import java.util.List;
import java.io.PrintWriter;
import com.google.gson.Gson;

@WebServlet("/myapp/ViewProfileBoundary")
public class ViewProfileBoundary extends HttpServlet {
    private ViewProfileController viewProfileController;

    public ViewProfileBoundary() {
        this.viewProfileController = new ViewProfileController();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Document> profiles = viewProfileController.viewProfile();
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(new Gson().toJson(profiles));
        out.flush();
    }
}