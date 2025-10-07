/* ============================================
   色彩理論功能 - colorTheory.js
   處理 HSL 色相環、滑桿、配色方案生成
   ============================================ */

class ColorTheory {
    constructor() {
        this.canvas = document.getElementById('hslColorWheel');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.selector = document.getElementById('hslSelector');
        this.centerPreview = document.getElementById('hslCenterPreview');
        this.currentColorCircle = document.querySelector('.current-color-circle');
        
        this.hue = 0;
        this.saturation = 100;
        this.lightness = 50;
        
        this.isDragging = false;
        
        if (this.canvas && this.ctx) {
            this.init();
        }
    }

    init() {
        this.drawColorWheel();
        this.updateUI();
        this.bindEvents();
        this.generateSchemes();
    }

    /**
     * 繪製 HSL 色相環
     */
    drawColorWheel() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const outerRadius = 200;
        const innerRadius = 120;

        // 清空畫布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 繪製色相環
        for (let angle = 0; angle < 360; angle += 1) {
            const startAngle = (angle - 90) * Math.PI / 180;
            const endAngle = (angle + 1 - 90) * Math.PI / 180;

            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
            this.ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
            this.ctx.closePath();

            this.ctx.fillStyle = `hsl(${angle}, 100%, 50%)`;
            this.ctx.fill();
        }
    }

    /**
     * 綁定事件
     */
    bindEvents() {
        // 色相環點擊/拖動
        this.canvas.addEventListener('mousedown', (e) => this.startDrag(e));
        this.canvas.addEventListener('mousemove', (e) => this.onDrag(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrag());
        this.canvas.addEventListener('mouseleave', () => this.stopDrag());

        // 觸控支援
        this.canvas.addEventListener('touchstart', (e) => this.startDrag(e));
        this.canvas.addEventListener('touchmove', (e) => this.onDrag(e));
        this.canvas.addEventListener('touchend', () => this.stopDrag());

        // 明度滑桿
        const lightnessSlider = document.getElementById('lightnessSlider');
        if (lightnessSlider) {
            lightnessSlider.addEventListener('input', (e) => {
                this.lightness = parseInt(e.target.value);
                this.updateUI();
            });
        }

        // 飽和度滑桿
        const saturationSlider = document.getElementById('saturationSlider');
        if (saturationSlider) {
            saturationSlider.addEventListener('input', (e) => {
                this.saturation = parseInt(e.target.value);
                this.updateUI();
            });
        }
    }

    startDrag(e) {
        this.isDragging = true;
        this.updateHueFromEvent(e);
    }

    onDrag(e) {
        if (this.isDragging) {
            this.updateHueFromEvent(e);
        }
    }

    stopDrag() {
        this.isDragging = false;
    }

    /**
     * 從滑鼠/觸控事件更新色相
     */
    updateHueFromEvent(e) {
        const rect = this.canvas.getBoundingClientRect();
        let clientX, clientY;

        if (e.touches) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        const dx = x - centerX;
        const dy = y - centerY;

        let angle = Math.atan2(dy, dx) * 180 / Math.PI;
        angle = (angle + 90 + 360) % 360;

        this.hue = Math.round(angle);
        this.updateUI();
    }

    /**
     * 更新 UI
     */
    updateUI() {
        const currentColor = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;

        // 更新中心預覽
        if (this.currentColorCircle) {
            this.currentColorCircle.style.background = currentColor;
        }

        // 更新選擇器位置
        this.updateSelectorPosition();

        // 更新色相顯示
        this.updateHueDisplay();

        // 更新滑桿值
        this.updateSliderValues();

        // 更新顏色代碼
        this.updateColorCodes();

        // 更新滑桿背景
        this.updateSliderBackgrounds();

        // 重新生成配色方案
        this.generateSchemes();
    }

    /**
     * 更新選擇器位置
     */
    updateSelectorPosition() {
        if (!this.selector) return;

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = 160; // 中間位置

        const angle = (this.hue - 90) * Math.PI / 180;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        this.selector.style.left = `${x}px`;
        this.selector.style.top = `${y}px`;
    }

    /**
     * 更新色相顯示
     */
    updateHueDisplay() {
        const hueDegree = document.getElementById('hueDegree');
        const hueName = document.getElementById('hueName');

        if (hueDegree) {
            hueDegree.textContent = `${this.hue}°`;
        }

        if (hueName) {
            const colorName = this.getColorName(this.hue);
            const currentLang = document.querySelector('.lang-btn.active')?.getAttribute('data-lang') || 'zh-TW';
            
            hueName.querySelectorAll('.lang-content').forEach(el => {
                el.classList.remove('active');
            });

            const activeName = hueName.querySelector(`[data-lang="${currentLang}"]`);
            if (activeName) {
                activeName.classList.add('active');
                activeName.textContent = colorName[currentLang];
            }
        }
    }

    /**
     * 獲取顏色名稱
     */
    getColorName(hue) {
        if (hue >= 0 && hue < 30) return { 'zh-TW': '紅色', 'ja': '赤', 'en': 'Red' };
        if (hue >= 30 && hue < 60) return { 'zh-TW': '橙色', 'ja': 'オレンジ', 'en': 'Orange' };
        if (hue >= 60 && hue < 90) return { 'zh-TW': '黃色', 'ja': '黄色', 'en': 'Yellow' };
        if (hue >= 90 && hue < 150) return { 'zh-TW': '綠色', 'ja': '緑', 'en': 'Green' };
        if (hue >= 150 && hue < 210) return { 'zh-TW': '青色', 'ja': 'シアン', 'en': 'Cyan' };
        if (hue >= 210 && hue < 270) return { 'zh-TW': '藍色', 'ja': '青', 'en': 'Blue' };
        if (hue >= 270 && hue < 330) return { 'zh-TW': '紫色', 'ja': '紫', 'en': 'Purple' };
        return { 'zh-TW': '紅色', 'ja': '赤', 'en': 'Red' };
    }

    /**
     * 更新滑桿值顯示
     */
    updateSliderValues() {
        const lightnessValue = document.getElementById('lightnessValue');
        const saturationValue = document.getElementById('saturationValue');

        if (lightnessValue) lightnessValue.textContent = `${this.lightness}%`;
        if (saturationValue) saturationValue.textContent = `${this.saturation}%`;
    }

    /**
     * 更新滑桿背景
     */
    updateSliderBackgrounds() {
        const lightnessTrack = document.getElementById('lightnessTrack');
        const saturationTrack = document.getElementById('saturationTrack');

        if (lightnessTrack) {
            lightnessTrack.style.background = `linear-gradient(to right, 
                hsl(${this.hue}, ${this.saturation}%, 0%), 
                hsl(${this.hue}, ${this.saturation}%, 50%), 
                hsl(${this.hue}, ${this.saturation}%, 100%))`;
        }

        if (saturationTrack) {
            saturationTrack.style.background = `linear-gradient(to right, 
                hsl(${this.hue}, 0%, ${this.lightness}%), 
                hsl(${this.hue}, 100%, ${this.lightness}%))`;
        }
    }

    /**
     * 更新顏色代碼
     */
    updateColorCodes() {
        const hexValue = document.getElementById('hexValue');
        
        if (hexValue) {
            const hex = this.hslToHex(this.hue, this.saturation, this.lightness);
            hexValue.textContent = hex;
        }
    }

    /**
     * HSL 轉 HEX
     */
    hslToHex(h, s, l) {
        s /= 100;
        l /= 100;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;
        let r = 0, g = 0, b = 0;

        if (h >= 0 && h < 60) {
            r = c; g = x; b = 0;
        } else if (h >= 60 && h < 120) {
            r = x; g = c; b = 0;
        } else if (h >= 120 && h < 180) {
            r = 0; g = c; b = x;
        } else if (h >= 180 && h < 240) {
            r = 0; g = x; b = c;
        } else if (h >= 240 && h < 300) {
            r = x; g = 0; b = c;
        } else {
            r = c; g = 0; b = x;
        }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }

    /**
     * 生成配色方案
     */
    generateSchemes() {
        const schemes = [
            {
                name: { 'zh-TW': '互補色', 'ja': '補色', 'en': 'Complementary' },
                description: { 
                    'zh-TW': '強烈對比，充滿活力', 
                    'ja': '強いコントラスト、活力に満ちた',
                    'en': 'Strong contrast, vibrant'
                },
                hues: [this.hue, (this.hue + 180) % 360]
            },
            {
                name: { 'zh-TW': '類似色', 'ja': '類似色', 'en': 'Analogous' },
                description: { 
                    'zh-TW': '和諧統一，溫和舒適', 
                    'ja': '調和的、穏やかで快適',
                    'en': 'Harmonious, comfortable'
                },
                hues: [this.hue, (this.hue + 30) % 360, (this.hue + 60) % 360]
            },
            {
                name: { 'zh-TW': '三角色', 'ja': '三色配色', 'en': 'Triadic' },
                description: { 
                    'zh-TW': '平衡而生動，豐富層次', 
                    'ja': 'バランスが取れ、豊かな層',
                    'en': 'Balanced, rich layers'
                },
                hues: [this.hue, (this.hue + 120) % 360, (this.hue + 240) % 360]
            },
            {
                name: { 'zh-TW': '分離互補', 'ja': '分裂補色', 'en': 'Split Complementary' },
                description: { 
                    'zh-TW': '對比柔和，視覺豐富', 
                    'ja': '柔らかいコントラスト',
                    'en': 'Softer contrast, visually rich'
                },
                hues: [this.hue, (this.hue + 150) % 360, (this.hue + 210) % 360]
            },
            {
                name: { 'zh-TW': '正方色', 'ja': '正方形配色', 'en': 'Square' },
                description: { 
                    'zh-TW': '四色平衡，動態豐富', 
                    'ja': '四色バランス、ダイナミック',
                    'en': 'Four-color balance, dynamic'
                },
                hues: [this.hue, (this.hue + 90) % 360, (this.hue + 180) % 360, (this.hue + 270) % 360]
            }
        ];

        this.renderSchemes(schemes);
    }

    /**
     * 渲染配色方案
     */
    renderSchemes(schemes) {
        const container = document.getElementById('schemesListMagazine');
        if (!container) return;

        const currentLang = document.querySelector('.lang-btn.active')?.getAttribute('data-lang') || 'zh-TW';

        container.innerHTML = '';

        schemes.forEach((scheme, index) => {
            const card = document.createElement('div');
            card.className = 'scheme-card-magazine';
            
            const colors = scheme.hues.map(h => 
                `hsl(${h}, ${this.saturation}%, ${this.lightness}%)`
            ).join(', ');

            card.innerHTML = `
                <span class="scheme-number">0${index + 1}</span>
                <div class="scheme-colors">
                    ${scheme.hues.map(h => `
                        <div class="scheme-color-swatch" style="background: hsl(${h}, ${this.saturation}%, ${this.lightness}%)"></div>
                    `).join('')}
                </div>
                <div class="scheme-info">
                    <div class="scheme-name-mixed">
                        <span class="scheme-name-zh lang-content ${currentLang === 'zh-TW' ? 'active' : ''}" data-lang="zh-TW">${scheme.name['zh-TW']}</span>
                        <span class="scheme-name-zh lang-content ${currentLang === 'ja' ? 'active' : ''}" data-lang="ja">${scheme.name['ja']}</span>
                        <span class="scheme-name-zh lang-content ${currentLang === 'en' ? 'active' : ''}" data-lang="en">${scheme.name['en']}</span>
                        <span class="scheme-name-en">${scheme.name['en']}</span>
                        <span class="scheme-name-ja">${scheme.name['ja']}</span>
                    </div>
                    <p class="scheme-description lang-content ${currentLang === 'zh-TW' ? 'active' : ''}" data-lang="zh-TW">${scheme.description['zh-TW']}</p>
                    <p class="scheme-description lang-content ${currentLang === 'ja' ? 'active' : ''}" data-lang="ja">${scheme.description['ja']}</p>
                    <p class="scheme-description lang-content ${currentLang === 'en' ? 'active' : ''}" data-lang="en">${scheme.description['en']}</p>
                </div>
            `;

            container.appendChild(card);
        });
    }
}

/**
 * 初始化色彩理論
 */
function initColorTheory() {
    new ColorTheory();
}