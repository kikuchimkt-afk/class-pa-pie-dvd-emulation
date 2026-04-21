document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('mainVideo');
    const videoSource = document.getElementById('videoSource');
    const overlay = document.getElementById('videoOverlay');
    const playBtn = document.getElementById('playBtn');
    const chapterListEl = document.getElementById('chapterList');
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');

    // === 46チャプター定義 (PDF TOC照合済み) ===
    const chapters = [
        // Unit 1 (ch1-5)
        { ch: 1, unit: 1, lesson: 1, title: "U1-1 Let's Study! \"Look What I Have\"", type: "study" },
        { ch: 2, unit: 1, lesson: 2, title: "U1-2 Let's Study! \"Helping with Housework\"", type: "study" },
        { ch: 3, unit: 1, lesson: 3, title: "U1-3 Introduction \"The Brain\"", type: "intro" },
        { ch: 4, unit: 1, lesson: 4, title: "U1-4 Let's Study! \"Free Time\"", type: "study" },
        { ch: 5, unit: 1, lesson: 5, title: "U1-5 Grammar Close-Up be動詞の文", type: "grammar" },
        // Unit 2 (ch6-11)
        { ch: 6, unit: 2, lesson: 1, title: "U2-1 Let's Study! \"Weekend Activities\"", type: "study" },
        { ch: 7, unit: 2, lesson: 2, title: "U2-2 Introduction \"Visual Illusions\"", type: "intro" },
        { ch: 8, unit: 2, lesson: 3, title: "U2-3 Let's Study! \"Cathy's Weekdays\"", type: "study" },
        { ch: 9, unit: 2, lesson: 4, title: "U2-4 Let's Study! \"Cathy's Friends Are Busy\"", type: "study" },
        { ch: 10, unit: 2, lesson: 5, title: "U2-5 Grammar Close-Up 一般動詞の文①", type: "grammar" },
        { ch: 11, unit: 2, lesson: 6, title: "U2-6 Debate \"Mountains or Beach?\"", type: "debate" },
        // Unit 3 (ch12-16)
        { ch: 12, unit: 3, lesson: 1, title: "U3-1 Let's Study! \"Presents\"", type: "study" },
        { ch: 13, unit: 3, lesson: 2, title: "U3-2 Introduction \"Garbage Issues\"", type: "intro" },
        { ch: 14, unit: 3, lesson: 3, title: "U3-3 Let's Study! \"Today's Plans\"", type: "study" },
        { ch: 15, unit: 3, lesson: 4, title: "U3-4 Let's Study! \"Yesterday\"", type: "study" },
        { ch: 16, unit: 3, lesson: 5, title: "U3-5 Grammar Close-Up 一般動詞の文②", type: "grammar" },
        // Unit 4 (ch17-22)
        { ch: 17, unit: 4, lesson: 1, title: "U4-1 Let's Study! \"Handmade Presents\"", type: "study" },
        { ch: 18, unit: 4, lesson: 2, title: "U4-2 Introduction \"Eco-friendly Ideas\"", type: "intro" },
        { ch: 19, unit: 4, lesson: 3, title: "U4-3 Let's Study! \"Where Were You?\"", type: "study" },
        { ch: 20, unit: 4, lesson: 4, title: "U4-4 Let's Study! \"TV Shows\"", type: "study" },
        { ch: 21, unit: 4, lesson: 5, title: "U4-5 Grammar Close-Up 一般動詞の文③", type: "grammar" },
        { ch: 22, unit: 4, lesson: 6, title: "U4-6 Debate \"Rural or Urban Life\"", type: "debate" },
        // Unit 5 (ch23-28)
        { ch: 23, unit: 5, lesson: 1, title: "U5-1 Let's Study! \"The Cookies Are Gone\"", type: "study" },
        { ch: 24, unit: 5, lesson: 2, title: "U5-2 Introduction \"The History of Money\"", type: "intro" },
        { ch: 25, unit: 5, lesson: 3, title: "U5-3 Let's Study! \"Where's Cathy?\"", type: "study" },
        { ch: 26, unit: 5, lesson: 4, title: "U5-4 Irregular Verbs 不規則動詞", type: "grammar" },
        { ch: 27, unit: 5, lesson: 5, title: "U5-5 Let's Study! \"Grandma's Old Pictures\"", type: "study" },
        { ch: 28, unit: 5, lesson: 6, title: "U5-6 Grammar Close-Up 過去を表す文", type: "grammar" },
        // Unit 6 (ch29-34)
        { ch: 29, unit: 6, lesson: 1, title: "U6-1 Let's Study! \"Souvenirs from Tokyo\"", type: "study" },
        { ch: 30, unit: 6, lesson: 2, title: "U6-2 Introduction \"Money\"", type: "intro" },
        { ch: 31, unit: 6, lesson: 3, title: "U6-3 Let's Study! \"Talking on the Phone\"", type: "study" },
        { ch: 32, unit: 6, lesson: 4, title: "U6-4 Let's Study! \"This Weekend\"", type: "study" },
        { ch: 33, unit: 6, lesson: 5, title: "U6-5 Grammar Close-Up たずねる文", type: "grammar" },
        { ch: 34, unit: 6, lesson: 6, title: "U6-6 Debate \"Video Games Ban?\"", type: "debate" },
        // Unit 7 (ch35-40)
        { ch: 35, unit: 7, lesson: 1, title: "U7-1 比較級と最上級", type: "grammar" },
        { ch: 36, unit: 7, lesson: 2, title: "U7-2 Let's Study! \"Meeting Cathy's Dad\"", type: "study" },
        { ch: 37, unit: 7, lesson: 3, title: "U7-3 Introduction \"The Moon\"", type: "intro" },
        { ch: 38, unit: 7, lesson: 4, title: "U7-4 Let's Study! \"Dad's Coins\"", type: "study" },
        { ch: 39, unit: 7, lesson: 5, title: "U7-5 Let's Study! \"David's Favorite Characters\"", type: "study" },
        { ch: 40, unit: 7, lesson: 6, title: "U7-6 Grammar Close-Up 現在進行形の文", type: "grammar" },
        // Unit 8 (ch41-46)
        { ch: 41, unit: 8, lesson: 1, title: "U8-1 Let's Study! \"Paella\"", type: "study" },
        { ch: 42, unit: 8, lesson: 2, title: "U8-2 Introduction \"The Space Station\"", type: "intro" },
        { ch: 43, unit: 8, lesson: 3, title: "U8-3 Let's Study! \"Maria's Camping Trip\"", type: "study" },
        { ch: 44, unit: 8, lesson: 4, title: "U8-4 Let's Study! \"Naomi's Trip to France\"", type: "study" },
        { ch: 45, unit: 8, lesson: 5, title: "U8-5 Grammar Close-Up 未来を表す文", type: "grammar" },
        { ch: 46, unit: 8, lesson: 6, title: "U8-6 Debate \"Do We Need Tests?\"", type: "debate" },
    ];

    // === スクリプト表示のトグル状態 ===
    let showEnglish = false;
    let showJapanese = false;

    // === サイドバー描画 ===
    let currentUnit = 0;
    chapters.forEach(chapter => {
        if (chapter.unit !== currentUnit) {
            const unitTitle = document.createElement('div');
            unitTitle.className = 'unit-title';
            unitTitle.textContent = `Unit ${chapter.unit}`;
            chapterListEl.appendChild(unitTitle);
            currentUnit = chapter.unit;
        }

        const item = document.createElement('div');
        item.className = 'chapter-item';
        const icon = { study: '📖', intro: '🌍', grammar: '📝', debate: '💬' }[chapter.type] || '📄';
        item.innerHTML = `<span class="ch-icon">${icon}</span> ${chapter.title}`;
        item.dataset.chapter = chapter.ch;

        item.addEventListener('click', () => {
            document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            playChapter(chapter.ch);

            // モバイルの場合は選択後にサイドバーを閉じる
            if (window.innerWidth <= 900) {
                sidebar.classList.remove('open');
                if (mobileOverlay) mobileOverlay.classList.remove('visible');
            }
        });

        chapterListEl.appendChild(item);
    });

    // === 動画再生 ===
    const playChapter = (chapterNum) => {
        document.querySelector('.video-and-script').style.display = 'flex';
        const fileUrl = `videos/chapter_${chapterNum}.mp4`;
        videoSource.src = fileUrl;
        video.load();
        video.play().catch(e => console.log('Autoplay prevented:', e));
        overlay.classList.add('hidden');

        // スクリプト表示を更新
        updateScriptDisplay(chapterNum);
    };

    // === スクリプト表示更新 ===
    const updateScriptDisplay = (chapterNum) => {
        const enPanel = document.getElementById('scriptEn');
        const jaPanel = document.getElementById('scriptJa');
        if (!enPanel || !jaPanel) return;

        const data = (typeof SCRIPT_DATA !== 'undefined') ? SCRIPT_DATA[chapterNum] : null;

        if (data) {
            enPanel.innerHTML = data.en || '<p class="no-script">Script not available</p>';
            jaPanel.innerHTML = data.ja || '<p class="no-script">スクリプトなし</p>';
        } else {
            enPanel.innerHTML = '<p class="no-script">Script not yet available for this chapter.</p>';
            jaPanel.innerHTML = '<p class="no-script">このチャプターのスクリプトはまだありません。</p>';
        }
    };

    // === トグルボタン ===
    const toggleEnBtn = document.getElementById('toggleEn');
    const toggleJaBtn = document.getElementById('toggleJa');
    const scriptPanel = document.getElementById('scriptPanel');

    if (toggleEnBtn) {
        toggleEnBtn.addEventListener('click', () => {
            showEnglish = !showEnglish;
            toggleEnBtn.classList.toggle('active', showEnglish);
            document.getElementById('scriptEn').classList.toggle('visible', showEnglish);
            updatePanelVisibility();
        });
    }

    if (toggleJaBtn) {
        toggleJaBtn.addEventListener('click', () => {
            showJapanese = !showJapanese;
            toggleJaBtn.classList.toggle('active', showJapanese);
            document.getElementById('scriptJa').classList.toggle('visible', showJapanese);
            updatePanelVisibility();
        });
    }

    const updatePanelVisibility = () => {
        if (scriptPanel) {
            scriptPanel.classList.toggle('has-content', showEnglish || showJapanese);
        }
    };

    // === 再生コントロール ===
    const togglePlay = () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    };

    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
    });

    overlay.addEventListener('click', togglePlay);

    video.addEventListener('play', () => {
        overlay.classList.add('hidden');
    });

    video.addEventListener('pause', () => {
        overlay.classList.remove('hidden');
    });

    // 初期状態では何も選択せず、背景のみを表示する

    // === モバイルメニュー制御 ===
    const toggleSidebar = () => {
        if (sidebar) sidebar.classList.toggle('open');
        if (mobileOverlay) mobileOverlay.classList.toggle('visible');
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', toggleSidebar);
    }
});
