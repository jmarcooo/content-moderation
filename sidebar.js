// 1. Sidebar HTML Content
const sidebarContent = `
<nav class="sidebar">
    <div class="brand">🛡️ AdminPanel</div>
    <ul class="nav-links">
        <li><a href="home.html" id="link-home">📊 Overview</a></li>
        <li><a href="user-management.html" id="link-users">👥 User Management</a></li>
        <li><a href="moderation.html" id="link-mod">🚫 Moderation Queue</a></li>
        <li><a href="#">⚙️ Settings</a></li>
        
        <li>
            <a href="#" onclick="toggleTheme()" style="display: flex; align-items: center; justify-content: space-between;">
                <span>🎨 Theme</span>
                <span id="theme-icon">🌙</span>
            </a>
        </li>

        <li><a href="login.html" style="margin-top:20px; color:#f85149;">🚪 Logout</a></li>
    </ul>
    
    <div class="user-profile">
        <div class="avatar">A</div>
        <div>
            <div><strong>Admin</strong></div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Online</div>
        </div>
    </div>
</nav>
`;

// 2. Insert Sidebar
document.body.insertAdjacentHTML('afterbegin', sidebarContent);

// 3. Highlight Active Link
const path = window.location.pathname;
if (path.includes('home.html')) document.getElementById('link-home').classList.add('active');
if (path.includes('user-management.html')) document.getElementById('link-users').classList.add('active');
if (path.includes('moderation.html')) document.getElementById('link-mod').classList.add('active');

// ===========================================
// THEME SWITCHER LOGIC
// ===========================================

// Check local storage for saved theme
const savedTheme = localStorage.getItem('appTheme');
const themeIcon = document.getElementById('theme-icon');

if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.innerText = '☀️';
} else {
    themeIcon.innerText = '🌙';
}

// Function to toggle theme
window.toggleTheme = function() {
    const isLight = document.body.classList.toggle('light-mode');
    
    if (isLight) {
        localStorage.setItem('appTheme', 'light');
        document.getElementById('theme-icon').innerText = '☀️';
    } else {
        localStorage.setItem('appTheme', 'dark');
        document.getElementById('theme-icon').innerText = '🌙';
    }
};
