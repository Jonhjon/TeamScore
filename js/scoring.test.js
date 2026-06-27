const { applyScoreChange, buildLogEntry, changeScoreAndLog } = require('./scoring');

describe('applyScoreChange', () => {
    test('正常加分', () => {
        expect(applyScoreChange(10, 5)).toBe(15);
    });

    test('分數不足時扣分，結果夾到 0', () => {
        expect(applyScoreChange(5, -10)).toBe(0);
    });

    test('剛好扣到 0', () => {
        expect(applyScoreChange(10, -10)).toBe(0);
    });

    test('目前分數為 null 時視為 0', () => {
        expect(applyScoreChange(null, 10)).toBe(10);
    });

    test('目前分數為 undefined 時視為 0', () => {
        expect(applyScoreChange(undefined, 20)).toBe(20);
    });
});

describe('buildLogEntry', () => {
    test('產生正確的 log 結構', () => {
        const entry = buildLogEntry({
            actor: 'team0',
            teamIndex: 0,
            teamName: '紅隊',
            delta: 10,
        });
        expect(entry.actor).toBe('team0');
        expect(entry.actionType).toBe('score_change');
        expect(entry.teamIndex).toBe(0);
        expect(entry.teamName).toBe('紅隊');
        expect(entry.delta).toBe(10);
    });

    test('admin log 結構正確', () => {
        const entry = buildLogEntry({ actor: 'admin', teamIndex: 2, teamName: '綠隊', delta: -20 });
        expect(entry.actor).toBe('admin');
        expect(entry.delta).toBe(-20);
    });
});

describe('changeScoreAndLog', () => {
    let mockPush;
    let mockTransaction;
    let mockDb;

    beforeEach(() => {
        mockPush = jest.fn().mockResolvedValue({});
        mockTransaction = jest.fn().mockResolvedValue({ committed: true });

        mockDb = {
            ref: jest.fn().mockImplementation((path) => {
                if (path.endsWith('/score')) return { transaction: mockTransaction };
                if (path === 'logs') return { push: mockPush };
                return {};
            }),
        };
    });

    test('transaction 成功後寫入 log', async () => {
        await changeScoreAndLog(mockDb, 0, 10, '紅隊', 'team0');
        expect(mockPush).toHaveBeenCalledWith(
            expect.objectContaining({
                actor: 'team0',
                actionType: 'score_change',
                teamIndex: 0,
                teamName: '紅隊',
                delta: 10,
            })
        );
    });

    test('transaction 未 commit 時不寫入 log', async () => {
        mockTransaction.mockResolvedValue({ committed: false });
        const result = await changeScoreAndLog(mockDb, 0, 10, '紅隊', 'team0');
        expect(mockPush).not.toHaveBeenCalled();
        expect(result).toBeNull();
    });

    test('teamName 由呼叫者提供，不需額外網路請求', async () => {
        // 驗證：整個流程中 db.ref 只被呼叫兩次（score + logs），不會有第三次呼叫去讀隊名
        await changeScoreAndLog(mockDb, 1, 20, '藍隊', 'team1');
        const paths = mockDb.ref.mock.calls.map(([p]) => p);
        expect(paths).toEqual(['teams/1/score', 'logs']);
        expect(paths.length).toBe(2); // 絕對沒有第三次呼叫
    });

    test('transaction 拋出錯誤時，Promise reject 並向上傳遞', async () => {
        mockTransaction.mockRejectedValue(new Error('network error'));
        await expect(changeScoreAndLog(mockDb, 0, 10, '紅隊', 'team0')).rejects.toThrow('network error');
        expect(mockPush).not.toHaveBeenCalled();
    });
});
