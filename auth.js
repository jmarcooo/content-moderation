// auth.js
const Auth = {
    // 1. Centralized Auth Guard
    requireLogin: () => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) {
            window.location.href = 'login.html';
        }
        return user;
    },

    // 2. Simulated Secure Login
    login: async (username, password) => {
        try {
            const res = await fetch('users.json');
            const users = await res.json();
            
            // In a real app, you would send POST /api/login with {username, password}
            // and the server would validate. Here, we simulate it.
            const user = users.find(u => u.username === username);
            
            // SECURITY NOTE: In a real app, compare HASHED passwords, not plain text.
            if (user && user.password === password) { 
                // Don't store the password in localStorage!
                const safeUser = { ...user };
                delete safeUser.password; 
                localStorage.setItem('currentUser', JSON.stringify(safeUser));
                return true;
            }
            return false;
        } catch (err) {
            console.error("Login Error:", err);
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
};
