/* ============================================
   語言切換文件 - language.js
   處理多語言切換功能
   ============================================ */

/**
 * 切換語言
 */
function switchLanguage(lang) {
    // 更新按鈕狀態
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // 更新內容顯示
    document.querySelectorAll('.lang-content').forEach(content => {
        if (content.getAttribute('data-lang') === lang) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

/**
 * 初始化語言切換
 */
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}