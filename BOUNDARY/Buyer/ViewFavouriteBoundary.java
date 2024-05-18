// ViewFavouriteBoundary.java
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

@WebServlet("/myapp/ViewFavouriteBoundary")
public class ViewFavouriteBoundary extends HttpServlet {
    private ViewFavouriteController viewFavouriteController;

    public ViewFavouriteBoundary() {
        this.viewFavouriteController = new ViewFavouriteController();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");

        List<Document> favourites = viewFavouriteController.viewFavourite(username);
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(new Gson().toJson(favourites));
        out.flush();
    }
}