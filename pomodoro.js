const SESSION_MINUTES = 1;
const BREAK_MINUTES = 5;

class Pomodoro {
    constructor(root) {
        root.innerHTML = Pomodoro.getHTML();

        this.el = {
            minutes: root.querySelector('.pomodoro-timer-display-minutes'),
            seconds: root.querySelector('.pomodoro-timer-display-seconds'),
            control: root.querySelector('.pomodoro-timer-control-btn')
        };

        this.interval = null;
        this.remainingSeconds = SESSION_MINUTES * 60;

        this.el.control.addEventListener('click', () => {
            if (this.interval === null) {
                this.startSession();
            } else {
                this.stopSession();
            }
        });
    }

    startSession() {
        this.el.control.textContent = 'Stop Session';
        if (this.remainingSeconds === 0) return;

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateTimerDisplay();

            if (this.remainingSeconds === 0) {
                this.stopSession();
            }
        }, 1000);
    }

    stopSession() {
        this.el.control.textContent = 'Start Session';
        clearInterval(this.interval);
        this.interval = null;
        this.remainingSeconds = SESSION_MINUTES * 60;
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const minutes = Math.floor((this.remainingSeconds / 60));
        const seconds = this.remainingSeconds % 60;
        this.el.minutes.textContent = minutes.toString().padStart(2, '0');
        this.el.seconds.textContent = seconds.toString().padStart(2, '0');
    }

    static getHTML() {
        return `
            <div class="pomodoro-timer-display">
                <span class="pomodoro-timer-display-minutes">01</span>
                <span class="pomodoro-timer-display-delim">:</span>
                <span class="pomodoro-timer-display-seconds">00</span>
            </div> 
            <div class="pomodoro-timer-control">
                <button type="button" class="pomodoro-timer-control-btn">Start Session</button>
            </div>
        `
    }
}

new Pomodoro(
    document.querySelector('.pomodoro-timer')
);