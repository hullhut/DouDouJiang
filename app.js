const gameRoundsContainer = document.getElementById('gameRoundsContainer');
const startGameBtn = document.getElementById('startGameBtn');
const viewGrandBtn = document.getElementById('viewGrandBtn');
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
        startAnother: "➕ Next Game ▶",
        endGame: "🏁 End Game 🏆",
        confirmEndGame: "Confirm End Game {n}?",
        gameEndedBadge: "Game Settled ✅",
        viewGrand: "Leaderboard 👑",
        clearAll: "Clear All",
        confirmClearAll: "Sure to Clear All?",
        gameTitle: "Game {n}",
        statusInProgress: "In Progress",
        statusEnded: "Settled",
        addHand: "➕ Next Hand",
        handPlaceholder: "H{n}",
        aliasPlaceholder: "Player Alias",
        scorePlaceholder: "Score",
        rowTotalTigers: "{n} Tigers",
        unitText: "Unit (Yuan/Tiger)",
        saveHand: "💾 Save Hand",
        saveChanges: "💾 Save Changes",
        handSavedTag: "Hand Saved ✅",
        saveGame: "💾 Save Game",
        modifyGame: "✏️ Edit Game",
        clearGame: "🔄 Reset Game",
        confirmClearGame: "Sure to Reset?",
        saveHandFirstTip: "Please save this hand before adding the next one!",
        calcProcessLabel: "Calculation = ",
        viewGameResults: "📊 View Results & Rank",
        modalTitle: "🀄 Settlement & Leaderboard",
        tabCurrentGame: "🀄 Current Game Results",
        tabGrandTotal: "🏆 Grand Total Leaderboard",
        tabMoney: "💰 By Money",
        tabTigers: "🐯 By Tigers",
        gameSubtitle: "Game {n} Settlement ({hands} Hands Played)",
        gameLeaderboardTitle: "🏆 Game Leaderboard (Game {n})",
        gameFormulaTitle: "🧮 Tigers & Calculation Process",
        grandSubtitle: "Grand Total ({n} Games Settled)",
        bigWinner: "Big Winner 👑",
        tigerKing: "Tiger King 🐯👑",
        playedAndWon: "{played} Games | {won} Wins",
        seatsPlayed: "Seats",
        rawTigersSummary: "Tigers: {raw} | Net: {net}",
        closeModal: "Close",
        startNextGame: "➕ Next Game ▶",
        noGamesAlert: "No games recorded yet! Please start a game first.",
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
        startAnother: "➕ 开始下一局 ▶",
        endGame: "🏁 结束本局 🏆",
        confirmEndGame: "确认结束第 {n} 局？",
        gameEndedBadge: "局已结束 ✅",
        viewGrand: "全场总榜 👑",
        clearAll: "全部清空",
        confirmClearAll: "确认清空全部对局？",
        gameTitle: "第 {n} 局",
        statusInProgress: "进行中",
        statusEnded: "已结束",
        addHand: "➕ 再记一把",
        handPlaceholder: "把{n}",
        aliasPlaceholder: "玩家昵称",
        scorePlaceholder: "虎数",
        rowTotalTigers: "共 {n} 虎",
        unitText: "计分单位 (元/虎)",
        saveHand: "💾 保存这把",
        saveChanges: "💾 保存修改",
        handSavedTag: "已保存这把 ✅",
        saveGame: "💾 保存本局",
        modifyGame: "✏️ 修改本局",
        clearGame: "🔄 重置本局",
        confirmClearGame: "确认重置？",
        saveHandFirstTip: "请先保存这把，再记新一把！",
        calcProcessLabel: "计算过程 = ",
        viewGameResults: "📊 查看本局结算与排行",
        modalTitle: "🀄 结算与排行榜",
        tabCurrentGame: "🀄 当局结算与排行",
        tabGrandTotal: "🏆 全场总游戏排行榜",
        tabMoney: "💰 按金额排行",
        tabTigers: "🐯 按虎数排行",
        gameSubtitle: "第 {n} 局结算详情（共打 {hands} 把）",
        gameLeaderboardTitle: "🏆 当局排行榜 (第 {n} 局)",
        gameFormulaTitle: "🧮 本局每人虎数与计算公式",
        grandSubtitle: "全场累计（已结算 {n} 局）",
        bigWinner: "大赢家 👑",
        tigerKing: "虎王 🐯👑",
        playedAndWon: "出战 {played} 局 | 胜 {won} 局",
        seatsPlayed: "曾坐",
        rawTigersSummary: "总抓虎: {raw} | 净胜虎: {net}",
        closeModal: "确定",
        startNextGame: "➕ 开始下一局 ▶",
        noGamesAlert: "暂无已完成的对局，请先记录！",
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
        headerBannerImg.src = currentLang === 'en' ? '/images/header-en.png?v=34' : '/images/header-zh.png?v=34';
        headerBannerImg.alt = currentLang === 'en' ? 'Mahjong Scorer' : '麻将计分器';
    }

    // Update static texts
    mainTitle.innerHTML = i18n[currentLang].title;
    document.title = i18n[currentLang].docTitle;
    startGameBtn.innerHTML = gameCount > 0 ? i18n[currentLang].startAnother : i18n[currentLang].startGame;
    
    if (viewGrandBtn) {
        viewGrandBtn.innerHTML = i18n[currentLang].viewGrand;
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
    if (inviteBtn) inviteBtn.innerText = i18n[currentLang].shareLink;
    const setPwdInput = document.getElementById('setPwdInput');
    if (setPwdInput) setPwdInput.placeholder = i18n[currentLang].pwdPlaceholder;
    const lockRoomBtn = document.getElementById('lockRoomBtn');
    if (lockRoomBtn) lockRoomBtn.innerText = i18n[currentLang].lockRoom;
    const lockedStatusSpan = document.getElementById('lockedStatusSpan');
    if (lockedStatusSpan) lockedStatusSpan.innerText = i18n[currentLang].lockedStatus;

    // Update modal controls
    const tabCurrentGameBtn = document.getElementById('tabCurrentGameBtn');
    if (tabCurrentGameBtn) tabCurrentGameBtn.innerText = i18n[currentLang].tabCurrentGame;
    const tabGrandTotalBtn = document.getElementById('tabGrandTotalBtn');
    if (tabGrandTotalBtn) tabGrandTotalBtn.innerText = i18n[currentLang].tabGrandTotal;
    const tabMoneyBtn = document.getElementById('tabMoneyBtn');
    if (tabMoneyBtn) tabMoneyBtn.innerText = i18n[currentLang].tabMoney;
    const tabTigersBtn = document.getElementById('tabTigersBtn');
    if (tabTigersBtn) tabTigersBtn.innerText = i18n[currentLang].tabTigers;
    const modalStartNextGameBtn = document.getElementById('modalStartNextGameBtn');
    if (modalStartNextGameBtn) modalStartNextGameBtn.innerText = i18n[currentLang].startNextGame;
    const confirmSettlementModalBtn = document.getElementById('confirmSettlementModalBtn');
    if (confirmSettlementModalBtn) confirmSettlementModalBtn.innerText = i18n[currentLang].closeModal;

    // Update dynamic game cards
    document.querySelectorAll('.game-round').forEach(gameDiv => {
        const gameId = gameDiv.dataset.game || gameDiv.id.replace('round-', '').replace('game-', '');
        const titleSpan = gameDiv.querySelector('.round-header-title');
        if (titleSpan) titleSpan.innerText = i18n[currentLang].gameTitle.replace('{n}', gameId);

        gameDiv.querySelectorAll('.player-row').forEach(row => {
            const aliasInput = row.querySelector('.player-alias');
            if (aliasInput) aliasInput.placeholder = i18n[currentLang].aliasPlaceholder;
            
            row.querySelectorAll('.tiger-input').forEach((input, idx) => {
                input.placeholder = i18n[currentLang].handPlaceholder.replace('{n}', idx + 1);
            });

            updateRowTotalTigers(row);
        });

        const unitTextNode = gameDiv.querySelector('.unit-text-label');
        if (unitTextNode) unitTextNode.innerText = i18n[currentLang].unitText;

        const viewResultsBtn = gameDiv.querySelector('.view-game-results-btn');
        if (viewResultsBtn) viewResultsBtn.innerHTML = i18n[currentLang].viewGameResults;

        const clearBtn = gameDiv.querySelector('.clear-round-btn');
        if (clearBtn) {
            clearBtn.innerHTML = clearBtn.dataset.confirm === "true" 
                ? `🔄 ${i18n[currentLang].confirmClearGame}` 
                : `🔄 ${i18n[currentLang].clearGame}`;
        }

        updateGameHandState(gameDiv);
    });
}

langToggle.addEventListener('click', toggleLanguage);

// --- Game Logic ---
let gameCount = 0;
const directions = ['东', '西', '南', '北'];

// Initial default aliases for fresh game
let aliases = {
    '东': 'Mom',
    '西': 'Ben',
    '南': 'Dad',
    '北': 'Li'
};

// Global helper to create a strictly numeric tiger input
function createTigerInput(handIndex = 1) {
    const input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'decimal';
    input.className = 'tiger-input';
    input.placeholder = i18n[currentLang].handPlaceholder.replace('{n}', handIndex);
    input.value = '';
    
    // Strict numeric restriction: only numbers and at most 1 decimal dot
    input.addEventListener('input', (e) => {
        let val = e.target.value.replace(/[^0-9.]/g, '');
        const parts = val.split('.');
        if (parts.length > 2) {
            val = parts[0] + '.' + parts.slice(1).join('');
        }
        e.target.value = val;

        const row = e.target.closest('.player-row');
        if (row) updateRowTotalTigers(row);
    });

    input.addEventListener('blur', (e) => {
        const row = e.target.closest('.player-row');
        if (row) updateRowTotalTigers(row);
        triggerSync();
    });

    return input;
}

// Update the real-time tiger sum at the end of each player's row: "共 X 虎"
function updateRowTotalTigers(row) {
    if (!row) return;
    let sum = 0;
    row.querySelectorAll('.tiger-input').forEach(input => {
        if (input.value !== '') {
            sum += parseFloat(input.value) || 0;
        }
    });
    const formattedSum = Math.round(sum * 10) / 10;
    
    let totalPill = row.querySelector('.row-total-tigers');
    if (!totalPill) {
        totalPill = document.createElement('div');
        totalPill.className = 'row-total-tigers';
        totalPill.title = '累计抓虎数';
        row.appendChild(totalPill);
    }
    totalPill.innerHTML = `
        <span class="total-tigers-num">${i18n[currentLang].rowTotalTigers.replace('{n}', formattedSum)}</span>
    `;
}

/**
 * 创建一局游戏卡片（包含多“把”的虎数录入与行末统计）
 */
function createGameRound(autoScroll = true) {
    gameCount++;
    const gameId = gameCount;
    startGameBtn.innerHTML = i18n[currentLang].startAnother;
    
    const gameDiv = document.createElement('div');
    gameDiv.className = 'game-round';
    gameDiv.id = `game-${gameId}`;
    gameDiv.dataset.game = gameId;
    gameDiv.dataset.round = gameId; // 保持向后兼容
    gameDiv.dataset.handSaved = "false";
    gameDiv.dataset.isEditing = "false";
    
    // 局卡片头部：局数标题 + 状态徽章 + 【➕ 再记一把】按钮
    const header = document.createElement('div');
    header.className = 'round-header';

    const headerLeft = document.createElement('div');
    headerLeft.className = 'round-header-left';

    const titleSpan = document.createElement('span');
    titleSpan.className = 'round-header-title';
    titleSpan.innerText = i18n[currentLang].gameTitle.replace('{n}', gameId);
    headerLeft.appendChild(titleSpan);

    const statusBadge = document.createElement('span');
    statusBadge.className = 'game-status-badge in-progress';
    statusBadge.innerText = i18n[currentLang].statusInProgress;
    headerLeft.appendChild(statusBadge);

    header.appendChild(headerLeft);

    // 头部右侧操作组：【💾 保存这把】与【➕ 再记一把】并排，随手操作更直观
    const headerActions = document.createElement('div');
    headerActions.className = 'round-header-actions';

    // 【💾 保存这把】按钮（把级操作，录完这把直接在旁边保存）
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-round-btn save-hand-btn';
    saveBtn.innerHTML = i18n[currentLang].saveHand;
    saveBtn.onclick = () => {
        if (gameDiv.dataset.isEditing === "true") {
            // 完成修改本局：保存修改
            gameDiv.dataset.isEditing = "false";
            gameDiv.dataset.handSaved = "true";
        } else {
            // 保存当前这把
            gameDiv.dataset.handSaved = "true";
        }
        updateGameHandState(gameDiv);
        triggerSync();
    };
    headerActions.appendChild(saveBtn);

    // 【➕ 再记一把】按钮（保存这把后在旁边直接追加新一把）
    const addHandBtn = document.createElement('button');
    addHandBtn.className = 'round-plus-btn';
    addHandBtn.innerText = i18n[currentLang].addHand;
    addHandBtn.title = i18n[currentLang].saveHandFirstTip;
    addHandBtn.onclick = () => {
        if (gameDiv.classList.contains('is-ended')) return;
        if (gameDiv.dataset.handSaved !== "true") {
            alert(i18n[currentLang].saveHandFirstTip);
            return;
        }
        
        // 计算当前是第几把
        const anyList = gameDiv.querySelector('.player-row .tiger-list');
        const nextHandIndex = anyList ? anyList.querySelectorAll('.tiger-input').length + 1 : 1;

        let firstNewInp = null;
        gameDiv.querySelectorAll('.player-row').forEach((row, rIdx) => {
            const list = row.querySelector('.tiger-list');
            if (list) {
                const newInp = createTigerInput(nextHandIndex);
                list.appendChild(newInp);
                if (rIdx === 0) firstNewInp = newInp;
                updateRowTotalTigers(row);
            }
        });

        // 追加新的一把后，该新把进入未保存状态
        gameDiv.dataset.handSaved = "false";
        gameDiv.dataset.isEditing = "false";
        updateGameHandState(gameDiv);

        if (firstNewInp) {
            setTimeout(() => firstNewInp.focus(), 60);
        }
        triggerSync();
    };
    headerActions.appendChild(addHandBtn);

    header.appendChild(headerActions);
    gameDiv.appendChild(header);

    // 东西南北 4 行玩家记录行
    directions.forEach(dir => {
        const row = document.createElement('div');
        row.className = `player-row row-${dir}`;
        row.dataset.dir = dir;

        // 麻将牌图标 (東, 南, 西, 北)
        const dirContainer = document.createElement('div');
        dirContainer.className = 'player-dir-container';
        const tileIcon = document.createElement('div');
        tileIcon.className = 'real-mahjong-tile';
        const traditionalDir = { '东': '東', '南': '南', '西': '西', '北': '北' }[dir];
        tileIcon.innerText = traditionalDir;
        dirContainer.appendChild(tileIcon);
        row.appendChild(dirContainer);

        // 玩家别名与各把虎数输入容器
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
        
        aliasInput.addEventListener('change', () => {
            if (aliasInput.value.trim()) {
                aliases[dir] = aliasInput.value.trim();
            }
            triggerSync();
        });
        playerInfo.appendChild(aliasInput);

        // 虎数输入框列表（默认自带第 1 把）
        const tigerList = document.createElement('div');
        tigerList.className = 'tiger-list';
        tigerList.appendChild(createTigerInput(1));
        playerInfo.appendChild(tigerList);
        
        row.appendChild(playerInfo);

        // 行末：实时总虎数标签 (共 X 虎)
        const totalPill = document.createElement('div');
        totalPill.className = 'row-total-tigers';
        totalPill.title = '累计抓虎数';
        totalPill.innerHTML = `
            <span class="total-tigers-num">${i18n[currentLang].rowTotalTigers.replace('{n}', 0)}</span>
        `;
        row.appendChild(totalPill);

        gameDiv.appendChild(row);
    });

    // 底部控制区（计分单位 + 两行操作按钮）
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
    unitInp.addEventListener('change', triggerSync);
    footer.appendChild(unitDiv);

    // 操作第 1 行：局级调整与重置
    const actionsRow1 = document.createElement('div');
    actionsRow1.className = 'footer-actions-row1';

    // 【✏️ 修改本局】按钮 (随时可解锁之前所有把进行修改；编辑中点击亦可完成保存)
    const modifyBtn = document.createElement('button');
    modifyBtn.className = 'modify-round-btn';
    modifyBtn.innerHTML = i18n[currentLang].modifyGame;
    modifyBtn.onclick = () => {
        if (gameDiv.dataset.isEditing === "true") {
            // 编辑态中再次点击即可保存全局修改
            gameDiv.dataset.isEditing = "false";
            gameDiv.dataset.handSaved = "true";
            updateGameHandState(gameDiv);
            triggerSync();
        } else {
            if (gameDiv.classList.contains('is-ended')) {
                gameDiv.classList.remove('is-ended');
            }
            gameDiv.dataset.isEditing = "true";
            updateGameHandState(gameDiv);
            triggerSync();
        }
    };
    actionsRow1.appendChild(modifyBtn);

    // 【🔄 重置本局】按钮 (防误触二次确认)
    const clearBtn = document.createElement('button');
    clearBtn.className = 'clear-round-btn';
    clearBtn.dataset.confirm = "false";
    clearBtn.innerHTML = `🔄 ${i18n[currentLang].clearGame}`;
    clearBtn.onclick = () => {
        if (clearBtn.dataset.confirm === "true") {
            clearBtn.dataset.confirm = "false";
            clearBtn.innerHTML = `🔄 ${i18n[currentLang].clearGame}`;
            clearBtn.style.backgroundColor = "";
            resetGameRecords(gameDiv);
        } else {
            clearBtn.dataset.confirm = "true";
            clearBtn.innerHTML = `🔄 ${i18n[currentLang].confirmClearGame}`;
            clearBtn.style.backgroundColor = "#e67e22";
            
            setTimeout(() => {
                if (clearBtn.dataset.confirm === "true") {
                    clearBtn.dataset.confirm = "false";
                    clearBtn.innerHTML = `🔄 ${i18n[currentLang].clearGame}`;
                    clearBtn.style.backgroundColor = "";
                }
            }, 3000);
        }
    };
    actionsRow1.appendChild(clearBtn);

    // 操作第 2 行：结算与排行（严格位于保存记录的下一行，每局独立控制）
    const actionsRow2 = document.createElement('div');
    actionsRow2.className = 'footer-actions-row2';

    // 【🏁 结束本局 🏆】按钮 (仅控制当前这一局！)
    const endGameBtn = document.createElement('button');
    endGameBtn.className = 'end-game-btn';
    endGameBtn.dataset.confirm = "false";
    endGameBtn.innerHTML = i18n[currentLang].endGame;
    endGameBtn.onclick = () => {
        if (gameDiv.classList.contains('is-ended')) {
            openSettlementModal(gameId, 'current');
            return;
        }

        if (endGameBtn.dataset.confirm === "true") {
            endGameBtn.dataset.confirm = "false";
            endGameBtn.classList.remove('confirming');
            gameDiv.dataset.handSaved = "true";
            gameDiv.dataset.isEditing = "false";
            endSpecificGame(gameDiv);
        } else {
            endGameBtn.dataset.confirm = "true";
            endGameBtn.classList.add('confirming');
            endGameBtn.innerHTML = i18n[currentLang].confirmEndGame.replace('{n}', gameId);

            setTimeout(() => {
                if (endGameBtn.dataset.confirm === "true") {
                    endGameBtn.dataset.confirm = "false";
                    endGameBtn.classList.remove('confirming');
                    endGameBtn.innerHTML = i18n[currentLang].endGame;
                }
            }, 3500);
        }
    };
    actionsRow2.appendChild(endGameBtn);

    // 【📊 查看本局结算与排行】按钮 (每局永久常驻可见！)
    const viewResultsBtn = document.createElement('button');
    viewResultsBtn.className = 'view-game-results-btn';
    viewResultsBtn.innerHTML = i18n[currentLang].viewGameResults;
    viewResultsBtn.onclick = () => {
        openSettlementModal(gameId, 'current');
    };
    actionsRow2.appendChild(viewResultsBtn);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'footer-actions';
    actionsDiv.appendChild(actionsRow1);
    actionsDiv.appendChild(actionsRow2);

    footer.appendChild(actionsDiv);
    gameDiv.appendChild(footer);

    gameRoundsContainer.appendChild(gameDiv);

    // 初始化卡片内输入框及按钮的可用/置灰状态
    updateGameHandState(gameDiv);

    if (autoScroll) {
        gameDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    triggerSync();
    return gameDiv;
}

/**
 * 刷新单局卡片内的输入框与按钮状态（严格执行：只能修改当前把，其他把置灰；必须保存这把后才能再记一把；修改本局可改之前把）
 */
function updateGameHandState(gameDiv) {
    const isEnded = gameDiv.classList.contains('is-ended');
    const isEditing = gameDiv.dataset.isEditing === "true";
    const isHandSaved = gameDiv.dataset.handSaved === "true";

    const addHandBtn = gameDiv.querySelector('.round-plus-btn');
    const saveHandBtn = gameDiv.querySelector('.save-round-btn');
    const modifyBtn = gameDiv.querySelector('.modify-round-btn');
    const endGameBtn = gameDiv.querySelector('.end-game-btn');
    const badge = gameDiv.querySelector('.game-status-badge');

    if (isEnded) {
        if (badge) {
            badge.className = 'game-status-badge ended';
            badge.innerText = i18n[currentLang].statusEnded;
        }
        if (endGameBtn) {
            endGameBtn.className = 'end-game-btn ended';
            endGameBtn.innerHTML = i18n[currentLang].gameEndedBadge;
        }
        if (addHandBtn) {
            addHandBtn.disabled = true;
            addHandBtn.classList.add('btn-disabled');
            addHandBtn.innerText = i18n[currentLang].addHand;
            addHandBtn.title = "";
        }
        // 局已结束，全部置灰锁定
        gameDiv.querySelectorAll('input').forEach(inp => inp.disabled = true);
        if (saveHandBtn) saveHandBtn.classList.add('hidden');
        if (modifyBtn) {
            modifyBtn.classList.remove('hidden');
            modifyBtn.disabled = false;
            modifyBtn.innerHTML = i18n[currentLang].modifyGame;
        }
        return;
    }

    if (badge) {
        badge.className = 'game-status-badge in-progress';
        badge.innerText = i18n[currentLang].statusInProgress;
    }
    if (endGameBtn) {
        endGameBtn.className = 'end-game-btn';
        endGameBtn.dataset.confirm = "false";
        endGameBtn.innerHTML = i18n[currentLang].endGame;
    }

    if (isEditing) {
        // --- 修改本局模式：解锁之前所有把的记录进行修改 ---
        gameDiv.querySelectorAll('input').forEach(inp => {
            inp.disabled = false;
            inp.classList.remove('disabled-hand');
        });

        if (addHandBtn) {
            addHandBtn.disabled = true;
            addHandBtn.classList.add('btn-disabled');
            addHandBtn.innerText = i18n[currentLang].addHand;
            addHandBtn.title = "请先保存本局修改";
        }

        if (saveHandBtn) {
            saveHandBtn.classList.remove('hidden');
            saveHandBtn.disabled = false;
            saveHandBtn.classList.remove('btn-disabled');
            saveHandBtn.innerHTML = i18n[currentLang].saveChanges;
        }
        if (modifyBtn) {
            modifyBtn.classList.remove('hidden');
            modifyBtn.disabled = false;
            modifyBtn.innerHTML = i18n[currentLang].saveChanges;
        }
    } else {
        // --- 常规打牌记分模式 ---
        // 只能修改当前把的记录，其他把记录置灰
        gameDiv.querySelectorAll('.player-row').forEach(row => {
            const aliasInp = row.querySelector('.player-alias');
            if (aliasInp) aliasInp.disabled = false;

            const inputs = row.querySelectorAll('.tiger-input');
            const total = inputs.length;
            inputs.forEach((inp, idx) => {
                if (idx < total - 1) {
                    // 其他把记录：坚决置灰锁定！
                    inp.disabled = true;
                    inp.classList.add('disabled-hand');
                } else {
                    // 当前最后一把：若尚未保存则可修改，已保存则锁定
                    if (isHandSaved) {
                        inp.disabled = true;
                        inp.classList.add('disabled-hand');
                    } else {
                        inp.disabled = false;
                        inp.classList.remove('disabled-hand');
                    }
                }
            });
            updateRowTotalTigers(row);
        });

        const unitInp = gameDiv.querySelector('.round-unit');
        if (unitInp) unitInp.disabled = false;

        // 【➕ 再记一把】按钮控制：每把都必须保存后，才能再记一把！
        if (addHandBtn) {
            addHandBtn.innerText = i18n[currentLang].addHand;
            if (isHandSaved) {
                addHandBtn.disabled = false;
                addHandBtn.classList.remove('btn-disabled');
                addHandBtn.title = "点击再记一把";
            } else {
                addHandBtn.disabled = true;
                addHandBtn.classList.add('btn-disabled');
                addHandBtn.title = i18n[currentLang].saveHandFirstTip;
            }
        }

        // 【💾 保存这把】按钮控制
        if (saveHandBtn) {
            saveHandBtn.classList.remove('hidden');
            if (isHandSaved) {
                saveHandBtn.disabled = true;
                saveHandBtn.classList.add('btn-disabled');
                saveHandBtn.innerHTML = i18n[currentLang].handSavedTag; // "已保存这把 ✅"
            } else {
                saveHandBtn.disabled = false;
                saveHandBtn.classList.remove('btn-disabled');
                saveHandBtn.innerHTML = i18n[currentLang].saveHand; // "💾 保存这把"
            }
        }

        // 【✏️ 修改本局】按钮控制：常驻可见，随时可点击修改之前把
        if (modifyBtn) {
            modifyBtn.classList.remove('hidden');
            modifyBtn.disabled = false;
            modifyBtn.innerHTML = i18n[currentLang].modifyGame; // "✏️ 修改本局"
        }
    }
}

/**
 * 保存本局记录：锁定输入框防止传阅误触，行末显示各自当前总虎数
 */
function saveGameRecords(gameDiv) {
    gameDiv.dataset.isEditing = "false";
    gameDiv.dataset.handSaved = "true";
    updateGameHandState(gameDiv);
    triggerSync();
}

/**
 * 解锁本局进入编辑态
 */
function unlockGameForEdit(gameDiv) {
    if (gameDiv.classList.contains('is-ended')) {
        gameDiv.classList.remove('is-ended');
    }
    gameDiv.dataset.isEditing = "true";
    updateGameHandState(gameDiv);
    triggerSync();
}

/**
 * 重置本局数据
 */
function resetGameRecords(gameDiv) {
    gameDiv.classList.remove('is-ended');
    gameDiv.dataset.isEditing = "false";
    gameDiv.dataset.handSaved = "false";

    gameDiv.querySelectorAll('.player-row').forEach(row => {
        const list = row.querySelector('.tiger-list');
        if (list) {
            list.innerHTML = '';
            list.appendChild(createTigerInput(1));
        }
        updateRowTotalTigers(row);
    });

    updateGameHandState(gameDiv);
    triggerSync();
}

/**
 * 结束指定的某单一局游戏（单局完全闭环，只影响当前局）
 */
function endSpecificGame(gameDiv) {
    const gameId = gameDiv.dataset.game || gameDiv.id.replace('round-', '').replace('game-', '');

    // 1. 锁定本局并标记为已结束
    gameDiv.classList.add('is-ended');
    gameDiv.dataset.handSaved = "true";
    gameDiv.dataset.isEditing = "false";
    updateGameHandState(gameDiv);

    // 2. 打开结算弹窗，展示本局计算明细与排行榜
    openSettlementModal(gameId, 'current');

    triggerSync();
}

// --- 综合结算与排行榜弹窗控制器 ---
let activeModalTab = 'current'; // 'current' or 'grand'
let grandViewMode = 'money';    // 'money' or 'tigers'
let lastSettledGameId = 1;

function openSettlementModal(gameId, defaultTab = 'current') {
    const modal = document.getElementById('settlementModal');
    if (!modal) return;

    lastSettledGameId = gameId || lastSettledGameId || 1;
    activeModalTab = defaultTab;

    // 切换标签页视觉状态
    const tabCurrentBtn = document.getElementById('tabCurrentGameBtn');
    const tabGrandBtn = document.getElementById('tabGrandTotalBtn');
    const currentPanel = document.getElementById('tabCurrentGamePanel');
    const grandPanel = document.getElementById('tabGrandTotalPanel');

    if (activeModalTab === 'current') {
        tabCurrentBtn.classList.add('active');
        tabGrandBtn.classList.remove('active');
        currentPanel.classList.remove('hidden');
        grandPanel.classList.add('hidden');
    } else {
        tabCurrentBtn.classList.remove('active');
        tabGrandBtn.classList.add('active');
        currentPanel.classList.add('hidden');
        grandPanel.classList.remove('hidden');
    }

    // 渲染两个标签页的内容
    renderCurrentGamePanel(lastSettledGameId);
    renderGrandTotalPanel();

    modal.classList.remove('hidden');
}

/**
 * 渲染 Tab 1: 当局结算与排行（包含当局排行榜与详细计算公式）
 */
function renderCurrentGamePanel(gameId) {
    const gameDiv = document.getElementById(`game-${gameId}`) || document.getElementById(`round-${gameId}`);
    if (!gameDiv) return;

    const unitInput = gameDiv.querySelector('.round-unit');
    const unit = parseFloat(unitInput ? unitInput.value : 0.5) || 0.5;

    const handsMap = {};
    const gameAliases = {};
    let totalHandsCount = 0;

    directions.forEach(dir => {
        const row = gameDiv.querySelector(`.row-${dir}`);
        if (!row) return;

        const aliasInp = row.querySelector('.player-alias');
        const aliasVal = (aliasInp && aliasInp.value && aliasInp.value.trim()) ? aliasInp.value.trim() : (aliases[dir] || dir);
        gameAliases[dir] = aliasVal;

        const inputs = row.querySelectorAll('.tiger-input');
        totalHandsCount = Math.max(totalHandsCount, inputs.length);
        const vals = [];
        inputs.forEach(input => {
            if (input.value !== '') vals.push(parseFloat(input.value) || 0);
        });
        handsMap[dir] = vals;
    });

    const engine = window.ScoringEngine || {};
    const res = engine.calculateGameDetails 
        ? engine.calculateGameDetails(handsMap, unit, directions, gameAliases)
        : engine.calculateRoundDetails(handsMap, unit, directions, gameAliases);
    
    const leaderboard = engine.calculateGameLeaderboard 
        ? engine.calculateGameLeaderboard(res.details)
        : [...res.details].sort((a,b) => b.money - a.money).map((p, i) => ({ ...p, rank: i + 1, isWinner: p.money > 0 && i === 0 }));

    // 1. 设置副标题
    const subTitle = document.getElementById('currentGameSubtitle');
    if (subTitle) {
        subTitle.innerText = i18n[currentLang].gameSubtitle.replace('{n}', gameId).replace('{hands}', totalHandsCount);
    }
    const rankNum = document.getElementById('currentGameRankNum');
    if (rankNum) rankNum.innerText = gameId;

    // 2. 渲染当局排行榜 (1~4名)
    const lbContainer = document.getElementById('currentGameLeaderboard');
    if (lbContainer) {
        let lbHtml = '';
        const rankBadges = ['🥇', '🥈', '🥉', '4️⃣'];
        leaderboard.forEach((p, idx) => {
            const badge = rankBadges[idx] || `${idx + 1}`;
            const colorClass = p.money >= 0 ? 'positive' : 'negative';
            const sign = p.money > 0 ? '+' : '';
            const winnerBadge = p.isWinner ? `<span class="winner-crown">👑</span>` : '';
            const cardClass = p.isWinner ? 'game-rank-card is-winner' : 'game-rank-card';
            const dirName = i18n[currentLang][p.dir === '东' ? 'east' : p.dir === '南' ? 'south' : p.dir === '西' ? 'west' : 'north'];

            const netSign = p.netTigers > 0 ? '+' : '';
            const netColorClass = p.netTigers > 0 ? 'pos' : (p.netTigers < 0 ? 'neg' : 'zero');
            const tigersText = currentLang === 'en' ? `Total: ${p.tigers}` : `共 ${p.tigers} 虎`;
            const netText = currentLang === 'en' ? `Net: ${netSign}${p.netTigers}` : `净胜: ${netSign}${p.netTigers} 虎`;
            const moneyText = currentLang === 'en' ? `${sign}${p.money}` : `${sign}${p.money} 元`;

            lbHtml += `
                <div class="${cardClass}">
                    <div class="game-rank-badge">${badge}</div>
                    <div class="game-rank-player">
                        <span>${p.alias}</span>
                        <span style="font-size:11px; color:#7F8C8D; font-weight:normal;">(${dirName})</span>
                        ${winnerBadge}
                    </div>
                    <div class="game-rank-stats">
                        <span class="game-rank-tigers" title="累计抓虎">🐅 ${tigersText}</span>
                        <span class="game-rank-net-tigers ${netColorClass}" title="净胜虎数">${netText}</span>
                        <span class="game-rank-money score-val ${colorClass}">${moneyText}</span>
                    </div>
                </div>
            `;
        });
        lbContainer.innerHTML = lbHtml;
    }

    // 3. 渲染每人计算公式明细卡片
    const formulaContainer = document.getElementById('currentGameFormulas');
    if (formulaContainer) {
        let formulaHtml = '';
        res.details.forEach(item => {
            const colorClass = item.money >= 0 ? 'positive' : 'negative';
            const sign = item.money > 0 ? '+' : '';
            const dirName = i18n[currentLang][item.dir === '东' ? 'east' : item.dir === '南' ? 'south' : item.dir === '西' ? 'west' : 'north'];

            const netSign = item.netTigers > 0 ? '+' : '';
            const netColorClass = item.netTigers > 0 ? 'pos' : (item.netTigers < 0 ? 'neg' : 'zero');
            const rawLabel = currentLang === 'en' ? `Total: ${item.tigers}` : `共抓: ${item.tigers} 虎`;
            const netTag = currentLang === 'en' ? `Net: ${netSign}${item.netTigers}` : `净胜: ${netSign}${item.netTigers} 虎`;

            formulaHtml += `
                <div class="single-calc-card row-${item.dir}">
                    <div class="calc-card-top">
                        <div class="calc-player-name">
                            <span>${item.alias} (${dirName})</span>
                            <span class="calc-tigers-tag">${rawLabel}</span>
                            <span class="calc-net-tag ${netColorClass}">${netTag}</span>
                        </div>
                        <div class="calc-money-tag score-val ${colorClass}">
                            ${sign}${item.money} ${currentLang === 'en' ? '' : '元'}
                        </div>
                    </div>
                    <div class="calc-formula-box">
                        <div class="calc-formula-line">
                            <span class="calc-formula-label">${i18n[currentLang].calcProcessLabel || '计算过程 = '}</span>
                            <span class="calc-formula-expr">((${item.tigers}*3 - ${item.othersBreakdown}) * ${unit})</span>
                            <span class="calc-formula-equal"> = </span>
                            <span class="calc-formula-result ${colorClass}">${sign}${item.money} ${currentLang === 'en' ? '' : '元'}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        formulaContainer.innerHTML = formulaHtml;
    }
}

/**
 * 渲染 Tab 2: 全场总游戏排行榜 (以别名唯一归集，支持金额/虎数双榜切换)
 */
function renderGrandTotalPanel() {
    const list = document.getElementById('grandTotalList');
    const subtitle = document.getElementById('grandTotalSubtitle');
    if (!list) return;

    const state = getGameState();
    const engine = window.ScoringEngine || {};
    const grand = engine.calculateGrandTotal 
        ? engine.calculateGrandTotal(state.rounds, directions, aliases)
        : { settledGamesCount: 0, byMoney: [], byTigers: [] };

    if (subtitle) {
        subtitle.innerText = i18n[currentLang].grandSubtitle.replace('{n}', grand.settledGamesCount);
    }

    const tabMoneyBtn = document.getElementById('tabMoneyBtn');
    const tabTigersBtn = document.getElementById('tabTigersBtn');

    if (grandViewMode === 'money') {
        if (tabMoneyBtn) tabMoneyBtn.classList.add('active');
        if (tabTigersBtn) tabTigersBtn.classList.remove('active');
        renderGrandMoneyList(grand.byMoney);
    } else {
        if (tabMoneyBtn) tabMoneyBtn.classList.remove('active');
        if (tabTigersBtn) tabTigersBtn.classList.add('active');
        renderGrandTigersList(grand.byTigers);
    }
}

function renderGrandMoneyList(rankedPlayers) {
    const list = document.getElementById('grandTotalList');
    if (!list) return;

    if (rankedPlayers.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding:20px; color:#95A5A6; font-weight:bold;">${i18n[currentLang].noGamesAlert}</div>`;
        return;
    }

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
        const playedText = i18n[currentLang].playedAndWon.replace('{played}', p.gamesPlayed || p.roundsPlayed || 0).replace('{won}', p.gamesWon || p.roundsWon || 0);

        html += `
            <div class="${itemClass}">
                <div class="leader-rank rank-${rank}">${rank}</div>
                <div class="leader-info">
                    <div class="leader-name-row">
                        <span class="leader-name">${p.alias}</span>
                        ${winnerBadge}
                    </div>
                    <div class="leader-sub">${playedText} ${seatsText ? ' | ' + seatsText : ''}</div>
                    <div class="leader-sub" style="color:#B9770E; font-weight:700;">总抓虎: ${p.totalRawTigers} 虎 | 净胜虎: ${p.totalNetTigers > 0 ? '+' : ''}${p.totalNetTigers} 虎</div>
                </div>
                <div class="leader-score score-val ${colorClass}">
                    ${sign}${p.totalMoney} <span style="font-size:13px;">元</span>
                </div>
            </div>
        `;
    });
    list.innerHTML = html;
}

function renderGrandTigersList(rankedPlayers) {
    const list = document.getElementById('grandTotalList');
    if (!list) return;

    if (rankedPlayers.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding:20px; color:#95A5A6; font-weight:bold;">${i18n[currentLang].noGamesAlert}</div>`;
        return;
    }

    let html = '';
    rankedPlayers.forEach((p, idx) => {
        const rank = idx + 1;
        const colorClass = p.totalNetTigers >= 0 ? 'positive' : 'negative';
        const sign = p.totalNetTigers > 0 ? '+' : '';
        const winnerBadge = p.isBigWinnerTigers ? `<span class="winner-crown">🐯</span><span style="color:#D35400; font-size:12px; font-weight:800;">${i18n[currentLang].tigerKing}</span>` : '';
        const itemClass = p.isBigWinnerTigers ? 'leaderboard-item is-winner' : 'leaderboard-item';

        const seatsText = p.dirsPlayed && p.dirsPlayed.length > 0 
            ? `${i18n[currentLang].seatsPlayed}: ${p.dirsPlayed.map(d => i18n[currentLang][d === '东' ? 'east' : d === '南' ? 'south' : d === '西' ? 'west' : 'north']).join('、')}`
            : '';
        const playedText = i18n[currentLang].playedAndWon.replace('{played}', p.gamesPlayed || p.roundsPlayed || 0).replace('{won}', p.gamesWon || p.roundsWon || 0);

        html += `
            <div class="${itemClass}">
                <div class="leader-rank rank-${rank}">${rank}</div>
                <div class="leader-info">
                    <div class="leader-name-row">
                        <span class="leader-name">${p.alias}</span>
                        ${winnerBadge}
                    </div>
                    <div class="leader-sub">${playedText} ${seatsText ? ' | ' + seatsText : ''}</div>
                    <div class="leader-sub" style="color:#B9770E; font-weight:700;">总抓虎: ${p.totalRawTigers} 虎 | 净胜虎: ${p.totalNetTigers > 0 ? '+' : ''}${p.totalNetTigers} 虎</div>
                    <div class="leader-sub" style="color:#27AE60; font-weight:700;">累计盈亏: ${p.totalMoney > 0 ? '+' : ''}${p.totalMoney} 元</div>
                </div>
                <div class="leader-score score-val ${colorClass}">
                    ${sign}${p.totalNetTigers} <span style="font-size:13px;">虎</span>
                </div>
            </div>
        `;
    });
    list.innerHTML = html;
}

// Modal Event Listeners
const tabCurrentGameBtn = document.getElementById('tabCurrentGameBtn');
if (tabCurrentGameBtn) {
    tabCurrentGameBtn.addEventListener('click', () => {
        activeModalTab = 'current';
        tabCurrentGameBtn.classList.add('active');
        document.getElementById('tabGrandTotalBtn').classList.remove('active');
        document.getElementById('tabCurrentGamePanel').classList.remove('hidden');
        document.getElementById('tabGrandTotalPanel').classList.add('hidden');
        renderCurrentGamePanel(lastSettledGameId);
    });
}

const tabGrandTotalBtn = document.getElementById('tabGrandTotalBtn');
if (tabGrandTotalBtn) {
    tabGrandTotalBtn.addEventListener('click', () => {
        activeModalTab = 'grand';
        tabGrandTotalBtn.classList.add('active');
        document.getElementById('tabCurrentGameBtn').classList.remove('active');
        document.getElementById('tabGrandTotalPanel').classList.remove('hidden');
        document.getElementById('tabCurrentGamePanel').classList.add('hidden');
        renderGrandTotalPanel();
    });
}

const tabMoneyBtn = document.getElementById('tabMoneyBtn');
if (tabMoneyBtn) {
    tabMoneyBtn.addEventListener('click', () => {
        grandViewMode = 'money';
        renderGrandTotalPanel();
    });
}

const tabTigersBtn = document.getElementById('tabTigersBtn');
if (tabTigersBtn) {
    tabTigersBtn.addEventListener('click', () => {
        grandViewMode = 'tigers';
        renderGrandTotalPanel();
    });
}

const closeSettlementModalBtn = document.getElementById('closeSettlementModalBtn');
if (closeSettlementModalBtn) {
    closeSettlementModalBtn.addEventListener('click', () => {
        document.getElementById('settlementModal').classList.add('hidden');
    });
}

const confirmSettlementModalBtn = document.getElementById('confirmSettlementModalBtn');
if (confirmSettlementModalBtn) {
    confirmSettlementModalBtn.addEventListener('click', () => {
        document.getElementById('settlementModal').classList.add('hidden');
    });
}

const modalStartNextGameBtn = document.getElementById('modalStartNextGameBtn');
if (modalStartNextGameBtn) {
    modalStartNextGameBtn.addEventListener('click', () => {
        document.getElementById('settlementModal').classList.add('hidden');
        createGameRound(true);
    });
}

// --- Top Action Buttons Wiring (Pure Global Controls) ---
startGameBtn.addEventListener('click', () => {
    createGameRound(true);
});

// 【全场总榜 👑】按钮
if (viewGrandBtn) {
    viewGrandBtn.addEventListener('click', () => {
        openSettlementModal(lastSettledGameId, 'grand');
    });
}

// 【全部清空】按钮带二次确认
if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
        if (clearAllBtn.dataset.confirm === "true") {
            gameRoundsContainer.innerHTML = '';
            gameCount = 0;
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

// --- Room & Sync Logic ---
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

    const roomCodeText = document.getElementById('roomCodeText');
    if (roomCodeText) {
        roomCodeText.innerText = currentRoomCode;
    }
    const roomCodeDisplay = document.getElementById('roomCodeDisplay');
    if (roomCodeDisplay) {
        roomCodeDisplay.addEventListener('click', copyLink);
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
        document.querySelector('.app-container').innerHTML = `
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
    if (isComposing) return;
    
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

// Serialization
function getGameState() {
    const rounds = [];
    document.querySelectorAll('.game-round').forEach(gameDiv => {
        const isHandSaved = gameDiv.dataset.handSaved === "true";
        const isEnded = gameDiv.classList.contains('is-ended');
        const unit = parseFloat(gameDiv.querySelector('.round-unit').value) || 0.5;

        const roundState = {
            unit: unit,
            players: {},
            isSaved: isHandSaved,
            isHandSaved: isHandSaved,
            isEnded: isEnded
        };
        
        gameDiv.querySelectorAll('.player-row').forEach(row => {
            const dir = row.dataset.dir;
            const aliasInput = row.querySelector('.player-alias');
            const rowAlias = (aliasInput && aliasInput.value && aliasInput.value.trim()) ? aliasInput.value.trim() : (aliases[dir] || dir);
            
            aliases[dir] = rowAlias;

            const tigers = [];
            row.querySelectorAll('.tiger-input').forEach(input => {
                tigers.push(input.value === '' ? '' : parseFloat(input.value));
            });
            roundState.players[dir] = {
                alias: rowAlias,
                tigers: tigers,
                hands: tigers
            };
        });
        rounds.push(roundState);
    });
    return { aliases: aliases, rounds: rounds };
}

// Deserialization
async function applyGameState(state) {
    let roundsToApply = [];
    if (Array.isArray(state)) {
        roundsToApply = state;
    } else if (state && state.rounds) {
        roundsToApply = state.rounds;
        if (state.aliases) {
            aliases = { ...aliases, ...state.aliases };
        }
    }

    if (!roundsToApply || roundsToApply.length === 0) return;

    // Guard against overwriting while user is typing
    if (Date.now() - lastInteractionTime < 2500) {
        return;
    }
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
    }

    gameRoundsContainer.innerHTML = '';
    gameCount = 0;

    roundsToApply.forEach((rState, rIdx) => {
        const gameDiv = createGameRound(false);
        const unitInp = gameDiv.querySelector('.round-unit');
        if (unitInp && rState.unit !== undefined) {
            unitInp.value = rState.unit;
        }

        directions.forEach(dir => {
            const row = gameDiv.querySelector(`.row-${dir}`);
            if (!row) return;

            const pData = rState.players ? rState.players[dir] : null;
            if (pData) {
                const aliasInp = row.querySelector('.player-alias');
                if (aliasInp && pData.alias) {
                    aliasInp.value = pData.alias;
                    aliases[dir] = pData.alias;
                }
                const tigerList = row.querySelector('.tiger-list');
                if (tigerList) {
                    tigerList.innerHTML = '';
                    const hands = pData.tigers || pData.hands || [];
                    if (hands.length === 0) {
                        tigerList.appendChild(createTigerInput(1));
                    } else {
                        hands.forEach((val, hIdx) => {
                            const inp = createTigerInput(hIdx + 1);
                            inp.value = (val !== null && val !== undefined) ? val : '';
                            tigerList.appendChild(inp);
                        });
                    }
                }
            }
            updateRowTotalTigers(row);
        });

        if (rState.isEnded) {
            gameDiv.classList.add('is-ended');
        }

        const handSaved = (rState.isHandSaved !== undefined) 
            ? (rState.isHandSaved ? "true" : "false") 
            : ((rState.isSaved || rState.isEnded) ? "true" : "false");
        gameDiv.dataset.handSaved = handSaved;
        gameDiv.dataset.isEditing = "false";

        updateGameHandState(gameDiv);
    });
}

async function pushStateToServer() {
    if (!currentRoomCode || isSyncing) return;
    const state = getGameState();
    const pwd = localStorage.getItem('room_pwd_' + currentRoomCode) || '';
    
    try {
        await fetch('/api/game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'save_state',
                roomCode: currentRoomCode,
                state: state,
                password: pwd
            })
        });
    } catch(e) {
        console.error("Failed to push state", e);
    }
}

// Periodic sync poll (Every 3 seconds)
setInterval(async () => {
    if (!currentRoomCode || isSyncing) return;
    if (Date.now() - lastInteractionTime < 2500) return;
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) return;
    
    let url = '/api/room?code=' + encodeURIComponent(currentRoomCode);
    let roomPwd = localStorage.getItem('room_pwd_' + currentRoomCode) || '';
    if (roomPwd) url += '&pwd=' + encodeURIComponent(roomPwd);

    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.success && data.room && data.room.state) {
            isSyncing = true;
            await applyGameState(data.room.state);
            isSyncing = false;
        }
    } catch(e) {}
}, 3000);

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    initDogs();
    checkRoom();
    
    // If not in a room and no game cards exist, create first game card automatically
    if (!window.location.pathname.startsWith('/mj/') && document.querySelectorAll('.game-round').length === 0) {
        createGameRound(false);
    }
});
