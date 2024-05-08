package com.example;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.io.IOException;

@WebServlet("/myapp/LoginBoundary")
public class LoginBoundary extends HttpServlet {
    private LoginController loginController = new LoginController();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        User user = loginController.login(username, password);
        if (user != null) {
            request.getSession().setAttribute("user", user);
            String role = user.getRole();
            if ("agent".equals(role)) {
                response.sendRedirect("/AgentDash.html");
            } else if ("buyer".equals(role)) {
                response.sendRedirect("/BuyerDash.html");
            } else if ("seller".equals(role)) {
                response.sendRedirect("/SellerDash.html");
            } else if ("sys admin".equals(role)) {
                response.sendRedirect("/SysAdDash.html");
            }  else {
            // Login failed
            HttpSession session = request.getSession();
            session.setAttribute("loginError", "true");
            response.sendRedirect("/login.jsp");
            }
        } else {
            // Login failed
            HttpSession session = request.getSession();
            session.setAttribute("loginError", "true");
            response.sendRedirect("/login.jsp");
        }


    }
}