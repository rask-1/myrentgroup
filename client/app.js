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
    // Header
    orderCall: 'Заказать звонок',
    
    // Hero
    heroTitle: 'Недвижимость в Батуми: квартира у моря за $5000?<br>Да, это реально<br><span class="accent">(через рассрочку!)</span>',
    heroSubtitle: 'Подберём квартиру в Батуми под ваш бюджет за 24 часа',
    yourName: 'Ваше имя',
    phone: 'Телефон',
    pickObject: 'Подобрать объект сейчас',
    helpedClients: 'Уже помогли 500+ клиентам купить недвижимость в Батуми',
    
    // Features
    featuresTitle: 'Недвижимость Батуми: найдём то, что другие не могут',
    firstLine: 'Первая линия у моря в Батуми',
    firstLineDesc: 'Эксклюзивные предложения с видом на море. Рассрочка от застройщика без процентов и банков.',
    investment: 'Инвестиции в недвижимость Батуми',
    investmentDesc: 'Квартиры с доходностью 10-14% годовых. Помощь в управлении недвижимостью.',
    readyFlats: 'Готовые квартиры в Батуми под ключ',
    readyFlatsDesc: 'Проверенные объекты с ремонтом. Заезжайте и живите или сразу сдавайте в аренду.',
    getWhatsApp: 'Получить подборку недвижимости в WhatsApp',
    
    // Why Us
    whyTitle: 'Почему выбирают нашу недвижимость в Батуми',
    safety: 'Гарантия безопасности',
    safetyDesc: 'Полная юридическая проверка всех документов. Работаем официально.',
    timeSaving: 'Экономия времени',
    timeSavingDesc: 'Подбор объектов за 24 часа. Не тратьте недели на самостоятельный поиск.',
    bestPrices: 'Лучшие цены на недвижимость',
    bestPricesDesc: 'Прямые контракты с застройщиками. Скидки до 10% для наших клиентов.',
    support247: 'Поддержка 24/7',
    support247Desc: 'Помогаем на всех этапах: от подбора до получения ключей и после.',
    bookConsultation: 'Записаться на консультацию',
    
    // Social Media
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
    
    // Contacts
    contactsTitle: 'Контакты и офис',
    contactUs: 'Свяжитесь с нами',
    officeAddress: 'Адрес офиса',
    address: 'г. Батуми, ул. Горгасали 157, Грузия',
    workHours: 'Режим работы',
    workHoursText: 'Пн-Пт: 9:00-18:00<br>Сб: 10:00-15:00',
    email: 'Email',
    readyPickFlat: 'Готовы подобрать квартиру?',
    
    // Budget & Goal
    budgetSelect: 'Ваш бюджет',
    budget50_100: '$50,000 - $100,000',
    budget100_200: '$100,000 - $200,000',
    budget200_300: '$200,000 - $300,000',
    budget300_500: '$300,000 - $500,000',
    budget500plus: '$500,000+',
    goalSelect: 'Цель покупки',
    goalInvestment: 'Инвестиция',
    goalLiving: 'Для жизни',
    goalRent: 'Под аренду',
    goalVacation: 'Для отдыха',
    
    // Footer
    footerText: '<strong>RENT GROUP</strong> - недвижимость в Батуми',
    privacyPolicy: 'Политика конфиденциальности',
    leaveRequest: 'Оставить заявку',
    allRightsReserved: '© 2024 RENT GROUP. Все права защищены.',
    
    // Modals
    callbackTitle: 'Заказать звонок',
    callMeBack: 'Перезвоните мне',
    thanksTitle: 'Спасибо за заявку!',
    thanksText: 'Мы свяжемся с вами в ближайшее время',
    close: 'Закрыть',
    
    // Sticky
    pickObjectBtn: 'Подобрать объект',
    
    // Nav
    navHome: 'Главная',
    navServices: 'Услуги',
    navWhy: 'Почему мы',
    navSocial: 'Соцсети',
    navContacts: 'Контакты',
    
    // SEO Section
    seoTitle: 'Недвижимость в Батуми от Rent Group',
    seoText1: 'Ищете <strong>недвижимость в Батуми</strong>? Мы поможем <strong>купить квартиру у моря в Грузии</strong> на выгодных условиях. Наша компания специализируется на подборе объектов в Батуми для инвестиций и личного проживания.',
    seoText2: '<strong>Купить квартиру в Батуми</strong> можно в рассрочку от застройщика без банков и процентов. Мы предлагаем:',
    seoFeature1: 'Квартиры с видом на Чёрное море',
    seoFeature2: 'Инвестиционные объекты с доходностью 10-14% годовых',
    seoFeature3: 'Рассрочка до 3-5 лет',
    seoFeature4: 'Полная юридическая поддержка при покупке недвижимости',
    seoFeature5: 'Помощь в управлении недвижимостью и сдаче в аренду',
    seoText3: '<strong>Недвижимость Грузии</strong> — это выгодная инвестиция для граждан России, Беларуси, Украины и других стран. Батуми активно развивается как курортный и деловой центр, что обеспечивает рост цен на квартиры.',
    seoText4: 'Оставьте заявку и мы подберём <strong>квартиру в Батуми</strong> под ваш бюджет за 24 часа. Работаем официально, все сделки защищены юридически.',
    
    // Privacy Policy Page
    privacyPageTitle: 'Политика конфиденциальности',
    backToMain: '← На главную',
    privacyH1: 'Политика конфиденциальности',
    privacySection1: '1. Общие положения',
    privacyText1: 'Настоящая политика обработки персональных данных составлена в соответствии с требованиями законодательства Грузии и международного права, и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые Rent Group.',
    privacySection2: '2. Сбор и использование информации',
    privacyText2: 'Мы собираем следующие типы информации:',
    privacyItem1: 'Персональные данные (имя, телефон, email)',
    privacyItem2: 'Данные об устройстве и браузере',
    privacyItem3: 'Информация о действиях на сайте',
    privacyItem4: 'Данные о местоположении (с вашего согласия)',
    privacySection3: '3. Цели сбора данных',
    privacyText3: 'Собранные данные используются для:',
    privacyUse1: 'Обработки заявок и связи с клиентами',
    privacyUse2: 'Улучшения качества услуг',
    privacyUse3: 'Маркетинговых коммуникаций (с согласия пользователя)',
    privacyUse4: 'Аналитики и статистики использования сайта',
    privacySection4: '4. Защита данных',
    privacyText4: 'Мы принимаем все необходимые меры для защиты ваших персональных данных от несанкционированного доступа, изменения или уничтожения.',
    privacySection5: '5. Ваши права',
    privacyText5: 'Вы имеете право:',
    privacyRight1: 'Запросить информацию о хранящихся о вас данных',
    privacyRight2: 'Потребовать исправления или удаления ваших данных',
    privacyRight3: 'Отозвать согласие на обработку данных',
    privacySection6: '6. Контакты',
    privacyContact: 'По вопросам обработки персональных данных обращайтесь: <a href="mailto:info@rentgroup.ge" style="color:#00D4AA">info@rentgroup.ge</a>',
    privacyUpdated: 'Последнее обновление: Апрель 2026'
  },
  
  en: {
    // Header
    orderCall: 'Order a call',
    
    // Hero
    heroTitle: 'Batumi Real Estate: Apartment by the sea for $5000?<br>Yes, it\'s real<br><span class="accent">(installment plan!)</span>',
    heroSubtitle: 'We will select an apartment in Batumi within your budget in 24 hours',
    yourName: 'Your name',
    phone: 'Phone',
    pickObject: 'Pick up an object now',
    helpedClients: 'Already helped 500+ clients buy real estate in Batumi',
    
    // Features
    featuresTitle: 'Batumi Real Estate: We will find what others cannot',
    firstLine: 'First line by the sea in Batumi',
    firstLineDesc: 'Exclusive offers with sea view. Installment plan from the developer without interest and banks.',
    investment: 'Investments in Batumi real estate',
    investmentDesc: 'Apartments with return of 10-14% per annum. Property management assistance.',
    readyFlats: 'Ready-to-move-in apartments in Batumi',
    readyFlatsDesc: 'Verified properties with repairs. Move in and live or rent out immediately.',
    getWhatsApp: 'Get selection in WhatsApp',
    
    // Why Us
    whyTitle: 'Why choose our real estate in Batumi',
    safety: 'Safety guarantee',
    safetyDesc: 'Full legal verification of all documents. We work officially.',
    timeSaving: 'Time saving',
    timeSavingDesc: 'Property selection in 24 hours. Do not spend weeks searching on your own.',
    bestPrices: 'Best prices for real estate',
    bestPricesDesc: 'Direct contracts with developers. Discounts up to 10% for our clients.',
    support247: '24/7 Support',
    support247Desc: 'We help at all stages: from selection to receiving keys and after.',
    bookConsultation: 'Book a consultation',
    
    // Social Media
    socialTitle: 'We are on social media',
    telegram: 'Telegram',
    telegramDesc: 'Current offers and news of the Batumi real estate market',
    subscribe: 'Subscribe',
    instagram: 'Instagram',
    instagramDesc: 'Property reviews, customer feedback and useful tips',
    view: 'View',
    tiktok: 'TikTok',
    tiktokDesc: 'Short videos about properties and life in Batumi',
    facebook: 'Facebook',
    facebookDesc: 'News, promotions and special offers from Rent Group',
    dontWantScroll: "Don't want to scroll?",
    sendRequest: 'Send request',
    
    // Contacts
    contactsTitle: 'Contacts and office',
    contactUs: 'Contact us',
    officeAddress: 'Office address',
    address: 'Batumi, Gorgasali St. 157, Georgia',
    workHours: 'Working hours',
    workHoursText: 'Mon-Fri: 9:00-18:00<br>Sat: 10:00-15:00',
    email: 'Email',
    readyPickFlat: 'Ready to pick an apartment?',
    
    // Budget & Goal
    budgetSelect: 'Your budget',
    budget50_100: '$50,000 - $100,000',
    budget100_200: '$100,000 - $200,000',
    budget200_300: '$200,000 - $300,000',
    budget300_500: '$300,000 - $500,000',
    budget500plus: '$500,000+',
    goalSelect: 'Purchase goal',
    goalInvestment: 'Investment',
    goalLiving: 'For living',
    goalRent: 'For rent',
    goalVacation: 'For vacation',
    
    // Footer
    footerText: '<strong>RENT GROUP</strong> - real estate in Batumi',
    privacyPolicy: 'Privacy Policy',
    leaveRequest: 'Leave a request',
    allRightsReserved: '© 2024 RENT GROUP. All rights reserved.',
    
    // Modals
    callbackTitle: 'Order a call',
    callMeBack: 'Call me back',
    thanksTitle: 'Thank you for your request!',
    thanksText: 'We will contact you soon',
    close: 'Close',
    
    // Sticky
    pickObjectBtn: 'Pick an object',
    
    // Nav
    navHome: 'Home',
    navServices: 'Services',
    navWhy: 'Why us',
    navSocial: 'Social',
    navContacts: 'Contacts',
    
    // SEO Section
    seoTitle: 'Batumi Real Estate by Rent Group',
    seoText1: 'Looking for <strong>real estate in Batumi</strong>? We will help you <strong>buy an apartment by the sea in Georgia</strong> on favorable terms. Our company specializes in selecting properties in Batumi for investments and personal residence.',
    seoText2: '<strong>Buying an apartment in Batumi</strong> is possible in installments from the developer without banks and interest. We offer:',
    seoFeature1: 'Apartments with Black Sea views',
    seoFeature2: 'Investment properties with 10-14% annual return',
    seoFeature3: 'Installment plan up to 3-5 years',
    seoFeature4: 'Full legal support for real estate purchases',
    seoFeature5: 'Property management and rental assistance',
    seoText3: '<strong>Real estate in Georgia</strong> is a profitable investment for citizens of Russia, Belarus, Ukraine and other countries. Batumi is actively developing as a resort and business center, which ensures apartment price growth.',
    seoText4: 'Leave a request and we will select an <strong>apartment in Batumi</strong> within your budget in 24 hours. We work officially, all transactions are legally protected.',
    
    // Privacy Policy Page
    privacyPageTitle: 'Privacy Policy',
    backToMain: '← Back to main',
    privacyH1: 'Privacy Policy',
    privacySection1: '1. General provisions',
    privacyText1: 'This personal data processing policy is drawn up in accordance with the requirements of Georgian legislation and international law, and defines the procedure for processing personal data and measures to ensure the security of personal data undertaken by Rent Group.',
    privacySection2: '2. Collection and use of information',
    privacyText2: 'We collect the following types of information:',
    privacyItem1: 'Personal data (name, phone, email)',
    privacyItem2: 'Device and browser data',
    privacyItem3: 'Information about actions on the site',
    privacyItem4: 'Location data (with your consent)',
    privacySection3: '3. Purposes of data collection',
    privacyText3: 'Collected data is used for:',
    privacyUse1: 'Processing applications and communicating with clients',
    privacyUse2: 'Improving the quality of services',
    privacyUse3: 'Marketing communications (with user consent)',
    privacyUse4: 'Analytics and statistics on site usage',
    privacySection4: '4. Data protection',
    privacyText4: 'We take all necessary measures to protect your personal data from unauthorized access, modification or destruction.',
    privacySection5: '5. Your rights',
    privacyText5: 'You have the right to:',
    privacyRight1: 'Request information about data stored about you',
    privacyRight2: 'Demand correction or deletion of your data',
    privacyRight3: 'Withdraw consent to data processing',
    privacySection6: '6. Contacts',
    privacyContact: 'For questions about personal data processing, contact: <a href="mailto:info@rentgroup.ge" style="color:#00D4AA">info@rentgroup.ge</a>',
    privacyUpdated: 'Last updated: April 2026'
  }
};

// ============================================
// LANGUAGE FUNCTIONS
// ============================================

function setLanguage(lang) {
  if (!translations[lang]) return;
  
  currentLang = lang;
  localStorage.setItem('rentgroup_lang', lang);
  
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
  
  // Update select options
  updateSelectOptions(lang);
  
  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // Update html lang
  document.documentElement.lang = lang;
}

function updateSelectOptions(lang) {
  // Budget select
  const budgetSelects = document.querySelectorAll('select[data-i18n-budget]');
  budgetSelects.forEach(select => {
    const options = select.querySelectorAll('option');
    if(options[0] && translations[lang].budgetSelect) options[0].textContent = translations[lang].budgetSelect;
    if(options[1] && translations[lang].budget50_100) options[1].textContent = translations[lang].budget50_100;
    if(options[2] && translations[lang].budget100_200) options[2].textContent = translations[lang].budget100_200;
    if(options[3] && translations[lang].budget200_300) options[3].textContent = translations[lang].budget200_300;
    if(options[4] && translations[lang].budget300_500) options[4].textContent = translations[lang].budget300_500;
    if(options[5] && translations[lang].budget500plus) options[5].textContent = translations[lang].budget500plus;
  });
  
  // Goal select
  const goalSelects = document.querySelectorAll('select[data-i18n-goal]');
  goalSelects.forEach(select => {
    const options = select.querySelectorAll('option');
    if(options[0] && translations[lang].goalSelect) options[0].textContent = translations[lang].goalSelect;
    if(options[1] && translations[lang].goalInvestment) options[1].textContent = translations[lang].goalInvestment;
    if(options[2] && translations[lang].goalLiving) options[2].textContent = translations[lang].goalLiving;
    if(options[3] && translations[lang].goalRent) options[3].textContent = translations[lang].goalRent;
    if(options[4] && translations[lang].goalVacation) options[4].textContent = translations[lang].goalVacation;
  });
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
    countries.forEach((country) => {
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
  
  const firstOptions = document.querySelectorAll('.country-list .country-option:first-child');
  firstOptions.forEach(opt => opt.classList.add('selected'));
}

function toggleCountryDropdown(element) {
  const wrapper = element.closest('.country-select-wrapper');
  const dropdown = wrapper.querySelector('.country-dropdown');
  const select = wrapper.querySelector('.country-select');
  
  document.querySelectorAll('.country-dropdown').forEach(d => {
    if (d !== dropdown) {
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
  const phoneInput = phoneField?.querySelector('.input-phone');
  const hiddenCode = phoneField?.querySelector('.selected-country-code');
  
  const flag = option.dataset.flag;
  const code = option.dataset.code;
  
  select.querySelector('.selected-flag').textContent = flag;
  select.querySelector('.selected-code').textContent = '+' + code;
  
  wrapper.querySelectorAll('.country-option').forEach(o => o.classList.remove('selected'));
  option.classList.add('selected');
  
  dropdown.classList.remove('show');
  select.classList.remove('active');
  
  if (hiddenCode) {
    hiddenCode.value = code;
  }
  
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

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", function(e) {
    if (e.target === this) {
      this.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

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
// PHONE CLEANING UTILS
// ============================================

function cleanPhoneNumber(phone, countryCode) {
  let clean = phone.replace(/\D/g, '');
  
  if (clean.startsWith(countryCode)) {
    clean = clean.substring(countryCode.length);
  }
  
  clean = clean.replace(/^0+/, '');
  
  return clean;
}

// ============================================
// FORM SUBMIT
// ============================================

async function sendForm(e, formType) {
  e.preventDefault();
  
  const form = e.target;
  
  if (!validateForm(form)) {
    const firstError = form.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ...';
  submitBtn.disabled = true;
  
  const formData = {};
  const inputs = form.querySelectorAll("input, select");
  let hasPhoneError = false;
  
  inputs.forEach(input => {
    if (input.classList.contains('selected-country-code') || 
        input.name === 'website' || 
        input.name === 'email2') {
      return;
    }
    
    if (input.classList.contains('input-phone')) {
      const phoneField = input.closest('.phone-field');
      const hiddenCode = phoneField?.querySelector('.selected-country-code');
      const countryCode = hiddenCode?.value || '995';
      
      let phoneValue = cleanPhoneNumber(input.value, countryCode);
      
      if (phoneValue.length < 7 || phoneValue.length > 15) {
        alert(currentLang === 'ru' ? 'Введите корректный номер телефона (7-15 цифр)' : 'Enter valid phone number (7-15 digits)');
        hasPhoneError = true;
        return;
      }
      
      formData['phone'] = '+' + countryCode + ' ' + phoneValue;
      formData['countryCode'] = '+' + countryCode;
    } else if (input.tagName !== 'SELECT' && input.value) {
      formData[input.name || input.placeholder] = input.value.trim();
    }
  });
  
  if (hasPhoneError) {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
    return;
  }
  
  if (!formData.phone) {
    alert(currentLang === 'ru' ? 'Введите номер телефона' : 'Enter phone number');
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
    return;
  }
  
  formData.formType = formType;
  formData.timestamp = new Date().toISOString();
  formData.language = currentLang;
  
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      
      if (typeof ym !== 'undefined') {
        ym(12345678, 'reachGoal', 'form_submit', { form_type: formType });
      }
      
      document.querySelectorAll(".modal").forEach(m => m.classList.remove("active"));
      
      const thanksModal = document.getElementById("modal-thanks");
      if (thanksModal) {
        thanksModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
      
      form.reset();
      form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      form.querySelectorAll('.field-error').forEach(el => el.remove());
      form.querySelectorAll('.phone-field').forEach(el => el.classList.remove('error'));
      
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
      return;
    } else {
      throw new Error("Server error");
    }
  } catch (error) {
    console.error("❌ Error:", error);
    alert(currentLang === 'ru' ? 'Ошибка. Попробуйте позже.' : 'Error. Try again later.');
  } finally {
    // Empty
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

// Make functions global
window.setLanguage = setLanguage;
window.initLanguage = initLanguage;