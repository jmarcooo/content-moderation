document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.createElement("div");
    sidebar.className = "sidebar";

    // 1. Get User
    const user = JSON.parse(localStorage.getItem('currentUser')) || { name: 'Admin', role: 'Viewer' };
    const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    // 2. Navigation
    const navItems = [
        { name: "📊 Overview", link: "home.html" },
        { name: "👥 User Management", link: "user-management.html" },
        { name: "⛔ Moderation Queue", link: "moderation.html" },
        { name: "🔍 Quality Audit", link: "audit.html" },
        { name: "⚖️ Appeal Center", link: "appeals.html" },
        { name: "🔔 Notification Center", link: "#" }
    ];

    // 3. FORCE STRUCTURE
    sidebar.innerHTML = `
        <div class="brand">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent-blue)" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H7V10.99H17V11.99H12Z"/>
            </svg>
            AdminPanel
        </div>
        
        <ul class="nav-links">
            ${navItems.map(item => `<li><a href="${item.link}">${item.name}</a></li>`).join('')}
        </ul>

        <div class="user-profile">
            <div class="avatar">${initials}</div>
            <div style="flex-grow:1; overflow:hidden;">
                <div style="font-weight:bold; font-size:0.9rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${user.name}</div>
                
                <div class="status-dropdown">
                    <div class="status-trigger" onclick="toggleStatusMenu(event)">
                        <span class="dot dot-online" id="current-dot"></span>
                        <span id="current-status">Online</span>
                        <span style="font-size:0.7rem;">▼</span>
                    </div>
                    <ul class="status-menu" id="status-menu">
                        <li onclick="setStatus('online')"><span class="dot dot-online"></span> Online</li>
                        <li onclick="setStatus('break')"><span class="dot dot-break"></span> Break</li>
                        <li onclick="setStatus('lunch')"><span class="dot dot-lunch"></span> Lunch</li>
                        <li onclick="setStatus('meeting')"><span class="dot dot-meeting"></span> Meeting</li>
                        <li onclick="setStatus('idle')"><span class="dot dot-idle"></span> Idle</li>
                        <li onclick="setStatus('offline')"><span class="dot dot-offline"></span> Offline</li>
                    </ul>
                </div>
            </div>
            
            <button class="theme-btn" onclick="toggleTheme()" title="Toggle Dark Mode" style="background:none; border:none; cursor:pointer; font-size:1.1rem; color: var(--text-muted);">
                <span id="theme-icon">🌙</span>
            </button>
        </div>

        <div class="sidebar-footer-menu">
            <a href="settings.html">⚙️ Settings</a>
            <a href="#" onclick="logout()" class="logout-link">🚪 Logout</a>
        </div>
    `;

    document.body.prepend(sidebar);

    // Active Link
    const currentPage = window.location.pathname.split("/").pop() || "home.html";
    const activeLink = document.querySelector(`.nav-links a[href="${currentPage}"]`);
    if (activeLink) activeLink.classList.add("active");

    initTheme();
    resetInactivityTimer();
});

// --- UTILS ---
function logout() {
    if(confirm('Logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

function toggleStatusMenu(e) {
    e.stopPropagation();
    const menu = document.getElementById('status-menu');
    menu.classList.toggle('active');
}

function setStatus(statusName) {
    document.getElementById('current-status').innerText = statusName.charAt(0).toUpperCase() + statusName.slice(1);
    document.getElementById('current-dot').className = `dot dot-${statusName}`;
    document.getElementById('status-menu').classList.remove('active');
}

document.addEventListener('click', () => {
    const menu = document.getElementById('status-menu');
    if (menu) menu.classList.remove('active');
});

function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-icon').innerText = '☀️';
    } else {
        document.body.classList.add('light-mode');
    }
}

function toggleTheme() {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        document.getElementById('theme-icon').innerText = '🌙';
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        document.getElementById('theme-icon').innerText = '☀️';
    }
}

let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        const currentStatus = document.getElementById('current-status').innerText.toLowerCase();
        if (currentStatus === 'online') {
            setStatus('idle');
        }
    }, 300000); // 5 mins
}

['mousemove', 'keydown', 'click', 'scroll'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer);
});
