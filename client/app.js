// ============================================
// SCROLL FUNCTIONS
// ============================================
// ============================================
// COUNTRIES DATA (все страны в одном месте)
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
// GENERATE COUNTRY DROPDOWNS
// ============================================

function initCountrySelectors() {
  const countryLists = document.querySelectorAll('.country-list');
  
  countryLists.forEach(list => {
    countries.forEach((country, index) => {
      const option = document.createElement('div');
      option.className = 'country-option'; // Убрали 'selected' отсюда
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
  
  // Добавляем selected только первой стране (Грузия)
  const firstOptions = document.querySelectorAll('.country-list .country-option:first-child');
  firstOptions.forEach(opt => opt.classList.add('selected'));
}


// ============================================
// COUNTRY SELECTOR FUNCTIONS
// ============================================

function toggleCountryDropdown(element) {
  const wrapper = element.closest('.country-select-wrapper');
  const dropdown = wrapper.querySelector('.country-dropdown');
  const select = wrapper.querySelector('.country-select');
  
  document.querySelectorAll('.country-dropdown').forEach(d => {
    if(d !== dropdown) {
      d.classList.remove('show');
      d.previousElementSibling.classList.remove('active');
    }
  });
  
  dropdown.classList.toggle('show');
  select.classList.toggle('active');
}

function selectCountry(option) {
  const wrapper = option.closest('.country-select-wrapper');
  const select = wrapper.querySelector('.country-select');
  const dropdown = wrapper.querySelector('.country-dropdown');
  const phoneField = wrapper.closest('.phone-field');
  const phoneInput = phoneField.querySelector('.input-phone');
  const hiddenCode = phoneField.querySelector('.selected-country-code');
  
  const flag = option.dataset.flag;
  const code = option.dataset.code;
  
  // Update display
  select.querySelector('.selected-flag').textContent = flag;
  select.querySelector('.selected-code').textContent = '+' + code;
  
  // Remove selected from ALL options in THIS dropdown
  wrapper.querySelectorAll('.country-option').forEach(o => o.classList.remove('selected'));
  
  // Add selected to clicked option
  option.classList.add('selected');
  
  // Close dropdown
  dropdown.classList.remove('show');
  select.classList.remove('active');
  
  // Store code
  if(hiddenCode) {
    hiddenCode.value = code;
  }
  
  phoneInput.focus();
}

function filterCountries(input) {
  const searchTerm = input.value.toLowerCase();
  const wrapper = input.closest('.country-dropdown');
  const options = wrapper.querySelectorAll('.country-option');
  
  options.forEach(option => {
    const name = option.dataset.name.toLowerCase();
    const code = option.dataset.code;
    
    if(name.includes(searchTerm) || code.includes(searchTerm)) {
      option.classList.remove('hidden');
    } else {
      option.classList.add('hidden');
    }
  });
}

// Close dropdown when click outside
document.addEventListener('click', function(e) {
  if(!e.target.closest('.country-select-wrapper')) {
    document.querySelectorAll('.country-dropdown').forEach(d => {
      d.classList.remove('show');
      d.previousElementSibling.classList.remove('active');
    });
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initCountrySelectors();
  initLanguage();
});
function scrollToTop(){
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToForm(){
  const formSection = document.getElementById("contacts");
  if(formSection){
    formSection.scrollIntoView({behavior: "smooth"});
  }
}

// ============================================
// MODALS
// ============================================

function openModal(type){
  const modal = document.getElementById(`modal-${type}`);
  if(modal){
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(type){
  const modal = document.getElementById(`modal-${type}`);
  if(modal){
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Close modal on outside click
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", function(e){
    if(e.target === this){
      this.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// ============================================
// MOBILE MENU
// ============================================

function toggleMobileMenu(){
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("active");
  document.body.style.overflow = menu.classList.contains("active") ? "hidden" : "";
}

// ============================================
// FORM VALIDATION
// ============================================

function validateField(field) {
  const value = field.value.trim();
  const placeholder = field.placeholder.toLowerCase();
  let isValid = true;
  let errorMessage = '';
  
  field.classList.remove('error');
  const existingError = field.parentNode.querySelector('.field-error');
  if(existingError) existingError.remove();
  
  const phoneField = field.closest('.phone-field');
  if(phoneField) {
    phoneField.classList.remove('error');
  }
  
  // Empty field
  if(!value) {
    isValid = false;
    errorMessage = currentLang === 'ru' ? 'Поле обязательно для заполнения' : 'Field is required';
  }
  // Phone validation
  else if(placeholder.includes('телефон') || placeholder.includes('phone') || field.classList.contains('input-phone')) {
    const digitsOnly = value.replace(/\D/g, '');
    
    // Must have at least 7 digits
    if(digitsOnly.length < 7) {
      isValid = false;
      errorMessage = currentLang === 'ru' ? 'Введите корректный номер телефона' : 'Enter valid phone number';
    }
  }
  // Name validation
  else if(placeholder.includes('имя') || placeholder.includes('name')) {
    if(value.length < 2) {
      isValid = false;
      errorMessage = currentLang === 'ru' ? 'Имя должно содержать минимум 2 символа' : 'Name must be at least 2 characters';
    }
  }
  
  if(!isValid) {
    if(phoneField) {
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
    if(input.tagName === 'SELECT') {
      if(!input.value) {
        input.classList.add('error');
        isValid = false;
      }
    } else if(!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

// ============================================
// FORM SUBMIT
// ============================================

async function sendForm(e, formType){
  e.preventDefault();
  
  const form = e.target;
  
  if(!validateForm(form)) {
    const firstError = form.querySelector('.error');
    if(firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  const formData = {};
  const inputs = form.querySelectorAll("input, select");
  
  inputs.forEach(input => {
    // Skip country-code selects, we'll handle them with phone inputs
    if(input.classList.contains('country-code')) {
      return;
    }
    
    if(input.classList.contains('input-phone')) {
      // Get country code from parent phone-field
      const phoneField = input.closest('.phone-field');
      const countrySelect = phoneField.querySelector('.country-code');
      const countryCode = countrySelect ? countrySelect.value : '995';
      const countryFlag = countrySelect ? countrySelect.options[countrySelect.selectedIndex]?.text.split(' ')[0] : '🇬🇪';
      const phoneValue = input.value.replace(/\D/g, '');
      
      // Full phone with country code
      formData['phone'] = '+' + countryCode + ' ' + phoneValue;
      formData['country'] = countryFlag;
      formData['countryCode'] = '+' + countryCode;
    } else {
      formData[input.name || input.placeholder] = input.value.trim();
    }
  });
  
  formData.formType = formType;
  formData.timestamp = new Date().toISOString();
  formData.language = currentLang;
  
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
    
    if(response.ok){
      // YANDEX METRICA
      if(typeof ym !== 'undefined') {
        ym(12345678, 'reachGoal', 'form_submit', {form_type: formType});
      }
      
      // Close all modals
      document.querySelectorAll(".modal").forEach(m => m.classList.remove("active"));
      
      // Show thanks modal
      const thanksModal = document.getElementById("modal-thanks");
      if(thanksModal){
        thanksModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
      
      // Reset form
      form.reset();
      form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      form.querySelectorAll('.field-error').forEach(el => el.remove());
      form.querySelectorAll('.phone-field').forEach(el => el.classList.remove('error'));
      
      // Reset country select to first option
      form.querySelectorAll('.country-code').forEach(select => {
        select.selectedIndex = 0;
      });
      
      console.log("✅ Form submitted:", formData);
    } else {
      throw new Error("Server error");
    }
  } catch(error){
    console.error("❌ Error:", error);
    alert(currentLang === 'ru' ? 'Ошибка. Попробуйте позже.' : 'Error. Try again later.');
  } finally {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  }
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e){
    const href = this.getAttribute("href");
    if(href !== "#"){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target){
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// ============================================
// HEADER SCROLL EFFECT & SCROLL TOP BUTTON
// ============================================

const header = document.querySelector(".header");
const scrollTopBtn = document.createElement("button");

scrollTopBtn.className = "scroll-top";
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.onclick = scrollToTop;
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  
  if(currentScroll > 100){
    header.style.background = "rgba(10, 25, 47, 0.98)";
    header.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.3)";
  } else {
    header.style.background = "rgba(10, 25, 47, 0.95)";
    header.style.boxShadow = "none";
  }
  
  if(currentScroll > 500){
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
    if(entry.isIntersecting){
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
// ESC KEY TO CLOSE MODALS
// ============================================

document.addEventListener("keydown", (e) => {
  if(e.key === "Escape"){
    document.querySelectorAll(".modal").forEach(modal => {
      modal.classList.remove("active");
    });
    document.body.style.overflow = "";
  }
});

// ============================================
// PRELOADER
// ============================================

window.addEventListener("load", () => {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if(preloader){
      preloader.classList.add("hidden");
    }
  }, 1500);
});
// ============================================
// COUNTRY SELECTOR
// ============================================

function toggleCountryDropdown(element) {
  const wrapper = element.closest('.country-select-wrapper');
  const dropdown = wrapper.querySelector('.country-dropdown');
  const select = wrapper.querySelector('.country-select');
  
  // Close all other dropdowns
  document.querySelectorAll('.country-dropdown').forEach(d => {
    if(d !== dropdown) {
      d.classList.remove('show');
      d.previousElementSibling.classList.remove('active');
    }
  });
  
  // Toggle current
  dropdown.classList.toggle('show');
  select.classList.toggle('active');
}

// Close dropdown when click outside
document.addEventListener('click', function(e) {
  if(!e.target.closest('.country-select-wrapper')) {
    document.querySelectorAll('.country-dropdown').forEach(d => {
      d.classList.remove('show');
      d.previousElementSibling.classList.remove('active');
    });
  }
});

// Select country
document.addEventListener('click', function(e) {
  const option = e.target.closest('.country-option');
  if(option) {
    const wrapper = option.closest('.country-select-wrapper');
    const select = wrapper.querySelector('.country-select');
    const dropdown = wrapper.querySelector('.country-dropdown');
    const phoneField = wrapper.closest('.phone-field');
    const phoneInput = phoneField.querySelector('.input-phone');
    const hiddenCode = phoneField.querySelector('.selected-country-code');
    
    const flag = option.dataset.flag;
    const code = option.dataset.code;
    const name = option.dataset.name;
    
    // Update select display
    select.querySelector('.selected-flag').textContent = flag;
    select.querySelector('.selected-code').textContent = '+' + code;
    
    // Mark as selected
    wrapper.querySelectorAll('.country-option').forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
    
    // Close dropdown
    dropdown.classList.remove('show');
    select.classList.remove('active');
    
    // Store country code
    if(hiddenCode) {
      hiddenCode.value = code;
    }
    
    // Focus phone input
    phoneInput.focus();
    
    console.log(`Selected: ${name} (+${code})`);
  }
});

// Filter countries by search
function filterCountries(input) {
  const searchTerm = input.value.toLowerCase();
  const wrapper = input.closest('.country-dropdown');
  const options = wrapper.querySelectorAll('.country-option');
  
  options.forEach(option => {
    const name = option.dataset.name.toLowerCase();
    const code = option.dataset.code;
    
    if(name.includes(searchTerm) || code.includes(searchTerm)) {
      option.classList.remove('hidden');
    } else {
      option.classList.add('hidden');
    }
  });
}

// ============================================
// FORM VALIDATION (обновлённая)
// ============================================

function validateField(field) {
  const value = field.value.trim();
  const placeholder = field.placeholder.toLowerCase();
  let isValid = true;
  let errorMessage = '';
  
  field.classList.remove('error');
  const existingError = field.parentNode.querySelector('.field-error');
  if(existingError) existingError.remove();
  
  const phoneField = field.closest('.phone-field');
  if(phoneField) {
    phoneField.classList.remove('error');
  }
  
  // Empty field
  if(!value) {
    isValid = false;
    errorMessage = currentLang === 'ru' ? 'Поле обязательно для заполнения' : 'Field is required';
  }
  // Phone validation
  else if(placeholder.includes('телефон') || placeholder.includes('phone') || field.classList.contains('input-phone')) {
    const digitsOnly = value.replace(/\D/g, '');
    
    // Must have at least 7 digits
    if(digitsOnly.length < 7) {
      isValid = false;
      errorMessage = currentLang === 'ru' ? 'Введите корректный номер телефона' : 'Enter valid phone number';
    }
  }
  // Name validation
  else if(placeholder.includes('имя') || placeholder.includes('name')) {
    if(value.length < 2) {
      isValid = false;
      errorMessage = currentLang === 'ru' ? 'Имя должно содержать минимум 2 символа' : 'Name must be at least 2 characters';
    }
  }
  
  if(!isValid) {
    if(phoneField) {
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

// ============================================
// FORM SUBMIT (обновлённая)
// ============================================

async function sendForm(e, formType){
  e.preventDefault();
  
  const form = e.target;
  
  if(!validateForm(form)) {
    const firstError = form.querySelector('.error');
    if(firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  const formData = {};
  const inputs = form.querySelectorAll("input, select");
  
  inputs.forEach(input => {
    // Skip hidden country code inputs
    if(input.classList.contains('selected-country-code')) {
      return;
    }
    
    if(input.classList.contains('input-phone')) {
      // Get country code from hidden input
      const phoneField = input.closest('.phone-field');
      const hiddenCode = phoneField.querySelector('.selected-country-code');
      const countryCode = hiddenCode ? hiddenCode.value : '995';
      const phoneValue = input.value.replace(/\D/g, '');
      
      // Full phone with country code
      formData['phone'] = '+' + countryCode + ' ' + phoneValue;
      formData['countryCode'] = '+' + countryCode;
    } else if(!input.classList.contains('country-search') && input.tagName !== 'SELECT') {
      formData[input.name || input.placeholder] = input.value.trim();
    }
  });
  
  formData.formType = formType;
  formData.timestamp = new Date().toISOString();
  formData.language = currentLang;
  
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
    
    if(response.ok){
      // YANDEX METRICA
      if(typeof ym !== 'undefined') {
        ym(12345678, 'reachGoal', 'form_submit', {form_type: formType});
      }
      
      // Close all modals
      document.querySelectorAll(".modal").forEach(m => m.classList.remove("active"));
      
      // Show thanks modal
      const thanksModal = document.getElementById("modal-thanks");
      if(thanksModal){
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
  } catch(error){
    console.error("❌ Error:", error);
    alert(currentLang === 'ru' ? 'Ошибка. Попробуйте позже.' : 'Error. Try again later.');
  } finally {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  }
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
});

// ============================================
// CONSOLE WELCOME
// ============================================

console.log("%c🏠 RENT GROUP", "color: #00D4AA; font-size: 24px; font-weight: bold;");
console.log("%cНедвижимость в Батуми", "color: #FFD700; font-size: 14px;");