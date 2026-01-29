// ===========================================
// 1. SIDEBAR HTML
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
                
                <div class="status-dropdown">
                    <div class="status-trigger" onclick="toggleStatusMenu()">
                        <span id="current-dot" class="dot dot-online"></span>
                        <span id="current-text">Online</span>
                        <span style="font-size: 0.7em; opacity: 0.5;">▼</span>
                    </div>

                    <ul id="status-menu" class="status-menu">
                        <li onclick="setStatus('online', 'Online')"><span class="dot dot-online"></span> Online</li>
                        <li onclick="setStatus('break', 'Break')"><span class="dot dot-break"></span> Break</li>
                        <li onclick="setStatus('lunch', 'Lunch')"><span class="dot dot-lunch"></span> Lunch</li>
                        <li onclick="setStatus('meeting', 'Meeting')"><span class="dot dot-meeting"></span> Meeting</li>
                        <li onclick="setStatus('idle', 'Idle')"><span class="dot dot-idle"></span> Idle</li>
                        <li onclick="setStatus('training', 'Training')"><span class="dot dot-training"></span> Training</li>
                        <li onclick="setStatus('offline', 'Offline')"><span class="dot dot-offline"></span> Offline</li>
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
// 2. THEME LOGIC
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
// 3. STATUS LOGIC (Refined Auto-Idle)
// ===========================================

// Toggle the menu open/close
window.toggleStatusMenu = function() {
    const menu = document.getElementById('status-menu');
    menu.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.status-dropdown');
    const menu = document.getElementById('status-menu');
    if (dropdown && !dropdown.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// Set Status Function
window.setStatus = function(type, label) {
    document.getElementById('current-text').innerText = label;
    document.getElementById('current-dot').className = `dot dot-${type}`;
    document.getElementById('status-menu').classList.remove('active');
    
    // Save to storage
    localStorage.setItem('userStatus', JSON.stringify({ type, label }));
    
    // If user manually sets "Break" or "Lunch", we must ensure timer is reset/cleared immediately
    if (type !== 'online') {
        clearTimeout(idleTimer);
    } else {
        // If setting back to online manually, restart the timer logic
        resetIdleTimer();
    }
}

// Load Saved Status
const savedStatus = JSON.parse(localStorage.getItem('userStatus'));
if (savedStatus) {
    setStatus(savedStatus.type, savedStatus.label);
}

// ------------------------------------------
// STRICT AUTO-IDLE LOGIC
// ------------------------------------------
let idleTimer;
const IDLE_LIMIT = 5 * 60 * 1000; // 5 Minutes

function resetIdleTimer() {
    // 1. Clear any existing timer immediately
    clearTimeout(idleTimer);

    const currentLabel = document.getElementById('current-text').innerText;

    // 2. Logic: If user is "Idle" and moves mouse -> Wake up to "Online"
    if (currentLabel === 'Idle') {
        setStatus('online', 'Online');
        // Once set to Online, the code below will run automatically on next event 
        // or we can let it fall through, but setStatus restarts logic anyway.
        return; 
    }

    // 3. Logic: Only start countdown if status is explicitly "Online"
    // If status is Break, Lunch, Meeting, etc., DO NOTHING.
    if (currentLabel === 'Online') {
        idleTimer = setTimeout(() => {
            setStatus('idle', 'Idle');
            console.log("User inactive for 5 mins: Status changed to Idle");
        }, IDLE_LIMIT);
    }
}

// Listen for activity
window.onload = resetIdleTimer;
document.onmousemove = resetIdleTimer;
document.onkeypress = resetIdleTimer;
document.onclick = resetIdleTimer;
