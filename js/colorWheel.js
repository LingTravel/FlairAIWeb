/* ============================================
   色盤功能文件 - colorWheel.js (重構版)
   全新日式雜誌風格的色彩理論互動
   ============================================ */

// 確保文檔加載完畢
document.addEventListener('DOMContentLoaded', () => {
    const colorWheel = new ColorTheoryModule();
});

class ColorTheoryModule {
    constructor() {
        // 狀態變量
        this.hue = 0;
        this.saturation = 20;
        this.lightness = 68;
        this.isDragging = false;

        // 獲取 DOM 元素
        this.cacheDOMElements();

        // 檢查元素是否存在
        if (!this.canvas) {
            console.log("色彩理論模塊未在當前頁面加載。");
            return;
        }

        // 初始化
        this.init();
    }

    cacheDOMElements() {
        this.canvas = document.getElementById('hslColorWheelNew');
        this.selector = document.getElementById('colorWheelSelector');
        
        this.previewMain = document.getElementById('colorPreviewMain');
        this.nameMain = document.getElementById('colorNameMain');
        this.codeMain = document.getElementById('colorCodeMain');

        this.hueSlider = document.getElementById('hueSliderNew');
        this.saturationSlider = document.getElementById('saturationSliderNew');
        this.lightnessSlider = document.getElementById('lightnessSliderNew');

        this.hueValue = document.getElementById('hueValueNew');
        this.saturationValue = document.getElementById('saturationValueNew');
        this.lightnessValue = document.getElementById('lightnessValueNew');

        this.dataDisplay = document.getElementById('colorDataDisplay');
        this.schemesContainer = document.getElementById('colorSchemesNew');
    }

    init() {
        this.ctx = this.canvas.getContext('2d');
        this.drawColorWheel();
        this.addEventListeners();
        this.updateAll();
    }

    addEventListeners() {
        // 畫布交互
        this.canvas.addEventListener('mousedown', this.startDrag.bind(this));
        this.canvas.addEventListener('mousemove', this.drag.bind(this));
        this.canvas.addEventListener('mouseup', this.endDrag.bind(this));
        this.canvas.addEventListener('mouseleave', this.endDrag.bind(this));
        // 觸控
        this.canvas.addEventListener('touchstart', this.startDrag.bind(this));
        this.canvas.addEventListener('touchmove', this.drag.bind(this));
        this.canvas.addEventListener('touchend', this.endDrag.bind(this));

        // 滑桿交互
        this.hueSlider.addEventListener('input', e => {
            this.hue = parseInt(e.target.value);
            this.updateAll();
        });
        this.saturationSlider.addEventListener('input', e => {
            this.saturation = parseInt(e.target.value);
            this.updateAll();
        });
        this.lightnessSlider.addEventListener('input', e => {
            this.lightness = parseInt(e.target.value);
            this.updateAll();
        });

        // 窗口大小調整
        window.addEventListener('resize', () => {
            this.drawColorWheel();
            this.updateSelectorPosition();
        });

        // 語言變更監聽
        document.addEventListener('language-changed', () => {
            this.generateColorSchemes();
            this.updateColorData();
        });
    }

    // --- 交互處理 ---
    startDrag(e) {
        this.isDragging = true;
        this.handleInteraction(e);
    }

    drag(e) {
        if (this.isDragging) {
            this.handleInteraction(e);
        }
    }

    endDrag() {
        this.isDragging = false;
    }

    handleInteraction(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const x = clientX - rect.left - centerX;
        const y = clientY - rect.top - centerY;

        let angle = Math.atan2(y, x) * 180 / Math.PI;
        if (angle < 0) angle += 360;

        this.hue = Math.round(angle);
        this.updateAll();
    }

    // --- 繪製與更新 ---
    drawColorWheel() {
        const size = this.canvas.width;
        const center = size / 2;
        const radius = size / 2;

        this.ctx.clearRect(0, 0, size, size);

        for (let angle = 0; angle < 360; angle++) {
            const startAngle = (angle - 1) * Math.PI / 180;
            const endAngle = angle * Math.PI / 180;
            this.ctx.beginPath();
            this.ctx.moveTo(center, center);
            this.ctx.arc(center, center, radius, startAngle, endAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = `hsl(${angle}, 100%, 50%)`;
            this.ctx.fill();
        }
    }

    updateAll() {
        this.updateSliders();
        this.updateSelectorPosition();
        this.updateDisplays();
        this.generateColorSchemes();
        this.updateColorData();
    }

    updateSliders() {
        this.hueSlider.value = this.hue;
        this.saturationSlider.value = this.saturation;
        this.lightnessSlider.value = this.lightness;

        this.hueValue.textContent = `${this.hue}°`;
        this.saturationValue.textContent = `${this.saturation}%`;
        this.lightnessValue.textContent = `${this.lightness}%`;
    }

    updateSelectorPosition() {
        const rect = this.canvas.getBoundingClientRect();
        const center = rect.width / 2;
        const radius = center * 0.8; // 選擇器軌道半徑
        const angleRad = this.hue * Math.PI / 180;

        const x = center + Math.cos(angleRad) * radius;
        const y = center + Math.sin(angleRad) * radius;

        this.selector.style.left = `${x}px`;
        this.selector.style.top = `${y}px`;
        this.selector.style.backgroundColor = `hsl(${this.hue}, 100%, 50%)`;
    }

    updateDisplays() {
        const currentColor = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
        const rgb = this.hslToRgb(this.hue, this.saturation, this.lightness);
        const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);

        this.previewMain.style.backgroundColor = currentColor;
        this.codeMain.textContent = hex;

        // 根據明度調整文字顏色
        const textColor = this.lightness > 60 ? '#000' : '#FFF';
        this.nameMain.style.color = textColor;
        this.codeMain.style.color = textColor;
    }

    generateColorSchemes() {
        const schemes = [
            { name: { 'zh-TW': '互補色', 'ja': '補色', 'en': 'Complementary' }, hues: [this.hue, (this.hue + 180) % 360] },
            { name: { 'zh-TW': '類比色', 'ja': '類似色', 'en': 'Analogous' }, hues: [this.hue, (this.hue + 30) % 360, (this.hue - 30 + 360) % 360] },
            { name: { 'zh-TW': '三色組', 'ja': '三色配色', 'en': 'Triadic' }, hues: [this.hue, (this.hue + 120) % 360, (this.hue + 240) % 360] },
            { name: { 'zh-TW': '單色系', 'ja': '単色系', 'en': 'Monochromatic' }, isMono: true }
        ];

        const currentLang = document.querySelector('.lang-btn.active')?.dataset.lang || 'zh-TW';
        this.schemesContainer.innerHTML = schemes.map(scheme => {
            let paletteHtml;
            if (scheme.isMono) {
                const colors = [
                    `hsl(${this.hue}, ${this.saturation}%, ${Math.max(0, this.lightness - 20)}%)`,
                    `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`,
                    `hsl(${this.hue}, ${this.saturation}%, ${Math.min(100, this.lightness + 20)}%)`
                ];
                paletteHtml = colors.map(c => `<div class="scheme-color-new" style="background-color: ${c}"></div>`).join('');
            } else {
                paletteHtml = scheme.hues.map(h => 
                    `<div class="scheme-color-new" style="background-color: hsl(${h}, ${this.saturation}%, ${this.lightness}%)"></div>`
                ).join('');
            }

            return `
                <div class="scheme-item-new">
                    <h5>${scheme.name[currentLang]}</h5>
                    <div class="scheme-palette-new">${paletteHtml}</div>
                </div>
            `;
        }).join('');
    }

    updateColorData() {
        const currentLang = document.querySelector('.lang-btn.active')?.dataset.lang || 'zh-TW';
        const matchedColor = this.findMatchingColor(this.hue);

        if (matchedColor) {
            const data = colorData[matchedColor];
            this.nameMain.textContent = data.name[currentLang];
            this.dataDisplay.innerHTML = `
                <div class="color-data-item">
                    <strong><span class="lang-content active" data-lang="zh-TW">情感</span><span class="lang-content" data-lang="ja">感情</span><span class="lang-content" data-lang="en">Emotion</span>:</strong> 
                    <span>${data.emotion[currentLang]}</span>
                </div>
                <div class="color-data-item">
                    <strong><span class="lang-content active" data-lang="zh-TW">場合</span><span class="lang-content" data-lang="ja">シーン</span><span class="lang-content" data-lang="en">Occasion</span>:</strong> 
                    <span>${data.occasion[currentLang]}</span>
                </div>
                <div class="color-data-item">
                    <strong><span class="lang-content active" data-lang="zh-TW">搭配</span><span class="lang-content" data-lang="ja">ペアリング</span><span class="lang-content" data-lang="en">Pairing</span>:</strong> 
                    <span>${data.pairing[currentLang]}</span>
                </div>
            `;
        } else {
            this.nameMain.textContent = '-';
            this.dataDisplay.innerHTML = '';
        }
        // Manually update language visibility for the new content
        updateLanguageContent(this.dataDisplay);
    }

    findMatchingColor(hue) {
        // 定義基礎顏色的色相範圍
        const hueRanges = {
            suou: [0, 15],
            taisha: [16, 44],
            yellow: [45, 75],
            moegi: [75, 90],
            green: [90, 165],
            shirai: [166, 194],
            blue: [195, 225],
            ruri: [225, 240],
            ayame: [241, 329],
            nadeshiko: [330, 345],
            red: [346, 360]
        };

        for (const color in hueRanges) {
            const [start, end] = hueRanges[color];
            if (hue >= start && hue <= end) return color;
        }
        return null;
    }

    // --- 顏色轉換工具 ---
    hslToRgb(h, s, l) {
        h /= 360; s /= 100; l /= 100;
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
        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    }

    rgbToHex(r, g, b) {
        return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
    }
}

// 假設 language.js 中有 updateLanguageContent 函數
// 如果沒有，這裡提供一個簡易版本
function updateLanguageContent(container) {
    const currentLang = document.querySelector('.lang-btn.active')?.dataset.lang || 'zh-TW';
    container.querySelectorAll('.lang-content').forEach(el => {
        if (el.dataset.lang === currentLang) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}
