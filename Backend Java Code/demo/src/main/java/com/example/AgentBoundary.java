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

@WebServlet("/myapp/AgentBoundary")
public class AgentBoundary extends HttpServlet {
    private ViewPropertiesController viewPropertiesController;
    private RemovePropertyController removePropertyController;

    public AgentBoundary() {
        this.viewPropertiesController = new ViewPropertiesController();
        this.removePropertyController = new RemovePropertyController();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");

        List<Document> properties = viewPropertiesController.execute(username);
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(new Gson().toJson(properties));
        out.flush();
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String propertyTitle = request.getParameter("propertyTitle");

        removePropertyController.execute(username, propertyTitle);
    }
}