const test = require('node:test');
const assert = require('node:assert');
const {
    calculateScores,
    calculateGameDetails,
    calculateRoundDetails,
    calculateGameLeaderboard,
    calculateGrandTotal
} = require('./scoring');

test('Mahjong Tiger Scoring - East has 1 tiger, others 0, unit=100', () => {
    const tigers = { '东': 1, '南': 0, '西': 0, '北': 0 };
    const result = calculateScores(tigers, 100);
    assert.strictEqual(result['东'], 300);
    assert.strictEqual(result['南'], -100);
    assert.strictEqual(result['西'], -100);
    assert.strictEqual(result['北'], -100);
    assert.strictEqual(result['东'] + result['南'] + result['西'] + result['北'], 0);
});

test('Mahjong Tiger Scoring - Offset calculation (East=2, South=1, unit=100)', () => {
    const tigers = { '东': 2, '南': 1, '西': 0, '北': 0 };
    const result = calculateScores(tigers, 100);
    assert.strictEqual(result['东'], 500);
    assert.strictEqual(result['南'], 100);
    assert.strictEqual(result['西'], -300);
    assert.strictEqual(result['北'], -300);
    assert.strictEqual(result['东'] + result['南'] + result['西'] + result['北'], 0);
});

test('Mahjong Tiger Scoring - Zero sum with floating point unit (unit=0.5)', () => {
    const tigers = { '东': 2, '南': 1, '西': 0, '北': 0 };
    const result = calculateScores(tigers, 0.5);
    assert.strictEqual(result['东'], 2.5);
    assert.strictEqual(result['南'], 0.5);
    assert.strictEqual(result['西'], -1.5);
    assert.strictEqual(result['北'], -1.5);
    assert.strictEqual(result['东'] + result['南'] + result['西'] + result['北'], 0);
});

test('Zero-sum invariant holds with irregular decimal unit (unit=0.165)', () => {
    const tigers = { '东': 2, '南': 1, '西': 0, '北': 0 };
    const result = calculateScores(tigers, 0.165);
    let sum = Math.round((result['东'] + result['南'] + result['西'] + result['北']) * 100) / 100;
    if (sum === 0) sum = 0;
    assert.strictEqual(sum, 0, 'Sum of scores must strictly equal 0');
});

test('Zero-sum invariant holds across 100 random combinations of units and tiger counts', () => {
    const dirs = ['东', '西', '南', '北'];
    for (let i = 0; i < 100; i++) {
        const tigers = {
            '东': Math.floor(Math.random() * 10),
            '南': Math.floor(Math.random() * 10),
            '西': Math.floor(Math.random() * 10),
            '北': Math.floor(Math.random() * 10)
        };
        const unit = Math.round((0.1 + Math.random() * 5) * 100) / 100;
        const res = calculateScores(tigers, unit, dirs);
        let sum = Math.round(dirs.reduce((acc, d) => acc + res[d], 0) * 100) / 100;
        if (sum === 0) sum = 0;
        assert.strictEqual(sum, 0, `Zero sum violated for tigers ${JSON.stringify(tigers)} at unit ${unit}`);
    }
});

test('calculateGameDetails sums multiple hands (把) and generates required formula string', () => {
    // 假设一局打完 3 把
    const handsMap = {
        '东': [1, 2, 0], // 总虎数 3
        '南': [0, 1, 0], // 总虎数 1
        '西': [0, 0, 0], // 总虎数 0
        '北': [1, 0, 0]  // 总虎数 1
    };
    const aliases = { '东': 'Mom', '南': 'Dad', '西': 'Ben', '北': 'Li' };
    const res = calculateGameDetails(handsMap, 0.5, ['东', '西', '南', '北'], aliases);
    
    assert.strictEqual(res.details.length, 4);
    const east = res.details.find(d => d.dir === '东');
    assert.strictEqual(east.alias, 'Mom');
    assert.strictEqual(east.tigers, 3);
    assert.strictEqual(east.othersSum, 2); // 1 + 0 + 1 = 2
    assert.strictEqual(east.netTigers, 7); // 3*3 - 2 = 7
    assert.strictEqual(east.money, 3.5);   // 7 * 0.5 = 3.5
    assert.strictEqual(east.formula, '((3 × 3 - 2) × 0.5) = +3.5 元');

    // 生成当局排行榜
    const leaderboard = calculateGameLeaderboard(res.details);
    assert.strictEqual(leaderboard.length, 4);
    assert.strictEqual(leaderboard[0].alias, 'Mom');
    assert.strictEqual(leaderboard[0].rank, 1);
    assert.strictEqual(leaderboard[0].isWinner, true);
    assert.strictEqual(leaderboard[3].alias, 'Ben');
    assert.strictEqual(leaderboard[3].rank, 4);
});

test('calculateGrandTotal aggregates by Player Alias across seat swapping (局间换座)', () => {
    // Game 1: Mom at East (+5), Dad at South (+1), Ben at West (-3), Li at North (-3)
    const game1 = {
        isEnded: true,
        unit: 1,
        players: {
            '东': { alias: 'Mom', hands: [2] },
            '南': { alias: 'Dad', hands: [1] },
            '西': { alias: 'Ben', hands: [0] },
            '北': { alias: 'Li', hands: [0] }
        }
    };
    // Game 2: Seat swap! Mom moves to North, Ben moves to East, Li moves to West, Dad stays at South
    const game2 = {
        isEnded: true,
        unit: 1,
        players: {
            '东': { alias: 'Ben', hands: [0] },
            '南': { alias: 'Dad', hands: [0] },
            '西': { alias: 'Li', hands: [0] },
            '北': { alias: 'Mom', hands: [2] } // Mom at North!
        }
    };
    const grand = calculateGrandTotal([game1, game2], ['东', '西', '南', '北']);

    assert.strictEqual(grand.settledGamesCount, 2);
    
    // Mom should have played 2 games, sat at '东' and '北', with total +5 + (+6) = +11
    const mom = grand.summary['Mom'];
    assert.ok(mom, 'Mom must exist in summary');
    assert.strictEqual(mom.gamesPlayed, 2);
    assert.deepStrictEqual(mom.dirsPlayed.sort(), ['东', '北'].sort());
    assert.strictEqual(mom.totalMoney, 11);
    assert.strictEqual(mom.totalRawTigers, 4); // 2 in G1, 2 in G2

    // Check zero sum across all unique aliases
    let totalAll = grand.byMoney.reduce((acc, p) => acc + p.totalMoney, 0);
    if (totalAll === 0) totalAll = 0;
    assert.strictEqual(totalAll, 0);
});

test('calculateGrandTotal handles player substitution (上下人换人)', () => {
    // Game 1: Mom, Dad, Ben, Li
    const game1 = {
        isEnded: true,
        unit: 1,
        players: {
            '东': { alias: 'Mom', hands: [1] },
            '南': { alias: 'Dad', hands: [0] },
            '西': { alias: 'Ben', hands: [0] },
            '北': { alias: 'Li', hands: [0] }
        }
    };
    // Game 2: Dad steps out, Auntie steps in at South!
    const game2 = {
        isEnded: true,
        unit: 1,
        players: {
            '东': { alias: 'Mom', hands: [0] },
            '南': { alias: 'Auntie', hands: [2] }, // Auntie replaces Dad!
            '西': { alias: 'Ben', hands: [0] },
            '北': { alias: 'Li', hands: [0] }
        }
    };
    const grand = calculateGrandTotal([game1, game2], ['东', '西', '南', '北']);

    assert.strictEqual(grand.settledGamesCount, 2);
    // Total players in leaderboard should be 5: Mom, Dad, Ben, Li, Auntie
    assert.strictEqual(grand.byMoney.length, 5);
    assert.ok(grand.summary['Auntie']);
    assert.strictEqual(grand.summary['Auntie'].gamesPlayed, 1);
});
