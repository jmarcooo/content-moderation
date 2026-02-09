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

// --- 2. LABELLING LOGIC ---
window.LabelApp = {
    timerInterval: null,
    secondsElapsed: 0,
    tasksLabelled: 0,
    selectedLabels: new Set(),

    init() {
        if(typeof Auth !== 'undefined') Auth.requireLogin();
        this.loadNextTask();
        this.startTimer();
        this.bindKeys();
    },

    bindKeys() {
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') window.ImageViewer.close();
            
            // Bind number keys 1-4 to toggle labels
            if (['1','2','3','4'].includes(e.key)) {
                const buttons = document.querySelectorAll('.btn-label');
                const idx = parseInt(e.key) - 1;
                if(buttons[idx]) buttons[idx].click();
            }
            // Enter to submit
            if (e.key === 'Enter') this.submitLabels();
        });
    },

    generateTask() {
        const id = Math.floor(Math.random() * 999999999999).toString();
        const publishers = ['Creative_Studio', 'InnoLab', 'GamerPro', 'Tech_Insider', 'Artistic_Soul'];
        
        let task = { 
            id, 
            source: "Organic Feed",
            publisher: publishers[Math.floor(Math.random() * publishers.length)],
            followers: Math.floor(Math.random() * 500000).toLocaleString(),
            publishTime: new Date().toLocaleString(),
            images: [], 
            text: ""
        };

        const imgCount = Math.floor(Math.random() * 3) + 1;
        for(let i=0; i<imgCount; i++) {
            task.images.push(`https://picsum.photos/400/300?r=${Math.random()}`);
        }

        const captions = [
            "Pushing the boundaries of what's possible with this new design! #innovation",
            "A healthy mind starts with a healthy routine. Keep moving forward! 💪",
            "Check out this collaborative project between art and science departments.",
            "Just a beautiful sunset to end the day on a high note.",
            "Exploring the intersection of technology and biology in our latest study."
        ];
        task.text = captions[Math.floor(Math.random() * captions.length)];

        return task;
    },

    loadNextTask() {
        document.getElementById('loader').style.display = 'flex';
        document.getElementById('workbench').style.display = 'none';
        
        // Reset selections
        this.selectedLabels.clear();
        // Remove 'selected' class from all buttons
        document.querySelectorAll('.btn-label').forEach(btn => btn.classList.remove('selected'));
        this.updateCounter();

        setTimeout(() => {
            const task = this.generateTask();
            
            document.getElementById('info-id').innerText = task.id;
            document.getElementById('info-source').innerText = task.source;
            document.getElementById('info-time').innerText = task.publishTime;
            document.getElementById('info-user').innerText = task.publisher;
            document.getElementById('info-followers').innerText = task.followers;

            const imgContainer = document.getElementById('image-container');
            const txtContainer = document.getElementById('text-container');
            
            const squareStyle = 'width: 180px; height: 180px; object-fit: cover; border-radius: 8px; border: 1px solid #eee; cursor: pointer;';
            imgContainer.innerHTML = task.images.map(src => 
                `<img src="${src}" style="${squareStyle}" onclick="window.ImageViewer.open(this.src)">`
            ).join('');

            txtContainer.innerText = task.text;

            document.getElementById('loader').style.display = 'none';
            document.getElementById('workbench').style.display = 'flex';
        }, 400);
    },

    toggleLabel(btn, labelKey) {
        // --- SINGLE SELECTION LOGIC ---
        
        // 1. If clicking the currently selected label, deselect it.
        if(this.selectedLabels.has(labelKey)) {
            this.selectedLabels.clear();
            btn.classList.remove('selected');
        } 
        // 2. Otherwise, clear everything else and select this one.
        else {
            this.selectedLabels.clear();
            // Visually deselect all buttons
            document.querySelectorAll('.btn-label').forEach(b => b.classList.remove('selected'));
            
            // Select the new one
            this.selectedLabels.add(labelKey);
            btn.classList.add('selected');
        }
        
        this.updateCounter();
    },

    updateCounter() {
        document.getElementById('selected-count').innerText = this.selectedLabels.size;
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

    submitLabels() {
        // --- VALIDATION: Prevent submit if empty ---
        if(this.selectedLabels.size === 0) {
            alert("⚠️ Please select a label before submitting.");
            return;
        }
        
        const counter = document.getElementById('session-counter');
        if(counter) counter.innerText = ++this.tasksLabelled;
        
        // Log for verification
        console.log("Submitted Label:", Array.from(this.selectedLabels)[0]);
        
        this.loadNextTask();
    },

    skipTask() {
        this.loadNextTask();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.LabelApp.init();
});
