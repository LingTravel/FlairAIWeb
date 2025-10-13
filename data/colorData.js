/* ============================================
   色彩數據文件 - colorData.js
   定義色彩信息和搭配建議
   ============================================ */

const colorData = {
    red: {
        name: { 
            'zh-TW': '緋色',
            'ja': '緋色',
            'en': 'Scarlet'
        },
        emotion: {
            'zh-TW': '熱情、力量、自信',
            'ja': '情熱、力、自信',
            'en': 'Passion, Power, Confidence'
        },
        occasion: {
            'zh-TW': '重要場合、晚宴、慶典',
            'ja': '重要なイベント、ディナー、祝典',
            'en': 'Important events, Dinners, Celebrations'
        },
        pairing: {
            'zh-TW': '與黑色、白色、金色搭配最佳',
            'ja': '黒、白、金と相性抜群',
            'en': 'Best paired with black, white, gold'
        },
        color: '#C41E3A',
        combinations: ['#000000', '#FFFFFF', '#D4AF37']
    },
    blue: {
        name: { 
            'zh-TW': '青藍', 
            'ja': '青藍', 
            'en': 'Indigo Blue' 
        },
        emotion: {
            'zh-TW': '信任、穩定、專業',
            'ja': '信頼、安定、プロフェッショナル',
            'en': 'Trust, Stability, Professional'
        },
        occasion: {
            'zh-TW': '商務場合、日常通勤',
            'ja': 'ビジネスシーン、通勤',
            'en': 'Business, Daily commute'
        },
        pairing: {
            'zh-TW': '與白色、灰色、卡其色搭配',
            'ja': '白、グレー、ベージュと合わせて',
            'en': 'Pair with white, gray, khaki'
        },
        color: '#0047AB',
        combinations: ['#FFFFFF', '#808080', '#C3B091']
    },
    green: {
        name: { 
            'zh-TW': '若竹', 
            'ja': '若竹', 
            'en': 'Young Bamboo' 
        },
        emotion: {
            'zh-TW': '自然、平和、成長',
            'ja': '自然、平和、成長',
            'en': 'Nature, Peace, Growth'
        },
        occasion: {
            'zh-TW': '休閒、戶外活動',
            'ja': 'カジュアル、アウトドア',
            'en': 'Casual, Outdoor activities'
        },
        pairing: {
            'zh-TW': '與米色、棕色、白色搭配',
            'ja': 'ベージュ、茶色、白と',
            'en': 'Pair with beige, brown, white'
        },
        color: '#2D5016',
        combinations: ['#F5F5DC', '#8B4513', '#FFFFFF']
    },
    yellow: {
        name: { 
            'zh-TW': '月白', 
            'ja': '月白', 
            'en': 'Moon White' 
        },
        emotion: {
            'zh-TW': '樂觀、活力、創意',
            'ja': '楽観的、活力、創造性',
            'en': 'Optimism, Energy, Creativity'
        },
        occasion: {
            'zh-TW': '春夏季節、休閒聚會',
            'ja': '春夏、カジュアルな集まり',
            'en': 'Spring/Summer, Casual gatherings'
        },
        pairing: {
            'zh-TW': '與海軍藍、灰色、白色搭配',
            'ja': 'ネイビー、グレー、白と',
            'en': 'Pair with navy, gray, white'
        },
        color: '#FFD700',
        combinations: ['#000080', '#808080', '#FFFFFF']
    },
    black: {
        name: { 
            'zh-TW': '墨色', 
            'ja': '墨色', 
            'en': 'Ink Black' 
        },
        emotion: {
            'zh-TW': '權威、優雅、神秘',
            'ja': '権威、エレガンス、神秘',
            'en': 'Authority, Elegance, Mystery'
        },
        occasion: {
            'zh-TW': '任何正式場合、晚宴',
            'ja': 'フォーマルな場、ディナー',
            'en': 'Any formal occasion, Dinners'
        },
        pairing: {
            'zh-TW': '萬能色，與任何顏色搭配',
            'ja': '万能色、どんな色とも合う',
            'en': 'Universal, pairs with any color'
        },
        color: '#000000',
        combinations: ['#FFFFFF', '#D4AF37', '#C41E3A']
    },
    white: {
        name: { 
            'zh-TW': '白練', 
            'ja': '白練', 
            'en': 'Polished White' 
        },
        emotion: {
            'zh-TW': '純淨、簡約、現代',
            'ja': '純粋、シンプル、モダン',
            'en': 'Purity, Minimalism, Modern'
        },
        occasion: {
            'zh-TW': '夏季、休閒、商務',
            'ja': '夏、カジュアル、ビジネス',
            'en': 'Summer, Casual, Business'
        },
        pairing: {
            'zh-TW': '萬能色，清新百搭',
            'ja': '万能色、清潔感',
            'en': 'Universal, fresh and versatile'
        },
        color: '#FFFFFF',
        combinations: ['#000000', '#0047AB', '#2D5016']
    },
    nadeshiko: {
        name: {
            'zh-TW': '撫子',
            'ja': '撫子色',
            'en': 'Nadeshiko Pink'
        },
        emotion: {
            'zh-TW': '溫柔、雅致、女性化',
            'ja': '優しさ、雅、女性らしさ',
            'en': 'Gentle, Elegant, Feminine'
        },
        occasion: {
            'zh-TW': '春季、約會、下午茶',
            'ja': '春、デート、アフタヌーンティー',
            'en': 'Spring, Dates, Afternoon Tea'
        },
        pairing: {
            'zh-TW': '與白色、淺灰、米色搭配',
            'ja': '白、ライトグレー、ベージュと',
            'en': 'Pair with white, light gray, beige'
        }
    },
    moegi: {
        name: {
            'zh-TW': '萌黃',
            'ja': '萌黄色',
            'en': 'Sprout Green'
        },
        emotion: {
            'zh-TW': '新生、活力、希望',
            'ja': '新生、活力、希望',
            'en': 'New Life, Vitality, Hope'
        },
        occasion: {
            'zh-TW': '初春、戶外、休閒裝',
            'ja': '早春、アウトドア、カジュアルウェア',
            'en': 'Early Spring, Outdoors, Casual Wear'
        },
        pairing: {
            'zh-TW': '與白色、檸檬黃、天藍色搭配',
            'ja': '白、レモンイエロー、空色と',
            'en': 'Pair with white, lemon yellow, sky blue'
        }
    },
    ruri: {
        name: {
            'zh-TW': '瑠璃',
            'ja': '瑠璃色',
            'en': 'Lapis Lazuli'
        },
        emotion: {
            'zh-TW': '深邃、智慧、高貴',
            'ja': '深遠、知恵、高貴',
            'en': 'Deep, Wise, Noble'
        },
        occasion: {
            'zh-TW': '正式場合、晚裝、藝術展覽',
            'ja': 'フォーマルな場、イブニングウェア、美術展',
            'en': 'Formal events, Evening wear, Art galleries'
        },
        pairing: {
            'zh-TW': '與銀色、白色、深紫色搭配',
            'ja': '銀、白、深紫と',
            'en': 'Pair with silver, white, deep purple'
        }
    },
    suou: {
        name: {
            'zh-TW': '蘇芳',
            'ja': '蘇芳色',
            'en': 'Sappanwood Red'
        },
        emotion: {
            'zh-TW': '古典、成熟、穩重',
            'ja': '古典的、成熟、落ち着き',
            'en': 'Classic, Mature, Composed'
        },
        occasion: {
            'zh-TW': '秋季、文化活動、晚宴',
            'ja': '秋、文化活動、ディナー',
            'en': 'Autumn, Cultural events, Dinners'
        },
        pairing: {
            'zh-TW': '與米色、深棕、金色搭配',
            'ja': 'ベージュ、ダークブラウン、金と',
            'en': 'Pair with beige, dark brown, gold'
        }
    },
    taisha: {
        name: {
            'zh-TW': '代赭',
            'ja': '代赭',
            'en': 'Red Ochre'
        },
        emotion: {
            'zh-TW': '大地、溫暖、質樸',
            'ja': '大地、暖かさ、素朴',
            'en': 'Earthy, Warm, Rustic'
        },
        occasion: {
            'zh-TW': '秋季、日常、鄉村風格',
            'ja': '秋、日常、カントリースタイル',
            'en': 'Autumn, Daily, Country style'
        },
        pairing: {
            'zh-TW': '與米色、軍綠、深藍搭配',
            'ja': 'ベージュ、カーキ、ダークブルーと',
            'en': 'Pair with beige, olive green, dark blue'
        }
    },
    shirai: {
        name: {
            'zh-TW': '白藍',
            'ja': '白藍',
            'en': 'Pale Indigo'
        },
        emotion: {
            'zh-TW': '清澈、寧靜、簡潔',
            'ja': '清らか、静けさ、簡潔',
            'en': 'Clear, Calm, Simple'
        },
        occasion: {
            'zh-TW': '夏季、海邊、居家',
            'ja': '夏、海辺、ホームウェア',
            'en': 'Summer, Seaside, Loungewear'
        },
        pairing: {
            'zh-TW': '與白色、淺灰、淡黃搭配',
            'ja': '白、ライトグレー、淡黄色と',
            'en': 'Pair with white, light gray, pale yellow'
        }
    },
    ayame: {
        name: {
            'zh-TW': '菖蒲',
            'ja': '菖蒲色',
            'en': 'Iris Purple'
        },
        emotion: {
            'zh-TW': '神秘、高雅、感性',
            'ja': '神秘的、高雅、感性',
            'en': 'Mysterious, Graceful, Sensual'
        },
        occasion: {
            'zh-TW': '晚宴、藝術活動、創意場合',
            'ja': 'ディナー、アートイベント、クリエイティブな場',
            'en': 'Dinners, Art events, Creative occasions'
        },
        pairing: {
            'zh-TW': '與黑色、銀色、深綠搭配',
            'ja': '黒、銀、深緑と',
            'en': 'Pair with black, silver, dark green'
        }
    }
};