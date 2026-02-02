const ImageViewer = {
    scale: 1, rotate: 0, flip: 1,
    open(src) {
        const viewer = document.getElementById('imageViewer');
        document.getElementById('viewer-img-target').src = src;
        this.reset();
        viewer.style.display = 'flex';
    },
    close() { document.getElementById('imageViewer').style.display = 'none'; },
    reset() { this.scale = 1; this.rotate = 0; this.flip = 1; this.update(); },
    transform(action) {
        if (action === 'zoomIn') this.scale += 0.2;
        if (action === 'zoomOut') this.scale = Math.max(0.2, this.scale - 0.2);
        if (action === 'rotateR') this.rotate += 90;
        if (action === 'rotateL') this.rotate -= 90;
        if (action === 'flip') this.flip *= -1;
        this.update();
    },
    update() {
        document.getElementById('viewer-img-target').style.transform = 
            `scale(${this.scale}) rotate(${this.rotate}deg) scaleX(${this.flip})`;
    }
};

const ReviewApp = {
    timerInterval: null,
    secondsElapsed: 0,
    tasksCompleted: 0,
    currentTargetForDrawer: '',
    queueName: '',
    
    init() {
        if(typeof Auth !== 'undefined') {
            const user = Auth.requireLogin();
            if(user) document.getElementById('reviewer-name').innerText = user.name;
        }
        const urlParams = new URLSearchParams(window.location.search);
        this.queueName = urlParams.get('queue') || 'Review';
        const tenant = urlParams.get('tenant') || 'BP';
        document.getElementById('queue-title').innerText = `${tenant} ${this.queueName}`;
        this.renderViolations();
        this.loadNextTask();
    },

    generateTask() {
        const id = Math.floor(Math.random() * 99999);
        const type = this.queueName.toLowerCase();
        let task = { id, type, userId: "720" + Math.floor(Math.random()*1000), images: [], textTop: "", textBottom: "" };

        if (type.includes('dynamic') || type.includes('image') || type.includes('video')) {
            const imgCount = Math.floor(Math.random() * 3) + 1;
            for(let i=0; i<imgCount; i++) task.images.push(`https://picsum.photos/400/300?r=${Math.random()}`);
            task.textTop = "Check out this crazy win! #gaming #win"; 
            task.textBottom = "I can't believe I pulled this off. Follow for more clips."; 
        } else if (type.includes('comment')) {
            task.textTop = "Parent Post: Anyone know how to fix the lag bug?"; 
            task.textBottom = "You are trash, uninstall the game.";
            if (Math.random() > 0.5) task.images.push(`https://picsum.photos/400/300?r=${Math.random()}`);
        } else if (type.includes('nick') || type.includes('profile')) {
            task.textTop = "CoolGamer123"; 
            task.textBottom = "Nazi_Killer_88"; 
        } else if (type.includes('avatar')) {
            task.images.push(`https://i.pravatar.cc/300?u=${id}`);
        }
        return task;
    },

    loadNextTask() {
        this.stopTimer(); 
        document.getElementById('loader').style.display = 'flex';
        document.getElementById('workbench').style.display = 'none';
        this.resetUI();

        setTimeout(() => {
            const task = this.generateTask();
            document.getElementById('content-id').innerText = task.id;
            document.getElementById('content-type').innerText = this.queueName;
            document.getElementById('sidebar-task-id').innerText = `Task-${task.id}`;

            const q = this.queueName.toLowerCase();
            const imgContainer = document.getElementById('image-container');
            const modContent = document.getElementById('module-content');
            
            if (task.images.length > 0) {
                modContent.style.display = 'block'; 
                if (q.includes('avatar')) {
                    imgContainer.innerHTML = `<img src="${task.images[0]}" class="avatar-display" onclick="ImageViewer.open(this.src)">`;
                } else {
                    imgContainer.innerHTML = task.images.map(src => 
                        `<div class="content-image-card"><img src="${src}" onclick="ImageViewer.open(this.src)"></div>`
                    ).join('');
                }
            } else {
                modContent.style.display = 'none'; 
            }

            const modText = document.getElementById('module-text');
            const slotTop = document.getElementById('text-top');
            const slotBottom = document.getElementById('text-bottom');
            const lblTop = document.getElementById('label-top');
            const lblBottom = document.getElementById('label-bottom');

            if (q.includes('avatar')) {
                modText.style.display = 'none'; 
            } else {
                modText.style.display = 'block';
                slotTop.innerText = task.textTop;
                slotBottom.innerText = task.textBottom;
                slotTop.className = "text-context-box";
                slotBottom.className = "text-context-box";

                if (q.includes('comment')) {
                    lblTop.innerText = "Replying To (Context)";
                    slotTop.classList.add("read-only"); 
                    lblBottom.innerText = "Comment to Moderate";
                    slotBottom.classList.add("moderatable"); 
                } else if (q.includes('nick') || q.includes('profile')) {
                    lblTop.innerText = "Previous (Current)";
                    slotTop.classList.add("read-only");
                    lblBottom.innerText = "New Request";
                    slotBottom.classList.add("moderatable");
                } else {
                    lblTop.innerText = "Title";
                    slotTop.classList.add("moderatable"); 
                    lblBottom.innerText = "Content / Caption";
                    slotBottom.classList.add("moderatable"); 
                }
            }
            document.getElementById('loader').style.display = 'none';
            document.getElementById('workbench').style.display = 'flex';
            this.startTimer(); 
        }, 500);
    },

    startTimer() {
        this.secondsElapsed = 0;
        document.getElementById('timer').innerText = "00:00:00";
        this.timerInterval = setInterval(() => {
            this.secondsElapsed++;
            const date = new Date(0);
            date.setSeconds(this.secondsElapsed);
            document.getElementById('timer').innerText = date.toISOString().substr(11, 8);
        }, 1000);
    },
    stopTimer() { clearInterval(this.timerInterval); },

    resetUI() {
        ['content', 'text'].forEach(t => {
            const badge = document.getElementById(`status-${t}`);
            if(badge) badge.style.display = 'none';
            const container = document.getElementById(`module-${t}`);
            if(container) container.querySelectorAll('.btn-sm').forEach(b => b.classList.remove('active'));
        });
        this.clearAllHighlights();
    },

    setStatus(target, status, reason='', preserve=false) {
        const container = document.getElementById(`module-${target}`);
        container.querySelectorAll('.btn-sm').forEach(b => b.classList.remove('active'));
        
        if (!preserve && target === 'text') this.clearAllHighlights();

        if(status === 'approve') container.querySelector('.btn-approve-sm').classList.add('active');
        if(status === 'restrict') container.querySelector('.btn-restrict-sm').classList.add('active');
        if(status === 'reject') container.querySelector('.btn-reject-sm').classList.add('active');

        const badge = document.getElementById(`status-${target}`);
        badge.style.display = 'block';
        if(status === 'approve') { badge.innerText="✅ APPROVED"; badge.className="decision-badge score-perfect"; }
        else if(status === 'restrict') { badge.innerText="⚠️ RESTRICTED"; badge.className="decision-badge score-good"; }
        else { badge.innerText=`⛔ REJECTED: ${reason}`; badge.className="decision-badge score-bad"; }
    },

    clearAllHighlights() {
        document.querySelectorAll('.text-context-box').forEach(box => {
            box.innerHTML = box.innerText;
        });
    },

    // FIX: Optimized robust selection logic
    handleTextSelection(slot) {
        const box = document.getElementById(`text-${slot}`);
        if (!box || !box.classList.contains('moderatable')) return;

        const selection = window.getSelection();
        
        // 1. Guard Clause: If no text selected, do nothing
        if (selection.rangeCount === 0 || selection.isCollapsed) return;

        // 2. Guard Clause: Ensure selection is inside the box
        if (!box.contains(selection.anchorNode) || !box.contains(selection.focusNode)) return;

        // 3. Guard Clause: Ensure meaningful text
        const text = selection.toString();
        if (!text || text.trim().length === 0) return;

        const range = selection.getRangeAt(0);
        
        try {
            const span = document.createElement('span');
            span.className = 'restricted-text';
            span.textContent = text; 

            // 4. Force Delete and Replace
            range.deleteContents();
            range.insertNode(span);
            
            selection.removeAllRanges();
            
            // 5. Activate "Restricted" Button
            this.setStatus('text', 'restrict', '', true);
        } catch (e) { 
            console.error("Highlighting failed", e); 
        }
    },

    renderViolations() {
        if (typeof Config === 'undefined' || !Config.violations) {
            console.error("Config.violations is missing. Check config.js syntax.");
            return;
        }
        const list = document.getElementById('violationList');
        let h = '';
        for(let [c, s] of Object.entries(Config.violations)) {
            h += `<div class="violation-category">
                    <div class="category-trigger" onclick="this.nextElementSibling.classList.toggle('active')">${c} ▼</div>
                    <div class="violation-submenu">
                        ${s.map(sub=>`<div class="violation-option" onclick="ReviewApp.confirmReject('${c}-${sub}')">${sub}</div>`).join('')}
                    </div>
                </div>`;
        }
        list.innerHTML = h;
    },

    openDrawer(t) { 
        this.currentTargetForDrawer = t; 
        document.getElementById('violationDrawer').classList.add('open'); 
    },
    closeDrawer() { document.getElementById('violationDrawer').classList.remove('open'); },
    confirmReject(r) { 
        this.setStatus(this.currentTargetForDrawer, 'reject', r); 
        this.closeDrawer(); 
    },

    validateSubmission() {
        const isVisible = (elem) => !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
        const contentModule = document.getElementById('module-content');
        if (isVisible(contentModule) && !contentModule.querySelector('.btn-sm.active')) {
            alert("⚠️ Missing decision for CONTENT.");
            return false;
        }
        const textModule = document.getElementById('module-text');
        if (isVisible(textModule)) {
            const activeBtn = textModule.querySelector('.btn-sm.active');
            if (!activeBtn) {
                alert("⚠️ Missing decision for TEXT.");
                return false;
            }
            if (activeBtn.textContent.trim() === 'Restrict' && textModule.querySelectorAll('.restricted-text').length === 0) {
                alert("⚠️ For Restriction, please highlight the specific words in the text.");
                return false;
            }
        }
        return true;
    },

    nextTask() {
        if (!this.validateSubmission()) return;
        document.getElementById('session-counter').innerText = ++this.tasksCompleted;
        this.loadNextTask();
    },

    submitAndExit() { 
        if (!this.validateSubmission()) return;
        window.location.href = 'moderation.html'; 
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ReviewApp.init();
});
