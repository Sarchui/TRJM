const productsDB = {
    certified: [
        { name: "ترجمة شهادات ميلاد", price: 0.50 },
        { name: "ترجمة الأبحاث", price: 0.75 },
        { name: "ترجمة هويات وجوازات", price: 0.40 },
        { name: "ترجمة شهادات أكاديمية", price: 0.60 }
    ],
    tech: [
        { name: "تعريب مواقع إلكترونية", price: 0.75 },
        { name: "ترجمة تطبيقات جوال", price: 0.80 },
        { name: "ترجمة ملفات برمجية (JSON/PO)", price: 0.70 },
        { name: "ترجمة أدلة تقنية", price: 0.45 }
    ],
    creative: [
        { name: "ترجمة محتوى تسويقي", price: 0.40 },
        { name: "كتابة وترجمة مقالات", price: 0.35 },
        { name: "ترجمة إبداعية (Transcreation)", price: 0.85 },
        { name: "تعريب فيديوهات (Subtitling)", price: 0.70 }
    ],
    business: [
        { name: "ترجمة تقارير سنوية", price: 0.55 },
        { name: "ترجمة بروفايل شركات", price: 0.50 },
        { name: "ترجمة قانونية وعقود", price: 0.80 },
        { name: "ترجمة مراسلات إدارية", price: 0.30 }
    ]
};

let currentBasePrice = 45.00;

// --- التحكم في الصفحات والسايد بار (تعريف واحد فقط) ---
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(id);
    if(target) target.classList.add('active');
    closeSidebar();
    window.scrollTo(0,0);
}

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if(sidebar && overlay) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if(sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// تشغيل خدماتنا من السايد بار
function toggleServices() {
    showPage('home-page'); 
    const icon = document.getElementById('drop-icon');
    if(icon) icon.classList.toggle('rotate-icon');
}

// --- وظائف العداد والحاسبة ---
function runWordCounter() {
    const text = document.getElementById('text-input').value.trim();
    // تأكدي أن الـ IDs في الـ HTML هي wordCount و charCount بدون شرطة
    const wordDisplay = document.getElementById('wordCount');
    const charDisplay = document.getElementById('charCount');
    
    if(wordDisplay) wordDisplay.innerText = text ? text.split(/\s+/).length : 0;
    if(charDisplay) charDisplay.innerText = text.length;
}

function clearText() {
    document.getElementById('text-input').value = '';
    runWordCounter();
}

// ربط زر المسح المودرن (إذا كان موجوداً)
document.addEventListener('DOMContentLoaded', () => {
    const clearBtn = document.getElementById('modernClearBtn');
    if(clearBtn) clearBtn.addEventListener('click', clearText);
    
    const overlay = document.getElementById('overlay');
    if(overlay) overlay.addEventListener('click', closeSidebar);
});

// --- وظائف المتجر ---
function showCategory(cat) {
    const container = document.getElementById('products-container');
    const titles = {
        certified: 'الترجمة المعتمدة',
        tech: 'التعريب والتقنية',
        creative: 'المحتوى الإبداعي',
        business: 'حلول الشركات'
    };
    document.getElementById('cat-name-display').innerText = titles[cat];
    
    container.innerHTML = '';
    productsDB[cat].forEach(p => {
        container.innerHTML += `
            <div class="product-item" onclick="openCalc('${p.name}', ${p.price})">
                <div class="prod-info"><h4>${p.name}</h4></div>
                <button class="add-btn">طلب الخدمة</button>
            </div>`;
    });
    showPage('category-page');
}

function openCalc(name, price) {
    currentBasePrice = price;
    document.getElementById('current-product-name').innerText = name;
    updatePremiumPrice();
    showPage('calc-page');
}

function updatePremiumPrice() {
    const words = document.getElementById('word-input').value;
    const final = (words * currentBasePrice).toFixed(2);
    document.getElementById('final-price').innerText = final;
}

function toggleLanguage() {
    const body = document.body;
    const isAr = body.dir === 'rtl';
    body.dir = isAr ? 'ltr' : 'rtl';
    document.getElementById('lang-btn').innerText = isAr ? 'عربي' : 'English';
}
function toggleServices() {
    const submenu = document.getElementById('services-submenu');
    const icon = document.getElementById('drop-icon');
    
    // إظهار أو إخفاء القائمة المنسدلة
    if (submenu) {
        submenu.classList.toggle('show');
    }
    
    // تدوير السهم
    if (icon) {
        icon.classList.toggle('rotate-icon');
    }
}