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

@WebServlet("/myapp/ViewPropertyBoundary")
public class ViewPropertyBoundary extends HttpServlet {
    private ViewPropertyController viewPropertyController;

    public ViewPropertyBoundary() {
        this.viewPropertyController = new ViewPropertyController();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");

        List<Document> properties = viewPropertyController.viewProperty(username);
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(new Gson().toJson(properties));
        out.flush();
    }
}