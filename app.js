const gameRoundsContainer = document.getElementById('gameRoundsContainer');
const startGameBtn = document.getElementById('startGameBtn');
const langToggle = document.getElementById('langToggle');
const mainTitle = document.getElementById('mainTitle');
const headerBanner = document.getElementById('headerBanner');
const leftDog = document.getElementById('leftDog');
const rightDog = document.getElementById('rightDog');

// --- I18N (Internationalization) ---
const i18n = {
    en: {
        title: "Mahjong Score Tracker",
        docTitle: "🐶 🀄 Mahjong Score Tracker 🐕",
        startGame: "Start Game ▶",
        startAnother: "Start Another ▶",
        clearAll: "Clear All",
        confirmClearAll: "Sure?",
        roundTitle: "Players & Scores - Round {n}",
        aliasPlaceholder: "Player Alias",
        scorePlaceholder: "Score",
        unitText: "Unit (Yuan)",
        endGame: "End Game",
        confirmEnd: "Confirm?",
        clearRound: "Reset Round",
        confirmClear: "Sure?",
        modifyRound: "Modify",
        confirmModify: "Confirm?",
        resultTitle: "💰 Round Results 💰",
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
        clearAll: "全部清空",
        confirmClearAll: "确认全清?",
        roundTitle: "玩家与分数 - 第 {n} 局",
        aliasPlaceholder: "玩家昵称",
        scorePlaceholder: "虎数",
        unitText: "计数单位 (元)",
        endGame: "结束游戏",
        confirmEnd: "确认结算?",
        clearRound: "重置本局",
        confirmClear: "确认重置?",
        modifyRound: "修改本局",
        confirmModify: "确认修改?",
        resultTitle: "💰 本局结算结果 💰",
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
    
    // Update static texts
    mainTitle.innerHTML = i18n[currentLang].title;
    document.title = i18n[currentLang].docTitle;
    startGameBtn.innerHTML = roundCount > 0 ? i18n[currentLang].startAnother : i18n[currentLang].startGame;

    // Update plaque subtitle in English
    const plaqueSubTitle = document.getElementById('plaqueSubTitle');
    if (plaqueSubTitle) {
        if (currentLang === 'en') {
            plaqueSubTitle.style.display = 'inline-block';
            plaqueSubTitle.innerText = 'Mahjong Score Tracker';
        } else {
            plaqueSubTitle.style.display = 'none';
        }
    }
    
    const clearAllBtn = document.getElementById('clearAllBtn');
    if (clearAllBtn) {
        if (clearAllBtn.dataset.confirm === "true") {
            clearAllBtn.innerHTML = i18n[currentLang].confirmClearAll;
        } else {
            clearAllBtn.innerHTML = i18n[currentLang].clearAll;
        }
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
    
    // Update dynamic round texts
    document.querySelectorAll('.game-round').forEach(roundDiv => {
        const roundId = roundDiv.id.replace('round-', '');
        roundDiv.querySelector('.round-header').innerText = i18n[currentLang].roundTitle.replace('{n}', roundId);
        
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

        const endBtn = roundDiv.querySelector('.end-game-btn');
        if (endBtn && !endBtn.disabled) {
            if (endBtn.dataset.confirm === "true") {
                endBtn.innerHTML = `<input type="checkbox" style="pointer-events:none;"> ${i18n[currentLang].confirmEnd}`;
            } else {
                endBtn.innerHTML = `<input type="checkbox" style="pointer-events:none;"> ${i18n[currentLang].endGame}`;
            }
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
            if (modifyBtn.dataset.confirm === "true") {
                modifyBtn.innerHTML = `✏️ ${i18n[currentLang].confirmModify}`;
            } else {
                modifyBtn.innerHTML = `✏️ ${i18n[currentLang].modifyRound}`;
            }
        }
        
        const resultTitle = roundDiv.querySelector('.result-title');
        if (resultTitle) {
            resultTitle.innerText = i18n[currentLang].resultTitle;
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

function createGameRound(autoScroll = true) {
    if (roundCount === 0) {
        document.getElementById('startGameBtn').innerHTML = i18n[currentLang].startAnother;
    }
    roundCount++;
    const roundId = roundCount;
    
    const roundDiv = document.createElement('div');
    roundDiv.className = 'game-round';
    roundDiv.id = `round-${roundId}`;
    
    // Header
    const header = document.createElement('div');
    header.className = 'round-header';
    header.innerText = i18n[currentLang].roundTitle.replace('{n}', roundId);
    roundDiv.appendChild(header);

    // Player Rows
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

        const addBtn = document.createElement('button');
        addBtn.className = 'plus-btn';
        addBtn.innerText = '+';
        addBtn.onclick = () => {
            tigerList.appendChild(createTigerInput());
            triggerSync();
        };
        row.appendChild(addBtn);

        roundDiv.appendChild(row);
    });

    // Footer - Default unit changed to 0.5 and centered layout
    const footer = document.createElement('div');
    footer.className = 'footer-controls';
    
    const unitDiv = document.createElement('div');
    unitDiv.className = 'unit-input';
    unitDiv.innerHTML = `<span class="unit-icon">¥</span> <input type="text" inputmode="decimal" class="round-unit" value="0.5"> <span class="unit-text-label">${i18n[currentLang].unitText}</span>`;
    
    // Strict numeric restriction on unit input
    const unitInp = unitDiv.querySelector('.round-unit');
    unitInp.addEventListener('input', (e) => {
        let val = e.target.value.replace(/[^0-9.]/g, '');
        const parts = val.split('.');
        if (parts.length > 2) {
            val = parts[0] + '.' + parts.slice(1).join('');
        }
        e.target.value = val;
    });

    const endBtn = document.createElement('button');
    endBtn.className = 'end-game-btn';
    endBtn.dataset.confirm = "false";
    endBtn.innerHTML = `<input type="checkbox" style="pointer-events:none;"> ${i18n[currentLang].endGame}`;
    
    endBtn.onclick = () => {
        if (endBtn.dataset.confirm === "true") {
            calculateRoundScore(roundDiv, endBtn);
            triggerSync();
        } else {
            endBtn.dataset.confirm = "true";
            endBtn.innerHTML = `<input type="checkbox" style="pointer-events:none;"> ${i18n[currentLang].confirmEnd}`;
            endBtn.style.backgroundColor = "#c0392b";
            
            setTimeout(() => {
                if (!endBtn.disabled) {
                    endBtn.dataset.confirm = "false";
                    endBtn.innerHTML = `<input type="checkbox" style="pointer-events:none;"> ${i18n[currentLang].endGame}`;
                    endBtn.style.backgroundColor = "";
                }
            }, 3000);
        }
    };
    
    const clearBtn = document.createElement('button');
    clearBtn.className = 'clear-round-btn';
    clearBtn.dataset.confirm = "false";
    clearBtn.innerHTML = `🔄 ${i18n[currentLang].clearRound}`;

    clearBtn.onclick = () => {
        if (clearBtn.dataset.confirm === "true") {
            clearBtn.dataset.confirm = "false";
            clearBtn.innerHTML = `🔄 ${i18n[currentLang].clearRound}`;
            clearBtn.style.backgroundColor = "";
            
            roundDiv.querySelectorAll('.tiger-list').forEach(list => {
                list.innerHTML = '';
                list.appendChild(createTigerInput());
            });
            roundDiv.querySelectorAll('input, button').forEach(el => el.disabled = false);
            const checkbox = endBtn.querySelector('input[type="checkbox"]');
            if(checkbox) checkbox.checked = false;
            roundDiv.querySelector('.round-result').classList.add('hidden');
            triggerSync();
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
    
    const modifyBtn = document.createElement('button');
    modifyBtn.className = 'modify-round-btn hidden';
    modifyBtn.dataset.confirm = "false";
    modifyBtn.innerHTML = `✏️ ${i18n[currentLang].modifyRound}`;

    modifyBtn.onclick = () => {
        if (modifyBtn.dataset.confirm === "true") {
            modifyBtn.dataset.confirm = "false";
            modifyBtn.innerHTML = `✏️ ${i18n[currentLang].modifyRound}`;
            modifyBtn.style.backgroundColor = "";
            
            roundDiv.querySelectorAll('input, button').forEach(el => el.disabled = false);
            
            roundDiv.querySelector('.round-result').classList.add('hidden');
            modifyBtn.classList.add('hidden');
            endBtn.classList.remove('hidden');
            
            const checkbox = endBtn.querySelector('input[type="checkbox"]');
            if(checkbox) checkbox.checked = false;
            triggerSync();
        } else {
            modifyBtn.dataset.confirm = "true";
            modifyBtn.innerHTML = `✏️ ${i18n[currentLang].confirmModify}`;
            modifyBtn.style.backgroundColor = "#e67e22";
            
            setTimeout(() => {
                if (modifyBtn.dataset.confirm === "true") {
                    modifyBtn.dataset.confirm = "false";
                    modifyBtn.innerHTML = `✏️ ${i18n[currentLang].modifyRound}`;
                    modifyBtn.style.backgroundColor = "";
                }
            }, 3000);
        }
    };
    
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'footer-actions';
    actionsDiv.appendChild(clearBtn);
    actionsDiv.appendChild(modifyBtn);
    actionsDiv.appendChild(endBtn);
    
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

function calculateRoundScore(roundDiv, endBtn) {
    const checkbox = endBtn.querySelector('input[type="checkbox"]');
    if (checkbox) checkbox.checked = true;

    const unitInput = roundDiv.querySelector('.round-unit');
    const unit = parseFloat(unitInput.value) || 0.5;
    
    let totalTigers = { '东': 0, '南': 0, '西': 0, '北': 0 };

    const rows = roundDiv.querySelectorAll('.player-row');
    rows.forEach(row => {
        const dir = row.dataset.dir;
        const inputs = row.querySelectorAll('.tiger-input');
        let sum = 0;
        inputs.forEach(input => {
            sum += parseFloat(input.value) || 0;
        });
        totalTigers[dir] += sum;
    });

    let finalScores = { '东': 0, '南': 0, '西': 0, '北': 0 };
    
    directions.forEach(dir => {
        let score = totalTigers[dir] * 3; 
        directions.forEach(otherDir => {
            if (dir !== otherDir) {
                score -= totalTigers[otherDir]; 
            }
        });
        finalScores[dir] = Math.round(score * unit * 100) / 100;
    });

    const resultDiv = roundDiv.querySelector('.round-result');
    resultDiv.innerHTML = `<h3 class="result-title">${i18n[currentLang].resultTitle}</h3>`;
    
    directions.forEach(dir => {
        const score = finalScores[dir];
        const colorClass = score >= 0 ? 'positive' : 'negative';
        const sign = score > 0 ? '+' : '';
        
        const row = roundDiv.querySelector(`.row-${dir}`);
        const alias = row.querySelector('.player-alias').value || aliases[dir];
        const dirName = i18n[currentLang][dir === '东' ? 'east' : dir === '南' ? 'south' : dir === '西' ? 'west' : 'north'];

        const item = document.createElement('div');
        item.className = 'result-item';
        item.dataset.dir = dir;
        item.dataset.alias = alias;
        item.innerHTML = `<span class="result-player">${alias} (${dirName})</span> <span class="score-val ${colorClass}">${sign}${score}</span>`;
        resultDiv.appendChild(item);
    });
    
    resultDiv.classList.remove('hidden');
    
    const inputs = roundDiv.querySelectorAll('input, button');
    inputs.forEach(el => el.disabled = true);
    
    const langToggleBtn = document.getElementById('langToggle');
    if (langToggleBtn) langToggleBtn.disabled = false;
    const clearAllBtnElem = document.getElementById('clearAllBtn');
    if (clearAllBtnElem) clearAllBtnElem.disabled = false;
    
    endBtn.style.backgroundColor = "";
    endBtn.classList.add('hidden');
    
    const modifyBtn = roundDiv.querySelector('.modify-round-btn');
    if (modifyBtn) {
        modifyBtn.disabled = false;
        modifyBtn.classList.remove('hidden');
    }
    const clearBtn = roundDiv.querySelector('.clear-round-btn');
    if (clearBtn) clearBtn.disabled = false;
}

startGameBtn.addEventListener('click', () => {
    createGameRound(true);
    triggerSync();
});

const clearAllBtn = document.getElementById('clearAllBtn');
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
}

async function loadRoomData() {
    let url = '/api/room?code=' + currentRoomCode;
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
        if (data.room && data.room.password) {
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
        const res = await fetch(`/api/room?code=${currentRoomCode}&pwd=${encodeURIComponent(p)}`);
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
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert(i18n[currentLang].linkCopied);
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

function getGameState() {
    const rounds = [];
    document.querySelectorAll('.game-round').forEach(roundDiv => {
        const roundState = {
            unit: parseFloat(roundDiv.querySelector('.round-unit').value) || 0.5,
            players: {},
            isEnded: !roundDiv.querySelector('.end-game-btn') || roundDiv.querySelector('.end-game-btn').classList.contains('hidden')
        };
        
        roundDiv.querySelectorAll('.player-row').forEach(row => {
            const dir = row.dataset.dir;
            const aliasInput = row.querySelector('.player-alias');
            if (aliasInput && aliasInput.value) {
                aliases[dir] = aliasInput.value;
            }
            const tigers = [];
            row.querySelectorAll('.tiger-input').forEach(input => {
                if (input.value !== '') tigers.push(parseFloat(input.value));
            });
            roundState.players[dir] = {
                alias: aliasInput ? aliasInput.value : (aliases[dir] || ''),
                tigers: tigers
            };
        });
        rounds.push(roundState);
    });
    return { aliases: aliases, rounds: rounds };
}

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
                        input.value = val;
                        tigerList.appendChild(input);
                    });
                }
            }
        });
        
        if (roundState.isEnded) {
            const endBtn = roundDiv.querySelector('.end-game-btn');
            if (endBtn) calculateRoundScore(roundDiv, endBtn);
        }
    });

    document.getElementById('startGameBtn').innerHTML = roundCount > 0 ? i18n[currentLang].startAnother : i18n[currentLang].startGame;
}

async function pushStateToServer() {
    if (isSyncing || !currentRoomCode) return;
    const state = getGameState();
    try {
        await fetch('/api/game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'save_state', roomCode: currentRoomCode, state: state })
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
        let url = '/api/room?code=' + currentRoomCode;
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

function calculateScores(tigers, unit, dirs = ['东', '西', '南', '北']) {
    let scores = {};
    dirs.forEach(dir => {
        let score = (tigers[dir] || 0) * 3;
        dirs.forEach(otherDir => {
            if (dir !== otherDir) {
                score -= (tigers[otherDir] || 0);
            }
        });
        scores[dir] = Math.round(score * unit * 100) / 100;
    });
    return scores;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateScores };
}
