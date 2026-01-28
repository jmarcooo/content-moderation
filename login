<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moderation Admin Login</title>
    <style>
        /* RESET & BASICS */
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
        
        body {
            background-color: #0d1117; /* GitHub Dark Background */
            color: #c9d1d9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        /* LOGIN CARD */
        .login-container {
            background-color: #161b22; /* Card Background */
            border: 1px solid #30363d;
            border-radius: 6px;
            padding: 2rem;
            width: 100%;
            max-width: 350px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            text-align: center;
        }

        /* LOGO & TEXT */
        .brand-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }
        h2 { color: #ffffff; margin-bottom: 0.5rem; font-weight: 500; }
        p { color: #8b949e; font-size: 0.9rem; margin-bottom: 1.5rem; }

        /* FORM ELEMENTS */
        .form-group { text-align: left; margin-bottom: 1rem; }
        
        label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 0.85rem;
            font-weight: 600;
        }

        input {
            width: 100%;
            padding: 10px;
            background-color: #0d1117;
            border: 1px solid #30363d;
            border-radius: 6px;
            color: #ffffff;
            outline: none;
            transition: border-color 0.2s;
        }

        input:focus { border-color: #58a6ff; box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.3); }

        /* BUTTON */
        .btn-login {
            width: 100%;
            padding: 10px;
            background-color: #238636; /* GitHub Green */
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 1rem;
            transition: background 0.2s;
        }

        .btn-login:hover { background-color: #2ea043; }

        /* FOOTER */
        .footer-links { margin-top: 1.5rem; font-size: 0.8rem; }
        .footer-links a { color: #58a6ff; text-decoration: none; }
        .footer-links a:hover { text-decoration: underline; }
    </style>
</head>
<body>

    <div class="login-container">
        <span class="brand-icon">🛡️</span>
        <h2>Admin Portal</h2>
        <p>Sign in to manage moderation rules</p>

        <form action="/login" method="POST">
            <div class="form-group">
                <label for="username">Username or Email</label>
                <input type="text" id="username" name="username" required autofocus>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>

            <button type="submit" class="btn-login">Sign in</button>
        </form>

        <div class="footer-links">
            <a href="#">Forgot password?</a>
        </div>
    </div>

</body>
</html>
