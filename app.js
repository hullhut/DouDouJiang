const gameRoundsContainer = document.getElementById('gameRoundsContainer');
const startGameBtn = document.getElementById('startGameBtn');

let roundCount = 0;
const directions = ['东', '南', '西', '北'];

// 玩家别名缓存，方便下一局默认带出
let aliases = {
    '东': 'Mom',
    '南': 'Dad',
    '西': 'Ben',
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
    header.innerText = `Players & Scores - 第 ${roundId} 局`;
    roundDiv.appendChild(header);

    // Player Rows
    directions.forEach(dir => {
        const row = document.createElement('div');
        row.className = `player-row row-${dir}`;
        row.dataset.dir = dir;

        // 方向标签
        const dirSpan = document.createElement('div');
        dirSpan.className = 'player-dir';
        dirSpan.innerHTML = `${dir}<br><span style="font-size:12px;">(${dir})</span>`;
        row.appendChild(dirSpan);

        // 玩家信息 (别名 + 虎数)
        const playerInfo = document.createElement('div');
        playerInfo.className = 'player-info';

        const aliasInput = document.createElement('input');
        aliasInput.type = 'text';
        aliasInput.className = 'player-alias';
        aliasInput.value = aliases[dir];
        aliasInput.placeholder = 'Player Alias';
        aliasInput.onchange = (e) => {
            aliases[dir] = e.target.value; // 更新缓存
        };
        playerInfo.appendChild(aliasInput);

        const tigerList = document.createElement('div');
        tigerList.className = 'tiger-list';
        
        const createTigerInput = () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'tiger-input';
            input.placeholder = 'Score';
            input.value = '';
            return input;
        };
        
        tigerList.appendChild(createTigerInput());
        playerInfo.appendChild(tigerList);
        
        row.appendChild(playerInfo);

        // 加号按钮
        const addBtn = document.createElement('button');
        addBtn.className = 'add-btn';
        addBtn.innerText = '+';
        addBtn.onclick = () => {
            tigerList.appendChild(createTigerInput());
        };
        row.appendChild(addBtn);

        roundDiv.appendChild(row);
    });

    // 底部结算区域
    const footer = document.createElement('div');
    footer.className = 'footer-controls';
    
    const unitDiv = document.createElement('div');
    unitDiv.className = 'unit-input';
    unitDiv.innerHTML = `<span class="unit-icon">¥</span> <input type="number" class="round-unit" value="100" min="1"> 元`;
    
    const endBtn = document.createElement('button');
    endBtn.className = 'end-game-btn';
    endBtn.innerHTML = `<input type="checkbox" style="pointer-events:none;"> End Game`;
    endBtn.onclick = () => calculateRoundScore(roundDiv, endBtn);
    
    footer.appendChild(unitDiv);
    footer.appendChild(endBtn);
    roundDiv.appendChild(footer);
    
    // 结算结果展示区
    const resultDiv = document.createElement('div');
    resultDiv.className = 'round-result hidden';
    roundDiv.appendChild(resultDiv);

    gameRoundsContainer.appendChild(roundDiv);
    
    // 自动滚动到新增的这局
    roundDiv.scrollIntoView({ behavior: 'smooth' });
}

function calculateRoundScore(roundDiv, endBtn) {
    // 选中 checkbox 模拟图片里的效果
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

    // 赢输三家计算
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

    // 展示结果
    const resultDiv = roundDiv.querySelector('.round-result');
    resultDiv.innerHTML = '<h3 class="result-title">💰 本局结算结果 💰</h3>';
    
    directions.forEach(dir => {
        const score = finalScores[dir];
        const colorClass = score >= 0 ? 'positive' : 'negative';
        const sign = score > 0 ? '+' : '';
        
        const row = roundDiv.querySelector(`.row-${dir}`);
        const alias = row.querySelector('.player-alias').value || aliases[dir];

        const item = document.createElement('div');
        item.className = 'result-item';
        item.innerHTML = `<span>${alias} (${dir})</span> <span class="${colorClass}">${sign}${score} 元</span>`;
        resultDiv.appendChild(item);
    });
    
    resultDiv.classList.remove('hidden');
    
    // 禁用当前局的输入和按钮，表示本局结束
    const inputs = roundDiv.querySelectorAll('input, button');
    inputs.forEach(el => el.disabled = true);
}

startGameBtn.addEventListener('click', createGameRound);
