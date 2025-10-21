const carsData = [
    { name: 'Lamborghini Aventador', engine: 'V12', price: 450000 },
    { name: 'Ferrari SF90', engine: 'V8', price: 520000 },
    { name: 'Rolls Royce Phantom', engine: 'V12', price: 550000 },
    { name: 'BMW M8', engine: 'V8', price: 133000 },
    { name: 'Mercedes AMG GT', engine: 'V8', price: 115000 },
    { name: 'Audi R8', engine: 'V10', price: 142000 },
    { name: 'Porsche 911', engine: 'Turbo', price: 99000 },
    { name: 'McLaren 720S', engine: 'V8', price: 299000 },
    { name: 'Aston Martin DB11', engine: 'V8', price: 205000 },
    { name: 'Maserati GranTurismo', engine: 'V8', price: 150000 },
    { name: 'Jaguar F-Type', engine: 'V8', price: 105000 },
    { name: 'Lexus LC500', engine: 'V8', price: 100000 },
    { name: 'Infiniti Q60', engine: 'V6', price: 55000 },
    { name: 'Tesla Model S Plaid', engine: 'Electric', price: 135000 },
    { name: 'Bugatti Chiron', engine: 'W16', price: 3000000 },
    { name: 'Lancia Delta', engine: 'Turbo', price: 35000 },
    { name: 'Koenigsegg Jesko', engine: 'V8', price: 3000000 },
    { name: 'Bentley Continental GT', engine: 'W12', price: 220000 },
    { name: 'Cadillac CT5-V Blackwing', engine: 'V8', price: 85000 },
    { name: 'Ford GT', engine: 'V6', price: 500000 },
    { name: 'Chevrolet Corvette C8', engine: 'V8', price: 65000 },
    { name: 'Lotus Evora', engine: 'V6', price: 100000 }
];


function filterCars() {
    console.log('=== بدء البحث ===');
    
    const searchInput = document.getElementById('searchInput');
    const mainSearchInput = document.getElementById('mainSearchInput');
    const engineFilter = document.getElementById('engineFilter');
    const priceFilter = document.getElementById('priceFilter');
    const carCards = document.querySelectorAll('.car-card');
    const noResults = document.getElementById('noResults');

   
    const searchText = (mainSearchInput?.value || searchInput?.value || '').toLowerCase().trim();
    const engineValue = engineFilter?.value || '';
    const priceValue = priceFilter?.value || '';

    console.log('🔍 نص البحث:', searchText);
    console.log('⚙️ نوع المحرك:', engineValue);
    console.log('💰 نطاق السعر:', priceValue);

    let visibleCarsCount = 0;

    carCards.forEach((card, index) => {
        const carNameElement = card.querySelector('h3');
        if (!carNameElement) {
            card.style.display = 'none';
            return;
        }

        const carName = carNameElement.textContent.toLowerCase().trim();
        const carData = carsData.find(c => c.name.toLowerCase().trim() === carName);

        if (!carData) {
            card.style.display = 'none';
            return;
        }

        let show = true;

        
        if (searchText && !carName.includes(searchText)) {
            show = false;
        }

        
        if (show && engineValue && carData.engine !== engineValue) {
            show = false;
        }

        
        if (show && priceValue) {
            const priceRange = priceValue.split('-');
            const minPrice = parseInt(priceRange[0]);
            const maxPrice = priceRange[1] ? parseInt(priceRange[1]) : null;

            if (maxPrice) {
                if (carData.price < minPrice || carData.price > maxPrice) {
                    show = false;
                }
            } else {
                if (carData.price < minPrice) {
                    show = false;
                }
            }
        }

        if (show) {
            card.style.display = 'block';
            card.classList.add('highlight');
            card.classList.remove('dim');
            visibleCarsCount++;
        } else {
            card.style.display = 'none';
            card.classList.remove('highlight', 'dim');
        }
    });

    
    if (noResults) {
        if (visibleCarsCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }
}


function setupPurchaseSystem() {
    console.log('🔧 إعداد نظام الشراء...');
    
    
    const buyButtons = document.querySelectorAll('.buy-btn');
    console.log('🛒 عدد أزرار الشراء:', buyButtons.length);
    
    buyButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🛒 تم النقر على زر الشراء رقم:', index + 1);
            
            const carCard = this.closest('.car-card');
            if (!carCard) {
                console.error('❌ لم يتم العثور على كارد السيارة');
                return;
            }
            
            const carName = carCard.querySelector('h3')?.textContent;
            const carPrice = carCard.querySelector('.price')?.textContent;
            
            if (!carName || !carPrice) {
                console.error('❌ لم يتم العثور على بيانات السيارة');
                return;
            }
            
            console.log('🚗 سيارة مختارة:', carName);
            console.log('💰 السعر:', carPrice);
            
            showPurchasePopup(carName, carPrice);
        });
    });

    
    const confirmBtn = document.getElementById('confirm-purchase');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function(e) {
            e.preventDefault();
            confirmPurchase();
        });
    }

   
    const closeBtn = document.querySelector('.popup .close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAllPopups);
    }

    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('popup')) {
            closeAllPopups();
        }
    });

    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllPopups();
        }
    });
}


function showPurchasePopup(carName, carPrice) {
    console.log('📦 فتح نافذة الشراء...');
    
    const popup = document.getElementById('purchase-popup');
    if (!popup) {
        console.error('❌ لم يتم العثور على نافذة الشراء');
        return;
    }

    
    const carNameElement = document.getElementById('popup-car-name');
    const carPriceElement = document.getElementById('popup-car-price');
    
    if (carNameElement) carNameElement.textContent = carName;
    if (carPriceElement) carPriceElement.textContent = `السعر: ${carPrice}`;
    
    
    resetPurchaseForm();
    
   
    popup.style.display = 'flex';
    setTimeout(() => {
        popup.style.opacity = '1';
    }, 10);
    
    console.log('✅ تم عرض نافذة الشراء');
}


function confirmPurchase() {
    console.log('✅ بدء عملية الشراء...');
    
    const name = document.getElementById('customer-name');
    const email = document.getElementById('customer-email');
    const phone = document.getElementById('customer-phone');
    const confirmBtn = document.getElementById('confirm-purchase');

    if (!name || !email || !phone || !confirmBtn) {
        alert('❌ حدث خطأ في النظام');
        return;
    }

    
    if (!name.value.trim() || !email.value.trim() || !phone.value.trim()) {
        alert('⚠️ يرجى ملء جميع الحقول المطلوبة');
        return;
    }

    
    if (!validateEmail(email.value)) {
        alert('📧 يرجى إدخال بريد إلكتروني صحيح');
        return;
    }

    
    if (!validatePhone(phone.value)) {
        alert('📞 يرجى إدخال رقم هاتف صحيح');
        return;
    }

    
    confirmBtn.innerHTML = '⏳ جاري المعالجة...';
    confirmBtn.disabled = true;

    setTimeout(() => {
        const carName = document.getElementById('popup-car-name').textContent;
        
        confirmBtn.innerHTML = '✅ تم الشراء بنجاح!';
        confirmBtn.style.background = 'var(--success-color)';
        
        alert(`🎉 تم تأكيد طلبك بنجاح!\n\nالسيارة: ${carName}\nالاسم: ${name.value}\nالهاتف: ${phone.value}\n\nسنقوم بالاتصال بك خلال 24 ساعة.`);

        setTimeout(() => {
            closeAllPopups();
            resetPurchaseForm();
        }, 2000);
        
    }, 2000);
}


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


function validatePhone(phone) {
    const re = /^[\+]?[0-9]{10,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}


function closeAllPopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    });
}


function resetPurchaseForm() {
    const name = document.getElementById('customer-name');
    const email = document.getElementById('customer-email');
    const phone = document.getElementById('customer-phone');
    const confirmBtn = document.getElementById('confirm-purchase');

    if (name) name.value = '';
    if (email) email.value = '';
    if (phone) phone.value = '';
    
    if (confirmBtn) {
        confirmBtn.innerHTML = '✅ تأكيد الشراء';
        confirmBtn.style.background = '';
        confirmBtn.disabled = false;
    }
}


function setupEventListeners() {
    console.log('🔧 إعداد الأحداث...');
    
    
    const searchInput = document.getElementById('searchInput');
    const mainSearchInput = document.getElementById('mainSearchInput');
    const engineFilter = document.getElementById('engineFilter');
    const priceFilter = document.getElementById('priceFilter');
    const clearSearchBtn = document.getElementById('clearSearch');
    const showAllCarsBtn = document.getElementById('showAllCars');

    if (searchInput) {
        searchInput.addEventListener('input', filterCars);
        console.log('✅ تم إعداد البحث العادي');
    }

    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', filterCars);
        console.log('✅ تم إعداد البحث الرئيسي');
    }

    if (engineFilter) {
        engineFilter.addEventListener('change', filterCars);
        console.log('✅ تم إعداد فلترة المحرك');
    }

    if (priceFilter) {
        priceFilter.addEventListener('change', filterCars);
        console.log('✅ تم إعداد فلترة السعر');
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            if (searchInput) searchInput.value = '';
            if (mainSearchInput) mainSearchInput.value = '';
            if (engineFilter) engineFilter.value = '';
            if (priceFilter) priceFilter.value = '';
            filterCars();
        });
    }

    if (showAllCarsBtn) {
        showAllCarsBtn.addEventListener('click', function() {
            if (searchInput) searchInput.value = '';
            if (mainSearchInput) mainSearchInput.value = '';
            if (engineFilter) engineFilter.value = '';
            if (priceFilter) priceFilter.value = '';
            filterCars();
        });
    }
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('🚗 بدء تحميل الصفحة...');
    
   
    setupEventListeners();
    
   
    setupPurchaseSystem();
    
    
    setTimeout(filterCars, 100);
    
    console.log('🎉 الصفحة جاهزة!');
    
   
    console.log('🔍 للاختبار: testPurchaseSystem()');
});


window.testPurchaseSystem = function() {
    console.log('🧪 اختبار نظام الشراء...');
    console.log('أزرار الشراء:', document.querySelectorAll('.buy-btn').length);
    console.log('نافذة الشراء:', document.getElementById('purchase-popup'));
    console.log('زر التأكيد:', document.getElementById('confirm-purchase'));
    
   
    showPurchasePopup('سيارة تجريبية', '100,000$');
};

window.debugSearch = function() {
    console.log('🔍 تصحيح البحث:');
    console.log('قيمة البحث:', document.getElementById('searchInput')?.value);
    console.log('عدد الكروت:', document.querySelectorAll('.car-card').length);
    filterCars();
};


function setupGlowEffects() {
    console.log('✨ إعداد تأثيرات التوهج...');
    
    
    const glowOverlay = document.createElement('div');
    glowOverlay.className = 'scroll-glow';
    document.body.appendChild(glowOverlay);
    
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        glowOverlay.style.setProperty('--x', x + 'px');
        glowOverlay.style.setProperty('--y', y + 'px');
    });
    
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        glowOverlay.classList.add('active');
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            glowOverlay.classList.remove('active');
        }, 1000);
    });
    
    
    setInterval(() => {
        const elements = document.querySelectorAll('.car-card, .btn-explore, .price');
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        
        if (randomElement) {
            randomElement.style.animation = 'none';
            setTimeout(() => {
                randomElement.style.animation = '';
            }, 10);
        }
    }, 3000);
    
    
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 1000);
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('🚗 بدء تحميل الصفحة...');
    
    
    setupEventListeners();
    setupPurchaseSystem();
    setupGlowEffects(); 
    
    
    setTimeout(filterCars, 100);
    
    console.log('🎉 الصفحة جاهزة مع التوهج!');
});


function setupDarkMode() {
    console.log('🌙 إعداد نظام الوضع الليلي...');
    
    
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.title = 'تبديل الوضع الليلي';
    document.body.appendChild(themeToggle);
    
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '☀️';
        themeToggle.title = 'تبديل الوضع النهاري';
    }
    
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            this.innerHTML = '☀️';
            this.title = 'تبديل الوضع النهاري';
            localStorage.setItem('theme', 'dark');
            showNotification('تم تفعيل الوضع الليلي', 'success');
        } else {
            this.innerHTML = '🌙';
            this.title = 'تبديل الوضع الليلي';
            localStorage.setItem('theme', 'light');
            showNotification('تم تفعيل الوضع النهاري', 'success');
        }
    });
    
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'd' || e.key === 'D') {
            themeToggle.click();
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('🚗 بدء تحميل الصفحة...');
    
    
    setupEventListeners();
    setupPurchaseSystem();
    setupDarkMode(); 
    
    
    setTimeout(filterCars, 100);
    
    console.log('🎉 الصفحة جاهزة مع الوضع الليلي!');
});

document.addEventListener('DOMContentLoaded', function() {
    
    const keywordTags = document.querySelectorAll('.keyword-tag');
    const searchInput = document.querySelector('.search-input');
    
    keywordTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const keyword = this.getAttribute('data-keyword');
            
          
            if (searchInput) {
                searchInput.value = keyword;
                searchInput.focus();
                
                
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                
                triggerSearch(keyword);
            }
        });
    });
    
    
    function triggerSearch(keyword) {
        
        console.log('البحث عن:', keyword);
        
        
        showSearchNotification(`جاري البحث عن: ${keyword}`);
    }
    
    
    function showSearchNotification(message) {
        
        const oldNotification = document.querySelector('.search-notification');
        if (oldNotification) {
            oldNotification.remove();
        }
        
        
        const notification = document.createElement('div');
        notification.className = 'search-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="close-notification">&times;</button>
            </div>
        `;
        
       
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--gradient-primary);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            box-shadow: var(--shadow-medium);
            z-index: 10000;
            animation: slideDown 0.3s ease;
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 1rem;
            font-family: 'Cairo', sans-serif;
        `;
        
        notification.querySelector('.close-notification').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        
        document.body.appendChild(notification);
        
        ر
        notification.querySelector('.close-notification').addEventListener('click', function() {
            notification.remove();
        });
        
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
   
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});
function scrollToTop() {
    
    const carBtn = document.querySelector('.car-top-btn');
    carBtn.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        carBtn.style.transform = '';
    }, 200);
    
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


window.addEventListener('scroll', function() {
    const carBtn = document.querySelector('.car-scroll-top');
    const scrolled = window.pageYOffset;
    const viewportHeight = window.innerHeight;
    
    if (carBtn) {
        
        if (scrolled > viewportHeight * 0.3) {
            carBtn.classList.add('show');
        } else {
            carBtn.classList.remove('show');
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const carBtn = document.querySelector('.car-scroll-top');
    if (carBtn) {
        
        setTimeout(() => {
            if (window.pageYOffset > window.innerHeight * 0.3) {
                carBtn.classList.add('show');
            }
        }, 1000);
    }
});

function setupPremium404() {
    console.log('🎨 إعداد نظام 404 المتطور...');
    
    setTimeout(() => {
        const noResults = document.getElementById('noResults');
        if (!noResults) return;
        
        noResults.innerHTML = `
            <div class="car-error-404">
                <div class="error-number-container">
                    <div class="error-digit">4</div>
                    <div class="car-error-icon">🚫</div>
                    <div class="error-digit">4</div>
                </div>
                
                <div class="error-message-container">
                    <h1 class="error-title">عذراً، السيارة غير موجودة!</h1>
                    <p class="error-subtitle" id="premiumSearchedCar">لم نتمكن من العثور على السيارة في معرضنا.</p>
                </div>

                <div class="suggestions-container">
                    <h3 class="suggestions-title">
                        <span>🚗 ربما تبحث عن:</span>
                    </h3>
                    <div class="suggestions-grid">
                        <div class="suggestion-card" onclick="premiumSearch('lamborghini')">
                            <span class="suggestion-icon">🐂</span>
                            <span class="suggestion-name">لامبورغيني</span>
                        </div>
                        <div class="suggestion-card" onclick="premiumSearch('ferrari')">
                            <span class="suggestion-icon">🐎</span>
                            <span class="suggestion-name">فيراري</span>
                        </div>
                        <div class="suggestion-card" onclick="premiumSearch('bmw')">
                            <span class="suggestion-icon">🌀</span>
                            <span class="suggestion-name">بي إم دبليو</span>
                        </div>
                        <div class="suggestion-card" onclick="premiumSearch('mercedes')">
                            <span class="suggestion-icon">⭐</span>
                            <span class="suggestion-name">مرسيدس</span>
                        </div>
                        <div class="suggestion-card" onclick="premiumSearch('porsche')">
                            <span class="suggestion-icon">🏁</span>
                            <span class="suggestion-name">بورش</span>
                        </div>
                        <div class="suggestion-card" onclick="premiumSearch('audi')">
                            <span class="suggestion-icon">🔶</span>
                            <span class="suggestion-name">أودي</span>
                        </div>
                    </div>
                </div>

                <div class="action-buttons-container">
                    <button class="action-btn btn-primary" onclick="premiumShowAll()">
                        <span>📋 عرض كل السيارات</span>
                    </button>
                    <button class="action-btn btn-secondary" onclick="window.location.href='contact/contact.html'">
                        <span>📞 طلب سيارة خاصة</span>
                    </button>
                </div>
            </div>
        `;
        
        console.log('✅ تم إعداد نظام 404 المتطور');
    }, 1000);
}


function premiumSearch(brand) {
    
    event.currentTarget.style.transform = 'scale(0.95)';
    setTimeout(() => {
        event.currentTarget.style.transform = '';
    }, 200);
    
    const searchInput = document.getElementById('searchInput');
    const mainSearchInput = document.getElementById('mainSearchInput');
    
    if (searchInput) {
        searchInput.value = brand;
        searchInput.focus();
        searchInput.dispatchEvent(new Event('input'));
    }
    
    if (mainSearchInput) {
        mainSearchInput.value = brand;
        mainSearchInput.focus();
        mainSearchInput.dispatchEvent(new Event('input'));
    }
    
    
    setTimeout(() => {
        document.getElementById('cars-gallery').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }, 500);
}

function premiumShowAll() {
   
    event.currentTarget.style.transform = 'scale(0.95)';
    setTimeout(() => {
        event.currentTarget.style.transform = '';
    }, 200);
    
    const searchInput = document.getElementById('searchInput');
    const mainSearchInput = document.getElementById('mainSearchInput');
    const engineFilter = document.getElementById('engineFilter');
    const priceFilter = document.getElementById('priceFilter');
    
    if (searchInput) searchInput.value = '';
    if (mainSearchInput) mainSearchInput.value = '';
    if (engineFilter) engineFilter.value = '';
    if (priceFilter) priceFilter.value = '';
    
    
    if (window.filterCars) {
        filterCars();
    }
    
    
    setTimeout(() => {
        document.getElementById('cars-gallery').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }, 300);
}


function updatePremiumSearchText() {
    const noResults = document.getElementById('noResults');
    if (!noResults || noResults.style.display === 'none') return;
    
    const searchInput = document.getElementById('searchInput');
    const mainSearchInput = document.getElementById('mainSearchInput');
    const searchText = (mainSearchInput?.value || searchInput?.value || '').trim();
    
    const searchedCarElement = document.getElementById('premiumSearchedCar');
    if (searchedCarElement && searchText) {
        searchedCarElement.innerHTML = `لم نتمكن من العثور على "<strong style="color: #ffa500;">${searchText}</strong>" في معرضنا.`;
    }
}


function setupPremiumSearchMonitor() {
    const searchInput = document.getElementById('searchInput');
    const mainSearchInput = document.getElementById('mainSearchInput');
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                updatePremiumSearchText();
            }
        });
    });
    
    const noResults = document.getElementById('noResults');
    if (noResults) {
        observer.observe(noResults, { attributes: true });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', updatePremiumSearchText);
    }
    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', updatePremiumSearchText);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        setupPremium404();
        setupPremiumSearchMonitor();
    }, 1500);
});