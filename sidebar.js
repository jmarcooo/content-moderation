// --- sidebar.js ---

// 1. The HTML content for the sidebar
const sidebarContent = `
<nav class="sidebar">
    <div class="brand">🛡️ AdminPanel</div>
    <ul class="nav-links">
        <li><a href="home.html" id="link-home">📊 Overview</a></li>
        <li><a href="user-management.html" id="link-users">👥 User Management</a></li>
        <li><a href="#">🚫 Moderation Queue</a></li>
        <li><a href="#">⚙️ Settings</a></li>
    </ul>
    
    <div class="user-profile">
        <div class="avatar">J</div>
        <div>
            <div><strong>jmarcooo</strong></div>
            <div style="font-size: 0.8rem; color: #8b949e;">Super Admin</div>
        </div>
    </div>
</nav>
`;

// 2. Inject the sidebar at the start of the body
document.body.insertAdjacentHTML('afterbegin', sidebarContent);

// 3. Automatically highlight the active link
const currentPage = window.location.pathname;

if (currentPage.includes('home.html')) {
    document.getElementById('link-home').classList.add('active');
} else if (currentPage.includes('user-management.html')) {
    document.getElementById('link-users').classList.add('active');
}
