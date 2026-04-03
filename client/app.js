// ============================================
// COUNTRIES DATA
// ============================================

const countries = [
  { code: '995', flag: '🇬🇪', name: 'Грузия' },
  { code: '7', flag: '🇷🇺', name: 'Россия' },
  { code: '375', flag: '🇧🇾', name: 'Беларусь' },
  { code: '380', flag: '🇺🇦', name: 'Украина' },
  { code: '7', flag: '🇰🇿', name: 'Казахстан' },
  { code: '998', flag: '🇺🇿', name: 'Узбекистан' },
  { code: '994', flag: '🇦🇿', name: 'Азербайджан' },
  { code: '374', flag: '🇦🇲', name: 'Армения' },
  { code: '373', flag: '🇲🇩', name: 'Молдова' },
  { code: '996', flag: '🇰🇬', name: 'Кыргызстан' },
  { code: '992', flag: '🇹🇯', name: 'Таджикистан' },
  { code: '993', flag: '🇹🇲', name: 'Туркменистан' },
  { code: '90', flag: '🇹🇷', name: 'Турция' },
  { code: '49', flag: '🇩🇪', name: 'Германия' },
  { code: '33', flag: '🇫🇷', name: 'Франция' },
  { code: '39', flag: '🇮🇹', name: 'Италия' },
  { code: '34', flag: '🇪🇸', name: 'Испания' },
  { code: '48', flag: '🇵🇱', name: 'Польша' },
  { code: '44', flag: '🇬🇧', name: 'Великобритания' },
  { code: '31', flag: '🇳🇱', name: 'Нидерланды' },
  { code: '32', flag: '🇧🇪', name: 'Бельгия' },
  { code: '41', flag: '🇨🇭', name: 'Швейцария' },
  { code: '43', flag: '🇦🇹', name: 'Австрия' },
  { code: '46', flag: '🇸🇪', name: 'Швеция' },
  { code: '47', flag: '🇳🇴', name: 'Норвегия' },
  { code: '45', flag: '🇩🇰', name: 'Дания' },
  { code: '358', flag: '🇫🇮', name: 'Финляндия' },
  { code: '351', flag: '🇵🇹', name: 'Португалия' },
  { code: '30', flag: '🇬🇷', name: 'Греция' },
  { code: '420', flag: '🇨🇿', name: 'Чехия' },
  { code: '40', flag: '🇷🇴', name: 'Румыния' },
  { code: '359', flag: '🇧🇬', name: 'Болгария' },
  { code: '36', flag: '🇭🇺', name: 'Венгрия' },
  { code: '86', flag: '🇨🇳', name: 'Китай' },
  { code: '972', flag: '🇮🇱', name: 'Израиль' },
  { code: '91', flag: '🇮🇳', name: 'Индия' },
  { code: '81', flag: '🇯🇵', name: 'Япония' },
  { code: '82', flag: '🇰🇷', name: 'Южная Корея' },
  { code: '65', flag: '🇸🇬', name: 'Сингапур' },
  { code: '66', flag: '🇹🇭', name: 'Таиланд' },
  { code: '84', flag: '🇻🇳', name: 'Вьетнам' },
  { code: '60', flag: '🇲🇾', name: 'Малайзия' },
  { code: '63', flag: '🇵🇭', name: 'Филиппины' },
  { code: '62', flag: '🇮🇩', name: 'Индонезия' },
  { code: '92', flag: '🇵🇰', name: 'Пакистан' },
  { code: '971', flag: '🇦🇪', name: 'ОАЭ' },
  { code: '966', flag: '🇸🇦', name: 'Саудовская Аравия' },
  { code: '974', flag: '🇶🇦', name: 'Катар' },
  { code: '965', flag: '🇰🇼', name: 'Кувейт' },
  { code: '973', flag: '🇧🇭', name: 'Бахрейн' },
  { code: '968', flag: '🇴🇲', name: 'Оман' },
  { code: '1', flag: '🇺🇸', name: 'США' },
  { code: '1', flag: '🇨🇦', name: 'Канада' },
  { code: '52', flag: '🇲🇽', name: 'Мексика' },
  { code: '55', flag: '🇧🇷', name: 'Бразилия' },
  { code: '54', flag: '🇦🇷', name: 'Аргентина' },
  { code: '56', flag: '🇨🇱', name: 'Чили' },
  { code: '57', flag: '🇨🇴', name: 'Колумбия' },
  { code: '51', flag: '🇵🇪', name: 'Перу' },
  { code: '27', flag: '🇿🇦', name: 'ЮАР' },
  { code: '20', flag: '🇪🇬', name: 'Египет' },
  { code: '61', flag: '🇦🇺', name: 'Австралия' },
  { code: '64', flag: '🇳🇿', name: 'Новая Зеландия' }
];

// ============================================
// LANGUAGE / TRANSLATIONS
// ============================================

let currentLang = 'ru';

const translations = {
  ru: {
    heroTitle: 'Квартира у моря за $5000?<br>Да, это реально<br><span class="accent">(через рассрочку!)</span>',
    heroSubtitle: 'Подберём объект под ваш бюджет за 24 часа',
    yourName: 'Ваше имя',
    phone: 'Телефон',
    pickObject: 'Подобрать объект сейчас',
    helpedClients: 'Уже помогли 500+ клиентам',
    featuresTitle: 'Найдём то, что другие не могут',
    firstLine: 'Первая линия у моря',
    firstLineDesc: 'Эксклюзивные предложения с видом на море. Рассрочка от застройщика без процентов и банков.',
    investment: 'Инвестиционные объекты',
    investmentDesc: 'Квартиры с доходностью 10-14% годовых. Помощь в управлении недвижимостью.',
    readyFlats: 'Готовые квартиры под ключ',
    readyFlatsDesc: 'Проверенные объекты с ремонтом. Заезжайте и живите или сразу сдавайте в аренду.',
    getWhatsApp: 'Получить подборку в WhatsApp',
    whyTitle: 'Почему выбирают нас',
    safety: 'Гарантия безопасности',
    safetyDesc: 'Полная юридическая проверка всех документов. Работаем официально.',
    timeSaving: 'Экономия времени',
    timeSavingDesc: 'Подбор объектов за 24 часа. Не тратьте недели на самостоятельный поиск.',
    bestPrices: 'Лучшие цены',
    bestPricesDesc: 'Прямые контракты с застройщиками. Скидки до 10% для наших клиентов.',
    support247: 'Поддержка 24/7',
    support247Desc: 'Помогаем на всех этапах: от подбора до получения ключей и после.',
    bookConsultation: 'Записаться на консультацию',
    socialTitle: 'Мы в соцсетях',
    telegram: 'Telegram',
    telegramDesc: 'Актуальные предложения и новости рынка недвижимости Батуми',
    subscribe: 'Подписаться',
    instagram: 'Instagram',
    instagramDesc: 'Обзоры объектов, отзывы клиентов и полезные советы',
    view: 'Смотреть',
    tiktok: 'TikTok',
    tiktokDesc: 'Короткие видео об объектах и жизни в Батуми',
    facebook: 'Facebook',
    facebookDesc: 'Новости, акции и специальные предложения от Rent Group',
    dontWantScroll: 'Не хотите листать ленту?',
    sendRequest: 'Отправить заявку',
    contactsTitle: 'Контакты и офис',
    contactUs: 'Свяжитесь с нами',
    officeAddress: 'Адрес офиса',
    address: 'г. Батуми, ул. Мемеда Абашидзе 33, Грузия',
    workHours: 'Режим работы',
    workHoursText: 'Пн-Пт: 9:00-18:00<br>Сб: 10:00-15:00',
    email: 'Email',
    readyPickFlat: 'Готовы подобрать квартиру?',
    footerText: '<strong>RENT GROUP</strong> - недвижимость в Батуми',
    leaveRequest: 'Оставить заявку',
    allRightsReserved: '© 2024 RENT GROUP. Все права защищены.',
    callbackTitle: 'Заказать звонок',
    callMeBack: 'Перезвоните мне',
    thanksTitle: 'Спасибо за заявку!',
    thanksText: 'Мы свяжемся с вами в ближайшее время',
    close: 'Закрыть',
    pickObjectBtn: 'Подобрать объект',
    orderCall: 'Заказать звонок',
    navHome: 'Главная',
    navServices: 'Услуги',
    navWhy: 'Почему мы',
    navSocial: 'Соцсети',
    navContacts: 'Контакты'
  },
  en: {
    heroTitle: 'Apartment by the sea for $5000?<br>Yes, it\'s real<br><span class="accent">(via installment plan!)</span>',
    heroSubtitle: 'We will select an object within your budget in 24 hours',
    yourName: 'Your name',
    phone: 'Phone',
    pickObject: 'Find property now',
    helpedClients: 'Already helped 500+ clients',
    featuresTitle: 'We find what others can\'t',
    firstLine: 'First line by the sea',
    firstLineDesc: 'Exclusive offers with sea views. Installment plans from developers without interest or banks.',
    investment: 'Investment properties',
    investmentDesc: 'Apartments with return of 10-14% per annum. Property management assistance.',
    readyFlats: 'Ready-to-move apartments',
    readyFlatsDesc: 'Verified properties with renovations. Move in and live or rent out immediately.',
    getWhatsApp: 'Get selection in WhatsApp',
    whyTitle: 'Why choose us',
    safety: 'Safety guarantee',
    safetyDesc: 'Full legal verification of all documents. We work officially.',
    timeSaving: 'Time saving',
    timeSavingDesc: 'Property selection in 24 hours. Do not spend weeks searching on your own.',
    bestPrices: 'Best prices',
    bestPricesDesc: 'Direct contracts with developers. Discounts up to 10% for our clients.',
    support247: '24/7 Support',
    support247Desc: 'We help at all stages: from selection to receiving keys and after.',
    bookConsultation: 'Book a consultation',
    socialTitle: 'We are on social media',
    telegram: 'Telegram',
    telegramDesc: 'Current offers and Batumi real estate market news',
    subscribe: 'Subscribe',
    instagram: 'Instagram',
    instagramDesc: 'Property reviews, client testimonials and useful tips',
    view: 'View',
    tiktok: 'TikTok',
    tiktokDesc: 'Short videos about properties and life in Batumi',
    facebook: 'Facebook',
    facebookDesc: 'News, promotions and special offers from Rent Group',
    dontWantScroll: 'Don\'t want to scroll the feed?',
    sendRequest: 'Send request',
    contactsTitle: 'Contacts and office',
    contactUs: 'Contact us',
    officeAddress: 'Office address',
    address: 'Batumi, Memed Abashidze St. 33, Georgia',
    workHours: 'Working hours',
    workHoursText: 'Mon-Fri: 9:00-18:00<br>Sat: 10:00-15:00',
    email: 'Email',
    readyPickFlat: 'Ready to find an apartment?',
    footerText: '<strong>RENT GROUP</strong> - Batumi real estate',
    leaveRequest: 'Leave a request',
    allRightsReserved: '© 2024 RENT GROUP. All rights reserved.',
    callbackTitle: 'Request a call',
    callMeBack: 'Call me back',
    thanksTitle: 'Thank you for your request!',
    thanksText: 'We will contact you soon',
    close: 'Close',
    pickObjectBtn: 'Find property',
    orderCall: 'Request a call',
    navHome: 'Home',
    navServices: 'Services',
    navWhy: 'Why us',
    navSocial: 'Social',
    navContacts: 'Contacts'
  }
};

function setLanguage(lang) {
  currentLang = lang;
  
  // Update buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Save preference
  localStorage.setItem('rentgroup_lang', lang);
}

function initLanguage() {
  const saved = localStorage.getItem('rentgroup_lang');
  if (saved && translations[saved]) {
    setLanguage(saved);
  } else {
    setLanguage('ru');
  }
}

// ============================================
// COUNTRY SELECTOR
// ============================================

function initCountrySelectors() {
  const countryLists = document.querySelectorAll('.country-list');
  
  countryLists.forEach(list => {
    countries.forEach((country, index) => {
      const option = document.createElement('div');
      option.className = 'country-option';
      option.dataset.code = country.code;
      option.dataset.flag = country.flag;
      option.dataset.name = country.name;
      
      option.innerHTML = `
        <span class="flag">${country.flag}</span>
        <span class="name">${country.name}</span>
        <span class="code">+${country.code}</span>
        <i class="fas fa-check checkmark"></i>
      `;
      
      option.addEventListener('click', function() {
        selectCountry(this);
      });
      
      list.appendChild(option);
    });
  });
  
  // Mark first option as selected
  const firstOptions = document.querySelectorAll('.country-list .country-option:first-child');
  firstOptions.forEach(opt => opt.classList.add('selected'));
}

function toggleCountryDropdown(element) {
  const wrapper = element.closest('.country-select-wrapper');
  const dropdown = wrapper.querySelector('.country-dropdown');
  const select = wrapper.querySelector('.country-select');
  
  // Close all other dropdowns
  document.querySelectorAll('.country-dropdown').forEach(d => {
    if (d !== dropdown) {
      d.classList.remove('show');
      d.previousElementSibling.classList.remove('active');
    }
  });
  
  // Toggle current
  dropdown.classList.toggle('show');
  select.classList.toggle('active');
}

function selectCountry(option) {
  const wrapper = option.closest('.country-select-wrapper');
  const select = wrapper.querySelector('.country-select');
  const dropdown = wrapper.querySelector('.country-dropdown');
  const phoneField = wrapper.closest('.phone-field');
  const phoneInput = phoneField?.querySelector('.input-phone');
  const hiddenCode = phoneField?.querySelector('.selected-country-code');
  
  const flag = option.dataset.flag;
  const code = option.dataset.code;
  
  // Update display
  select.querySelector('.selected-flag').textContent = flag;
  select.querySelector('.selected-code').textContent = '+' + code;
  
  // Update selection
  wrapper.querySelectorAll('.country-option').forEach(o => o.classList.remove('selected'));
  option.classList.add('selected');
  
  // Close dropdown
  dropdown.classList.remove('show');
  select.classList.remove('active');
  
  // Store code
  if (hiddenCode) {
    hiddenCode.value = code;
  }
  
  // Focus phone input
  if (phoneInput) {
    phoneInput.focus();
  }
}

function filterCountries(input) {
  const searchTerm = input.value.toLowerCase();
  const wrapper = input.closest('.country-dropdown');
  const options = wrapper.querySelectorAll('.country-option');
  
  options.forEach(option => {
    const name = option.dataset.name.toLowerCase();
    const code = option.dataset.code;
    
    if (name.includes(searchTerm) || code.includes(searchTerm)) {
      option.classList.remove('hidden');
    } else {
      option.classList.add('hidden');
    }
  });
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.country-select-wrapper')) {
    document.querySelectorAll('.country-dropdown').forEach(d => {
      d.classList.remove('show');
      d.previousElementSibling?.classList.remove('active');
    });
  }
});

// ============================================
// SCROLL FUNCTIONS
// ============================================

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToForm() {
  const formSection = document.getElementById("contacts");
  if (formSection) {
    formSection.scrollIntoView({ behavior: "smooth" });
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// ============================================
// MODALS
// ============================================

function openModal(type) {
  const modal = document.getElementById(`modal-${type}`);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(type) {
  const modal = document.getElementById(`modal-${type}`);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Close modal on outside click
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", function(e) {
    if (e.target === this) {
      this.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal").forEach(modal => {
      modal.classList.remove("active");
    });
    document.body.style.overflow = "";
  }
});

// ============================================
// MOBILE MENU
// ============================================

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("active");
  document.body.style.overflow = menu.classList.contains("active") ? "hidden" : "";
}

// ============================================
// FORM VALIDATION
// ============================================

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';
  
  field.classList.remove('error');
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) existingError.remove();
  
  const phoneField = field.closest('.phone-field');
  if (phoneField) {
    phoneField.classList.remove('error');
  }
  
  // Empty field check
  if (!value) {
    isValid = false;
    errorMessage = currentLang === 'ru' ? 'Поле обязательно для заполнения' : 'Field is required';
  }
  
  if (!isValid) {
    if (phoneField) {
      phoneField.classList.add('error');
    } else {
      field.classList.add('error');
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = errorMessage;
    field.parentNode.appendChild(errorDiv);
  }
  
  return isValid;
}

function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], select[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (input.tagName === 'SELECT') {
      if (!input.value) {
        input.classList.add('error');
        isValid = false;
      }
    } else if (!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

// ============================================
// FORM SUBMIT
// ============================================

async function sendForm(e, formType) {
  e.preventDefault();
  
  const form = e.target;
  
  // Validate form
  if (!validateForm(form)) {
    const firstError = form.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  // Collect form data
  const formData = {};
  const inputs = form.querySelectorAll("input, select");
  
  inputs.forEach(input => {
    // Skip hidden fields
    if (input.classList.contains('selected-country-code') || 
        input.name === 'website' || 
        input.name === 'email2') {
      return;
    }
    
    if (input.classList.contains('input-phone')) {
      // Get country code from hidden input
      const phoneField = input.closest('.phone-field');
      const hiddenCode = phoneField?.querySelector('.selected-country-code');
      const countryCode = hiddenCode?.value || '995';
      const phoneValue = input.value.trim();
      
      formData['phone'] = '+' + countryCode + ' ' + phoneValue;
      formData['countryCode'] = '+' + countryCode;
    } else if (input.tagName !== 'SELECT' && input.value) {
      formData[input.name || input.placeholder] = input.value.trim();
    }
  });
  
  // Add metadata
  formData.formType = formType;
  formData.timestamp = new Date().toISOString();
  formData.language = currentLang;
  
  // Update button state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ...';
  submitBtn.disabled = true;
  
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      // Yandex Metrica goal
      if (typeof ym !== 'undefined') {
        ym(12345678, 'reachGoal', 'form_submit', { form_type: formType });
      }
      
      // Close all modals
      document.querySelectorAll(".modal").forEach(m => m.classList.remove("active"));
      
      // Show thanks modal
      const thanksModal = document.getElementById("modal-thanks");
      if (thanksModal) {
        thanksModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
      
      // Reset form
      form.reset();
      form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      form.querySelectorAll('.field-error').forEach(el => el.remove());
      form.querySelectorAll('.phone-field').forEach(el => el.classList.remove('error'));
      
      // Reset country select to Georgia
      form.querySelectorAll('.country-select').forEach(select => {
        select.querySelector('.selected-flag').textContent = '🇬🇪';
        select.querySelector('.selected-code').textContent = '+995';
      });
      form.querySelectorAll('.selected-country-code').forEach(hidden => {
        hidden.value = '995';
      });
      form.querySelectorAll('.country-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      
      console.log("✅ Form submitted:", formData);
    } else {
      throw new Error("Server error");
    }
  } catch (error) {
    console.error("❌ Error:", error);
    alert(currentLang === 'ru' ? 'Ошибка. Попробуйте позже.' : 'Error. Try again later.');
  } finally {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  }
}

// ============================================
// HEADER & SCROLL EFFECTS
// ============================================

const header = document.querySelector(".header");
const scrollTopBtn = document.createElement("button");

scrollTopBtn.className = "scroll-top";
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.onclick = scrollToTop;
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.background = "rgba(10, 25, 47, 0.98)";
    header.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.3)";
  } else {
    header.style.background = "rgba(10, 25, 47, 0.95)";
    header.style.boxShadow = "none";
  }
  
  if (currentScroll > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

// ============================================
// ANIMATION ON SCROLL
// ============================================

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll(".card, .why-item, .social-card").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease";
  observer.observe(el);
});

// ============================================
// PRELOADER
// ============================================

window.addEventListener("load", () => {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("hidden");
    }
  }, 1500);
});

// ============================================
// INITIALIZE
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initCountrySelectors();
  initLanguage();
});

// ============================================
// CONSOLE WELCOME
// ============================================

console.log("%c🏠 RENT GROUP", "color: #00D4AA; font-size: 24px; font-weight: bold;");
console.log("%cНедвижимость в Батуми", "color: #FFD700; font-size: 14px;");