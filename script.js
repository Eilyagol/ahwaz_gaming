// منوی همبرگری
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');

if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });
}

// اسلایدر
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slider .slide');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');

function showSlide(index) {
    if (!slides.length) return;
    slides.forEach(s => s.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

if (slides.length) {
    showSlide(0);
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }
}

// سبد خرید با localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('ahwaz_cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('ahwaz_cart', JSON.stringify(cart));
}

// افزودن به سبد
const addButtons = document.querySelectorAll('.add-to-cart');
addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price, 10);
        let cart = getCart();
        cart.push({ name, price });
        saveCart(cart);
        alert('محصول به سبد خرید اضافه شد.');
    });
});

// نمایش سبد در cart.html
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalSpan = document.getElementById('cartTotal');

if (cartItemsContainer && cartTotalSpan) {
    const cart = getCart();
    let total = 0;
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>سبد خرید شما خالی است.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = 
                
            
            cartItemsContainer.appendChild(div);
        });

        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const idx = parseInt(e.target.dataset.index, 10);
                let cart = getCart();
                cart.splice(idx, 1);
                saveCart(cart);
                location.reload();
            }
        });
    }
    cartTotalSpan.textContent = total.toLocaleString('fa-IR');
}

// تب‌های ورود / ثبت نام
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        authTabs.forEach(t => t.classList.remove('active'));
        authForms.forEach(f => f.classList.remove('active'));

        tab.classList.add('active');
        const target = document.querySelector(tab.dataset.target);
        if (target) target.classList.add('active');
    });
});

// نمایش / پنهان کردن پسورد
const toggleButtons = document.querySelectorAll('.toggle-password');
toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const input = document.getElementById(targetId);
        if (!input) return;
        if (input.type === 'password') {
            input.type = 'text';
            btn.textContent = 'پنهان';
        } else {
            input.type = 'password';
            btn.textContent = 'نمایش';
        }
    });
});

// ساخت پسورد تصادفی
const generateBtn = document.getElementById('generatePassword');
if (generateBtn) {
    generateBtn.addEventListener('click', () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let pass = '';
        for (let i = 0; i < 10; i++) {
            pass += chars[Math.floor(Math.random() * chars.length)];
        }
        const passInput = document.getElementById('regPassword');
        if (passInput) {
            passInput.value = pass;
        }
    });
}

// اعتبارسنجی فرم ورود
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('loginUser');
        const pass = document.getElementById('loginPassword');
        const userError = document.getElementById('loginUserError');
        const passError = document.getElementById('loginPassError');

        let valid = true;
        userError.textContent = '';
        passError.textContent = '';

        if (!user.value.trim()) {
            userError.textContent = 'لطفا ایمیل یا شماره موبایل را وارد کنید.';
            valid = false;
        }
        if (pass.value.length < 6) {
            passError.textContent = 'رمز عبور باید حداقل ۶ کاراکتر باشد.';
            valid = false;
        }

        if (valid) {
            alert('ورود با موفقیت انجام شد (نمونه).');
        }
    });
}

// اعتبارسنجی فرم ثبت نام
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('regEmail');
        const phone = document.getElementById('regPhone');
        const pass = document.getElementById('regPassword');

        const emailError = document.getElementById('regEmailError');
        const phoneError = document.getElementById('regPhoneError');
        const passError = document.getElementById('regPassError');

        emailError.textContent = '';
        phoneError.textContent = '';
        passError.textContent = '';

        let valid = true;

        if (!email.value.includes('@')) {
            emailError.textContent = 'ایمیل معتبر وارد کنید.';
            valid = false;
        }
        if (phone.value.trim().length < 10) {
            phoneError.textContent = 'شماره موبایل معتبر وارد کنید.';
            valid = false;
        }
        if (pass.value.length < 6) {
            passError.textContent = 'رمز عبور باید حداقل ۶ کاراکتر باشد.';
            valid = false;
        }

        if (valid) {
            alert('ثبت نام با موفقیت انجام شد (نمونه).');
        }
    });
}