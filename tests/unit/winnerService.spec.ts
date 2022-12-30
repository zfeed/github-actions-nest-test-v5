import { WinnerService } from '../../src/contexts/betting/core/domain/services';

describe('WinnerService', () => {
    test('Winner is not detected when no players', () => {
        expect(() => WinnerService.findWinnerAmongPlayers([])).toThrow();
    });

    test('Winner is found', () => {
        const winner = WinnerService.findWinnerAmongPlayers([
            {
                id: 'player-id-1',
                score: 0
            },
            {
                id: 'player-id-2',
                score: 43
            },
            {
                id: 'player-id-3',
                score: 24
            }
        ]);

        expect(winner).toEqual({
            id: 'player-id-2',
            score: 43
        });
    });
});
