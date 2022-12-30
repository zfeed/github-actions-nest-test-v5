import { randomUUID } from 'node:crypto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Match } from '../domain/match';
import { MarkedCellHitEvent } from '../../../field/core/domain/events';
import { BaseEventHandler } from '../../../../../../packages/domain';
import { IdempotencyKey } from '../../../../../../packages/idempotency-key';

@Injectable()
export class MarkedCellHitEventHandler extends BaseEventHandler {
    constructor(private em: EntityManager) {
        super();
    }

    async handle(event: MarkedCellHitEvent) {
        await this.tryToHandle(this.handleEvent.bind(this), event);
    }

    async handleEvent(event: MarkedCellHitEvent): Promise<void> {
        const em = this.em.fork();

        const matchRepository = em.getRepository(Match);
        const idempotencyKeyRepository = em.getRepository(IdempotencyKey);

        const match = await matchRepository.findOne(event.matchId);

        if (!match) {
            throw new Error('Match does not exist');
        }

        match.increasePlayerScore(event.playerId, new Date());

        const idempotencyKey = IdempotencyKey.create(
            randomUUID(),
            event.id,
            `match_${event.type}`,
            new Date()
        );

        idempotencyKeyRepository.persist(idempotencyKey);

        await em.flush();
    }
}
