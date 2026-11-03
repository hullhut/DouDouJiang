/**
 * 豆豆酱麻将计分核心计算引擎 (ScoringEngine) - 阶段二升级版
 * 1. 单局虎数计算、零和博弈数学严格守恒校验与残差微调补偿；
 * 2. 单局公式字符串生成: ((本人虎数*3-其他人虎数之和)*单位)；
 * 3. 全局统计以【玩家别名 (Alias)】为唯一识别实体，完美支持中途换座位、上下人替补场景。
 */

function calculateScores(tigers, unit, dirs = ['东', '西', '南', '北']) {
    let rawTigers = {};
    dirs.forEach(dir => {
        rawTigers[dir] = parseFloat(tigers[dir]) || 0;
    });

    let scores = {};
    dirs.forEach(dir => {
        let othersSum = 0;
        dirs.forEach(other => {
            if (other !== dir) {
                othersSum += rawTigers[other];
            }
        });
        let netTigers = rawTigers[dir] * 3 - othersSum;
        scores[dir] = Math.round(netTigers * unit * 100) / 100;
    });

    // 零和博弈数学恒等约束校验与微小分位残差补偿
    let sum = Math.round(dirs.reduce((acc, d) => acc + scores[d], 0) * 100) / 100;
    if (sum !== 0) {
        // 将残差补偿给绝对值最大的玩家，确保数学零和严格恒等 (总和为0)
        let maxDir = dirs.reduce((a, b) => Math.abs(scores[a]) > Math.abs(scores[b]) ? a : b);
        scores[maxDir] = Math.round((scores[maxDir] - sum) * 100) / 100;
    }

    // 规范化浮点 -0 为标准 0
    dirs.forEach(dir => {
        if (scores[dir] === 0 || Object.is(scores[dir], -0)) {
            scores[dir] = 0;
        }
    });

    return scores;
}

function calculateRoundDetails(tigersMap, unit, dirs = ['东', '西', '南', '北'], aliases = {}) {
    let rawSums = {};
    dirs.forEach(dir => {
        const val = tigersMap[dir];
        if (Array.isArray(val)) {
            rawSums[dir] = val.reduce((acc, v) => acc + (parseFloat(v) || 0), 0);
        } else {
            rawSums[dir] = parseFloat(val) || 0;
        }
    });

    const scores = calculateScores(rawSums, unit, dirs);
    const details = dirs.map(dir => {
        const ownTigers = rawSums[dir];
        let othersSum = 0;
        dirs.forEach(other => {
            if (other !== dir) {
                othersSum += rawSums[other];
            }
        });
        
        const netTigers = ownTigers * 3 - othersSum;
        const finalMoney = scores[dir];
        const sign = finalMoney > 0 ? '+' : '';
        // 按照用户要求生成的完整计算过程公式字符串: ((本人虎数*3-其他人虎数之和)*单位)
        const formula = `((${ownTigers} × 3 - ${othersSum}) × ${unit}) = ${sign}${finalMoney} 元`;

        return {
            dir,
            alias: (aliases[dir] && aliases[dir].trim()) ? aliases[dir].trim() : dir,
            tigers: ownTigers,
            othersSum,
            netTigers,
            money: finalMoney,
            formula
        };
    });

    return { details, scores, rawSums };
}

/**
 * 阶段二重点升级：以【玩家别名 Alias】为全局唯一键统计！
 * 支持中途换座位、上下人替补场景，确保各人战绩精确归集，全场依然严格零和恒等。
 */
function calculateGrandTotal(rounds, dirs = ['东', '西', '南', '北'], defaultAliases = {}) {
    let summary = {}; // 以 aliasKey 为主键归集
    let settledRoundsCount = 0;

    rounds.forEach(round => {
        // 支持 isSaved 或 isEnded 状态判定为已结算局
        if (!round.isEnded && !round.isSaved && !round.details) return;
        settledRoundsCount++;

        let roundDetails = null;
        if (round.details && Array.isArray(round.details)) {
            roundDetails = round.details;
        } else {
            const tigersInput = {};
            const roundAliases = {};
            dirs.forEach(d => {
                const p = round.players ? round.players[d] : null;
                tigersInput[d] = p ? (p.tigers || []) : [];
                roundAliases[d] = (p && p.alias && p.alias.trim()) ? p.alias.trim() : (defaultAliases[d] || d);
            });
            const res = calculateRoundDetails(tigersInput, round.unit || 0.5, dirs, roundAliases);
            roundDetails = res.details;
        }

        roundDetails.forEach(item => {
            const rawAlias = item.alias ? item.alias.trim() : '';
            const aliasKey = rawAlias || `${item.dir}位玩家`;

            if (!summary[aliasKey]) {
                summary[aliasKey] = {
                    alias: aliasKey,
                    dirsPlayed: [],
                    totalRawTigers: 0,
                    totalNetTigers: 0,
                    totalMoney: 0,
                    roundsPlayed: 0,
                    roundsWon: 0
                };
            }

            const p = summary[aliasKey];
            p.roundsPlayed++;
            if (!p.dirsPlayed.includes(item.dir)) {
                p.dirsPlayed.push(item.dir);
            }
            p.totalRawTigers += item.tigers;
            p.totalNetTigers += item.netTigers;
            p.totalMoney = Math.round((p.totalMoney + item.money) * 100) / 100;
            if (item.money > 0) p.roundsWon++;
        });
    });

    const allPlayers = Object.values(summary);

    // 按金额排行
    const byMoney = [...allPlayers].sort((a, b) => b.totalMoney - a.totalMoney);
    const maxMoney = byMoney.length > 0 ? byMoney[0].totalMoney : 0;
    byMoney.forEach(p => {
        p.isBigWinnerMoney = (p.totalMoney === maxMoney && maxMoney > 0);
    });

    // 按虎数排行 (优先按净胜虎数降序，同净胜则按总抓虎数降序)
    const byTigers = [...allPlayers].sort((a, b) => {
        if (b.totalNetTigers !== a.totalNetTigers) {
            return b.totalNetTigers - a.totalNetTigers;
        }
        return b.totalRawTigers - a.totalRawTigers;
    });
    const maxNetTigers = byTigers.length > 0 ? byTigers[0].totalNetTigers : 0;
    byTigers.forEach(p => {
        p.isBigWinnerTigers = (p.totalNetTigers === maxNetTigers && maxNetTigers > 0);
    });

    return {
        settledRoundsCount,
        byMoney,
        byTigers,
        summary
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateScores,
        calculateRoundDetails,
        calculateGrandTotal
    };
}
if (typeof window !== 'undefined') {
    window.ScoringEngine = {
        calculateScores,
        calculateRoundDetails,
        calculateGrandTotal
    };
}
