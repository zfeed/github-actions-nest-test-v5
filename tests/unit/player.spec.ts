import { Player } from '../../src/contexts/gaming/components/match/core/domain';

describe('Player', () => {
    test('Player is created', () => {
        const player = Player.create('1', 'John');

        expect(player.id).toBe('1');
        expect(player.name).toBe('John');
    });

    test('Player is created with empty name', () => {
        expect(() => Player.create('1', '')).toThrow();
    });
});
