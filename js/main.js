/* ============================================
   主要 JavaScript 文件 - main.js
   整合所有功能模組
   ============================================ */

/**
 * 視差滾動效果
 */
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxLayers = document.querySelectorAll('.parallax-layer');

    parallaxLayers.forEach((layer, index) => {
        const speed = (index + 1) * 0.1;
        layer.style.transform = `translateY(${scrolled * speed}px)`;
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

/**
 * 美學洞察標籤切換
 */
function initAestheticTabs() {
    const aestheticTabs = document.querySelectorAll('.aesthetic-tab');
    const aestheticContents = document.querySelectorAll('.aesthetic-content');

    aestheticTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            aestheticTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            aestheticContents.forEach(content => {
                if (content.id === `tab-${targetTab}`) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
}

/**
 * 新增：身形指南標籤切換
 */
function initBodyShapeGuide() {
    const shapeBtns = document.querySelectorAll('.shape-btn');
    const shapeInfos = document.querySelectorAll('.shape-info');

    shapeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetShape = btn.getAttribute('data-shape');

            shapeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            shapeInfos.forEach(info => {
                if (info.getAttribute('data-shape-info') === targetShape) {
                    info.classList.add('active');
                } else {
                    info.classList.remove('active');
                }
            });
        });
    });
}

/**
 * 初始化新的 "Our Philosophy" 區塊的懸停效果
 */
function initPhilosophyHovers() {
    const points = document.querySelectorAll('.philosophy-point');
    points.forEach(point => {
        point.addEventListener('mouseenter', () => {
            point.classList.add('hovered');
        });
        point.addEventListener('mouseleave', () => {
            point.classList.remove('hovered');
        });
    });
}

/**
 * 通用滾動觀察器
 */
function initScrollObserver() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/**
 * 頁面載入處理
 */
function handlePageLoad() {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
}

/**
 * 初始化所有功能
 */
document.addEventListener('DOMContentLoaded', () => {
    // 初始化 ASCII 動畫
    initASCII();
    startASCIIAnimation();

    // 初始化語言切換
    initLanguageSwitcher();

    // 初始化導航
    initNavbar();
    initMenuToggle();
    initModals();
    initCopyEmail();
    initSmoothScroll();

    // 初始化標籤
    initAestheticTabs();
    initBodyShapeGuide();

    // 初始化滾動觀察器
    initScrollObserver();

    // 初始化新的 "Our Philosophy" 互動
    initPhilosophyHovers();
});

// 頁面載入完成
window.addEventListener('load', () => {
    handlePageLoad();
});