// ===========================================
// 1. TRANSLATION DICTIONARY (Text Only)
// ===========================================
const APP_LANG = localStorage.getItem('appLang') || 'en';

const TRANSLATIONS = {
    en: {
        brand: "AdminPanel",
        overview: "Overview",
        users: "User Management",
        mod: "Moderation Queue",
        audit: "Quality Audit",
        appeal: "Appeal Center",
        notifs: "Notifications",
        settings: "Settings",
        logout: "Logout",
        online: "Online",
        break: "Break",
        lunch: "Lunch",
        meeting: "Meeting",
        idle: "Idle",
        training: "Training",
        offline: "Offline",
        // Page Headers
        welcome: "Overview",
        header_users: "User Management",
        header_mod: "Moderation Queues",
        header_audit: "Audit Queues",
        header_appeal: "Appeal Center",
        header_notifs: "Notification Center",
        header_settings: "Settings",
        // Buttons
        btnAddUser: "+ Add User",
        // Stats
        stat_users: "Total Users",
        stat_flagged: "Flagged Comments",
        stat_pending: "Pending Reviews"
    },
    zh: {
        brand: "管理后台",
        overview: "总览",
        users: "用户管理",
        mod: "审核队列",
        audit: "质量质检",
        appeal: "申诉中心",
        notifs: "通知中心",
        settings: "设置",
        logout: "退出登录",
        online: "在线",
        break: "小休",
        lunch: "午餐",
        meeting: "会议",
        idle: "空闲",
        training: "培训",
        offline: "离线",
        // Page Headers
        welcome: "总览",
        header_users: "用户管理",
        header_mod: "审核队列",
        header_audit: "质检队列",
        header_appeal: "申诉中心",
        header_notifs: "通知中心",
        header_settings: "设置",
        // Buttons
        btnAddUser: "+ 添加用户",
        // Stats
        stat_users: "总用户数",
        stat_flagged: "标记评论",
        stat_pending: "待审核任务"
    }
};

// Helper function to get text
const T = TRANSLATIONS[APP_LANG];

// ===========================================
// 2. SVG ICONS DEFINITIONS
// ===========================================
const ICONS = {
    brand: `<svg class="brand-icon" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>`, // Stack/Layer Icon
    overview: `<svg class="nav-icon" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>`, // Dashboard Grid
    users: `<svg class="nav-icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`, // Person
    mod: `<svg class="nav-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`, // Warning/Block
    audit: `<svg class="nav-icon" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`, // Search
    appeal: `<svg class="nav-icon" viewBox="0 0 24 24"><path d="M1 21h12v2H1zM5.245 8.07l2.83-2.827 14.14 14.142-2.828 2.828zM12.317 1l5.657 5.656-2.83 2.83-5.654-5.66zM3.825 9.485l5.657 5.657-2.828 2.828-5.657-5.657z"/></svg>`, // Gavel (Simplified)
    notifs: `<svg class="nav-icon" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>`, // Bell
    settings: `<svg class="nav-icon" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L3.16 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.58 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`, // Gear
    logout: `<svg class="nav-icon" style="fill:#f85149;" viewBox="0 0 24 24"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>`, // Exit
    sun: `<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--text-main);"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>`,
    moon: `<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--text-main);"><path d="M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z"/></svg>`
};

// ===========================================
// 3. SIDEBAR HTML GENERATION
// ===========================================
const sidebarContent = `
<nav class="sidebar">
    <div class="brand">
        ${ICONS.brand}
        <span>${T.brand}</span>
    </div>
    <ul class="nav-links">
        <li>
            <a href="home.html" id="link-home">
                ${ICONS.overview}
                <span>${T.overview}</span>
            </a>
        </li>
        <li>
            <a href="user-management.html" id="link-users">
                ${ICONS.users}
                <span>${T.users}</span>
            </a>
        </li>
        <li>
            <a href="moderation.html" id="link-mod">
                ${ICONS.mod}
                <span>${T.mod}</span>
            </a>
        </li>
        <li>
            <a href="audit.html" id="link-audit">
                ${ICONS.audit}
                <span>${T.audit}</span>
            </a>
        </li>
        <li>
            <a href="appeal-center.html" id="link-appeal">
                ${ICONS.appeal}
                <span>${T.appeal}</span>
            </a>
        </li>
        <li>
            <a href="notifications.html" id="link-notifs">
                ${ICONS.notifs}
                <span>${T.notifs}</span>
                <span class="sidebar-badge" id="sidebar-badge-count">3</span>
            </a>
        </li>
        <li>
            <a href="settings.html" id="link-settings">
                ${ICONS.settings}
                <span>${T.settings}</span>
            </a>
        </li>
        
        <li style="margin-top:auto; padding-top:20px; border-top:1px solid var(--border-color);">
            <a href="login.html" style="color:#f85149;">
                ${ICONS.logout}
                <span>${T.logout}</span>
            </a>
        </li>
    </ul>
    
    <div class="user-profile">
        <div style="display: flex; align-items: center; gap: 10px;">
            <div class="avatar">A</div>
            <div>
                <div><strong>Admin</strong></div>
                <div class="status-dropdown">
                    <div class="status-trigger" onclick="toggleStatusMenu()">
                        <span id="current-dot" class="dot dot-online"></span>
                        <span id="current-text">${T.online}</span>
                        <span style="font-size: 0.7em; opacity: 0.5;">▼</span>
                    </div>

                    <ul id="status-menu" class="status-menu">
                        <li onclick="setStatus('online', '${T.online}')"><span class="dot dot-online"></span> ${T.online}</li>
                        <li onclick="setStatus('break', '${T.break}')"><span class="dot dot-break"></span> ${T.break}</li>
                        <li onclick="setStatus('lunch', '${T.lunch}')"><span class="dot dot-lunch"></span> ${T.lunch}</li>
                        <li onclick="setStatus('meeting', '${T.meeting}')"><span class="dot dot-meeting"></span> ${T.meeting}</li>
                        <li onclick="setStatus('idle', '${T.idle}')"><span class="dot dot-idle"></span> ${T.idle}</li>
                        <li onclick="setStatus('training', '${T.training}')"><span class="dot dot-training"></span> ${T.training}</li>
                        <li onclick="setStatus('offline', '${T.offline}')"><span class="dot dot-offline"></span> ${T.offline}</li>
                    </ul>
                </div>
            </div>
        </div>

        <button onclick="toggleTheme()" class="theme-btn" title="Toggle Theme" id="theme-btn">
            ${ICONS.sun}
        </button>
    </div>
</nav>
`;

// Inject Sidebar
document.body.insertAdjacentHTML('afterbegin', sidebarContent);

// ===========================================
// 4. AUTO-TRANSLATE PAGE CONTENT
// ===========================================
document.addEventListener("DOMContentLoaded", () => {
    const idMap = {
        'welcome-msg': 'welcome', 
        'stat-users-title': 'stat_users',
        'stat-flagged-title': 'stat_flagged',
        'stat-pending-title': 'stat_pending',
        'header-users': 'header_users',
        'btn-add-user': 'btnAddUser',
        'header-mod': 'header_mod', 
        'header-audit': 'header_audit', 
        'header-appeal': 'header_appeal', 
        'header-notifs': 'header_notifs',
        'header-settings': 'header_settings'
    };

    for (const [id, key] of Object.entries(idMap)) {
        const el = document.getElementById(id);
        if (el && T[key]) {
            el.innerText = T[key];
        }
    }
    
    // Highlight Active Link
    const path = window.location.pathname;
    if (path.includes('home.html')) document.getElementById('link-home').classList.add('active');
    if (path.includes('user-management.html')) document.getElementById('link-users').classList.add('active');
    if (path.includes('moderation.html')) document.getElementById('link-mod').classList.add('active');
    if (path.includes('audit.html')) document.getElementById('link-audit').classList.add('active');
    if (path.includes('appeal-center.html')) document.getElementById('link-appeal').classList.add('active');
    if (path.includes('notifications.html')) document.getElementById('link-notifs').classList.add('active');
    if (path.includes('settings.html')) document.getElementById('link-settings').classList.add('active');
});

// ===========================================
// 5. THEME & STATUS LOGIC
// ===========================================
const savedTheme = localStorage.getItem('appTheme') || 'light';
const themeBtn = document.getElementById('theme-btn');

function updateThemeIcon(mode) {
    themeBtn.innerHTML = (mode === 'dark') ? ICONS.moon : ICONS.sun;
}

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon('dark');
} else {
    updateThemeIcon('light');
}

window.toggleTheme = function() {
    const isDark = document.body.classList.toggle('dark-mode');
    if (isDark) {
        localStorage.setItem('appTheme', 'dark');
        updateThemeIcon('dark');
    } else {
        localStorage.setItem('appTheme', 'light');
        updateThemeIcon('light');
    }
};

window.toggleStatusMenu = function() {
    document.getElementById('status-menu').classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.status-dropdown');
    const menu = document.getElementById('status-menu');
    if (dropdown && !dropdown.contains(event.target)) {
        menu.classList.remove('active');
    }
});

window.setStatus = function(type, label) {
    document.getElementById('current-text').innerText = label;
    document.getElementById('current-dot').className = `dot dot-${type}`;
    document.getElementById('status-menu').classList.remove('active');
    localStorage.setItem('userStatus', JSON.stringify({ type, label }));
    if (type !== 'online') clearTimeout(idleTimer);
    else resetIdleTimer();
}

const savedStatus = JSON.parse(localStorage.getItem('userStatus'));
if (savedStatus) setStatus(savedStatus.type, savedStatus.label);

let idleTimer;
const IDLE_LIMIT = 5 * 60 * 1000; 

function resetIdleTimer() {
    clearTimeout(idleTimer);
    const currentLabel = document.getElementById('current-text').innerText;
    if (currentLabel === 'Idle' || currentLabel === '空闲') {
        setStatus('online', T.online);
        return; 
    }
    if (currentLabel === 'Online' || currentLabel === '在线') {
        idleTimer = setTimeout(() => {
            setStatus('idle', T.idle);
        }, IDLE_LIMIT);
    }
}

window.onload = resetIdleTimer;
document.onmousemove = resetIdleTimer;
document.onkeypress = resetIdleTimer;
document.onclick = resetIdleTimer;

/* =========================================
   FIX: SIDEBAR ICONS & LAYOUT
   ========================================= */

/* 1. Force all SVGs in the sidebar to be small */
.sidebar svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
    flex-shrink: 0; /* Prevents squishing */
    display: block;
}

/* 2. Specific size for the Brand (Logo) icon */
.brand svg {
    width: 26px;
    height: 26px;
    margin-right: 10px;
}

/* 3. Align the Links (Icon + Text) */
.nav-links a { 
    display: flex !important;   /* Force Flexbox */
    align-items: center;        /* Vertically Center */
    justify-content: flex-start; 
    gap: 12px;                  /* Space between Icon and Text */
    padding: 10px 12px; 
    text-decoration: none; 
    color: var(--text-muted); 
    border-radius: 6px; 
    transition: all 0.2s; 
    font-size: 0.95rem; 
    font-weight: 500;
}

/* 4. Active/Hover States */
.nav-links a:hover, .nav-links a.active { 
    background-color: var(--hover-bg); 
    color: var(--text-header); 
}

/* 5. Notification Badge Positioning */
.sidebar-badge {
    margin-left: auto; /* Pushes badge to the far right */
    background-color: #f85149; 
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 2px 8px;
    border-radius: 10px;
    line-height: 1.2;
}
