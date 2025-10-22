class ServicesPage {
    constructor() {
        this.init();
    }

    init() {
        this.createThemeToggle();
        this.initScrollAnimations();
        this.initServiceCards();
        this.addSmoothAnimations();
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
            localStorage.setItem('services-theme', 'light');
        } else {
            html.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '☀️';
            localStorage.setItem('services-theme', 'dark');
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('services-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.querySelector('.theme-toggle').innerHTML = '☀️';
        }
    }

    
    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    
                    if (entry.target.classList.contains('service-card')) {
                        const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        
        const elementsToAnimate = document.querySelectorAll('.service-card, .features, .services-intro');
        elementsToAnimate.forEach(el => {
            el.classList.add('scroll-reveal');
            observer.observe(el);
        });
    }

   
    initServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            
            card.addEventListener('mouseenter', () => {
                this.animateCard(card, index);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetCard(card);
            });
            
            
            card.addEventListener('click', () => {
                this.pulseCard(card);
            });
        });
    }

    animateCard(card, index) {
        const colors = [
            'rgba(255, 107, 157, 0.1)',
            'rgba(165, 216, 255, 0.1)',
            'rgba(212, 165, 255, 0.1)',
            'rgba(133, 255, 184, 0.1)'
        ];
        
        card.style.background = `linear-gradient(135deg, ${colors[index]}, var(--bg-secondary))`;
    }

    resetCard(card) {
        card.style.background = 'var(--bg-secondary)';
    }

    pulseCard(card) {
        card.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            card.style.animation = '';
        }, 600);
    }

   
    addSmoothAnimations() {
       
        const headings = document.querySelectorAll('h1, h2, h3, h4');
        headings.forEach(heading => {
            heading.style.transition = 'all 0.3s ease';
        });

        
        const icons = document.querySelectorAll('.service-icon');
        icons.forEach(icon => {
            icon.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    }
}


const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', () => {
    new ServicesPage();
});