public abstract class User {
    private String username;
    private String password;
    // other common attributes...

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public void login() {
        // Implement login logic
    }

    public void logout() {
        // Implement logout logic
    }
}

public class SystemAdmin extends User {
    public SystemAdmin(String username, String password) {
        super(username, password);
    }

    public void createUserAccount() {
        // Implement user account creation logic
    }

    // Other methods related to SystemAdmin...
}

public class RealEstateAgent extends User {
    public RealEstateAgent(String username, String password) {
        super(username, password);
    }

    public void createProperty() {
        // Implement property creation logic
    }

    // Other methods related to RealEstateAgent...
}

public class Buyer extends User {
    public Buyer(String username, String password) {
        super(username, password);
    }

    public void viewOldProperties() {
        // Implement logic to view old properties
    }

    // Other methods related to Buyer...
}

public class Seller extends User {
    public Seller(String username, String password) {
        super(username, password);
    }

    public void viewListings() {
        // Implement logic to view listings
    }

    // Other methods related to Seller...
}

public class Property {
    private String propertyId;
    private String address;
    // other property attributes...

    public Property(String propertyId, String address) {
        this.propertyId = propertyId;
        this.address = address;
    }

    // Other methods related to Property...
}