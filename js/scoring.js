// 核心計分邏輯 — 瀏覽器與 Node.js（測試）皆可使用

function applyScoreChange(currentScore, delta) {
    const next = (currentScore || 0) + delta;
    return next < 0 ? 0 : next;
}

function buildLogEntry(params) {
    return {
        actor: params.actor,
        actionType: 'score_change',
        teamIndex: params.teamIndex,
        teamName: params.teamName,
        delta: params.delta,
        timestamp: params.timestamp !== undefined ? params.timestamp : { '.sv': 'timestamp' }
    };
}

// 修正版：teamName 由呼叫者從 DOM 讀取後傳入，不在這裡發額外網路請求
async function changeScoreAndLog(db, teamIndex, delta, teamName, actor, serverTimestamp) {
    const result = await db.ref('teams/' + teamIndex + '/score').transaction((current) => {
        return applyScoreChange(current, delta);
    });

    if (!result.committed) return null;

    const logEntry = buildLogEntry({
        actor,
        teamIndex,
        teamName,
        delta,
        timestamp: serverTimestamp !== undefined ? serverTimestamp : { '.sv': 'timestamp' }
    });

    await db.ref('logs').push(logEntry);
    return result;
}

if (typeof module !== 'undefined') {
    module.exports = { applyScoreChange, buildLogEntry, changeScoreAndLog };
}
