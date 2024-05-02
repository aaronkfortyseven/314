import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.bson.Document;
import java.io.IOException;
import com.google.gson.Gson;

@WebServlet("/myapp/CreatePropertyBoundary")
public class CreatePropertyBoundary extends HttpServlet {
    private CreatePropertyController createPropertyController;

    public CreatePropertyBoundary() {
        this.createPropertyController = new CreatePropertyController();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        Document newProperty = new Gson().fromJson(request.getReader(), Document.class);

        createPropertyController.execute(username, newProperty);
    }
}