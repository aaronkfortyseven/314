// package com.example;

// public class LoginController {
//     public User login(String username, String password) {
//         User user = new User();
//         User loggedInUser = user.login(username, password);
//         return loggedInUser;
//     }
// }

package com.example;

public class LoginController {
    private User user;

    public LoginController() {
        this.user = new User();
    }

    public User login(String username, String password) {
        User loggedInUser = user.login(username, password);
        return loggedInUser;
    }

    public boolean suspendUser(String username) {
        return user.suspend(username);
    }
    public boolean unsuspendUser(String username) {
        return user.unsuspend(username);
    }
}