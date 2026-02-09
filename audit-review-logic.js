// --- 1. IMAGE VIEWER UTILITY ---
window.ImageViewer = {
    scale: 1, rotate: 0, flip: 1,
    open(src) {
        const viewer = document.getElementById('imageViewer');
        const target = document.getElementById('viewer-img-target');
        if(viewer && target) {
            target.src = src;
            this.reset();
            viewer.style.display = 'flex';
        }
    },
    close() { document.getElementById('imageViewer').style.display = 'none'; },
    reset() { this.scale = 1; this.rotate = 0; this.flip = 1; this.update(); },
    update() {
        const target = document.getElementById('viewer-img-target');
        if(target) target.style.transform = `scale(${this.scale}) rotate(${this.rotate}deg) scaleX(${this.flip})`;
    }
};

// --- 2. AUDIT LOGIC ---
window.AuditApp = {
    timerInterval: null,
    secondsElapsed: 0,
    tasksAudited: 0,
    queueName: '',
    
    errorTypes: [
        { label: "False Positive", desc: "Moderator punished benign content" },
        { label: "False Negative", desc: "Moderator missed a violation" },
        { label: "Wrong Violation Reason", desc: "Punished, but selected wrong tag" },
        { label: "Wrong Scope", desc: "Restricted too much/little text" },
        { label: "Policy Misinterpretation", desc: "Applied policy incorrectly" }
    ],

    init() {
        if(typeof Auth !== 'undefined') Auth.requireLogin();
        
        const urlParams = new URLSearchParams(window.location.search);
        this.queueName = urlParams.get('queue') || 'Audit Queue';
        const tenant = urlParams.get('tenant') || 'Community';

        const titleEl = document.getElementById('queue-title');
        if(titleEl) titleEl.innerText = `${tenant} - ${this.queueName}`;

        this.renderErrorTypes();
        this.loadNextTask();
        this.bindKeys();
    },

    bindKeys() {
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') {
                window.ImageViewer.close();
                this.closeDrawer();
            }
        });
    },

    generateAuditTask() {
        const id = Math.floor(Math.random() * 999999999999).toString();
        const type = this.queueName.toLowerCase();
        
        // --- MODERATION DECISION LOGIC ---
        const decisions = ['Approve', 'Reject'];
        // 50/50 Chance
        const modDecision = decisions[Math.floor(Math.random() * decisions.length)];
        
        let modReason = '';
        
        // If Reject, pick a random reason from Config
        if (modDecision === 'Reject' && typeof Config !== 'undefined' && Config.violations) {
            const categories = Object.keys(Config.violations);
            const randCat = categories[Math.floor(Math.random() * categories.length)];
            const subReasons = Config.violations[randCat];
            const randSub = subReasons[Math.floor(Math.random() * subReasons.length)];
            modReason = `${randCat} - ${randSub}`;
        } else if (modDecision === 'Reject') {
            modReason = "Violence - General"; // Fallback if config missing
        }

        const modNames = ['kenneth.cortes', 'liezl.tejero', 'mark.villanueva', 'jon.odono'];
        const accountTypes = ['Normal User', 'Verified User', 'Influencer', 'New Account'];
        const publishers = ['User_7723', 'GamerPro', 'Anna_Banana', 'Test_Account'];

        let task = { 
            id, type, 
            tenant: "BP/GP/Community",
            publisher: publishers[Math.floor(Math.random() * publishers.length)],
            accountType: accountTypes[Math.floor(Math.random() * accountTypes.length)],
            publishTime: new Date(Date.now() - Math.floor(Math.random() * 100000000)).toLocaleString(),
            
            images: [], text: "",
            
            modDecision,
            modReason, // Store the reason
            modName: modNames[Math.floor(Math.random() * modNames.length)],
            modTime: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toLocaleString(),
            
            userId: "User-" + Math.floor(Math.random() * 10000),
            level: "Lvl " + Math.floor(Math.random() * 50),
            violations: Math.floor(Math.random() * 5),
            taskId: "Task-" + id
        };

        // RULE 1: Video/Image Review (Content + Text)
        if (type.includes('image') || type.includes('video')) {
             task.images.push(`https://picsum.photos/400/300?r=${Math.random()}`);
             task.text = "Check out this content!";
        }
        // RULE 2: Avatar (Content Only)
        else if (type.includes('avatar')) {
             task.images.push(`https://i.pravatar.cc/300?u=${id}`);
             task.text = ""; 
        }
        // RULE 3: Nickname/Profile (Text Only)
        else if (type.includes('nick') || type.includes('profile')) {
             task.images = []; 
             task.text = "Super_Gamer_Profile";
        }

        return task;
    },

    loadNextTask() {
        this.stopTimer();
        document.getElementById('loader').style.display = 'flex';
        document.getElementById('workbench').style.display = 'none';
        
        setTimeout(() => {
            const task = this.generateAuditTask();
            
            // Populate Sidebar info
            document.getElementById('info-tenant').innerText = task.tenant;
            document.getElementById('info-id').innerText = task.id;
            document.getElementById('info-publisher').innerText = task.publisher;
            document.getElementById('info-account').innerText = task.accountType;
            document.getElementById('info-time').innerText = task.publishTime;
            document.getElementById('info-userid').innerText = task.userId;
            document.getElementById('info-level').innerText = task.level;
            document.getElementById('info-violations').innerText = task.violations;
            document.getElementById('info-taskid').innerText = task.taskId;
            document.getElementById('mod-name').innerText = task.modName;
            document.getElementById('mod-time').innerText = task.modTime;

            // --- MODULE VISIBILITY ---
            const imgSection = document.getElementById('image-container').parentElement;
            const txtSection = document.getElementById('text-container').parentElement;
            const imgContainer = document.getElementById('image-container');
            const txtContainer = document.getElementById('text-container');
            
            // 1. Content (Images)
            if (task.images.length > 0) {
                imgSection.style.display = 'block';
                imgContainer.innerHTML = task.images.map(src => 
                    `<img src="${src}" style="height:160px; border-radius:6px; cursor:pointer; border:1px solid #eee;" onclick="window.ImageViewer.open(this.src)">`
                ).join('');
                this.updateInlineStatus('images', task.modDecision, task.modReason);
            } else {
                imgSection.style.display = 'none';
            }

            // 2. Text
            if (task.text && task.text.trim() !== "") {
                txtSection.style.display = 'block';
                txtContainer.innerText = task.text;
                this.updateInlineStatus('text', task.modDecision, task.modReason);
            } else {
                txtSection.style.display = 'none';
            }

            document.getElementById('loader').style.display = 'none';
            document.getElementById('workbench').style.display = 'flex';
            this.startTimer();
        }, 400);
    },

    updateInlineStatus(type, decision, reason) {
        const el = document.getElementById(`mod-val-${type}`);
        const wrap = document.getElementById(`status-display-${type}`);
        if(el && wrap) {
            // Remove old classes
            wrap.classList.remove('mod-approve', 'mod-reject');
            
            if (decision === 'Approve') {
                el.innerText = "Approve";
                wrap.classList.add('mod-approve');
            } else {
                // Show "Reject: Reason"
                el.innerText = `Reject: ${reason}`;
                wrap.classList.add('mod-reject');
            }
        }
    },

    startTimer() {
        this.secondsElapsed = 0;
        const timerEl = document.getElementById('timer');
        this.timerInterval = setInterval(() => {
            this.secondsElapsed++;
            const date = new Date(0);
            date.setSeconds(this.secondsElapsed);
            if(timerEl) timerEl.innerText = date.toISOString().substr(11, 8);
        }, 1000);
    },
    stopTimer() { clearInterval(this.timerInterval); },

    renderErrorTypes() {
        const list = document.getElementById('errorList');
        if(list) {
            list.innerHTML = this.errorTypes.map(e => `
                <div class="violation-category">
                    <div class="category-trigger" onclick="AuditApp.submitAudit('disagree', '${e.label}')">
                        <div>
                            <div style="font-weight:600;">${e.label}</div>
                            <div style="font-size:0.8rem; color:var(--text-muted);">${e.desc}</div>
                        </div>
                        <span>→</span>
                    </div>
                </div>
            `).join('');
        }
    },

    openErrorDrawer() {
        document.getElementById('errorDrawer').classList.add('open');
    },

    closeDrawer() {
        document.getElementById('errorDrawer').classList.remove('open');
    },

    submitAudit(decision, errorType = '') {
        const counter = document.getElementById('session-counter');
        if(counter) counter.innerText = ++this.tasksAudited;
        if (decision === 'disagree') this.closeDrawer();
        this.loadNextTask();
    },

    exit() {
        window.location.href = 'audit-queue.html';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.AuditApp.init();
});
