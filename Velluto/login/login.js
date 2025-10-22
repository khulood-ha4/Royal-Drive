class LoginPage {
    constructor() {
        this.init();
    }

    init() {
        this.createThemeToggle();
        this.initFormHandling();
        this.initInputAnimations();
        this.initPasswordToggle();
        this.initBackgroundEffects();
        this.addFloatingParticles();
    }


    createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.setAttribute('aria-label', 'تبديل وضع الليل');
        document.body.appendChild(themeToggle);

        themeToggle.addEventListener('click', () => this.toggleTheme());
        this.loadTheme();
    }

    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const themeToggle = document.querySelector('.theme-toggle');

        if (currentTheme === 'dark') {
            html.removeAttribute('data-theme');
            themeToggle.innerHTML = '🌙';
            localStorage.setItem('login-theme', 'light');
            this.showNotification('تم التبديل إلى الوضع النهاري ☀️', 'success');
        } else {
            html.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '☀️';
            localStorage.setItem('login-theme', 'dark');
            this.showNotification('تم التبديل إلى الوضع الليلي 🌙', 'success');
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('login-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.querySelector('.theme-toggle').innerHTML = '☀️';
        }
    }


    initFormHandling() {
        const form = document.querySelector('.login-form');
        const submitBtn = form.querySelector('.submit-btn');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleLogin(form, submitBtn);
        });
    }

    async handleLogin(form, submitBtn) {
        const formData = new FormData(form);
        const data = {
            username: formData.get('username'),
            password: formData.get('password'),
            remember: formData.get('remember') === 'on'
        };


        if (!this.validateForm(data)) {
            return;
        }


        this.showLoadingState(submitBtn);

        try {

            await this.simulateLogin(data);
            this.showNotification('🎉 تم تسجيل الدخول بنجاح!', 'success');
            this.redirectToDashboard();
        } catch (error) {
            this.showNotification('❌ اسم المستخدم أو كلمة المرور غير صحيحة', 'error');
            this.shakeForm();
        } finally {
            this.hideLoadingState(submitBtn);
        }
    }

    validateForm(data) {
        if (!data.username.trim()) {
            this.showNotification('⚠️ يرجى إدخال اسم المستخدم', 'error');
            this.highlightInvalidField('login-username');
            return false;
        }

        if (!data.password.trim()) {
            this.showNotification('⚠️ يرجى إدخال كلمة المرور', 'error');
            this.highlightInvalidField('login-password');
            return false;
        }

        if (data.password.length < 6) {
            this.showNotification('⚠️ كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
            this.highlightInvalidField('login-password');
            return false;
        }

        return true;
    }

    highlightInvalidField(fieldId) {
        const field = document.getElementById(fieldId);
        field.style.borderColor = '#FF6B9D';
        field.style.animation = 'shake 0.5s ease-in-out';

        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }

    showLoadingState(button) {
        button.classList.add('loading');
        button.disabled = true;
    }

    hideLoadingState(button) {
        button.classList.remove('loading');
        button.disabled = false;
    }

    async simulateLogin(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                if (Math.random() > 0.2) {
                    resolve(data);
                } else {
                    reject(new Error('فشل في تسجيل الدخول'));
                }
            }, 2000);
        });
    }

    redirectToDashboard() {
        setTimeout(() => {

            window.location.href = 'dashboard.html';
        }, 1500);
    }


    initInputAnimations() {
        const inputs = document.querySelectorAll('.form-input');

        inputs.forEach(input => {

            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });


            input.addEventListener('input', () => {
                this.validateField(input);
            });
        });
    }

    validateField(input) {
        const isValid = input.checkValidity() && input.value.trim() !== '';

        if (isValid) {
            input.style.borderColor = '#85FFB8';
        } else {
            input.style.borderColor = '';
        }
    }


    initPasswordToggle() {
        const toggleBtn = document.querySelector('.toggle-password');
        const passwordInput = document.getElementById('login-password');

        toggleBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';


            const icon = toggleBtn.querySelector('svg path');
            if (isPassword) {
                icon.setAttribute('d', 'M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z');
            } else {
                icon.setAttribute('d', 'M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z');
            }
        });
    }


    initBackgroundEffects() {
        const background = document.querySelector('.background-animation');


        for (let i = 0; i < 15; i++) {
            this.createFloatingBubble(background);
        }
    }

    createFloatingBubble(container) {
        const bubble = document.createElement('div');
        bubble.style.cssText = `
            position: absolute;
            width: ${Math.random() * 40 + 10}px;
            height: ${Math.random() * 40 + 10}px;
            background: ${this.getRandomColor()};
            border-radius: 50%;
            opacity: ${Math.random() * 0.3 + 0.1};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatBubble ${Math.random() * 20 + 10}s linear infinite;
            animation-delay: -${Math.random() * 20}s;
        `;

        container.appendChild(bubble);
    }

    getRandomColor() {
        const colors = [
            'rgba(255, 107, 157, 0.3)',
            'rgba(165, 216, 255, 0.3)',
            'rgba(212, 165, 255, 0.3)',
            'rgba(133, 255, 184, 0.3)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }


    addFloatingParticles() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = this.getRandomColor();
                this.alpha = Math.random() * 0.5 + 0.2;
            }

            getRandomColor() {
                const colors = ['#FF6B9D', '#A5D8FF', '#D4A5FF', '#85FFB8'];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < 30; i++) {
                particles.push(new Particle());
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animateParticles);
        };

        resizeCanvas();
        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }


    shakeForm() {
        const form = document.querySelector('.login-card');
        form.style.animation = 'shake 0.5s ease-in-out';

        setTimeout(() => {
            form.style.animation = '';
        }, 500);
    }


    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const messageEl = notification.querySelector('.notification-message');

        messageEl.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }
}


const style = document.createElement('style');
style.textContent = `
    @keyframes floatBubble {
        0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
        }
        25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
        }
        50% {
            transform: translateY(0px) translateX(20px) rotate(180deg);
        }
        75% {
            transform: translateY(20px) translateX(10px) rotate(270deg);
        }
    }
`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', () => {
    new LoginPage();
});