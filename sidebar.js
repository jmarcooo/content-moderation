const sidebarContent = `
<nav class="sidebar">
    <div class="brand">AdminPanel</div>
    <ul class="nav-links">
        <li><a href="home.html" id="link-home">Overview</a></li>
        <li><a href="user-management.html" id="link-users">User Management</a></li>
        <li><a href="moderation.html" id="link-mod">Moderation</a></li>
        <li><a href="quality-assurance.html" id="link-audit">Quality Assurance</a></li>
    </ul>
    <div class="user-profile">
        <div class="profile-name">Admin</div>
        <a href="javascript:Auth.logout()" class="logout-link">Logout</a>
    </div>
</nav>
`;

document.body.insertAdjacentHTML('afterbegin', sidebarContent);
