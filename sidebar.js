// ===========================================
// 1. TRANSLATION DICTIONARY & SETUP
// ===========================================
const APP_LANG = localStorage.getItem('appLang') || 'en';

const TRANSLATIONS = {
    en: {
        brand: "🛡️ AdminPanel",
        overview: "📊 Overview",
        users: "👥 User Management",
        mod: "🚫 Moderation Queue",
        audit: "🔍 Quality Audit",
        appeal: "⚖️ Appeal Center",
        settings: "⚙️ Settings",
        logout: "🚪 Logout",
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
        header_settings: "Settings",
        // Buttons
        btnAddUser: "+ Add User",
        // Stats
        stat_users: "Total Users",
        stat_flagged: "Flagged Comments",
        stat_pending: "Pending Reviews"
    },
    zh: {
        brand: "🛡️ 管理后台",
        overview: "📊 总览",
        users: "👥 用户管理",
        mod: "🚫 审核队列",
        audit: "🔍 质量质检",
        appeal: "⚖️ 申诉中心",
        settings: "⚙️ 设置",
        logout: "🚪 退出登录",
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
// 2. SIDEBAR HTML GENERATION
// ===========================================
const sidebarContent = `
<nav class="sidebar">
    <div class="brand">${T.brand}</div>
    <ul class="nav-links">
        <li><a href="home.html" id="link-home">${T.overview}</a></li>
        <li><a href="user-management.html" id="link-users">${T.users}</a></li>
        <li><a href="moderation.html" id="link-mod">${T.mod}</a></li>
        
        <li><a href="audit.html" id="link-audit">${T.audit}</a></li>
        <li><a href="appeal-center.html" id="link-appeal">${T.appeal}</a></li>
        
        <li><a href="settings.html">${T.settings}</a></li>
        <li><a href="login.html" style="margin-top:20px; color:#f85149;">${T.logout}</a></li>
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

        <button onclick="toggleTheme()" class="theme-btn" title="Toggle Theme">
            <span id="theme-icon">☀️</span>
        </button>
    </div>
</nav>
`;

// Inject Sidebar
document.body.insertAdjacentHTML('afterbegin', sidebarContent);

// ===========================================
// 3. AUTO-TRANSLATE PAGE CONTENT
// ===========================================
document.addEventListener("DOMContentLoaded", () => {
    // This simple map connects HTML IDs to our Translation Dictionary
    const idMap = {
        'welcome-msg': 'welcome', // Home
        'stat-users-title': 'stat_users',
        'stat-flagged-title': 'stat_flagged',
        'stat-pending-title': 'stat_pending',
        
        'header-users': 'header_users', // User Mgmt
        'btn-add-user': 'btnAddUser',

        'header-mod': 'header_mod', // Moderation
        'header-audit': 'header_audit', // Audit
        'header-appeal': 'header_appeal', // Appeal
        'header-settings': 'header_settings' // Settings
    };

    // Loop through map and replace text if element exists
    for (const [id, key] of Object.entries(idMap)) {
        const el = document.getElementById(id);
        if (el && T[key]) {
            el.innerText = T[key];
        }
    }
    
    // Also highlight active link (Existing logic)
    const path = window.location.pathname;
    if (path.includes('home.html')) document.getElementById('link-home').classList.add('active');
    if (path.includes('user-management.html')) document.getElementById('link-users').classList.add('active');
    if (path.includes('moderation.html')) document.getElementById('link-mod').classList.add('active');
    if (path.includes('audit.html')) document.getElementById('link-audit').classList.add('active');
    if (path.includes('appeal-center.html')) document.getElementById('link-appeal').classList.add('active');
});


// ===========================================
// 4. THEME & STATUS LOGIC (Preserved)
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

window.toggleStatusMenu = function() {
    document.getElementById('status-menu').classList.toggle('active');
}

// Auto-Close Menu
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

// Auto-Idle Logic
let idleTimer;
const IDLE_LIMIT = 5 * 60 * 1000; 

function resetIdleTimer() {
    clearTimeout(idleTimer);
    const currentLabel = document.getElementById('current-text').innerText;
    if (currentLabel === 'Idle' || currentLabel === '空闲') { // Updated to check translated text
        setStatus('online', T.online);
        return; 
    }
    // Only set idle if currently "Online" (English or Chinese)
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
