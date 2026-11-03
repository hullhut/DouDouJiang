const test = require('node:test');
const assert = require('node:assert');
const { calculateScores, calculateRoundDetails, calculateGrandTotal } = require('./scoring');

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

test('calculateRoundDetails generates required formula string', () => {
    const tigersMap = {
        '东': [1, 1], // total 2
        '南': [1],    // total 1
        '西': [],     // total 0
        '北': []      // total 0
    };
    const aliases = { '东': 'Mom', '南': 'Dad', '西': 'Ben', '北': 'Li' };
    const res = calculateRoundDetails(tigersMap, 0.5, ['东', '西', '南', '北'], aliases);
    
    assert.strictEqual(res.details.length, 4);
    const east = res.details.find(d => d.dir === '东');
    assert.strictEqual(east.alias, 'Mom');
    assert.strictEqual(east.tigers, 2);
    assert.strictEqual(east.othersSum, 1);
    assert.strictEqual(east.netTigers, 5);
    assert.strictEqual(east.money, 2.5);
    assert.strictEqual(east.formula, '((2 × 3 - 1) × 0.5) = +2.5 元');
});

test('Phase 2: calculateGrandTotal aggregates by Player Alias across seat swapping', () => {
    // Round 1: Mom at East (+5), Dad at South (+1), Ben at West (-3), Li at North (-3)
    const round1 = {
        isEnded: true,
        unit: 1,
        players: {
            '东': { alias: 'Mom', tigers: [2] },
            '南': { alias: 'Dad', tigers: [1] },
            '西': { alias: 'Ben', tigers: [0] },
            '北': { alias: 'Li', tigers: [0] }
        }
    };
    // Round 2: Seat swap! Mom moves to North, Ben moves to East, Li moves to West, Dad stays at South
    // In Round 2: Mom at North gets 2 tigers (+5), others 0
    const round2 = {
        isEnded: true,
        unit: 1,
        players: {
            '东': { alias: 'Ben', tigers: [0] },
            '南': { alias: 'Dad', tigers: [0] },
            '西': { alias: 'Li', tigers: [0] },
            '北': { alias: 'Mom', tigers: [2] } // Mom at North!
        }
    };
    const grand = calculateGrandTotal([round1, round2], ['东', '西', '南', '北']);

    assert.strictEqual(grand.settledRoundsCount, 2);
    
    // Mom should have played 2 rounds, sat at '东' and '北', with total +5 + (+6) = +11
    const mom = grand.summary['Mom'];
    assert.ok(mom, 'Mom must exist in summary');
    assert.strictEqual(mom.roundsPlayed, 2);
    assert.deepStrictEqual(mom.dirsPlayed.sort(), ['东', '北'].sort());
    assert.strictEqual(mom.totalMoney, 11);
    assert.strictEqual(mom.totalRawTigers, 4); // 2 in R1, 2 in R2

    // Check zero sum across all unique aliases
    let totalAll = grand.byMoney.reduce((acc, p) => acc + p.totalMoney, 0);
    if (totalAll === 0) totalAll = 0;
    assert.strictEqual(totalAll, 0);
});

test('Phase 2: calculateGrandTotal handles player substitution (上下人换人)', () => {
    // Round 1: Mom, Dad, Ben, Li
    const round1 = {
        isEnded: true,
        unit: 1,
        players: {
            '东': { alias: 'Mom', tigers: [1] },
            '南': { alias: 'Dad', tigers: [0] },
            '西': { alias: 'Ben', tigers: [0] },
            '北': { alias: 'Li', tigers: [0] }
        }
    };
    // Round 2: Dad steps out, Auntie steps in at South!
    const round2 = {
        isEnded: true,
        unit: 1,
        players: {
            '东': { alias: 'Mom', tigers: [0] },
            '南': { alias: 'Auntie', tigers: [2] }, // Auntie replaces Dad!
            '西': { alias: 'Ben', tigers: [0] },
            '北': { alias: 'Li', tigers: [0] }
        }
    };
    const grand = calculateGrandTotal([round1, round2], ['东', '西', '南', '北']);

    assert.strictEqual(grand.settledRoundsCount, 2);
    // Total players in leaderboard should be 5: Mom, Dad, Ben, Li, Auntie
    assert.strictEqual(grand.byMoney.length, 5);

    const dad = grand.summary['Dad'];
    const auntie = grand.summary['Auntie'];
    assert.ok(dad && auntie);
    assert.strictEqual(dad.roundsPlayed, 1);
    assert.strictEqual(dad.totalMoney, -1);
    assert.strictEqual(auntie.roundsPlayed, 1);
    assert.strictEqual(auntie.totalMoney, 6);

    // Zero-sum invariant holds across all 5 players
    let sum = Math.round(grand.byMoney.reduce((acc, p) => acc + p.totalMoney, 0) * 100) / 100;
    if (sum === 0) sum = 0;
    assert.strictEqual(sum, 0);
});
