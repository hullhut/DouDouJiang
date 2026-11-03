const gameRoundsContainer = document.getElementById('gameRoundsContainer');
const startGameBtn = document.getElementById('startGameBtn');
const endSessionBtn = document.getElementById('endSessionBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const langToggle = document.getElementById('langToggle');
const mainTitle = document.getElementById('mainTitle');
const headerBanner = document.getElementById('headerBanner');

// --- I18N (Internationalization) ---
const i18n = {
    en: {
        title: "Mahjong Score Tracker",
        docTitle: "🐶 🀄 Mahjong Score Tracker 🐕",
        startGame: "Start Game ▶",
        startAnother: "Start Another ▶",
        endSession: "End Game 🏆",
        confirmEndSession: "Sure End?",
        clearAll: "Clear All",
        confirmClearAll: "Sure?",
        roundTitle: "Players & Scores - Round {n}",
        aliasPlaceholder: "Player Alias",
        scorePlaceholder: "Score",
        unitText: "Unit (Yuan)",
        saveRound: "💾 Save Round",
        modifyRound: "✏️ Modify",
        clearRound: "🔄 Reset",
        confirmClear: "Sure?",
        addTigerRow: "➕ Add Tigers",
        resultTitle: "💰 Round Results 💰",
        viewDetails: "📊 View Calculation Process",
        singleModalTitle: "Round {n} Settlement Details",
        calcProcess: "Calculation Process",
        formulaDesc: "((Own Tigers × 3 - Others' Tigers) × Unit)",
        tigersTag: "{count} Tigers",
        grandTotalTitle: "🏆 Global Game Leaderboard 🏆",
        roundsPlayed: "{n} Round(s) Played",
        tabMoney: "💰 By Money (¥)",
        tabTigers: "🐯 By Tigers",
        bigWinner: "Big Winner 👑",
        tigerKing: "Tiger King 🐯👑",
        playedAndWon: "Played {played} round(s) | Won {won}",
        seatsPlayed: "Seats",
        rawTigersSummary: "Total Tigers: {raw} | Net: {net}",
        closeModal: "Close",
        noRoundsAlert: "No saved/settled rounds yet! Please save at least one round first.",
        east: "East",
        south: "South",
        west: "West",
        north: "North",
        roomLabel: "🏠 Room: ",
        shareLink: "🔗 Share Link",
        pwdPlaceholder: "Set Room Password (Optional)",
        lockRoom: "🔒 Lock Room",
        lockedStatus: "🔒 Protected",
        linkCopied: "Room link copied to clipboard!",
        enterPwdAlert: "Please enter password",
        pwdFailedAlert: "Failed to set password: ",
        lockedTitle: "🔒 Protected Room",
        lockedPrompt: "Please enter password to access score tracker",
        unlockPlaceholder: "Enter password",
        unlockBtn: "Unlock",
        wrongPwd: "Incorrect password, please try again",
        networkError: "Network error, please retry"
    },
    zh: {
        title: "麻将计分器",
        docTitle: "🐶 🀄 麻将计分器 🐕",
        startGame: "开始游戏 ▶",
        startAnother: "再开一局 ▶",
        endSession: "结束游戏 🏆",
        confirmEndSession: "确认结束?",
        clearAll: "全部清空",
        confirmClearAll: "确认全清?",
        roundTitle: "玩家与分数 - 第 {n} 局",
        aliasPlaceholder: "玩家昵称",
        scorePlaceholder: "虎数",
        unitText: "计数单位 (元)",
        saveRound: "💾 保存本局",
        modifyRound: "✏️ 修改本局",
        clearRound: "🔄 重置本局",
        confirmClear: "确认重置?",
        addTigerRow: "➕ 抓虎",
        resultTitle: "💰 本局结算结果 💰",
        viewDetails: "📊 查看计算过程",
        singleModalTitle: "第 {n} 局结算详情",
        calcProcess: "详细计算过程",
        formulaDesc: "((本人虎数 × 3 - 其他人虎数之和) × 单位)",
        tigersTag: "{count} 虎",
        grandTotalTitle: "🏆 全局结算大赢家 🏆",
        roundsPlayed: "共进行了 {n} 局",
        tabMoney: "💰 按金额统计",
        tabTigers: "🐯 按虎数统计",
        bigWinner: "大赢家 👑",
        tigerKing: "虎王 🐯👑",
        playedAndWon: "出战 {played} 局 | 胜 {won} 局",
        seatsPlayed: "曾坐",
        rawTigersSummary: "总抓虎: {raw} | 净胜虎: {net}",
        closeModal: "关闭",
        noRoundsAlert: "暂无已保存的对局，请先保存本局！",
        east: "东",
        south: "南",
        west: "西",
        north: "北",
        roomLabel: "🏠 房间: ",
        shareLink: "🔗 邀请牌友",
        pwdPlaceholder: "设置房间密码(非必填)",
        lockRoom: "🔒 锁定房间",
        lockedStatus: "🔒 已加密",
        linkCopied: "房间链接已复制！",
        enterPwdAlert: "请输入密码",
        pwdFailedAlert: "密码设置失败: ",
        lockedTitle: "🔒 房间已加密",
        lockedPrompt: "请输入密码以访问计分板",
        unlockPlaceholder: "输入密码",
        unlockBtn: "解锁",
        wrongPwd: "密码错误，请重新输入",
        networkError: "网络错误，请重试"
    }
};

let currentLang = 'zh';

// --- Interactive Dog Figures & Title Animation (Option 3 Scheme) ---
function initDogs() {
    const bannerWrapper = document.getElementById('bannerWrapper');
    const leftPoodle = document.getElementById('hotspotLeftPoodle');
    const rightFluffy = document.getElementById('hotspotRightFluffy');
    const centerTitle = document.getElementById('hotspotCenterTitle');

    if (bannerWrapper) {
        if (leftPoodle) {
            leftPoodle.addEventListener('click', () => {
                bannerWrapper.classList.add('bouncing-left');
                setTimeout(() => bannerWrapper.classList.remove('bouncing-left'), 400);
            });
        }
        if (rightFluffy) {
            rightFluffy.addEventListener('click', () => {
                bannerWrapper.classList.add('bouncing-right');
                setTimeout(() => bannerWrapper.classList.remove('bouncing-right'), 400);
            });
        }
        if (centerTitle) {
            centerTitle.addEventListener('click', () => {
                bannerWrapper.classList.add('bouncing-center');
                setTimeout(() => bannerWrapper.classList.remove('bouncing-center'), 300);
            });
        }
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    
    // Update header banner image according to language
    const headerBannerImg = document.getElementById('headerBannerImg');
    if (headerBannerImg) {
        headerBannerImg.src = currentLang === 'en' ? '/images/header-en.png?v=30' : '/images/header-zh.png?v=30';
        headerBannerImg.alt = currentLang === 'en' ? 'Mahjong Scorer' : '麻将计分器';
    }

    // Update static texts
    mainTitle.innerHTML = i18n[currentLang].title;
    document.title = i18n[currentLang].docTitle;
    startGameBtn.innerHTML = roundCount > 0 ? i18n[currentLang].startAnother : i18n[currentLang].startGame;
    
    if (endSessionBtn) {
        endSessionBtn.innerHTML = endSessionBtn.dataset.confirm === "true" ? i18n[currentLang].confirmEndSession : i18n[currentLang].endSession;
    }

    if (clearAllBtn) {
        clearAllBtn.innerHTML = clearAllBtn.dataset.confirm === "true" ? i18n[currentLang].confirmClearAll : i18n[currentLang].clearAll;
    }

    // Update Room Bar texts
    const roomCodeBadge = document.getElementById('roomCodeBadge');
    if (roomCodeBadge && currentRoomCode) {
        roomCodeBadge.innerText = i18n[currentLang].roomLabel + currentRoomCode;
    }
    const inviteBtn = document.getElementById('inviteBtn');
    if (inviteBtn) {
        inviteBtn.innerText = i18n[currentLang].shareLink;
    }
    const setPwdInput = document.getElementById('setPwdInput');
    if (setPwdInput) {
        setPwdInput.placeholder = i18n[currentLang].pwdPlaceholder;
    }
    const lockRoomBtn = document.getElementById('lockRoomBtn');
    if (lockRoomBtn) {
        lockRoomBtn.innerText = i18n[currentLang].lockRoom;
    }
    const lockedStatusSpan = document.getElementById('lockedStatusSpan');
    if (lockedStatusSpan) {
        lockedStatusSpan.innerText = i18n[currentLang].lockedStatus;
    }

    // Update modal controls
    const tabMoneyBtn = document.getElementById('tabMoneyBtn');
    if (tabMoneyBtn) tabMoneyBtn.innerText = i18n[currentLang].tabMoney;
    const tabTigersBtn = document.getElementById('tabTigersBtn');
    if (tabTigersBtn) tabTigersBtn.innerText = i18n[currentLang].tabTigers;
    const confirmSingleModalBtn = document.getElementById('confirmSingleModalBtn');
    if (confirmSingleModalBtn) confirmSingleModalBtn.innerText = i18n[currentLang].closeModal;
    const confirmGrandModalBtn = document.getElementById('confirmGrandModalBtn');
    if (confirmGrandModalBtn) confirmGrandModalBtn.innerText = i18n[currentLang].closeModal;
    
    // Update dynamic round texts
    document.querySelectorAll('.game-round').forEach(roundDiv => {
        const roundId = roundDiv.id.replace('round-', '');
        const titleSpan = roundDiv.querySelector('.round-header-title');
        if (titleSpan) titleSpan.innerText = i18n[currentLang].roundTitle.replace('{n}', roundId);
        
        const addTigersBtn = roundDiv.querySelector('.round-plus-btn');
        if (addTigersBtn) addTigersBtn.innerText = i18n[currentLang].addTigerRow;

        roundDiv.querySelectorAll('.player-row').forEach(row => {
            row.querySelector('.player-alias').placeholder = i18n[currentLang].aliasPlaceholder;
            row.querySelectorAll('.tiger-input').forEach(input => {
                input.placeholder = i18n[currentLang].scorePlaceholder;
            });
        });

        const unitTextNode = roundDiv.querySelector('.unit-text-label');
        if (unitTextNode) {
            unitTextNode.innerText = i18n[currentLang].unitText;
        }

        const saveBtn = roundDiv.querySelector('.save-round-btn');
        if (saveBtn) {
            saveBtn.innerHTML = i18n[currentLang].saveRound;
        }
        
        const clearBtn = roundDiv.querySelector('.clear-round-btn');
        if (clearBtn) {
            if (clearBtn.dataset.confirm === "true") {
                clearBtn.innerHTML = `🔄 ${i18n[currentLang].confirmClear}`;
            } else {
                clearBtn.innerHTML = `🔄 ${i18n[currentLang].clearRound}`;
            }
        }
        
        const modifyBtn = roundDiv.querySelector('.modify-round-btn');
        if (modifyBtn) {
            modifyBtn.innerHTML = i18n[currentLang].modifyRound;
        }
        
        const resultTitle = roundDiv.querySelector('.result-title');
        if (resultTitle) {
            resultTitle.innerText = i18n[currentLang].resultTitle;
        }

        const viewDetailBtn = roundDiv.querySelector('.view-detail-btn');
        if (viewDetailBtn) {
            viewDetailBtn.innerHTML = i18n[currentLang].viewDetails;
        }

        roundDiv.querySelectorAll('.result-item').forEach(item => {
            const dir = item.dataset.dir;
            const alias = item.dataset.alias;
            if (dir && alias) {
                const dirName = i18n[currentLang][dir === '东' ? 'east' : dir === '南' ? 'south' : dir === '西' ? 'west' : 'north'];
                const playerSpan = item.querySelector('.result-player');
                if (playerSpan) playerSpan.innerText = `${alias} (${dirName})`;
            }
        });
    });
}

langToggle.addEventListener('click', toggleLanguage);

// --- Game Logic ---
let roundCount = 0;
const directions = ['东', '西', '南', '北'];

// Initial default aliases for fresh game
let aliases = {
    '东': 'Mom',
    '西': 'Ben',
    '南': 'Dad',
    '北': 'Li'
};

// Global helper to create a strictly numeric tiger input
function createTigerInput() {
    const input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'decimal';
    input.className = 'tiger-input';
    input.placeholder = i18n[currentLang].scorePlaceholder;
    input.value = '';
    
    // Strict numeric restriction: only numbers and at most 1 decimal dot
    input.addEventListener('input', (e) => {
        let val = e.target.value.replace(/[^0-9.]/g, '');
        const parts = val.split('.');
        if (parts.length > 2) {
            val = parts[0] + '.' + parts.slice(1).join('');
        }
        e.target.value = val;
    });

    return input;
}

/**
 * 阶段二核心改造：创建单局
 * 1. 移除每行分散的4个加号，改为单局统一加号按钮“➕ 抓虎”；
 * 2. 引入【💾 保存本局】按钮，点击后锁定为只读防误触，展示结算结果；
 * 3. 保存后提供专属【✏️ 修改本局】按钮进行解锁。
 */
function createGameRound(autoScroll = true) {
    if (roundCount === 0) {
        document.getElementById('startGameBtn').innerHTML = i18n[currentLang].startAnother;
    }
    roundCount++;
    const roundId = roundCount;
    
    const roundDiv = document.createElement('div');
    roundDiv.className = 'game-round';
    roundDiv.id = `round-${roundId}`;
    roundDiv.dataset.round = roundId;
    
    // Round Header with Title and Single Unified Plus Button (➕ 抓虎)
    const header = document.createElement('div');
    header.className = 'round-header';

    const titleSpan = document.createElement('span');
    titleSpan.className = 'round-header-title';
    titleSpan.innerText = i18n[currentLang].roundTitle.replace('{n}', roundId);
    header.appendChild(titleSpan);

    // 单局统一“+”号按钮：按一次即为当局所有玩家追加一列抓虎输入框
    const addTigersBtn = document.createElement('button');
    addTigersBtn.className = 'round-plus-btn';
    addTigersBtn.innerText = i18n[currentLang].addTigerRow;
    addTigersBtn.title = "追加一列虎数录入框";
    addTigersBtn.onclick = () => {
        if (roundDiv.classList.contains('is-saved')) return;
        roundDiv.querySelectorAll('.player-row .tiger-list').forEach(list => {
            list.appendChild(createTigerInput());
        });
        triggerSync();
    };
    header.appendChild(addTigersBtn);
    roundDiv.appendChild(header);

    // Player Rows: 每行只保留麻将牌、玩家别名输入框、虎数框容器，横向彻底释放
    directions.forEach(dir => {
        const row = document.createElement('div');
        row.className = `player-row row-${dir}`;
        row.dataset.dir = dir;

        const dirContainer = document.createElement('div');
        dirContainer.className = 'player-dir-container';

        const tileIcon = document.createElement('div');
        tileIcon.className = 'real-mahjong-tile';
        const traditionalDir = { '东': '東', '南': '南', '西': '西', '北': '北' }[dir];
        tileIcon.innerText = traditionalDir;

        dirContainer.appendChild(tileIcon);
        row.appendChild(dirContainer);

        const playerInfo = document.createElement('div');
        playerInfo.className = 'player-info';

        const aliasInput = document.createElement('input');
        aliasInput.type = 'text';
        aliasInput.className = 'player-alias';
        aliasInput.value = aliases[dir] || '';
        aliasInput.placeholder = i18n[currentLang].aliasPlaceholder;
        aliasInput.setAttribute('autocomplete', 'off');
        aliasInput.setAttribute('autocorrect', 'off');
        aliasInput.setAttribute('autocapitalize', 'off');
        aliasInput.setAttribute('spellcheck', 'false');
        
        playerInfo.appendChild(aliasInput);

        const tigerList = document.createElement('div');
        tigerList.className = 'tiger-list';
        tigerList.appendChild(createTigerInput());
        playerInfo.appendChild(tigerList);
        
        row.appendChild(playerInfo);
        roundDiv.appendChild(row);
    });

    // Footer Controls
    const footer = document.createElement('div');
    footer.className = 'footer-controls';
    
    const unitDiv = document.createElement('div');
    unitDiv.className = 'unit-input';
    unitDiv.innerHTML = `<span class="unit-icon">¥</span> <input type="text" inputmode="decimal" class="round-unit" value="0.5"> <span class="unit-text-label">${i18n[currentLang].unitText}</span>`;
    
    const unitInp = unitDiv.querySelector('.round-unit');
    unitInp.addEventListener('input', (e) => {
        let val = e.target.value.replace(/[^0-9.]/g, '');
        const parts = val.split('.');
        if (parts.length > 2) {
            val = parts[0] + '.' + parts.slice(1).join('');
        }
        e.target.value = val;
    });

    // 【💾 保存本局】按钮
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-round-btn';
    saveBtn.innerHTML = i18n[currentLang].saveRound;
    saveBtn.onclick = () => {
        saveRound(roundDiv, true);
    };

    // 【✏️ 修改本局】按钮 (保存后解锁用)
    const modifyBtn = document.createElement('button');
    modifyBtn.className = 'modify-round-btn hidden';
    modifyBtn.innerHTML = i18n[currentLang].modifyRound;
    modifyBtn.onclick = () => {
        unlockRoundForEdit(roundDiv);
    };

    // 【🔄 重置本局】按钮 (防误触二次确认)
    const clearBtn = document.createElement('button');
    clearBtn.className = 'clear-round-btn';
    clearBtn.dataset.confirm = "false";
    clearBtn.innerHTML = `🔄 ${i18n[currentLang].clearRound}`;
    clearBtn.onclick = () => {
        if (clearBtn.dataset.confirm === "true") {
            clearBtn.dataset.confirm = "false";
            clearBtn.innerHTML = `🔄 ${i18n[currentLang].clearRound}`;
            clearBtn.style.backgroundColor = "";
            resetRound(roundDiv);
        } else {
            clearBtn.dataset.confirm = "true";
            clearBtn.innerHTML = `🔄 ${i18n[currentLang].confirmClear}`;
            clearBtn.style.backgroundColor = "#e67e22";
            
            setTimeout(() => {
                if (clearBtn.dataset.confirm === "true") {
                    clearBtn.dataset.confirm = "false";
                    clearBtn.innerHTML = `🔄 ${i18n[currentLang].clearRound}`;
                    clearBtn.style.backgroundColor = "";
                }
            }, 3000);
        }
    };
    
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'footer-actions';
    actionsDiv.appendChild(clearBtn);
    actionsDiv.appendChild(modifyBtn);
    actionsDiv.appendChild(saveBtn);
    
    footer.appendChild(unitDiv);
    footer.appendChild(actionsDiv);
    roundDiv.appendChild(footer);
    
    const resultDiv = document.createElement('div');
    resultDiv.className = 'round-result hidden';
    roundDiv.appendChild(resultDiv);

    gameRoundsContainer.appendChild(roundDiv);
    if (autoScroll) {
        roundDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * 保存本局并锁定防误触
 * 1. 禁用所有输入框，置入 is-saved 样式；
 * 2. 隐藏【保存】，展现【修改】；
 * 3. 实时计算并展现结算结果与“查看详细过程”按钮；
 * 4. openModal 为 true 时自动弹出单局公式明细弹窗。
 */
function saveRound(roundDiv, openModal = false) {
    const unitInput = roundDiv.querySelector('.round-unit');
    const unit = parseFloat(unitInput.value) || 0.5;
    
    let tigersMap = {};
    const roundAliases = {};
    const rows = roundDiv.querySelectorAll('.player-row');
    rows.forEach(row => {
        const dir = row.dataset.dir;
        const aliasInp = row.querySelector('.player-alias');
        const aliasVal = (aliasInp && aliasInp.value && aliasInp.value.trim()) ? aliasInp.value.trim() : (aliases[dir] || dir);
        roundAliases[dir] = aliasVal;

        const inputs = row.querySelectorAll('.tiger-input');
        const vals = [];
        inputs.forEach(input => {
            if (input.value !== '') vals.push(parseFloat(input.value) || 0);
        });
        tigersMap[dir] = vals;
    });

    const engine = window.ScoringEngine || { calculateRoundDetails };
    const res = engine.calculateRoundDetails(tigersMap, unit, directions, roundAliases);

    const resultDiv = roundDiv.querySelector('.round-result');
    resultDiv.innerHTML = `<h3 class="result-title">${i18n[currentLang].resultTitle}</h3>`;
    
    res.details.forEach(item => {
        const colorClass = item.money >= 0 ? 'positive' : 'negative';
        const sign = item.money > 0 ? '+' : '';
        const dirName = i18n[currentLang][item.dir === '东' ? 'east' : item.dir === '南' ? 'south' : item.dir === '西' ? 'west' : 'north'];

        const itemDiv = document.createElement('div');
        itemDiv.className = 'result-item';
        itemDiv.dataset.dir = item.dir;
        itemDiv.dataset.alias = item.alias;
        itemDiv.innerHTML = `<span class="result-player">${item.alias} (${dirName})</span> <span class="score-val ${colorClass}">${sign}${item.money}</span>`;
        resultDiv.appendChild(itemDiv);
    });

    // 附带“查看计算过程”交互按钮
    const viewBtn = document.createElement('button');
    viewBtn.className = 'view-detail-btn';
    viewBtn.innerHTML = i18n[currentLang].viewDetails;
    viewBtn.onclick = () => {
        openSingleRoundModal(roundDiv.dataset.round || roundDiv.id.replace('round-', ''), roundDiv);
    };
    resultDiv.appendChild(viewBtn);
    resultDiv.classList.remove('hidden');

    // 锁定本局：锁定输入框防止传阅误触
    roundDiv.classList.add('is-saved');
    roundDiv.querySelectorAll('input').forEach(el => el.disabled = true);
    
    // 切换按钮状态：隐藏保存，展现修改
    const saveBtn = roundDiv.querySelector('.save-round-btn');
    if (saveBtn) saveBtn.classList.add('hidden');
    const modifyBtn = roundDiv.querySelector('.modify-round-btn');
    if (modifyBtn) modifyBtn.classList.remove('hidden');

    triggerSync();

    if (openModal) {
        openSingleRoundModal(roundDiv.dataset.round || roundDiv.id.replace('round-', ''), roundDiv);
    }
}

/**
 * 解锁本局进入编辑态
 */
function unlockRoundForEdit(roundDiv) {
    roundDiv.classList.remove('is-saved');
    roundDiv.querySelectorAll('input').forEach(el => el.disabled = false);

    const saveBtn = roundDiv.querySelector('.save-round-btn');
    if (saveBtn) saveBtn.classList.remove('hidden');
    const modifyBtn = roundDiv.querySelector('.modify-round-btn');
    if (modifyBtn) modifyBtn.classList.add('hidden');

    const resultDiv = roundDiv.querySelector('.round-result');
    if (resultDiv) resultDiv.classList.add('hidden');

    triggerSync();
}

/**
 * 重置本局数据
 */
function resetRound(roundDiv) {
    roundDiv.classList.remove('is-saved');
    roundDiv.querySelectorAll('.tiger-list').forEach(list => {
        list.innerHTML = '';
        list.appendChild(createTigerInput());
    });
    roundDiv.querySelectorAll('input').forEach(el => el.disabled = false);

    const saveBtn = roundDiv.querySelector('.save-round-btn');
    if (saveBtn) saveBtn.classList.remove('hidden');
    const modifyBtn = roundDiv.querySelector('.modify-round-btn');
    if (modifyBtn) modifyBtn.classList.add('hidden');

    const resultDiv = roundDiv.querySelector('.round-result');
    if (resultDiv) resultDiv.classList.add('hidden');

    triggerSync();
}

// Single Round Detail Modal (Shows Tiger Count and Formula: ((本人虎数*3-其他人虎数之和)*单位))
function openSingleRoundModal(roundId, roundDiv) {
    const modal = document.getElementById('singleRoundModal');
    const modalTitle = document.getElementById('singleRoundModalTitle');
    const modalBody = document.getElementById('singleRoundModalBody');
    if (!modal || !modalBody) return;
    
    modalTitle.innerText = i18n[currentLang].singleModalTitle.replace('{n}', roundId);
    
    const unitInput = roundDiv.querySelector('.round-unit');
    const unit = parseFloat(unitInput.value) || 0.5;
    
    const tigersMap = {};
    const roundAliases = {};
    directions.forEach(dir => {
        const row = roundDiv.querySelector(`.row-${dir}`);
        const aliasInp = row.querySelector('.player-alias');
        const aliasVal = (aliasInp && aliasInp.value && aliasInp.value.trim()) ? aliasInp.value.trim() : (aliases[dir] || dir);
        roundAliases[dir] = aliasVal;

        const inputs = row.querySelectorAll('.tiger-input');
        const vals = [];
        inputs.forEach(input => {
            if (input.value !== '') vals.push(parseFloat(input.value) || 0);
        });
        tigersMap[dir] = vals;
    });

    const engine = window.ScoringEngine || { calculateRoundDetails };
    const res = engine.calculateRoundDetails(tigersMap, unit, directions, roundAliases);

    let html = '';
    res.details.forEach(item => {
        const colorClass = item.money >= 0 ? 'positive' : 'negative';
        const sign = item.money > 0 ? '+' : '';
        const dirName = i18n[currentLang][item.dir === '东' ? 'east' : item.dir === '南' ? 'south' : item.dir === '西' ? 'west' : 'north'];
        
        html += `
            <div class="single-calc-card row-${item.dir}">
                <div class="calc-card-top">
                    <div class="calc-player-name">
                        <span>${item.alias} (${dirName})</span>
                        <span class="calc-tigers-tag">🐅 ${i18n[currentLang].tigersTag.replace('{count}', item.tigers)}</span>
                    </div>
                    <div class="calc-money-tag score-val ${colorClass}">
                        ${sign}${item.money} 元
                    </div>
                </div>
                <div class="calc-formula-box">
                    <div class="calc-formula-title">${i18n[currentLang].calcProcess}:</div>
                    <div>${i18n[currentLang].formulaDesc}</div>
                    <div style="color:#2C3E50; font-weight:bold; margin-top:3px;">
                        = ((${item.tigers} × 3 - ${item.othersSum}) × ${unit}) = ${sign}${item.money} 元
                    </div>
                </div>
            </div>
        `;
    });

    modalBody.innerHTML = html;
    modal.classList.remove('hidden');
}

// --- Grand Total Leaderboard Modal (Money vs Tigers Option, Grouped by Alias) ---
let currentGrandTab = 'money'; // 'money' or 'tigers'

function openGrandTotalModal(tab = currentGrandTab) {
    currentGrandTab = tab;
    const modal = document.getElementById('grandTotalModal');
    const list = document.getElementById('grandTotalList');
    const subtitle = document.getElementById('grandTotalSubtitle');
    if (!modal || !list) return;

    const state = getGameState();
    const engine = window.ScoringEngine || { calculateGrandTotal };
    const grand = engine.calculateGrandTotal(state.rounds, directions, aliases);

    subtitle.innerText = i18n[currentLang].roundsPlayed.replace('{n}', grand.settledRoundsCount);

    const tabMoneyBtn = document.getElementById('tabMoneyBtn');
    const tabTigersBtn = document.getElementById('tabTigersBtn');

    if (currentGrandTab === 'money') {
        tabMoneyBtn.classList.add('active');
        tabTigersBtn.classList.remove('active');
        renderGrandMoneyList(grand.byMoney);
    } else {
        tabMoneyBtn.classList.remove('active');
        tabTigersBtn.classList.add('active');
        renderGrandTigersList(grand.byTigers);
    }

    modal.classList.remove('hidden');
}

function renderGrandMoneyList(rankedPlayers) {
    const list = document.getElementById('grandTotalList');
    let html = '';
    rankedPlayers.forEach((p, idx) => {
        const rank = idx + 1;
        const colorClass = p.totalMoney >= 0 ? 'positive' : 'negative';
        const sign = p.totalMoney > 0 ? '+' : '';
        const winnerBadge = p.isBigWinnerMoney ? `<span class="winner-crown">👑</span><span style="color:#F39C12; font-size:12px; font-weight:800;">${i18n[currentLang].bigWinner}</span>` : '';
        const itemClass = p.isBigWinnerMoney ? 'leaderboard-item is-winner' : 'leaderboard-item';

        const seatsText = p.dirsPlayed && p.dirsPlayed.length > 0 
            ? `${i18n[currentLang].seatsPlayed}: ${p.dirsPlayed.map(d => i18n[currentLang][d === '东' ? 'east' : d === '南' ? 'south' : d === '西' ? 'west' : 'north']).join('、')}`
            : '';
        const playedText = i18n[currentLang].playedAndWon.replace('{played}', p.roundsPlayed).replace('{won}', p.roundsWon);

        html += `
            <div class="${itemClass}">
                <div class="leader-rank rank-${rank}">${rank}</div>
                <div class="leader-info">
                    <div class="leader-name-row">
                        <span class="leader-name">${p.alias}</span>
                        ${winnerBadge}
                    </div>
                    <div class="leader-sub">${playedText} ${seatsText ? ' | ' + seatsText : ''}</div>
                </div>
                <div class="leader-score score-val ${colorClass}">
                    ${sign}${p.totalMoney} 元
                </div>
            </div>
        `;
    });
    list.innerHTML = html;
}

function renderGrandTigersList(rankedPlayers) {
    const list = document.getElementById('grandTotalList');
    let html = '';
    rankedPlayers.forEach((p, idx) => {
        const rank = idx + 1;
        const colorClass = p.totalNetTigers >= 0 ? 'positive' : 'negative';
        const sign = p.totalNetTigers > 0 ? '+' : '';
        const winnerBadge = p.isBigWinnerTigers ? `<span class="winner-crown">🐅</span><span style="color:#E67E22; font-size:12px; font-weight:800;">${i18n[currentLang].tigerKing}</span>` : '';
        const itemClass = p.isBigWinnerTigers ? 'leaderboard-item is-winner' : 'leaderboard-item';

        const seatsText = p.dirsPlayed && p.dirsPlayed.length > 0 
            ? `${i18n[currentLang].seatsPlayed}: ${p.dirsPlayed.map(d => i18n[currentLang][d === '东' ? 'east' : d === '南' ? 'south' : d === '西' ? 'west' : 'north']).join('、')}`
            : '';
        const tigerStats = i18n[currentLang].rawTigersSummary.replace('{raw}', p.totalRawTigers).replace('{net}', (p.totalNetTigers > 0 ? '+' : '') + p.totalNetTigers);

        html += `
            <div class="${itemClass}">
                <div class="leader-rank rank-${rank}">${rank}</div>
                <div class="leader-info">
                    <div class="leader-name-row">
                        <span class="leader-name">${p.alias}</span>
                        ${winnerBadge}
                    </div>
                    <div class="leader-sub">${tigerStats} ${seatsText ? ' | ' + seatsText : ''}</div>
                </div>
                <div class="leader-score score-val ${colorClass}">
                    ${sign}${p.totalNetTigers} 虎
                </div>
            </div>
        `;
    });
    list.innerHTML = html;
}

// Modal tab listeners
const tabMoneyBtn = document.getElementById('tabMoneyBtn');
if (tabMoneyBtn) {
    tabMoneyBtn.addEventListener('click', () => openGrandTotalModal('money'));
}
const tabTigersBtn = document.getElementById('tabTigersBtn');
if (tabTigersBtn) {
    tabTigersBtn.addEventListener('click', () => openGrandTotalModal('tigers'));
}

// Close modal listeners
const closeSingleModalBtn = document.getElementById('closeSingleModalBtn');
if (closeSingleModalBtn) {
    closeSingleModalBtn.addEventListener('click', () => {
        document.getElementById('singleRoundModal').classList.add('hidden');
    });
}
const confirmSingleModalBtn = document.getElementById('confirmSingleModalBtn');
if (confirmSingleModalBtn) {
    confirmSingleModalBtn.addEventListener('click', () => {
        document.getElementById('singleRoundModal').classList.add('hidden');
    });
}
const closeGrandModalBtn = document.getElementById('closeGrandModalBtn');
if (closeGrandModalBtn) {
    closeGrandModalBtn.addEventListener('click', () => {
        document.getElementById('grandTotalModal').classList.add('hidden');
    });
}
const confirmGrandModalBtn = document.getElementById('confirmGrandModalBtn');
if (confirmGrandModalBtn) {
    confirmGrandModalBtn.addEventListener('click', () => {
        document.getElementById('grandTotalModal').classList.add('hidden');
    });
}

// Top button listeners
startGameBtn.addEventListener('click', () => {
    createGameRound(true);
    triggerSync();
});

// Grand End Game button with double confirmation (Bug 7)
if (endSessionBtn) {
    endSessionBtn.addEventListener('click', () => {
        if (endSessionBtn.dataset.confirm === "true") {
            endSessionBtn.dataset.confirm = "false";
            endSessionBtn.innerHTML = i18n[currentLang].endSession;
            endSessionBtn.classList.remove('confirming');
            
            const state = getGameState();
            const settled = state.rounds.filter(r => r.isSaved || r.isEnded);
            if (settled.length === 0) {
                alert(i18n[currentLang].noRoundsAlert);
                return;
            }
            openGrandTotalModal();
        } else {
            endSessionBtn.dataset.confirm = "true";
            endSessionBtn.innerHTML = i18n[currentLang].confirmEndSession;
            endSessionBtn.classList.add('confirming');
            
            setTimeout(() => {
                if (endSessionBtn.dataset.confirm === "true") {
                    endSessionBtn.dataset.confirm = "false";
                    endSessionBtn.innerHTML = i18n[currentLang].endSession;
                    endSessionBtn.classList.remove('confirming');
                }
            }, 3000);
        }
    });
}

if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
        if (clearAllBtn.dataset.confirm === "true") {
            gameRoundsContainer.innerHTML = '';
            roundCount = 0;
            startGameBtn.innerHTML = i18n[currentLang].startGame;
            
            clearAllBtn.dataset.confirm = "false";
            clearAllBtn.innerHTML = i18n[currentLang].clearAll;
            clearAllBtn.style.backgroundColor = "";
            
            triggerSync();
        } else {
            clearAllBtn.dataset.confirm = "true";
            clearAllBtn.innerHTML = i18n[currentLang].confirmClearAll;
            clearAllBtn.style.backgroundColor = "#922b21";
            
            setTimeout(() => {
                if (clearAllBtn.dataset.confirm === "true") {
                    clearAllBtn.dataset.confirm = "false";
                    clearAllBtn.innerHTML = i18n[currentLang].clearAll;
                    clearAllBtn.style.backgroundColor = "";
                }
            }, 3000);
        }
    });
}

// --- Notepad Room Sync Logic ---
let currentRoomCode = null;

async function checkRoom() {
    const path = window.location.pathname;
    if (path.startsWith('/mj/')) {
        currentRoomCode = path.substring(4);
        if (!currentRoomCode || currentRoomCode.trim() === '') {
            window.location.replace('/');
            return;
        }
    } else {
        return;
    }
    
    const headerBtns = document.querySelector('.header-buttons');
    
    const roomInfo = document.createElement('div');
    roomInfo.className = 'room-settings-bar';
    roomInfo.innerHTML = `
        <div style="display:flex; align-items:center; flex-wrap:wrap; justify-content:center; gap:8px; width:100%;">
            <div id="roomCodeBadge" style="background:#FFF9E6; border:2.5px solid #D2B48C; border-radius:20px; padding:4px 12px; color:#8D5A28; font-weight:900;">
                ${i18n[currentLang].roomLabel}${currentRoomCode}
            </div>
            <button id="inviteBtn" class="pwd-btn" onclick="copyLink()" style="background:#2ECC71; box-shadow:0 3px 0 #27AE60;">${i18n[currentLang].shareLink}</button>
            <span id="pwdContainer" style="display:flex; gap:5px;">
                <input type="password" id="setPwdInput" class="pwd-input" placeholder="${i18n[currentLang].pwdPlaceholder}" style="border:2px solid #E0E0E0; border-radius:20px;">
                <button id="lockRoomBtn" class="pwd-btn" onclick="setPassword()" style="background:#9B59B6; box-shadow:0 3px 0 #8E44AD;">${i18n[currentLang].lockRoom}</button>
            </span>
        </div>
    `;

    headerBtns.insertAdjacentElement('afterend', roomInfo);
    
    loadRoomData();
}

window.setPassword = async function() {
    const pwdInput = document.getElementById('setPwdInput');
    const pwd = pwdInput ? pwdInput.value : '';
    if (!pwd) {
        alert(i18n[currentLang].enterPwdAlert);
        return;
    }
    const res = await fetch('/api/room', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ action: 'set_password', roomCode: currentRoomCode, password: pwd })
    });
    const data = await res.json();
    if (data.success) {
        localStorage.setItem('room_pwd_' + currentRoomCode, pwd);
        document.getElementById('pwdContainer').innerHTML = `<span id="lockedStatusSpan" style="color:#2ecc71;font-weight:bold;">${i18n[currentLang].lockedStatus}</span>`;
        triggerSync();
    } else {
        alert(i18n[currentLang].pwdFailedAlert + data.error);
    }
};

async function loadRoomData() {
    let url = '/api/room?code=' + encodeURIComponent(currentRoomCode);
    let roomPwd = localStorage.getItem('room_pwd_' + currentRoomCode) || '';
    if (roomPwd) url += '&pwd=' + encodeURIComponent(roomPwd);

    const res = await fetch(url);
    const data = await res.json();
    
    if (data.error === 'Password required' || data.error === 'Incorrect password') {
        document.querySelector('.container').innerHTML = `
            <div class="locked-screen">
                  <h2>${i18n[currentLang].lockedTitle}</h2>
                  <p style="color: #555; font-weight: bold; margin-bottom: 20px;">${i18n[currentLang].lockedPrompt}</p>
                  <div style="display:flex; justify-content:center; gap:10px;">
                      <input type="password" id="unlockPwd" class="pwd-input" style="width:180px; font-size:16px;" placeholder="${i18n[currentLang].unlockPlaceholder}" onkeyup="if(event.key==='Enter') unlockRoom()">
                      <button class="primary-btn" style="margin:0; padding:8px 24px; font-size:16px; border:none; border-radius:30px; background:linear-gradient(180deg, #F39C12 0%, #E67E22 100%); color:white; font-weight:bold; cursor:pointer; box-shadow:0 5px 0 #D35400, 0 8px 12px rgba(0,0,0,0.2);" onclick="unlockRoom()">${i18n[currentLang].unlockBtn}</button>
                  </div>
                  <p id="unlockError" style="color:#E74C3C; margin-top:15px; font-weight:bold;"></p>
              </div>
        `;
        return;
    }

    if (data.success) {
        if (data.room && (data.room.hasPassword || data.room.password)) {
            const pwdContainer = document.getElementById('pwdContainer');
            if(pwdContainer) pwdContainer.innerHTML = `<span id="lockedStatusSpan" style="color:#2ecc71;font-weight:bold;">${i18n[currentLang].lockedStatus}</span>`;
        }
        if (data.room && data.room.state) {
            isSyncing = true;
            applyGameState(data.room.state);
            isSyncing = false;
        }
    } else {
        alert('无法加载房间: ' + data.error);
    }
}

window.unlockRoom = async function() {
    const pwdInput = document.getElementById('unlockPwd');
    const p = pwdInput ? pwdInput.value : '';
    if(!p) return;
    
    try {
        const res = await fetch(`/api/room?code=${encodeURIComponent(currentRoomCode)}&pwd=${encodeURIComponent(p)}`);
        const data = await res.json();
        if (data.error === 'Incorrect password') {
            document.getElementById('unlockError').innerText = i18n[currentLang].wrongPwd;
            return;
        }
        if (data.success) {
            localStorage.setItem('room_pwd_' + currentRoomCode, p);
            location.reload();
        }
    } catch(e) {
        document.getElementById('unlockError').innerText = i18n[currentLang].networkError;
    }
};

// Clipboard copy with fallback (Bug 9)
function copyLink() {
    const text = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            alert(i18n[currentLang].linkCopied);
        }).catch(() => fallbackCopy(text));
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            alert(i18n[currentLang].linkCopied);
        } else {
            prompt(i18n[currentLang].shareLink, text);
        }
    } catch (err) {
        prompt(i18n[currentLang].shareLink, text);
    }
    document.body.removeChild(ta);
}

// --- CHINESE IME & USER ACTIVITY GUARDS ---
let isComposing = false;
let lastInteractionTime = 0;

function recordActivity() {
    lastInteractionTime = Date.now();
}

document.addEventListener('compositionstart', () => {
    isComposing = true;
    recordActivity();
});

document.addEventListener('compositionend', (e) => {
    isComposing = false;
    recordActivity();
    if (e.target && e.target.classList.contains('player-alias')) {
        const row = e.target.closest('.player-row');
        if (row && row.dataset.dir) {
            aliases[row.dataset.dir] = e.target.value;
        }
        triggerSync();
    }
});

document.addEventListener('input', (e) => {
    recordActivity();
    if (isComposing) return; // Do not interrupt during Chinese Pinyin input!
    
    if (e.target.tagName === 'INPUT') {
        if (e.target.classList.contains('player-alias')) {
            const row = e.target.closest('.player-row');
            if (row && row.dataset.dir) {
                aliases[row.dataset.dir] = e.target.value;
            }
        }
        triggerSync();
    }
});

document.addEventListener('keydown', recordActivity);
document.addEventListener('touchstart', recordActivity);
document.addEventListener('click', recordActivity);

document.addEventListener('change', (e) => {
    recordActivity();
    if (e.target.tagName === 'INPUT') {
        triggerSync();
    }
});

// --- STATE SYNC LOGIC ---
let isSyncing = false;
let syncDebounceTimer = null;

function triggerSync() {
    clearTimeout(syncDebounceTimer);
    syncDebounceTimer = setTimeout(() => {
        pushStateToServer();
    }, 250);
}

// Serialization (Supports isSaved, per-round aliases, and empty tiger inputs)
function getGameState() {
    const rounds = [];
    document.querySelectorAll('.game-round').forEach(roundDiv => {
        const isSaved = roundDiv.classList.contains('is-saved');
        const roundState = {
            unit: parseFloat(roundDiv.querySelector('.round-unit').value) || 0.5,
            players: {},
            isSaved: isSaved,
            isEnded: isSaved // Compatibility with previous records
        };
        
        roundDiv.querySelectorAll('.player-row').forEach(row => {
            const dir = row.dataset.dir;
            const aliasInput = row.querySelector('.player-alias');
            const rowAlias = (aliasInput && aliasInput.value && aliasInput.value.trim()) ? aliasInput.value.trim() : (aliases[dir] || dir);
            
            // Update global aliases cache for next round creation
            aliases[dir] = rowAlias;

            const tigers = [];
            row.querySelectorAll('.tiger-input').forEach(input => {
                tigers.push(input.value === '' ? '' : parseFloat(input.value));
            });
            roundState.players[dir] = {
                alias: rowAlias,
                tigers: tigers
            };
        });
        rounds.push(roundState);
    });
    return { aliases: aliases, rounds: rounds };
}

// Deserialization (Restores saved state, locked inputs, and custom aliases per round)
async function applyGameState(state) {
    let roundsToApply = [];
    if (Array.isArray(state)) {
        roundsToApply = state;
    } else if (state && state.rounds) {
        roundsToApply = state.rounds;
        if (state.aliases) {
            aliases = Object.assign(aliases, state.aliases);
        }
    }
    const container = document.getElementById('gameRoundsContainer');
    container.innerHTML = '';
    roundCount = 0;
    
    roundsToApply.forEach(roundState => {
        createGameRound(false);
        const roundDiv = container.lastElementChild;
        if (!roundDiv) return;
        
        const unitInput = roundDiv.querySelector('.round-unit');
        if (unitInput) unitInput.value = (roundState.unit !== undefined ? roundState.unit : 0.5);
        
        roundDiv.querySelectorAll('.player-row').forEach(row => {
            const dir = row.dataset.dir;
            const playerData = roundState.players ? roundState.players[dir] : null;
            let tigers = [];
            let rowAlias = aliases[dir] || '';
            
            if (Array.isArray(playerData)) {
                tigers = playerData;
            } else if (playerData && typeof playerData === 'object') {
                tigers = playerData.tigers || [];
                if (playerData.alias) rowAlias = playerData.alias;
            }
            
            const aliasInput = row.querySelector('.player-alias');
            if (aliasInput && rowAlias) {
                aliasInput.value = rowAlias;
            }
            
            const tigerList = row.querySelector('.tiger-list');
            if (tigerList) {
                tigerList.innerHTML = '';
                if (tigers.length === 0) {
                    tigerList.appendChild(createTigerInput());
                } else {
                    tigers.forEach(val => {
                        const input = createTigerInput();
                        input.value = (val === '' || val === null || val === undefined) ? '' : val;
                        tigerList.appendChild(input);
                    });
                }
            }
        });
        
        // If round was saved or ended, apply save & lock styling
        if (roundState.isSaved || roundState.isEnded) {
            saveRound(roundDiv, false);
        }
    });

    document.getElementById('startGameBtn').innerHTML = roundCount > 0 ? i18n[currentLang].startAnother : i18n[currentLang].startGame;
}

// Push state to server with password (Bug 3 Fix)
async function pushStateToServer() {
    if (isSyncing || !currentRoomCode) return;
    const state = getGameState();
    const roomPwd = localStorage.getItem('room_pwd_' + currentRoomCode) || '';
    try {
        await fetch('/api/game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'save_state',
                roomCode: currentRoomCode,
                state: state,
                password: roomPwd
            })
        });
    } catch(e) {
        console.error('Push state failed:', e);
    }
}

// Periodically pull state from server (Guarded against user typing and Chinese IME)
setInterval(async () => {
    if (!currentRoomCode || isSyncing) return;
    if (isComposing) return;
    if (Date.now() - lastInteractionTime < 4000) return;
    if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
    
    try {
        let url = '/api/room?code=' + encodeURIComponent(currentRoomCode);
        let roomPwd = localStorage.getItem('room_pwd_' + currentRoomCode) || '';
        if (roomPwd) url += '&pwd=' + encodeURIComponent(roomPwd);
        
        const res = await fetch(url);
        const data = await res.json();
        if (data.success && data.room && data.room.state) {
            const remoteStateStr = JSON.stringify(data.room.state);
            const localStateStr = JSON.stringify(getGameState());
            if (remoteStateStr !== localStateStr) {
                isSyncing = true;
                applyGameState(data.room.state);
                isSyncing = false;
            }
        }
    } catch(e) {}
}, 3000);

// Initialize everything
initDogs();
checkRoom();
