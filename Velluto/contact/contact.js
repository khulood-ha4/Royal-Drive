document.addEventListener('DOMContentLoaded', function() {
  
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '🌙';
  themeToggle.setAttribute('aria-label', 'تبديل وضع الليل');
  document.body.appendChild(themeToggle);

  
  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
      html.removeAttribute('data-theme');
      themeToggle.innerHTML = '🌙';
      localStorage.setItem('contact-theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '☀️';
      localStorage.setItem('contact-theme', 'dark');
    }
  }

  
  function loadTheme() {
    const savedTheme = localStorage.getItem('contact-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '☀️';
    }
  }

  
  themeToggle.addEventListener('click', toggleTheme);
  loadTheme();

  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);

  
  const animatedElements = document.querySelectorAll('.info-card, .contact-form-section, .department-card, .contact-intro');
  animatedElements.forEach(el => {
    el.classList.add('scroll-animation');
    observer.observe(el);
  });

  
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };

      
      console.log('بيانات النموذج:', formData);
      
      
      showSuccessMessage();
      
      
      contactForm.reset();
    });
  }

  
  function showSuccessMessage() {
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--cute-white);
      padding: 2rem;
      border-radius: 18px;
      box-shadow: var(--cute-shadow-hover);
      text-align: center;
      z-index: 1001;
      border: 2px solid var(--cute-pink);
      animation: bounceIn 0.6s ease-out;
    `;
    
    successMsg.innerHTML = `
      <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
      <h3 style="color: var(--cute-text-dark); margin-bottom: 1rem;">تم إرسال رسالتك بنجاح!</h3>
      <p style="color: var(--cute-text); font-size: 0.9rem;">سنقوم بالرد عليك في أقرب وقت ممكن</p>
      <button onclick="this.parentElement.remove()" style="
        background: var(--cute-pink);
        color: white;
        border: none;
        padding: 0.5rem 1.5rem;
        border-radius: 8px;
        margin-top: 1rem;
        cursor: pointer;
        font-family: 'Tajawal', sans-serif;
      ">حسناً</button>
    `;
    
    document.body.appendChild(successMsg);
  }

 
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
    });
  });
});