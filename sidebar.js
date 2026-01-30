document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.createElement("div");
    sidebar.className = "sidebar";

    // 1. Get User Data
    const user = JSON.parse(localStorage.getItem('currentUser')) || { name: 'Admin', role: 'Viewer' };
    const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    // 2. Define Main Navigation Links
    // Note: Settings and Logout are REMOVED from this list
    const navItems = [
        { name: "📊 Overview", link: "home.html", id: "link-home" },
        { name: "👥 User Management", link: "user-management.html", id: "link-users" },
        { name: "⛔ Moderation Queue", link: "moderation.html", id: "link-mod" },
        { name: "🔍 Quality Audit", link: "audit.html", id: "link-audit" },
        { name: "⚖️ Appeal Center", link: "appeals.html", id: "link-appeal" },
        { name: "🔔 Notification Center", link: "#", id: "link-notifs" } // NEW ITEM
    ];

    // 3. Build HTML
    sidebar.innerHTML = `
        <div class="brand">
            <div style="width:24px; height:24px; background:var(--accent-blue); border-radius:4px;"></div>
            AdminPanel
        </div>
        
        <ul class="nav-links">
            ${navItems.map(item => `
                <li><a href="${item.link}" id="${item.id}">${item.name}</a></li>
            `).join('')}
        </ul>

        <div class="user-profile">
            <div class="avatar">${initials}</div>
            <div style="flex-grow:1; overflow:hidden;">
                <div style="font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${user.name}</div>
                
                <div class="status-dropdown">
                    <div class="status-trigger" onclick="toggleStatusMenu(event)">
                        <span class="dot dot-online" id="current-dot"></span>
                        <span id="current-status">Online</span>
                        <span style="font-size:0.7rem;">▼</span>
                    </div>
                    <ul class="status-menu" id="status-menu">
                        <li onclick="setStatus('online', '#238636')"><span class="dot dot-online"></span> Online</li>
                        <li onclick="setStatus('break', '#d29922')"><span class="dot dot-break"></span> Break</li>
                        <li onclick="setStatus('lunch', '#f0883e')"><span class="dot dot-lunch"></span> Lunch</li>
                        <li onclick="setStatus('meeting', '#0969da')"><span class="dot dot-meeting"></span> Meeting</li>
                        <li onclick="setStatus('idle', '#f85149')"><span class="dot dot-idle"></span> Idle</li>
                        <li onclick="setStatus('training', '#8957e5')"><span class="dot dot-training"></span> Training</li>
                        <li onclick="setStatus('offline', '#6e7681')"><span class="dot dot-offline"></span> Offline</li>
                    </ul>
                </div>
            </div>
            
            <button class="theme-btn" onclick="toggleTheme()" title="Toggle Dark Mode">
                <span id="theme-icon">🌙</span>
            </button>
        </div>

        <div class="sidebar-footer-menu">
            <a href="settings.html" class="settings-link">⚙️ Settings</a>
            <a href="#" onclick="logout()">🚪 Logout</a>
        </div>
    `;

    // 4. Inject into Body
    document.body.prepend(sidebar);

    // 5. Set Active Link
    const currentPage = window.location.pathname.split("/").pop() || "home.html";
    const activeLink = document.querySelector(`.nav-links a[href="${currentPage}"]`);
    if (activeLink) activeLink.classList.add("active");

    // 6. Initialize Theme
    initTheme();
});

// --- HELPER FUNCTIONS ---

function logout() {
    if(confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

function toggleStatusMenu(e) {
    e.stopPropagation();
    const menu = document.getElementById('status-menu');
    menu.classList.toggle('active');
}

function setStatus(statusName, color) {
    document.getElementById('current-status').innerText = statusName.charAt(0).toUpperCase() + statusName.slice(1);
    document.getElementById('current-dot').className = `dot dot-${statusName}`;
    document.getElementById('status-menu').classList.remove('active');
}

// Close status menu when clicking outside
document.addEventListener('click', () => {
    const menu = document.getElementById('status-menu');
    if (menu) menu.classList.remove('active');
});

// Theme Logic
function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-icon').innerText = '☀️';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('theme-icon').innerText = isDark ? '☀️' : '🌙';
}
