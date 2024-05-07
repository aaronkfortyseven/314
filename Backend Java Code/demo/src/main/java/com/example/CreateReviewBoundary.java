import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.bson.Document;
import java.io.IOException;
import com.google.gson.Gson;

@WebServlet("/myapp/CreateReviewBoundary")
public class CreateReviewBoundary extends HttpServlet {
    private CreateReviewController createReviewController;

    public CreateReviewBoundary() {
        this.createReviewController = new CreateReviewController();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Document newReview = new Gson().fromJson(request.getReader(), Document.class);
        String name = newReview.getString("name");
    
        createReviewController.execute(name, newReview);
    }
}