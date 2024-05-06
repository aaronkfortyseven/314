<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real Estate Website</title>
    <link rel="stylesheet" type="text/css" href="/styles.css">
</head>
<body>
    <!-- Header -->
    <header>
        <h1>Singapore's best real deals!</h1>
    </header>

    <!-- Navigation -->
    <nav>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="listings.html">Property Listings</a></li>
            <li><a href="calculator.html">Mortgage Calculator</a></li>
            <li><a href="PersonalReviews.html">Agent Reviews</a></li>
            <li><a href="login.jsp">Login</a></li>
        </ul>
    </nav>

    <!-- Main Content -->
    <main>
        <div class = "hero">

            <div class = "form-box">
                <form action="/myapp/LoginBoundary" method="post" id="login" class="input-group">
                    <input id="username" name="username" type="text" class="input-field" placeholder="User Id" required>
                    <input id="password" name="password" type="password" class="input-field" placeholder="Enter Password" required>
                    <input type="checkbox" class="check-box"><span>Remember Password</span>
                    <button type="submit" class="submit-btn" onclick="storeUsername()">Log in</button>
                </form>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <p>&copy; 2024 Real Estate Website. All rights reserved.</p>
    </footer>

<!-- JavaScript for showing a popup when login is unsuccessful -->
<script>
    // Check if the loginError flag is present in the session
    var loginError = "<%=session.getAttribute("loginError")%>";
    if (loginError && loginError === "true") {
        // Show a popup
        alert("Invalid username or password.");
        // Remove the flag from the session
        <%
            session.removeAttribute("loginError");
        %>
    }
</script>

<!-- Storing username in session-->
<script>
    function storeUsername() {
        var username = document.getElementById('username').value;
        sessionStorage.setItem('username', username);
    }
</script>
</body>
</html>