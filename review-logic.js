// review-logic.js

class TaskManager {
    constructor() {
        this.tasksCompleted = 0;
        this.currentTask = null;
        this.timerInterval = null;
    }

    generateMockTask(queueName) {
        // ... move your generateTask() logic here ...
        // Use Config.violations if needed
    }

    startTimer() {
        let seconds = 0;
        clearInterval(this.timerInterval);
        document.getElementById('timer').innerText = "00:00:00";
        this.timerInterval = setInterval(() => {
            seconds++;
            const date = new Date(0);
            date.setSeconds(seconds);
            document.getElementById('timer').innerText = date.toISOString().substr(11, 8);
        }, 1000);
    }
    
    stopTimer() { clearInterval(this.timerInterval); }
}

class ImageViewer {
    constructor() {
        this.scale = 1; 
        this.rotate = 0;
    }
    
    open(src) {
        document.getElementById('imageViewer').style.display = 'flex';
        document.getElementById('viewer-img-target').src = src;
        this.reset();
    }
    
    reset() {
        this.scale = 1; this.rotate = 0;
        this.update();
    }

    transform(action) {
        if (action === 'zoomIn') this.scale += 0.2;
        if (action === 'zoomOut') this.scale = Math.max(0.2, this.scale - 0.2);
        if (action === 'rotateR') this.rotate += 90;
        this.update();
    }

    update() {
        document.getElementById('viewer-img-target').style.transform = 
            `scale(${this.scale}) rotate(${this.rotate}deg)`;
    }
}
