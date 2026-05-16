/**
 * 🎨 نظام إدارة الثيمات المتقدم
 * ─────────────────────────────────────────
 * يدعم 7 ثيمات مختلفة مع حفظ التفضيلات وتبديل ديناميكي
 */

class ThemeManager {
  constructor() {
    this.themes = {
      light: {
        name: '🌞 فاتح',
        label: 'Light',
        description: 'موضوع فاتح كلاسيكي',
      },
      dark: {
        name: '🌙 مظلم',
        label: 'Dark',
        description: 'موضوع مظلم محسّن',
      },
      sunset: {
        name: '🌅 غروب',
        label: 'Sunset',
        description: 'برتقالي/وردي مريح للعيون',
      },
      ocean: {
        name: '🌊 المحيط',
        label: 'Ocean',
        description: 'أزرق متدرج وهادئ',
      },
      forest: {
        name: '🍃 الغابة',
        label: 'Forest',
        description: 'أخضر طبيعي منعش',
      },
      mountain: {
        name: '🏔️ الجبل',
        label: 'Mountain',
        description: 'رمادي متدرج فاخر',
      },
      custom: {
        name: '🎨 مخصص',
        label: 'Custom',
        description: 'اختر ألوانك المفضلة',
      },
    };

    this.currentTheme = 'light';
    this.autoScheduleEnabled = false;
    this.customColors = {};
    this.init();
  }

  /**
   * تهيئة نظام الثيمات
   */
  init() {
    this.loadPreferences();
    this.applyTheme(this.currentTheme);
    this.setupAutoSchedule();
    this.setupEventListeners();
    this.injectStyles();
  }

  /**
   * حقن أنماط CSS للثيمات المختلفة
   */
  injectStyles() {
    const styleId = 'theme-manager-styles';
    if (document.getElementById(styleId)) return;

    const styles = document.createElement('style');
    styles.id = styleId;
    styles.textContent = `
      /* ═══ متغيرات الثيمات الأساسية ═══ */
      
      [data-theme="light"] {
        --theme-primary: #3b82f6;
        --theme-secondary: #06b6d4;
        --bg: #f3f4f6;
        --bg-secondary: #f9fafb;
        --card-bg: #ffffff;
        --card-border: #e5e7eb;
        --text: #111827;
        --text2: #6b7280;
        --shadow-sm: 0 1px 4px rgba(0,0,0,.08);
        --shadow-md: 0 4px 16px rgba(0,0,0,.12);
        --shadow-lg: 0 8px 32px rgba(0,0,0,.16);
      }

      /* ═══ ثيم مظلم محسّن (Blue Light Filter) ═══ */
      [data-theme="dark"] {
        --theme-primary: #60a5fa;
        --theme-secondary: #22d3ee;
        --bg: #0f172a;
        --bg-secondary: #111827;
        --card-bg: #1f2937;
        --card-border: #374151;
        --text: #f9fafb;
        --text2: #9ca3af;
        --shadow-sm: 0 1px 4px rgba(0,0,0,.25);
        --shadow-md: 0 4px 16px rgba(0,0,0,.3);
        --shadow-lg: 0 8px 32px rgba(0,0,0,.4);
      }

      /* ═══ ثيم الغروب (Sunset) ═══ */
      [data-theme="sunset"] {
        --theme-primary: #f97316;
        --theme-secondary: #ec4899;
        --bg: #fffbf0;
        --bg-secondary: #fef3c7;
        --card-bg: #ffffff;
        --card-border: #fed7aa;
        --text: #7c2d12;
        --text2: #9a3412;
        --shadow-sm: 0 1px 4px rgba(249,115,22,.08);
        --shadow-md: 0 4px 16px rgba(249,115,22,.12);
        --shadow-lg: 0 8px 32px rgba(249,115,22,.16);
      }

      /* ═══ ثيم المحيط (Ocean) ═══ */
      [data-theme="ocean"] {
        --theme-primary: #0284c7;
        --theme-secondary: #06b6d4;
        --bg: #f0f9ff;
        --bg-secondary: #e0f2fe;
        --card-bg: #ffffff;
        --card-border: #bae6fd;
        --text: #082f49;
        --text2: #0c4a6e;
        --shadow-sm: 0 1px 4px rgba(2,132,199,.08);
        --shadow-md: 0 4px 16px rgba(2,132,199,.12);
        --shadow-lg: 0 8px 32px rgba(2,132,199,.16);
      }

      /* ═══ ثيم الغابة (Forest) ═══ */
      [data-theme="forest"] {
        --theme-primary: #059669;
        --theme-secondary: #10b981;
        --bg: #ecfdf5;
        --bg-secondary: #d1fae5;
        --card-bg: #f0fdf4;
        --card-border: #a7f3d0;
        --text: #022c22;
        --text2: #065f46;
        --shadow-sm: 0 1px 4px rgba(5,150,105,.08);
        --shadow-md: 0 4px 16px rgba(5,150,105,.12);
        --shadow-lg: 0 8px 32px rgba(5,150,105,.16);
      }

      /* ═══ ثيم الجبل (Mountain) ═══ */
      [data-theme="mountain"] {
        --theme-primary: #6b7280;
        --theme-secondary: #9ca3af;
        --bg: #f9fafb;
        --bg-secondary: #f3f4f6;
        --card-bg: #ffffff;
        --card-border: #d1d5db;
        --text: #1f2937;
        --text2: #4b5563;
        --shadow-sm: 0 1px 4px rgba(107,114,128,.08);
        --shadow-md: 0 4px 16px rgba(107,114,128,.12);
        --shadow-lg: 0 8px 32px rgba(107,114,128,.16);
      }

      /* ═══ ثيم مخصص (Custom) ═══ */
      [data-theme="custom"] {
        --bg: var(--custom-bg, #f3f4f6);
        --bg-secondary: var(--custom-bg-secondary, #f9fafb);
        --card-bg: var(--custom-card-bg, #ffffff);
        --card-border: var(--custom-card-border, #e5e7eb);
        --text: var(--custom-text, #111827);
        --text2: var(--custom-text2, #6b7280);
        --theme-primary: var(--custom-primary, #3b82f6);
        --theme-secondary: var(--custom-secondary, #06b6d4);
      }

      /* ═══ انتقالات سلسة ═══ */
      html {
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      body {
        background-color: var(--bg);
        color: var(--text);
      }

      /* ═══ أزرار اختيار الثيم ═══ */
      .theme-selector {
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 9999;
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 12px;
        padding: 16px;
        box-shadow: var(--shadow-lg);
        direction: rtl;
      }

      .theme-selector-toggle {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        background: var(--theme-primary);
        color: white;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-md);
      }

      .theme-selector-toggle:hover {
        transform: scale(1.1);
        box-shadow: var(--shadow-lg);
      }

      .theme-selector-menu {
        display: none;
        position: absolute;
        bottom: 70px;
        left: 0;
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 12px;
        padding: 12px;
        min-width: 280px;
        box-shadow: var(--shadow-lg);
        max-height: 400px;
        overflow-y: auto;
      }

      .theme-selector-menu.active {
        display: block;
        animation: slideUp 0.3s ease;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .theme-option {
        padding: 12px 16px;
        margin: 8px 0;
        border: 2px solid transparent;
        border-radius: 8px;
        background: var(--bg-secondary);
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: right;
      }

      .theme-option:hover {
        background: var(--bg);
        border-color: var(--theme-primary);
        transform: translateX(-4px);
      }

      .theme-option.active {
        border-color: var(--theme-primary);
        background: var(--theme-primary);
        color: white;
      }

      .theme-option-title {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 4px;
      }

      .theme-option-desc {
        font-size: 12px;
        opacity: 0.8;
      }

      .theme-option.active .theme-option-desc {
        opacity: 0.95;
      }

      /* ═══ قسم التوقيت التلقائي ═══ */
      .auto-schedule-section {
        border-top: 1px solid var(--card-border);
        margin-top: 12px;
        padding-top: 12px;
      }

      .auto-schedule-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 13px;
        margin-bottom: 8px;
      }

      .auto-schedule-label input {
        margin-left: 8px;
        cursor: pointer;
      }

      .schedule-time-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-top: 8px;
        padding: 8px;
        background: var(--bg);
        border-radius: 6px;
        display: none;
      }

      .schedule-time-inputs.active {
        display: grid;
      }

      .schedule-time-inputs input {
        padding: 6px 8px;
        border: 1px solid var(--card-border);
        border-radius: 4px;
        font-size: 12px;
        background: var(--card-bg);
        color: var(--text);
      }

      /* ═══ مؤشر الثيم الحالي في شريط الحالة ═══ */
      .theme-indicator {
        position: fixed;
        top: 20px;
        left: 20px;
        padding: 8px 12px;
        border-radius: 6px;
        background: var(--theme-primary);
        color: white;
        font-size: 12px;
        z-index: 9998;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }

      .theme-indicator.show {
        opacity: 1;
      }

      /* ═══ تحسينات Blue Light Filter للوضع المظلم ═══ */
      [data-theme="dark"] {
        --blue-light-filter: 1.1;
      }

      [data-theme="dark"] a {
        color: #60a5fa;
      }

      [data-theme="dark"] button:not(.pwa-install-btn) {
        background: var(--theme-primary);
        color: #000f1f;
      }

      /* ═══ استجابة للإضاءة المحيطة ═══ */
      @media (prefers-color-scheme: dark) {
        /* سيتم تطبيقه إذا كان التفضيل التلقائي مفعلاً */
      }

      /* ═══ تحسينات للإمكانية والتباين ═══ */
      @media (prefers-contrast: more) {
        .theme-option {
          border-width: 3px;
        }
        
        .theme-selector-toggle {
          border: 2px solid white;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  /**
   * تطبيق الثيم
   */
  applyTheme(themeName) {
    // التحقق من وجود الثيم
    if (!this.themes[themeName]) {
      console.warn(`الثيم "${themeName}" غير موجود، استخدام "light"`);
      themeName = 'light';
    }

    this.currentTheme = themeName;
    const htmlElement = document.documentElement;

    // تطبيق الثيم على عنصر HTML
    htmlElement.setAttribute('data-theme', themeName);

    // تطبيق الألوان المخصصة إذا لزم الأمر
    if (themeName === 'custom' && this.customColors && Object.keys(this.customColors).length > 0) {
      Object.entries(this.customColors).forEach(([key, value]) => {
        htmlElement.style.setProperty(`--custom-${key}`, value);
      });
    }

    // حفظ التفضيل
    this.savePreferences();

    // تحديث زر الثيم النشط
    this.updateThemeUI();

    // إظهار مؤشر التبديل
    this.showThemeIndicator();

    console.log(`✓ تم تطبيق الثيم: ${this.themes[themeName].name}`);
  }

  /**
   * تحديث واجهة المستخدم لأزرار الثيم
   */
  updateThemeUI() {
    const options = document.querySelectorAll('.theme-option');
    options.forEach((option) => {
      const themeName = option.getAttribute('data-theme');
      option.classList.toggle('active', themeName === this.currentTheme);
    });
  }

  /**
   * إظهار مؤشر تبديل الثيم
   */
  showThemeIndicator() {
    let indicator = document.getElementById('theme-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'theme-indicator';
      indicator.className = 'theme-indicator';
      document.body.appendChild(indicator);
    }

    const theme = this.themes[this.currentTheme];
    indicator.textContent = `${theme.name}`;
    indicator.classList.add('show');

    clearTimeout(this.indicatorTimeout);
    this.indicatorTimeout = setTimeout(() => {
      indicator.classList.remove('show');
    }, 2000);
  }

  /**
   * إنشاء واجهة اختيار الثيم
   */
  createThemeSelector() {
    // التحقق من عدم وجود منتقي ثيم موجود
    if (document.getElementById('theme-selector')) return;

    const selector = document.createElement('div');
    selector.id = 'theme-selector';
    selector.className = 'theme-selector';
    selector.innerHTML = `
      <button class="theme-selector-toggle" title="اختر الثيم">🎨</button>
      <div class="theme-selector-menu">
        <div style="padding-bottom: 12px; border-bottom: 1px solid var(--card-border); margin-bottom: 12px;">
          <div style="font-weight: bold; margin-bottom: 4px;">🎨 اختر الثيم</div>
          <div style="font-size: 11px; opacity: 0.7;">أختر من 7 ثيمات جميلة</div>
        </div>

        ${Object.entries(this.themes)
          .map(
            ([key, theme]) => `
          <div class="theme-option" data-theme="${key}" title="${theme.description}">
            <div class="theme-option-title">${theme.name}</div>
            <div class="theme-option-desc">${theme.description}</div>
          </div>
        `
          )
          .join('')}

        <div class="auto-schedule-section">
          <label class="auto-schedule-label">
            <input type="checkbox" id="auto-schedule-checkbox" ${this.autoScheduleEnabled ? 'checked' : ''}>
            <span>⏰ تفعيل الجدول الزمني</span>
          </label>
          <div class="schedule-time-inputs ${this.autoScheduleEnabled ? 'active' : ''}">
            <div>
              <label style="font-size: 11px; display: block; margin-bottom: 4px;">Dark من</label>
              <input type="time" id="dark-start-time" value="18:00">
            </div>
            <div>
              <label style="font-size: 11px; display: block; margin-bottom: 4px;">إلى</label>
              <input type="time" id="dark-end-time" value="06:00">
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(selector);
    this.setupThemeSelectorEvents();
  }

  /**
   * إعداد الأحداث الخاصة بمنتقي الثيم
   */
  setupThemeSelectorEvents() {
    const toggle = document.querySelector('.theme-selector-toggle');
    const menu = document.querySelector('.theme-selector-menu');
    const options = document.querySelectorAll('.theme-option');
    const autoScheduleCheckbox = document.getElementById('auto-schedule-checkbox');
    const darkStartTime = document.getElementById('dark-start-time');
    const darkEndTime = document.getElementById('dark-end-time');

    // فتح/إغلاق القائمة
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });

    // إغلاق القائمة عند الضغط خارجها
    document.addEventListener('click', (e) => {
      if (!document.getElementById('theme-selector').contains(e.target)) {
        menu.classList.remove('active');
      }
    });

    // اختيار الثيم
    options.forEach((option) => {
      option.addEventListener('click', () => {
        const themeName = option.getAttribute('data-theme');
        this.applyTheme(themeName);
      });
    });

    // التوقيت التلقائي
    autoScheduleCheckbox.addEventListener('change', () => {
      this.autoScheduleEnabled = autoScheduleCheckbox.checked;
      document.querySelector('.schedule-time-inputs').classList.toggle('active');
      this.savePreferences();
      this.setupAutoSchedule();
    });

    // تحديث أوقات الجدول الزمني
    [darkStartTime, darkEndTime].forEach((input) => {
      input.addEventListener('change', () => {
        this.scheduleStartTime = darkStartTime.value;
        this.scheduleEndTime = darkEndTime.value;
        this.savePreferences();
        this.setupAutoSchedule();
      });
    });

    // تعيين القيم المحفوظة
    if (this.scheduleStartTime) darkStartTime.value = this.scheduleStartTime;
    if (this.scheduleEndTime) darkEndTime.value = this.scheduleEndTime;
  }

  /**
   * إعداد الجدول الزمني التلقائي
   */
  setupAutoSchedule() {
    clearInterval(this.scheduleCheckInterval);

    if (!this.autoScheduleEnabled) return;

    const checkSchedule = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const startTime = this.scheduleStartTime || '18:00';
      const endTime = this.scheduleEndTime || '06:00';

      let shouldBeDark;
      if (startTime < endTime) {
        // مثلاً: 06:00 إلى 18:00 (نهار)
        shouldBeDark = currentTime >= startTime && currentTime < endTime;
      } else {
        // مثلاً: 18:00 إلى 06:00 (ليل)
        shouldBeDark = currentTime >= startTime || currentTime < endTime;
      }

      if (shouldBeDark && this.currentTheme !== 'dark') {
        this.applyTheme('dark');
      } else if (!shouldBeDark && this.currentTheme === 'dark' && !this.autoScheduleEnabled) {
        // هذا يفترض أن الثيم الافتراضي هو light
        this.applyTheme('light');
      }
    };

    // فحص فوري
    checkSchedule();

    // فحص كل دقيقة
    this.scheduleCheckInterval = setInterval(checkSchedule, 60000);
  }

  /**
   * حفظ التفضيلات في التخزين المحلي
   */
  savePreferences() {
    const preferences = {
      theme: this.currentTheme,
      autoScheduleEnabled: this.autoScheduleEnabled,
      scheduleStartTime: this.scheduleStartTime || '18:00',
      scheduleEndTime: this.scheduleEndTime || '06:00',
      customColors: this.customColors,
    };

    try {
      localStorage.setItem('themePreferences', JSON.stringify(preferences));
      console.log('✓ تم حفظ التفضيلات');
    } catch (e) {
      console.warn('فشل حفظ التفضيلات في localStorage:', e);
    }
  }

  /**
   * تحميل التفضيلات المحفوظة
   */
  loadPreferences() {
    try {
      const saved = localStorage.getItem('themePreferences');
      if (saved) {
        const preferences = JSON.parse(saved);
        this.currentTheme = preferences.theme || 'light';
        this.autoScheduleEnabled = preferences.autoScheduleEnabled || false;
        this.scheduleStartTime = preferences.scheduleStartTime || '18:00';
        this.scheduleEndTime = preferences.scheduleEndTime || '06:00';
        this.customColors = preferences.customColors || {};
        console.log('✓ تم تحميل التفضيلات المحفوظة');
      }
    } catch (e) {
      console.warn('فشل تحميل التفضيلات:', e);
      this.currentTheme = 'light';
    }
  }

  /**
   * إعداد المستمعين العامين
   */
  setupEventListeners() {
    // الاستجابة لتغيير تفضيل prefers-color-scheme
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      darkModeQuery.addEventListener('change', (e) => {
        if (!this.autoScheduleEnabled) {
          const newTheme = e.matches ? 'dark' : 'light';
          console.log(`📱 تفضيل النظام: ${newTheme}`);
        }
      });
    }
  }

  /**
   * تعيين ألوان مخصصة
   */
  setCustomColors(colors) {
    this.customColors = { ...colors };
    if (this.currentTheme === 'custom') {
      this.applyTheme('custom');
    }
  }
}

// إنشاء نسخة عامة من مدير الثيم
window.themeManager = new ThemeManager();

// إنشاء منتقي الثيم عند تحميل الصفحة بالكامل
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.themeManager.createThemeSelector();
  });
} else {
  window.themeManager.createThemeSelector();
}

console.log('%c🎨 نظام الثيمات المتقدم جاهز!', 'color: #10b981; font-size: 16px; font-weight: bold;');
