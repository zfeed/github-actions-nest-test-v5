import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Bet } from '../domain/bet';
import { MatchStartedEvent } from '../../../gaming';
import { BaseEventHandler } from '../../../../packages/domain';
import { IdempotencyKey } from '../../../../packages/idempotency-key';

@Injectable()
export class MatchStartedEventHandler extends BaseEventHandler {
    constructor(private em: EntityManager) {
        super();
    }

    async handle(event: MatchStartedEvent) {
        await this.tryToHandle(this.handleEvent.bind(this), event);
    }

    async handleEvent(event: MatchStartedEvent) {
        const em = this.em.fork();

        const betRepository = em.getRepository(Bet);
        const idempotencyKeyRepository = em.getRepository(IdempotencyKey);

        const bet = Bet.create(randomUUID(), event.matchId, 0, event.playersId);

        const idempotencyKey = IdempotencyKey.create(
            randomUUID(),
            event.id,
            `betting_${event.type}`,
            new Date()
        );

        idempotencyKeyRepository.persist(idempotencyKey);
        betRepository.persist(bet);

        await em.flush();
    }
}
