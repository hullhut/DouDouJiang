const gameRoundsContainer = document.getElementById('gameRoundsContainer');
const startGameBtn = document.getElementById('startGameBtn');
const langToggle = document.getElementById('langToggle');
const mainTitle = document.getElementById('mainTitle');

// --- I18N (Internationalization) ---
const i18n = {
    en: {
        title: "Family Mahjong<br>Score Tracker",
        startGame: "Start Game ▶",
        roundTitle: "Players & Scores - Round {n}",
        aliasPlaceholder: "Player Alias",
        scorePlaceholder: "Score",
        unitText: "Unit (Yuan)",
        endGame: "End Game",
        confirmEnd: "Confirm?",
        clearRound: "Clear",
        confirmClear: "Sure?",
        resultTitle: "💰 Round Settlement 💰",
        east: "East",
        south: "South",
        west: "West",
        north: "North"
    },
    zh: {
        title: "家庭麻将<br>计分器",
        startGame: "开始游戏 ▶",
        roundTitle: "玩家与分数 - 第 {n} 局",
        aliasPlaceholder: "玩家昵称",
        scorePlaceholder: "虎数",
        unitText: "计数单位 (元)",
        endGame: "结束游戏",
        confirmEnd: "确认结算?",
        clearRound: "清空",
        confirmClear: "确认清空?",
        resultTitle: "💰 本局结算结果 💰",
        east: "东",
        south: "南",
        west: "西",
        north: "北"
    }
};

let currentLang = 'zh';

function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    
    // Update static texts
    mainTitle.innerHTML = i18n[currentLang].title;
    startGameBtn.innerHTML = i18n[currentLang].startGame;
    
    // Update dynamic texts
    document.querySelectorAll('.game-round').forEach(roundDiv => {
        // Round header
        const roundId = roundDiv.id.replace('round-', '');
        roundDiv.querySelector('.round-header').innerText = i18n[currentLang].roundTitle.replace('{n}', roundId);
        
        // Directions update for placeholder
        roundDiv.querySelectorAll('.player-row').forEach(row => {
            row.querySelector('.player-alias').placeholder = i18n[currentLang].aliasPlaceholder;
            row.querySelectorAll('.tiger-input').forEach(input => {
                input.placeholder = i18n[currentLang].scorePlaceholder;
            });
        });

        // Unit text
        const unitTextNode = roundDiv.querySelector('.unit-text-label');
        if (unitTextNode) {
            unitTextNode.innerText = i18n[currentLang].unitText;
        }

        // End Game button
        const endBtn = roundDiv.querySelector('.end-game-btn');
        if (endBtn && !endBtn.disabled) {
            if (endBtn.dataset.confirm === "true") {
                endBtn.innerHTML = `<input type="checkbox" style="pointer-events:none;"> ${i18n[currentLang].confirmEnd}`;
            } else {
                endBtn.innerHTML = `<input type="checkbox" style="pointer-events:none;"> ${i18n[currentLang].endGame}`;
            }
        }
        
        // Clear Round button
        const clearBtn = roundDiv.querySelector('.clear-round-btn');
        if (clearBtn) {
            if (clearBtn.dataset.confirm === "true") {
                clearBtn.innerHTML = `🔄 ${i18n[currentLang].confirmClear}`;
            } else {
                clearBtn.innerHTML = `🔄 ${i18n[currentLang].clearRound}`;
            }
        }
        
        // Result Title if settled
        const resultTitle = roundDiv.querySelector('.result-title');
        if (resultTitle) {
            resultTitle.innerText = i18n[currentLang].resultTitle;
        }
    });
}

langToggle.addEventListener('click', toggleLanguage);

// --- Game Logic ---
let roundCount = 0;
const directions = ['东', '西', '南', '北'];
const enDirs = ['East', 'West', 'South', 'North'];

let aliases = {
    '东': 'Mom',
    '西': 'Ben',
    '南': 'Dad',
    '北': 'Li'
};

function createGameRound() {
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
        tileIcon.className = 'mahjong-tile';
        const traditionalDir = { '东': '東', '南': '南', '西': '西', '北': '北' }[dir];
        tileIcon.innerText = traditionalDir;

        dirContainer.appendChild(tileIcon);
        row.appendChild(dirContainer);

        const playerInfo = document.createElement('div');
        playerInfo.className = 'player-info';

        const aliasInput = document.createElement('input');
        aliasInput.type = 'text';
        aliasInput.className = 'player-alias';
        aliasInput.value = aliases[dir];
        aliasInput.placeholder = i18n[currentLang].aliasPlaceholder;
        aliasInput.onchange = (e) => {
            aliases[dir] = e.target.value; 
        };
        playerInfo.appendChild(aliasInput);

        const tigerList = document.createElement('div');
        tigerList.className = 'tiger-list';
        
        const createTigerInput = () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'tiger-input';
            input.placeholder = i18n[currentLang].scorePlaceholder;
            input.value = '';
            return input;
        };
        
        tigerList.appendChild(createTigerInput());
        playerInfo.appendChild(tigerList);
        
        row.appendChild(playerInfo);

        const addBtn = document.createElement('button');
        addBtn.className = 'add-btn';
        addBtn.innerText = '+';
        addBtn.onclick = () => {
            tigerList.appendChild(createTigerInput());
        };
        row.appendChild(addBtn);

        roundDiv.appendChild(row);
    });

    // Footer
    const footer = document.createElement('div');
    footer.className = 'footer-controls';
    
    const unitDiv = document.createElement('div');
    unitDiv.className = 'unit-input';
    unitDiv.innerHTML = `<span class="unit-icon">¥</span> <input type="number" class="round-unit" value="100" min="1"> <span class="unit-text-label">${i18n[currentLang].unitText}</span>`;
    
    const endBtn = document.createElement('button');
    endBtn.className = 'end-game-btn';
    endBtn.dataset.confirm = "false";
    endBtn.innerHTML = `<input type="checkbox" style="pointer-events:none;"> ${i18n[currentLang].endGame}`;
    
    // Double confirmation logic
    endBtn.onclick = () => {
        if (endBtn.dataset.confirm === "true") {
            calculateRoundScore(roundDiv, endBtn);
        } else {
            endBtn.dataset.confirm = "true";
            endBtn.innerHTML = `<input type="checkbox" style="pointer-events:none;"> ${i18n[currentLang].confirmEnd}`;
            endBtn.style.backgroundColor = "#c0392b";
            
            // Reset state after 3 seconds if not clicked again
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
            
            // Clear logic
            roundDiv.querySelectorAll('.tiger-list').forEach(list => {
                list.innerHTML = '';
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'tiger-input';
                input.placeholder = i18n[currentLang].scorePlaceholder;
                input.value = '';
                list.appendChild(input);
            });
            // Re-enable everything if it was disabled
            roundDiv.querySelectorAll('input, button').forEach(el => el.disabled = false);
            const checkbox = endBtn.querySelector('input[type="checkbox"]');
            if(checkbox) checkbox.checked = false;
            // Hide result
            roundDiv.querySelector('.round-result').classList.add('hidden');
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
    actionsDiv.appendChild(endBtn);
    
    footer.appendChild(unitDiv);
    footer.appendChild(actionsDiv);
    roundDiv.appendChild(footer);
    
    const resultDiv = document.createElement('div');
    resultDiv.className = 'round-result hidden';
    roundDiv.appendChild(resultDiv);

    gameRoundsContainer.appendChild(roundDiv);
    roundDiv.scrollIntoView({ behavior: 'smooth' });
}

function calculateRoundScore(roundDiv, endBtn) {
    const checkbox = endBtn.querySelector('input[type="checkbox"]');
    if (checkbox) checkbox.checked = true;

    const unitInput = roundDiv.querySelector('.round-unit');
    const unit = parseFloat(unitInput.value) || 0;
    
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
        finalScores[dir] = score * unit;
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
        item.innerHTML = `<span>${alias} (${dirName})</span> <span class="${colorClass}">${sign}${score}</span>`;
        resultDiv.appendChild(item);
    });
    
    resultDiv.classList.remove('hidden');
    
    // IMPORTANT: Only disable inputs WITHIN THIS SPECIFIC ROUND
    const inputs = roundDiv.querySelectorAll('input, button');
    inputs.forEach(el => el.disabled = true);
    
    endBtn.style.backgroundColor = ""; // reset color
}

startGameBtn.addEventListener('click', createGameRound);
