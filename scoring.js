function calculateScores(tigers, unit, dirs = ['东', '西', '南', '北']) {
    let scores = {};
    dirs.forEach(dir => {
        let score = (tigers[dir] || 0) * 3;
        dirs.forEach(otherDir => {
            if (dir !== otherDir) {
                score -= (tigers[otherDir] || 0);
            }
        });
        scores[dir] = score * unit;
    });
    return scores;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateScores };
}
