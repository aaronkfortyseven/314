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

@WebServlet("/myapp/ViewReviewBoundary")
public class ViewReviewBoundary extends HttpServlet {
    private ViewReviewController viewReviewController;

    public ViewReviewBoundary() {
        this.viewReviewController = new ViewReviewController();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");

        List<Document> properties = viewReviewController.viewReview(username);
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(new Gson().toJson(properties));
        out.flush();
    }
}