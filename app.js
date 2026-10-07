const gameRoundsContainer = document.getElementById('gameRoundsContainer');
const startGameBtn = document.getElementById('startGameBtn');
const endGameBtn = document.getElementById('endGameBtn');
const scoreUnitInput = document.getElementById('scoreUnit');
const resultModal = document.getElementById('resultModal');
const resultContent = document.getElementById('resultContent');
const closeModalBtn = document.getElementById('closeModalBtn');

let roundCount = 0;
const directions = ['东', '南', '西', '北'];

// 玩家别名缓存，方便下一局默认带出
let aliases = {
    '东': '玩家1',
    '南': '玩家2',
    '西': '玩家3',
    '北': '玩家4'
};

function createGameRound() {
    roundCount++;
    const roundDiv = document.createElement('div');
    roundDiv.className = 'game-round';
    roundDiv.dataset.round = roundCount;
    roundDiv.innerHTML = `<h3>第 ${roundCount} 局</h3>`;

    directions.forEach(dir => {
        const row = document.createElement('div');
        row.className = 'player-row';
        row.dataset.dir = dir;

        // 方向
        const dirSpan = document.createElement('span');
        dirSpan.className = 'player-dir';
        dirSpan.innerText = dir;
        row.appendChild(dirSpan);

        // 别名输入框
        const aliasInput = document.createElement('input');
        aliasInput.type = 'text';
        aliasInput.className = 'player-alias';
        aliasInput.value = aliases[dir];
        aliasInput.onchange = (e) => {
            aliases[dir] = e.target.value;
        };
        row.appendChild(aliasInput);

        // 记录虎数的容器
        const tigerList = document.createElement('div');
        tigerList.className = 'tiger-list';
        
        // 默认的一个输入框
        const createTigerInput = () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'tiger-input';
            input.placeholder = '虎数';
            input.value = 0;
            return input;
        };
        
        tigerList.appendChild(createTigerInput());
        row.appendChild(tigerList);

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

    gameRoundsContainer.appendChild(roundDiv);
}

// 结算逻辑
function calculateScores() {
    const unit = parseFloat(scoreUnitInput.value) || 0;
    
    // 初始化每个人总计赢的虎数
    let totalTigers = { '东': 0, '南': 0, '西': 0, '北': 0 };

    const rounds = document.querySelectorAll('.game-round');
    rounds.forEach(round => {
        const rows = round.querySelectorAll('.player-row');
        rows.forEach(row => {
            const dir = row.dataset.dir;
            const inputs = row.querySelectorAll('.tiger-input');
            let sum = 0;
            inputs.forEach(input => {
                sum += parseFloat(input.value) || 0;
            });
            totalTigers[dir] += sum;
        });
    });

    // 赢输三家计算
    let finalScores = { '东': 0, '南': 0, '西': 0, '北': 0 };
    
    directions.forEach(dir => {
        // 当前玩家赢的虎数，要向其他三家每家收 (赢的虎数 * 单位)
        // 当前玩家输的虎数，要付给其他家他们赢的虎数
        let score = totalTigers[dir] * 3; // 赢三家
        
        directions.forEach(otherDir => {
            if (dir !== otherDir) {
                score -= totalTigers[otherDir]; // 输给别人
            }
        });
        
        finalScores[dir] = score * unit;
    });

    // 显示结果
    let resultHTML = '';
    directions.forEach(dir => {
        const score = finalScores[dir];
        const color = score >= 0 ? 'green' : 'red';
        const sign = score > 0 ? '+' : '';
        resultHTML += `<p><strong>${aliases[dir]} (${dir})</strong> : <span style="color:${color}">${sign}${score} 元</span></p>`;
    });

    resultContent.innerHTML = resultHTML;
    resultModal.classList.remove('hidden');
}

startGameBtn.addEventListener('click', createGameRound);
endGameBtn.addEventListener('click', calculateScores);
closeModalBtn.addEventListener('click', () => {
    resultModal.classList.add('hidden');
});

// 初始化第一个控件
createGameRound();
