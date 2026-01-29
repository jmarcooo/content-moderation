const sidebarContent = `
<nav class="sidebar">
    <div class="brand">🛡️ AdminPanel</div>
    <ul class="nav-links">
        <li><a href="home.html" id="link-home">📊 Overview</a></li>
        <li><a href="user-management.html" id="link-users">👥 User Management</a></li>
        <li><a href="moderation.html" id="link-mod">🚫 Moderation Queue</a></li>
        <li><a href="#">⚙️ Settings</a></li>
        
        <li><a href="login.html" style="margin-top:20px; color:#f85149;">🚪 Logout</a></li>
    </ul>
    
    <div class="user-profile">
        <div class="avatar">A</div>
        <div>
            <div><strong>Admin</strong></div>
            <div style="font-size: 0.8rem; color: #8b949e;">Online</div>
        </div>
    </div>
</nav>
`;

// Insert sidebar
document.body.insertAdjacentHTML('afterbegin', sidebarContent);

// Highlight active link logic
const path = window.location.pathname;

if (path.includes('home.html')) {
    document.getElementById('link-home').classList.add('active');
} else if (path.includes('user-management.html')) {
    document.getElementById('link-users').classList.add('active');
} else if (path.includes('moderation.html')) {
    document.getElementById('link-mod').classList.add('active');
}
