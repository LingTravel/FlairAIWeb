/* ============================================
   色盤功能文件 - colorWheel.js (重寫版)
   HSL互動式色相環和配色方案生成
   ============================================ */

// 全局變量
let currentHue = 0;
let currentSaturation = 100;
let currentLightness = 50;
let isDragging = false;

/**
 * HSL 轉 RGB
 */
function hslToRgb(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

/**
 * RGB 轉 HEX
 */
function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join('').toUpperCase();
}

/**
 * 獲取當前顏色的 HEX 值
 */
function getCurrentColorHex() {
    const rgb = hslToRgb(currentHue, currentSaturation, currentLightness);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * 獲取當前顏色的 HSL 字串
 */
function getCurrentColorHsl() {
    return `hsl(${currentHue}, ${currentSaturation}%, ${currentLightness}%)`;
}

/**
 * 繪製 HSL 色相環
 */
function drawColorWheel() {
    const canvas = document.getElementById('hslColorWheel');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = canvas.width / 2 - 10;
    const innerRadius = outerRadius * 0.55;

    // 清空畫布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 繪製色相環
    for (let angle = 0; angle < 360; angle += 0.5) {
        const startAngle = (angle - 90) * Math.PI / 180;
        const endAngle = (angle + 0.5 - 90) * Math.PI / 180;

        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
        ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(
            centerX + Math.cos(startAngle) * innerRadius,
            centerY + Math.sin(startAngle) * innerRadius,
            centerX + Math.cos(startAngle) * outerRadius,
            centerY + Math.sin(startAngle) * outerRadius
        );

        gradient.addColorStop(0, `hsl(${angle}, 100%, 50%)`);
        gradient.addColorStop(1, `hsl(${angle}, 100%, 50%)`);

        ctx.fillStyle = `hsl(${angle}, 100%, 50%)`;
        ctx.fill();
    }
}

/**
 * 更新選擇器位置
 */
function updateSelectorPosition() {
    const selector = document.getElementById('hslSelector');
    if (!selector) return;

    const canvas = document.getElementById('hslColorWheel');
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const radius = (canvas.offsetWidth / 2 - 10) * 0.775; // 中間位置

    const angleRad = (currentHue - 90) * Math.PI / 180;
    const x = centerX + Math.cos(angleRad) * radius;
    const y = centerY + Math.sin(angleRad) * radius;

    selector.style.left = `${x}px`;
    selector.style.top = `${y}px`;
}

/**
 * 更新顏色預覽
 */
function updateColorPreview() {
    const preview = document.querySelector('.current-color-preview');
    if (preview) {
        preview.style.backgroundColor = getCurrentColorHsl();
    }
}

/**
 * 更新顏色代碼顯示
 */
function updateColorCodes() {
    const hexValue = document.getElementById('hexValue');
    const hslValue = document.getElementById('hslValue');

    if (hexValue) hexValue.textContent = getCurrentColorHex();
    if (hslValue) hslValue.textContent = `${currentHue}, ${currentSaturation}%, ${currentLightness}%`;
}

/**
 * 更新滑桿背景
 */
function updateSliderBackgrounds() {
    // 明度滑桿
    const lightnessTrack = document.getElementById('lightnessTrack');
    if (lightnessTrack) {
        lightnessTrack.style.background = `linear-gradient(to right, 
            hsl(${currentHue}, ${currentSaturation}%, 0%), 
            hsl(${currentHue}, ${currentSaturation}%, 50%), 
            hsl(${currentHue}, ${currentSaturation}%, 100%))`;
    }

    // 飽和度滑桿
    const saturationTrack = document.getElementById('saturationTrack');
    if (saturationTrack) {
        saturationTrack.style.background = `linear-gradient(to right, 
            hsl(${currentHue}, 0%, ${currentLightness}%), 
            hsl(${currentHue}, 100%, ${currentLightness}%))`;
    }
}

/**
 * 更新所有顯示
 */
function updateAllDisplays() {
    updateSelectorPosition();
    updateColorPreview();
    updateColorCodes();
    updateSliderBackgrounds();
    generateColorSchemes();
}

/**
 * 處理色相環點擊/拖動
 */
function handleWheelInteraction(e) {
    const canvas = document.getElementById('hslColorWheel');
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    // 計算距離中心的距離
    const distance = Math.sqrt(x * x + y * y);
    const outerRadius = rect.width / 2 - 10;
    const innerRadius = outerRadius * 0.55;

    // 只在環形區域內響應
    if (distance >= innerRadius && distance <= outerRadius) {
        let angle = Math.atan2(y, x) * 180 / Math.PI + 90;
        if (angle < 0) angle += 360;

        currentHue = Math.round(angle);
        updateAllDisplays();
    }
}

/**
 * 生成配色方案
 */
function generateColorSchemes() {
    const schemesGrid = document.getElementById('schemesGrid');
    if (!schemesGrid) return;

    const schemes = [
        {
            name: { 'zh-TW': '互補色', 'ja': '補色', 'en': 'Complementary' },
            desc: { 'zh-TW': '強烈對比，充滿活力', 'ja': '強いコントラスト、活力的', 'en': 'Strong contrast, vibrant' },
            application: { 'zh-TW': '適合重要場合', 'ja': '重要な場面に', 'en': 'For important occasions' },
            hues: [(currentHue + 180) % 360]
        },
        {
            name: { 'zh-TW': '類比色', 'ja': '類似色', 'en': 'Analogous' },
            desc: { 'zh-TW': '和諧統一，自然舒適', 'ja': '調和的、自然な快適さ', 'en': 'Harmonious, naturally comfortable' },
            application: { 'zh-TW': '適合日常穿搭', 'ja': '日常の着こなしに', 'en': 'For daily wear' },
            hues: [(currentHue - 30 + 360) % 360, (currentHue + 30) % 360]
        },
        {
            name: { 'zh-TW': '三色組', 'ja': '三色配色', 'en': 'Triadic' },
            desc: { 'zh-TW': '平衡豐富，活潑生動', 'ja': 'バランスが取れた豊かさ', 'en': 'Balanced and rich' },
            application: { 'zh-TW': '適合創意搭配', 'ja': 'クリエイティブなコーディネートに', 'en': 'For creative styling' },
            hues: [(currentHue + 120) % 360, (currentHue + 240) % 360]
        },
        {
            name: { 'zh-TW': '分裂互補', 'ja': '分裂補色', 'en': 'Split Complementary' },
            desc: { 'zh-TW': '對比柔和，視覺豐富', 'ja': '柔らかいコントラスト', 'en': 'Softer contrast, visually rich' },
            application: { 'zh-TW': '適合優雅造型', 'ja': 'エレガントなスタイルに', 'en': 'For elegant looks' },
            hues: [(currentHue + 150) % 360, (currentHue + 210) % 360]
        },
        {
            name: { 'zh-TW': '單色系', 'ja': '単色系', 'en': 'Monochromatic' },
            desc: { 'zh-TW': '優雅簡約，統一協調', 'ja': 'エレガントでシンプル', 'en': 'Elegant and simple' },
            application: { 'zh-TW': '適合正式場合', 'ja': 'フォーマルな場面に', 'en': 'For formal occasions' },
            hues: [],
            isMonochromatic: true
        }
    ];

    const currentLang = document.querySelector('.lang-btn.active')?.getAttribute('data-lang') || 'zh-TW';

    schemesGrid.innerHTML = schemes.map(scheme => {
        let colors = [];
        
        if (scheme.isMonochromatic) {
            // 單色系：不同明度
            colors = [
                `hsl(${currentHue}, ${currentSaturation}%, 30%)`,
                `hsl(${currentHue}, ${currentSaturation}%, 50%)`,
                `hsl(${currentHue}, ${currentSaturation}%, 70%)`,
                `hsl(${currentHue}, ${currentSaturation}%, 90%)`
            ];
        } else {
            // 加入當前顏色
            colors = [`hsl(${currentHue}, ${currentSaturation}%, ${currentLightness})`];
            // 加入方案中的其他色相
            scheme.hues.forEach(hue => {
                colors.push(`hsl(${hue}, ${currentSaturation}%, ${currentLightness}%)`);
            });
        }

        const colorSwatches = colors.map(color => 
            `<div class="scheme-color-swatch" style="background-color: ${color};" 
                  onclick="copyColorCode('${color}')"></div>`
        ).join('');

        return `
            <div class="scheme-card">
                <div class="scheme-colors">${colorSwatches}</div>
                <div class="scheme-info">
                    <h4 class="scheme-name">${scheme.name[currentLang]}</h4>
                    <p class="scheme-description">${scheme.desc[currentLang]}</p>
                    <p class="scheme-application">${scheme.application[currentLang]}</p>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * 複製顏色代碼
 */
function copyColorCode(color) {
    navigator.clipboard.writeText(color).then(() => {
        // 簡單的複製成功提示
        console.log('已複製顏色:', color);
    });
}

/**
 * 初始化色盤
 */
function initColorWheel() {
    // 繪製色相環
    drawColorWheel();
    updateAllDisplays();

    // 色相環點擊事件
    const canvas = document.getElementById('hslColorWheel');
    if (canvas) {
        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            handleWheelInteraction(e);
        });

        canvas.addEventListener('mousemove', (e) => {
            if (isDragging) {
                handleWheelInteraction(e);
            }
        });

        canvas.addEventListener('mouseup', () => {
            isDragging = false;
        });

        canvas.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        // 觸控支持
        canvas.addEventListener('touchstart', (e) => {
            isDragging = true;
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            handleWheelInteraction(mouseEvent);
            e.preventDefault();
        });

        canvas.addEventListener('touchmove', (e) => {
            if (isDragging) {
                const touch = e.touches[0];
                const mouseEvent = new MouseEvent('mousemove', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                handleWheelInteraction(mouseEvent);
                e.preventDefault();
            }
        });

        canvas.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    // 明度滑桿
    const lightnessSlider = document.getElementById('lightnessSlider');
    const lightnessValue = document.getElementById('lightnessValue');
    if (lightnessSlider) {
        lightnessSlider.addEventListener('input', (e) => {
            currentLightness = parseInt(e.target.value);
            if (lightnessValue) lightnessValue.textContent = `${currentLightness}%`;
            updateAllDisplays();
        });
    }

    // 飽和度滑桿
    const saturationSlider = document.getElementById('saturationSlider');
    const saturationValue = document.getElementById('saturationValue');
    if (saturationSlider) {
        saturationSlider.addEventListener('input', (e) => {
            currentSaturation = parseInt(e.target.value);
            if (saturationValue) saturationValue.textContent = `${currentSaturation}%`;
            updateAllDisplays();
        });
    }

    // 複製按鈕
    document.querySelectorAll('.copy-code-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-copy');
            let textToCopy = '';
            
            if (type === 'hex') {
                textToCopy = getCurrentColorHex();
            } else if (type === 'hsl') {
                textToCopy = getCurrentColorHsl();
            }

            navigator.clipboard.writeText(textToCopy).then(() => {
                btn.style.color = '#D4AF37';
                setTimeout(() => {
                    btn.style.color = '';
                }, 1000);
            });
        });
    });

    // 理論說明切換
    const theoryToggle = document.getElementById('theoryToggle');
    const theoryContent = document.getElementById('theoryContent');
    if (theoryToggle && theoryContent) {
        theoryToggle.addEventListener('click', () => {
            theoryToggle.classList.toggle('active');
            theoryContent.classList.toggle('active');
        });
    }
}

// 窗口大小調整時重繪
window.addEventListener('resize', () => {
    drawColorWheel();
    updateSelectorPosition();
});