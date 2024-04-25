package com.example;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.io.IOException;

@WebServlet("/myapp/LoginServlet")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        // Connect to MongoDB and get the users collection
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("314_db");
        MongoCollection<Document> collection = database.getCollection("users");

        // Check if the login is successful
        boolean loginSuccessful = loginUser(collection, username, password);
        if (loginSuccessful) {
            // Redirect to ReaLogin.html
            response.sendRedirect("ReaLogin.html");
        } else {
            // Redirect back to login.html with an error message
            request.setAttribute("errorMessage", "Invalid username or password.");
            request.getRequestDispatcher("/login.html").forward(request, response);
        }
    }

    // loginUser method
    public static boolean loginUser(MongoCollection<Document> collection, String username, String password) {
        Document user = collection.find(new Document("username", username)).first();
        if (user != null) {
            String dbPassword = user.getString("password");
            if (dbPassword.equals(password)) {
                return true;
            }
        }
        return false;
    }
}