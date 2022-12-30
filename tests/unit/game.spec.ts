import { randomUUID } from 'node:crypto';
import * as dayjs from 'dayjs';

import {
    Match,
    Player,
    Session
} from '../../src/contexts/gaming/components/match/core/domain';
import {
    MatchStartedEvent,
    MatchFinishedEvent
} from '../../src/contexts/gaming/components/match/core/domain/events';
import { MINUTES_TO_PLAY } from '../../src/contexts/gaming/components/match/core/constants';

describe('Match', () => {
    test('Match is created', () => {
        const match = Match.create('1', Player.create('1', 'playerName'), 2);

        expect(match.getSession()).toBe(undefined);
        expect(match.getPlayers()).toEqual([Player.create('1', 'playerName')]);
        expect(match.id).toBe('1');
        expect(match.getMaxPlayers()).toBe(2);
    });

    test('Player joined a match the second time', () => {
        const match = Match.create('1', Player.create('1', 'Mike'), 2);

        expect(() =>
            match.join(Player.create('1', 'Mike'), new Date(), randomUUID())
        ).toThrow();
    });

    test('All players joined', () => {
        const eventId = randomUUID();
        const now = new Date();
        const match = Match.create('match123', Player.create('1', 'John'), 2);

        match.join(Player.create('2', 'Mike'), now, eventId);

        expect(match.getSession()).toEqual(Session.create(1, now));
        expect(match.getPlayers()).toEqual([
            Player.create('1', 'John'),
            Player.create('2', 'Mike')
        ]);
        expect(match.events).toEqual([
            new MatchStartedEvent(eventId, 1, now, 'match123', ['1', '2'])
        ]);
    });

    test('Max number of players reached', () => {
        const now = new Date();
        const match = Match.create('match123', Player.create('1', 'John'), 2);

        match.join(Player.create('2', 'Mike'), now, randomUUID());

        expect(() =>
            match.join(Player.create('3', 'Jeff'), now, randomUUID())
        ).toThrow();
    });

    test('Player score is increased by 1', () => {
        const match = Match.create('match123', Player.create('1', 'John'), 2);
        match.join(Player.create('2', 'Mike'), new Date(), randomUUID());

        match.increasePlayerScore('1', new Date());

        const player = match
            .getPlayers()
            .find(({ id }) => id === '1') as Player;
        expect(player.getScore()).toBe(1);
    });

    test('Player score is not increased when match is finished', () => {
        const match = Match.create('1', Player.create('1', 'John'), 2);
        match.join(Player.create('2', 'Mike'), new Date(), randomUUID());

        expect(() =>
            match.increasePlayerScore('1', dayjs().add(11, 'minute').toDate())
        ).toThrow();
    });

    test('Player score is not increased when match is not started yet', () => {
        const match = Match.create('1', Player.create('1', 'John'), 2);

        expect(() => match.increasePlayerScore('1', new Date())).toThrow();
    });

    test('Player score is not increased when player has not joined', () => {
        const match = Match.create('1', Player.create('1', 'John'), 2);
        match.join(Player.create('2', 'Mike'), new Date(), randomUUID());

        expect(() => match.increasePlayerScore('3', new Date())).toThrow();
    });

    test('Player can not joined when match is already started', () => {
        const match = Match.create('1', Player.create('1', 'John'), 2);

        match.join(Player.create('2', 'Mike'), new Date(), randomUUID());

        expect(() =>
            match.join(Player.create('3', 'Mike'), new Date(), randomUUID())
        ).toThrow();
    });

    test("Match can't be finished if it's not started yet", () => {
        const match = Match.create('1', Player.create('1', 'John'), 2);

        expect(match.getSession()).toBe(undefined);
        expect(() => match.finish(new Date(), randomUUID())).toThrow();
    });

    test("Match can't be finished if it's started but not over yet", () => {
        const match = Match.create('1', Player.create('1', 'John'), 2);

        match.join(Player.create('2', 'Mike'), new Date(), randomUUID());

        expect(match.getSession()).toBeTruthy();
        expect(match.getSession()!.isOver(new Date())).toBeFalse();
        expect(() => match.finish(new Date(), randomUUID())).toThrow();
    });

    test('Match can be finished only one time', async () => {
        const match = Match.create('1', Player.create('1', 'John'), 2);
        const past = dayjs().subtract(MINUTES_TO_PLAY, 'minutes').toDate();

        match.join(Player.create('2', 'Mike'), past, randomUUID());
        match.finish(new Date(), randomUUID());

        expect(() => match.finish(new Date(), randomUUID())).toThrow();
    });

    test('Match finishes correctly', async () => {
        const MatchStartedEventId = randomUUID();
        const MatchFinishedEventId = randomUUID();
        const match = Match.create('1', Player.create('1', 'John'), 2);
        const past = dayjs().subtract(MINUTES_TO_PLAY, 'minutes').toDate();
        const now = new Date();

        match.join(Player.create('2', 'Mike'), past, MatchStartedEventId);
        match.finish(now, MatchFinishedEventId);

        expect(match.getFinishedAt()).toBe(now);
        expect(match.isFinished()).toBeTrue();
        expect(match.events).toEqual([
            new MatchStartedEvent(
                MatchStartedEventId,
                MINUTES_TO_PLAY,
                past,
                '1',
                ['1', '2']
            ),
            new MatchFinishedEvent(
                MatchFinishedEventId,
                MINUTES_TO_PLAY,
                past,
                '1',
                [
                    { id: '1', score: 0 },
                    { id: '2', score: 0 }
                ],
                now
            )
        ]);
    });
});
