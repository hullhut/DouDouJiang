const { calculateScores } = require('./scoring');

describe('Mahjong Tiger Scoring Logic', () => {
    it('should correctly calculate when East has 1 tiger, others 0', () => {
        // East has 1 tiger. East gets 3 * 1 = 3. Others pay 1. Unit = 100.
        const tigers = { '东': 1, '南': 0, '西': 0, '北': 0 };
        const result = calculateScores(tigers, 100);
        expect(result['东']).toBe(300);
        expect(result['南']).toBe(-100);
        expect(result['西']).toBe(-100);
        expect(result['北']).toBe(-100);
    });

    it('should calculate offset correctly when East has 2 tigers, South has 1', () => {
        // East = 2 tigers (gross +6). Pays South (-1). Net = +5. (500)
        // South = 1 tiger (gross +3). Pays East (-2). Net = +1. (100)
        // West = 0 tigers. Pays East (-2), South (-1). Net = -3. (-300)
        // North = 0 tigers. Pays East (-2), South (-1). Net = -3. (-300)
        const tigers = { '东': 2, '南': 1, '西': 0, '北': 0 };
        const result = calculateScores(tigers, 100);
        expect(result['东']).toBe(500);
        expect(result['南']).toBe(100);
        expect(result['西']).toBe(-300);
        expect(result['北']).toBe(-300);
    });

    it('should result in 0 for everyone if no tigers', () => {
        const tigers = { '东': 0, '南': 0, '西': 0, '北': 0 };
        const result = calculateScores(tigers, 100);
        expect(result['东']).toBe(0);
        expect(result['南']).toBe(0);
        expect(result['西']).toBe(0);
        expect(result['北']).toBe(0);
    });
});
