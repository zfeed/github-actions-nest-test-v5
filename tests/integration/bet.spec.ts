import { randomUUID } from 'node:crypto';
import { MikroORM } from '@mikro-orm/core';
import { TestingModule } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/postgresql';
import {
    MatchFinishedEventHandler,
    MatchStartedEventHandler
} from '../../src/contexts/betting/core/handlers';
import { Bet, Status } from '../../src/contexts/betting/core/domain/bet';
import {
    MatchStartedEvent,
    MatchFinishedEvent
} from '../../src/contexts/gaming/components/match/core/domain/events';
import * as database from '../database';
import { EventAcknowledger } from '../../src/packages/local-event-storage';

let moduleRef: TestingModule;

beforeAll(async () => {
    moduleRef = await database.createTestingModule(
        MatchStartedEventHandler,
        MatchFinishedEventHandler,
        EventAcknowledger
    );
});

afterAll(async () => {
    const mikroorm = await moduleRef.resolve(MikroORM);
    await mikroorm.close();
});

beforeEach(async () => database.initialize());

describe('Bet', () => {
    test('Bet is created', async () => {
        const matchStartedEventHandler = await moduleRef.resolve(
            MatchStartedEventHandler
        );

        const matchId = randomUUID();
        const player1Id = randomUUID();
        const player2Id = randomUUID();

        await matchStartedEventHandler.handle(
            new MatchStartedEvent(randomUUID(), 1, new Date(), matchId, [
                player1Id,
                player2Id
            ])
        );

        const em = await moduleRef.resolve(EntityManager);
        const betRepository = em.getRepository(Bet);

        // assert database state
        const bets = await betRepository.findAll();
        expect(bets[0]!.id).toStrictEqual(expect.any(String));
        expect(bets[0]!.matchId).toBe(matchId);
        expect(bets[0]!.getWinnerPlayerId()).toBe(null);
        expect(bets[0]!.amount).toStrictEqual(0);
        expect(bets[0]!.getStatus()).toEqual(Status.create(Status.code.ACTIVE));
        expect(bets[0]!.playerIds).toEqual([player1Id, player2Id]);
    });

    test('Bet is finished', async () => {
        const matchStartedEventHandler = await moduleRef.resolve(
            MatchStartedEventHandler
        );
        const matchFinishedEventHandler = await moduleRef.resolve(
            MatchFinishedEventHandler
        );

        const matchId = randomUUID();
        const player1Id = randomUUID();
        const player2Id = randomUUID();

        await matchStartedEventHandler.handle(
            new MatchStartedEvent(randomUUID(), 1, new Date(), matchId, [
                player1Id,
                player2Id
            ])
        );

        await matchFinishedEventHandler.handle(
            new MatchFinishedEvent(
                randomUUID(),
                2,
                new Date(),
                matchId,
                [
                    {
                        id: player1Id,
                        score: 0
                    },
                    {
                        id: player2Id,
                        score: 0
                    }
                ],
                new Date()
            )
        );

        const em = await moduleRef.resolve(EntityManager);
        const betRepository = em.getRepository(Bet);

        // assert database state
        const bets = await betRepository.findAll();
        expect(bets[0]!.id).toStrictEqual(expect.any(String));
        expect(bets[0]!.matchId).toBe(matchId);
        expect(bets[0]!.getWinnerPlayerId()).toBeOneOf([player1Id, player2Id]);
        expect(bets[0]!.getStatus()).toEqual(
            Status.create(Status.code.FINISHED)
        );
        expect(bets[0]!.playerIds).toEqual([player1Id, player2Id]);
    });
});
