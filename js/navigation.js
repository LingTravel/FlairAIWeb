/* ============================================
   導航功能文件 - navigation.js
   處理導航欄、選單、模態窗口等
   ============================================ */

/**
 * 初始化導航欄滾動效果
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * 初始化選單切換
 */
function initMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const lightweightMenu = document.getElementById('lightweightMenu');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        lightweightMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!lightweightMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            lightweightMenu.classList.remove('active');
        }
    });

    // Menu item click
    document.querySelectorAll('.lightweight-menu-items a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            lightweightMenu.classList.remove('active');
        });
    });
}

/**
 * 初始化模態窗口
 */
function initModals() {
    // Terms Modal
    const termsModal = document.getElementById('termsModal');
    const termsLink = document.getElementById('termsLink');
    const termsClose = document.getElementById('termsClose');

    termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        termsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    termsClose.addEventListener('click', () => {
        termsModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Privacy Modal
    const privacyModal = document.getElementById('privacyModal');
    const privacyLink = document.getElementById('privacyLink');
    const privacyClose = document.getElementById('privacyClose');

    privacyLink.addEventListener('click', (e) => {
        e.preventDefault();
        privacyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    privacyClose.addEventListener('click', () => {
        privacyModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Contact Modal
    const contactModal = document.getElementById('contactModal');
    const contactLink = document.getElementById('contactLink');
    const contactClose = document.getElementById('contactClose');

    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    contactClose.addEventListener('click', () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // 點擊外部關閉
    [termsModal, privacyModal, contactModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // ESC 鍵關閉
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            termsModal.classList.remove('active');
            privacyModal.classList.remove('active');
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

/**
 * 複製郵箱功能
 */
function initCopyEmail() {
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    
    copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('notlinginotling@gmail.com').then(() => {
            const originalHTML = copyEmailBtn.innerHTML;
            copyEmailBtn.classList.add('copied');

            const currentLang = document.querySelector('.lang-btn.active')?.getAttribute('data-lang') || 'zh-TW';
            
            if (currentLang === 'zh-TW') {
                copyEmailBtn.textContent = '已複製！';
            } else if (currentLang === 'ja') {
                copyEmailBtn.textContent = 'コピーしました！';
            } else {
                copyEmailBtn.textContent = 'Copied!';
            }

            setTimeout(() => {
                copyEmailBtn.classList.remove('copied');
                copyEmailBtn.innerHTML = originalHTML;
            }, 2000);
        });
    });
}

/**
 * 平滑滾動
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}