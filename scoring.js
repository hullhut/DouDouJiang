/**
 * 豆豆酱麻将计分核心计算引擎 (ScoringEngine) - “把与局”架构升级版
 * 1. 最小单位【把】：洗一次牌打一把，记录各家抓的虎数；
 * 2. 结算单位【局】：连打两三圈后点结束本局，计算本局详细得分与当局排行榜；
 * 3. 统计单位【总】：跨局累计总游戏排行榜，以【玩家别名 (Alias)】为唯一识别键（支持换位与替补）；
 * 4. 零和博弈严格数学恒等（所有玩家得分之和恒等于 0）。
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

/**
 * 计算单局（包含多把记录）的结算详情与各家公式推导过程
 */
function calculateGameDetails(handsMap, unit, dirs = ['东', '西', '南', '北'], aliases = {}) {
    let rawSums = {};
    const unitVal = parseFloat(unit) || 0.5;

    dirs.forEach(dir => {
        const val = handsMap[dir];
        if (Array.isArray(val)) {
            rawSums[dir] = val.reduce((acc, v) => acc + (parseFloat(v) || 0), 0);
        } else {
            rawSums[dir] = parseFloat(val) || 0;
        }
        rawSums[dir] = Math.round(rawSums[dir] * 100) / 100;
    });

    const scores = calculateScores(rawSums, unitVal, dirs);
    const seatOrder = ['东', '南', '西', '北'];

    const details = dirs.map(dir => {
        const ownTigers = rawSums[dir];
        const otherDirs = seatOrder.filter(d => dirs.includes(d) && d !== dir);
        const othersList = otherDirs.map(other => rawSums[other]);
        const othersBreakdown = othersList.map(n => Math.round(n * 100) / 100).join(' - ');
        let othersSum = 0;
        othersList.forEach(v => { othersSum += v; });
        othersSum = Math.round(othersSum * 100) / 100;
        
        const netTigers = Math.round((ownTigers * 3 - othersSum) * 100) / 100;
        const finalMoney = scores[dir];
        const sign = finalMoney > 0 ? '+' : '';
        const ownTigersFormatted = Math.round(ownTigers * 100) / 100;
        
        // 用户指定精简计算过程公式: ((本人虎数*3 - 他人1 - 他人2 - 他人3) * 单位) = +/-金额 元
        const formula = `((${ownTigersFormatted}*3 - ${othersBreakdown}) * ${unitVal}) = ${sign}${finalMoney} 元`;

        return {
            dir,
            alias: (aliases[dir] && aliases[dir].trim()) ? aliases[dir].trim() : dir,
            tigers: ownTigers,
            othersList,
            othersBreakdown,
            othersSum,
            netTigers,
            money: finalMoney,
            formula
        };
    });

    return { details, scores, rawSums };
}

// 保持历史兼容别名
const calculateRoundDetails = calculateGameDetails;

/**
 * 根据单局结算明细生成当局排行榜 (1~4名)
 */
function calculateGameLeaderboard(details) {
    if (!details || !Array.isArray(details)) return [];
    const sorted = [...details].sort((a, b) => {
        if (b.money !== a.money) {
            return b.money - a.money;
        }
        return b.netTigers - a.netTigers;
    });
    const maxMoney = sorted.length > 0 ? sorted[0].money : 0;
    return sorted.map((p, idx) => ({
        ...p,
        rank: idx + 1,
        isWinner: (p.money === maxMoney && maxMoney > 0)
    }));
}

/**
 * 以【玩家别名 Alias】为全局唯一键统计全场总游戏排行榜！
 * 支持中途换座位、上下人替补场景，确保各人战绩精确归集，全场依然严格零和恒等。
 */
function calculateGrandTotal(games, dirs = ['东', '西', '南', '北'], defaultAliases = {}) {
    let summary = {}; // 以 aliasKey 为主键归集
    let settledGamesCount = 0;

    games.forEach(game => {
        // 支持 isEnded 或 isSaved 状态判定为已结算局
        if (!game.isEnded && !game.isSaved && !game.details) return;
        settledGamesCount++;

        let gameDetails = null;
        if (game.details && Array.isArray(game.details)) {
            gameDetails = game.details;
        } else {
            const handsInput = {};
            const gameAliases = {};
            dirs.forEach(d => {
                const p = game.players ? game.players[d] : null;
                handsInput[d] = p ? (p.tigers || p.hands || []) : [];
                gameAliases[d] = (p && p.alias && p.alias.trim()) ? p.alias.trim() : (defaultAliases[d] || d);
            });
            const res = calculateGameDetails(handsInput, game.unit || 0.5, dirs, gameAliases);
            gameDetails = res.details;
        }

        gameDetails.forEach(item => {
            const rawAlias = item.alias ? item.alias.trim() : '';
            const aliasKey = rawAlias || `${item.dir}位玩家`;

            if (!summary[aliasKey]) {
                summary[aliasKey] = {
                    alias: aliasKey,
                    dirsPlayed: [],
                    totalRawTigers: 0,
                    totalNetTigers: 0,
                    totalMoney: 0,
                    gamesPlayed: 0,
                    gamesWon: 0,
                    roundsPlayed: 0, // 兼容字段
                    roundsWon: 0     // 兼容字段
                };
            }

            const p = summary[aliasKey];
            p.gamesPlayed++;
            p.roundsPlayed++;
            if (!p.dirsPlayed.includes(item.dir)) {
                p.dirsPlayed.push(item.dir);
            }
            p.totalRawTigers += item.tigers;
            p.totalNetTigers += item.netTigers;
            p.totalMoney = Math.round((p.totalMoney + item.money) * 100) / 100;
            if (item.money > 0) {
                p.gamesWon++;
                p.roundsWon++;
            }
        });
    });

    const allPlayers = Object.values(summary);

    // 按金额排行
    const byMoney = [...allPlayers].sort((a, b) => b.totalMoney - a.totalMoney);
    const maxMoney = byMoney.length > 0 ? byMoney[0].totalMoney : 0;
    byMoney.forEach((p, idx) => {
        p.rankMoney = idx + 1;
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
    byTigers.forEach((p, idx) => {
        p.rankTigers = idx + 1;
        p.isBigWinnerTigers = (p.totalNetTigers === maxNetTigers && maxNetTigers > 0);
    });

    return {
        settledGamesCount,
        settledRoundsCount: settledGamesCount, // 兼容
        byMoney,
        byTigers,
        summary
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateScores,
        calculateGameDetails,
        calculateRoundDetails,
        calculateGameLeaderboard,
        calculateGrandTotal
    };
}
if (typeof window !== 'undefined') {
    window.ScoringEngine = {
        calculateScores,
        calculateGameDetails,
        calculateRoundDetails,
        calculateGameLeaderboard,
        calculateGrandTotal
    };
}
