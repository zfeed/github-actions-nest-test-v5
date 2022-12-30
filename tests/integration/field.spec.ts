import { randomUUID } from 'node:crypto';
import { Observable } from 'rxjs';
import { MikroORM } from '@mikro-orm/core';
import { TestingModule } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/postgresql';
import { FieldService } from '../../src/contexts/gaming/components/field/core/services';
import { MatchStartedEventHandler } from '../../src/contexts/gaming/components/field/core/handlers';
import { MatchStartedEvent } from '../../src/contexts/gaming/components/match/core/domain/events';
import { Field } from '../../src/contexts/gaming/components/field/core/domain';
import { EventAcknowledger } from '../../src/packages/local-event-storage';
import * as database from '../database';
import { MESSAGE_BUS, Client } from '../../src/packages/message-bus';

let moduleRef: TestingModule;
let busEmitMock: jest.SpyInstance<Observable<unknown>>;

beforeAll(async () => {
    moduleRef = await database.createTestingModule(
        FieldService,
        MatchStartedEventHandler,
        EventAcknowledger
    );
});

afterAll(async () => {
    const mikroorm = await moduleRef.resolve(MikroORM);
    await mikroorm.close();
});

beforeEach(async () => {
    await database.initialize();

    const bus = await moduleRef.resolve<Client>(MESSAGE_BUS);

    if (busEmitMock) {
        busEmitMock.mockReset();
    }

    busEmitMock = jest
        .spyOn(bus, 'emit')
        .mockImplementation(() => new Observable(() => undefined));
});

describe('Field', () => {
    test('Field is created', async () => {
        const matchId = randomUUID();
        const player1Id = randomUUID();
        const player2Id = randomUUID();

        const matchStartedEventHandler = await moduleRef.resolve(
            MatchStartedEventHandler
        );

        await matchStartedEventHandler.handle(
            new MatchStartedEvent(randomUUID(), 1, new Date(), matchId, [
                player1Id,
                player2Id
            ])
        );

        const em = await moduleRef.resolve(EntityManager);
        const fieldRepository = em.getRepository(Field);

        // assert database state
        const fields = await fieldRepository.findAll();
        expect(fields).toHaveLength(1);
        expect(fields[0]!.getMatchId()).toEqual(matchId);
        expect(fields[0]!.id).toEqual(expect.any(String));
        expect(fields[0]!.getMarkedCellPosition()).toEqual(expect.any(Number));
        expect(fields[0]!.getPlayerIds()).toEqual([player1Id, player2Id]);
        expect(fields[0]!.getCreatedAt()).toEqual(expect.toBeDateString());
        expect(fields[0]!.getFinishedAt()).toEqual(null);
    });

    test('Field is hit', async () => {
        const matchId = randomUUID();
        const player1Id = randomUUID();
        const player2Id = randomUUID();

        const fieldService = await moduleRef.resolve(FieldService);
        const matchStartedEventHandler = await moduleRef.resolve(
            MatchStartedEventHandler
        );

        await matchStartedEventHandler.handle(
            new MatchStartedEvent(randomUUID(), 1, new Date(), matchId, [
                player1Id,
                player2Id
            ])
        );

        const em = await moduleRef.resolve(EntityManager);

        const fieldRepository = em.getRepository(Field);

        const field = (await fieldRepository.findAll())[0] as Field;

        const result = await fieldService.hit(
            field.id,
            field.getMarkedCellPosition(),
            player1Id
        );

        expect(busEmitMock.mock.calls.length).toBe(1);

        expect(result).toEqual({
            error: null,
            data: {
                field: {
                    id: field.id,
                    playerIds: [player1Id, player2Id],
                    matchId,
                    markedCellPosition: expect.any(Number),
                    size: expect.any(Number),
                    finishedAt: null,
                    createdAt: expect.toBeDateString()
                }
            }
        });
    });

    test("Field's marked cell position is changed", async () => {
        const matchId = randomUUID();
        const player1Id = randomUUID();
        const player2Id = randomUUID();

        const fieldService = await moduleRef.resolve(FieldService);
        const matchStartedEventHandler = await moduleRef.resolve(
            MatchStartedEventHandler
        );

        await matchStartedEventHandler.handle(
            new MatchStartedEvent(randomUUID(), 1, new Date(), matchId, [
                player1Id,
                player2Id
            ])
        );

        const em = await moduleRef.resolve(EntityManager);
        const fieldRepository = em.getRepository(Field);

        const field = (await fieldRepository.findAll())[0] as Field;

        await fieldService.changeMarkedCellPosition(field.id);

        const fields = await fieldRepository.findAll();

        expect(busEmitMock.mock.calls.length).toBe(1);
        expect(fields).toHaveLength(1);
        expect(fields[0]!.id).toEqual(expect.any(String));
        expect(fields[0]!.getMarkedCellPosition()).toEqual(expect.any(Number));
        expect(fields[0]!.getPlayerIds()).toEqual([player1Id, player2Id]);
        expect(fields[0]!.getCreatedAt()).toEqual(expect.toBeDateString());
        expect(fields[0]!.getFinishedAt()).toEqual(null);
    });
});
