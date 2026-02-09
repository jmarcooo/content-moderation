// --- 1. IMAGE VIEWER UTILITY (Copied for independence) ---
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
    
    // Config for Error Types
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
        const tenant = urlParams.get('tenant') || 'BP';

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
            // 1 for Agree, 2 for Disagree
            if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                if(e.key === '1') this.submitAudit('agree');
                if(e.key === '2') this.openErrorDrawer();
            }
        });
    },

    // Mock Task Generator with Moderator Decision
    generateAuditTask() {
        const id = Math.floor(Math.random() * 99999);
        const type = this.queueName.toLowerCase();
        
        // Randomly simulate previous decision
        const decisions = ['Approve', 'Reject'];
        const modDecision = decisions[Math.floor(Math.random() * decisions.length)];
        let modReason = '';
        if(modDecision === 'Reject') {
            const reasons = ['Violence', 'Harassment', 'Spam', 'Nudity'];
            modReason = reasons[Math.floor(Math.random() * reasons.length)];
        }

        const modNames = ['kenneth.cortes', 'liezl.tejero', 'mark.villanueva'];

        let task = { 
            id, type, 
            images: [], textTop: "", textBottom: "",
            modDecision, modReason,
            modName: modNames[Math.floor(Math.random() * modNames.length)],
            modTime: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toLocaleString()
        };

        // Reuse Content Generation Logic
        if (type.includes('image') || type.includes('video')) {
            const imgCount = 1;
            for(let i=0; i<imgCount; i++) task.images.push(`https://picsum.photos/400/300?r=${Math.random()}`);
            task.textTop = "Audit this post"; 
            task.textBottom = "Is this compliant?"; 
        } else if (type.includes('comment')) {
            task.textTop = "Parent Post Context..."; 
            task.textBottom = "User comment text that was moderated.";
        } else {
             task.textTop = "User Profile"; 
             task.textBottom = "Bio or Nickname";
        }
        return task;
    },

    loadNextTask() {
        this.stopTimer();
        document.getElementById('loader').style.display = 'flex';
        document.getElementById('workbench').style.display = 'none';
        
        setTimeout(() => {
            const task = this.generateAuditTask();
            
            // Render Info
            document.getElementById('content-id').innerText = task.id;
            document.getElementById('content-type').innerText = this.queueName;
            document.getElementById('queue-name').innerText = this.queueName;
            
            // Render Moderator Decision
            const card = document.getElementById('mod-decision-card');
            const val = document.getElementById('mod-decision-val');
            const reason = document.getElementById('mod-decision-reason');
            
            val.innerText = task.modDecision.toUpperCase();
            if(task.modDecision === 'Approve') {
                val.style.color = '#238636';
                card.classList.remove('decision-reject');
                card.classList.add('decision-approve');
                reason.innerText = "Clean content";
            } else {
                val.style.color = '#da3633';
                card.classList.remove('decision-approve');
                card.classList.add('decision-reject');
                reason.innerText = `Reason: ${task.modReason}`;
            }

            document.getElementById('mod-name').innerText = task.modName;
            document.getElementById('mod-time').innerText = task.modTime;

            // Render Content
            const imgContainer = document.getElementById('image-container');
            if (task.images.length > 0) {
                document.getElementById('module-content').style.display = 'block';
                imgContainer.innerHTML = task.images.map(src => 
                    `<div class="content-image-card"><img src="${src}" onclick="window.ImageViewer.open(this.src)"></div>`
                ).join('');
            } else {
                document.getElementById('module-content').style.display = 'none';
            }

            document.getElementById('text-top').innerText = task.textTop;
            document.getElementById('text-bottom').innerText = task.textBottom;

            document.getElementById('loader').style.display = 'none';
            document.getElementById('workbench').style.display = 'flex';
            this.startTimer();
        }, 600);
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
        // Logic to save audit result would go here
        const counter = document.getElementById('session-counter');
        if(counter) counter.innerText = ++this.tasksAudited;

        if (decision === 'disagree') {
            // alert(`Marked as Error: ${errorType}`);
            this.closeDrawer();
        } else {
            // alert(`Marked as Correct`);
        }
        
        this.loadNextTask();
    },

    exit() {
        window.location.href = 'audit-queue.html';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.AuditApp.init();
});
