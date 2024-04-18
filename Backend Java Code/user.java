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