/* ============================================
   ASCII 動畫文件 - ascii.js
   處理 Hero 區域的 ASCII 藝術動畫
   ============================================ */

// ASCII 字符庫 - 只使用英文字母
const fashionChars = {
    en: ['F', 'l', 'a', 'i', 'r', 'A', 'I', 'S', 't', 'y', 'e', 'C', 'h', 'i', 'c', 'W', 'e', 'a', 'r', 'M', 'o', 'd', 'n']
};

// FlairAI ASCII 模板
const flairTemplate = [
    '                                                                                                   ',
    '                                                                                                   ',
    '                                                                                                   ',
    '  +%@@@@@@@@@@@@@@@@= %@@@@                   *@@#.                      -@-          :%@@@@@@@@%. ',
    '     :@@@*        -@*  =@@@                  .%@@@.                     -@@@:            .@@@@     ',
    '     :@@@*         .:  -@@@                                            :@@@@@:            @@@%     ',
    '     :@@@*      :%     -@@@    .#@%-+@@%.   +%@@@@   #@@@@.@@@@.      .@*.%@@@-           @@@%     ',
    '     :@@@@@@@@@@@%     -@@@   .@@@   -@@@.   .@@@@    +@@@#.=@+       @*  .%@@@-          @@@%     ',
    '     :@@@*      +%     -@@@        .:#@@@.    %@@@    +@@@           %%.   .@@@@-         @@@%     ',
    '     :@@@*      ..     -@@@    .%@@..-@@@.    %@@@    +@@@         .@@@@@@@@@@@@@-        @@@%     ',
    '     :@@@*             -@@@   *@@:   -@@@.    %@@@    +@@@         %@.        %@@@-       @@@%     ',
    '     -@@@#             =@@@  .@@@@-:*@@@@.-: .%@@@    +@@@       .%@:          @@@@-     .@@@@.    ',
    '  +@@@@@@@@@@.       .@@@@@@+ .%@@@*..@@@@. *@@@@@@:*@@@@@@@.  .@@@@@@=     .%@@@@@@@#:@@@@@@@@@@. ',
    '                                                                                                    ',
    '                                                                                                    '
];

// 當前 ASCII 狀態
let currentAsciiState = null;
let currentOverlayState = null;

/**
 * 生成 ASCII 藝術
 */
function generateASCII() {
    let asciiArt = '';
    let overlayArt = '';

    flairTemplate.forEach((line) => {
        let asciiLine = '';
        let overlayLine = '';

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char !== ' ') {
                const enChar = fashionChars.en[Math.floor(Math.random() * fashionChars.en.length)];
                asciiLine += enChar;

                const overlayChar = fashionChars.en[Math.floor(Math.random() * fashionChars.en.length)];
                overlayLine += overlayChar;
            } else {
                asciiLine += ' ';
                overlayLine += ' ';
            }
        }

        asciiArt += asciiLine + '\n';
        overlayArt += overlayLine + '\n';
    });

    return { asciiArt, overlayArt };
}

/**
 * 初始化 ASCII
 */
function initASCII() {
    const { asciiArt, overlayArt } = generateASCII();
    currentAsciiState = asciiArt.split('\n').map(line => line.split(''));
    currentOverlayState = overlayArt.split('\n').map(line => line.split(''));

    const asciiElement = document.getElementById('asciiArt');
    const overlayElement = document.getElementById('asciiOverlay');

    if (asciiElement) asciiElement.textContent = asciiArt;
    if (overlayElement) overlayElement.textContent = overlayArt;
}

/**
 * 亂碼動畫更新
 */
function glitchUpdate() {
    let newAscii = '';
    let newOverlay = '';

    flairTemplate.forEach((line, lineIndex) => {
        let asciiLine = '';
        let overlayLine = '';

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char !== ' ') {
                // 5% 的機率更新字符
                if (Math.random() < 0.05) {
                    const asciiChar = fashionChars.en[Math.floor(Math.random() * fashionChars.en.length)];
                    const overlayChar = fashionChars.en[Math.floor(Math.random() * fashionChars.en.length)];

                    asciiLine += asciiChar;
                    overlayLine += overlayChar;

                    if (currentAsciiState[lineIndex]) {
                        currentAsciiState[lineIndex][i] = asciiChar;
                        currentOverlayState[lineIndex][i] = overlayChar;
                    }
                } else {
                    asciiLine += currentAsciiState[lineIndex]?.[i] || char;
                    overlayLine += currentOverlayState[lineIndex]?.[i] || char;
                }
            } else {
                asciiLine += ' ';
                overlayLine += ' ';
            }
        }

        newAscii += asciiLine + '\n';
        newOverlay += overlayLine + '\n';
    });

    const asciiElement = document.getElementById('asciiArt');
    const overlayElement = document.getElementById('asciiOverlay');

    if (asciiElement) asciiElement.textContent = newAscii;
    if (overlayElement) overlayElement.textContent = newOverlay;
}

/**
 * 啟動 ASCII 動畫
 */
function startASCIIAnimation() {
    // 每 150ms 更新一次
    setInterval(glitchUpdate, 150);
}