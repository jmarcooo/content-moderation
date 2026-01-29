// ===========================================
// 1. SIDEBAR HTML (With New Status Dropdown)
// ===========================================
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
        <div style="display: flex; align-items: center; gap: 10px;">
            <div class="avatar">A</div>
            <div>
                <div><strong>Admin</strong></div>
                
                <div class="status-container">
                    <div class="status-trigger" onclick="toggleStatusMenu()" title="Change Status">
                        <span id="current-dot" class="status-dot dot-online"></span>
                        <span id="current-text">Online</span>
                        <span style="font-size:0.7rem; margin-left:4px;">▼</span>
                    </div>

                    <ul id="status-menu" class="status-menu">
                        <li onclick="setStatus('online', 'Online')"><span class="status-dot dot-online"></span> Online</li>
                        <li onclick="setStatus('break', 'Break')"><span class="status-dot dot-break"></span> Break</li>
                        <li onclick="setStatus('lunch', 'Lunch')"><span class="status-dot dot-lunch"></span> Lunch</li>
                        <li onclick="setStatus('meeting', 'Meeting')"><span class="status-dot dot-meeting"></span> Meeting</li>
                        <li onclick="setStatus('idle', 'Idle')"><span class="status-dot dot-idle"></span> Idle</li>
                        <li onclick="setStatus('training', 'Training')"><span class="status-dot dot-training"></span> Training</li>
                        <li onclick="setStatus('offline', 'Offline')"><span class="status-dot dot-offline"></span> Offline</li>
                    </ul>
                </div>
                </div>
        </div>

        <button onclick="toggleTheme()" class="theme-btn" title="Toggle Theme">
            <span id="theme-icon">☀️</span>
        </button>
    </div>
</nav>
`;

// Inject Sidebar
document.body.insertAdjacentHTML('afterbegin', sidebarContent);

// Highlight Active Link
const path = window.location.pathname;
if (path.includes('home.html')) document.getElementById('link-home').classList.add('active');
if (path.includes('user-management.html')) document.getElementById('link-users').classList.add('active');
if (path.includes('moderation.html')) document.getElementById('link-mod').classList.add('active');

// ===========================================
// 2. THEME SWITCHER LOGIC
// ===========================================
const savedTheme = localStorage.getItem('appTheme') || 'light';
const themeIcon = document.getElementById('theme-icon');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.innerText = '🌙';
} else {
    themeIcon.innerText = '☀️';
}

window.toggleTheme = function() {
    const isDark = document.body.classList.toggle('dark-mode');
    if (isDark) {
        localStorage.setItem('appTheme', 'dark');
        document.getElementById('theme-icon').innerText = '🌙';
    } else {
        localStorage.setItem('appTheme', 'light');
        document.getElementById('theme-icon').innerText = '☀️';
    }
};

// ===========================================
// 3. STATUS & AUTO-IDLE LOGIC
// ===========================================

// A. Toggle Menu Visibility
window.toggleStatusMenu = function() {
    const menu = document.getElementById('status-menu');
    menu.classList.toggle('show');
}

// Close menu if clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.status-container');
    const menu = document.getElementById('status-menu');
    if (!container.contains(event.target)) {
        menu.classList.remove('show');
    }
});

// B. Set Status Function
window.setStatus = function(type, label) {
    // Update visual text and dot color
    document.getElementById('current-text').innerText = label;
    
    // Remove old dot class and add new one
    const dot = document.getElementById('current-dot');
    dot.className = `status-dot dot-${type}`;
    
    // Close menu
    document.getElementById('status-menu').classList.remove('show');
    
    // Save to local storage (Mocking backend update)
    localStorage.setItem('userStatus', JSON.stringify({ type, label }));
    console.log(`User status set to: ${label} (${type})`);
}

// C. Initialize Saved Status (On Page Load)
const savedStatus = JSON.parse(localStorage.getItem('userStatus'));
if (savedStatus) {
    setStatus(savedStatus.type, savedStatus.label);
}

// D. AUTO-IDLE SYSTEM (5 Minutes Inactivity)
let idleTimer;
const IDLE_LIMIT = 5 * 60 * 1000; // 5 Minutes in milliseconds

function resetIdleTimer() {
    clearTimeout(idleTimer);
    
    // Only reset if we are NOT already manually set to 'Offline' or 'Break'
    // (We don't want to wake up someone who is actually on lunch just because they moved the mouse)
    const currentLabel = document.getElementById('current-text').innerText;
    if (currentLabel === 'Idle') {
        // If they were idle and moved mouse, set back to Online
        setStatus('online', 'Online');
    }
    
    // Start countdown to Idle
    if (currentLabel === 'Online') {
        idleTimer = setTimeout(() => {
            setStatus('idle', 'Idle');
            alert("⚠️ You have been set to 'Idle' due to inactivity.");
        }, IDLE_LIMIT);
    }
}

// Listen for activity
window.onload = resetIdleTimer;
document.onmousemove = resetIdleTimer;
document.onkeypress = resetIdleTimer;
document.onclick = resetIdleTimer;
