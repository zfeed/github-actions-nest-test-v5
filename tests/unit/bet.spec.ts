import { Bet, Status } from '../../src/contexts/betting/core/domain/bet';

describe('Bet', () => {
    test('Bet is created', () => {
        const bet = Bet.create('bet-id-1', 'match-id-1', 10, [
            'player-id-1',
            'player-id-2',
            'player-id-3'
        ]);

        expect(bet.id).toBe('bet-id-1');
        expect(bet.matchId).toBe('match-id-1');
        expect(bet.getWinnerPlayerId()).toBe(null);
        expect(bet.amount).toBe(10);
        expect(bet.getStatus()).toEqual(Status.create(Status.code.ACTIVE));
        expect(bet.playerIds).toEqual([
            'player-id-1',
            'player-id-2',
            'player-id-3'
        ]);
    });

    test('Bet is finished', () => {
        const bet = Bet.create('bet-id-1', 'match-id-1', 10, [
            'player-id-1',
            'player-id-2',
            'player-id-3'
        ]);

        bet.finishBet('player-id-2');

        expect(bet.id).toBe('bet-id-1');
        expect(bet.matchId).toBe('match-id-1');
        expect(bet.getWinnerPlayerId()).toBe('player-id-2');
        expect(bet.amount).toBe(10);
        expect(bet.getStatus()).toEqual(Status.create(Status.code.FINISHED));
        expect(bet.playerIds).toEqual([
            'player-id-1',
            'player-id-2',
            'player-id-3'
        ]);
    });
});
