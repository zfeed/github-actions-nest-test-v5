import { randomUUID } from 'node:crypto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Field } from '../domain/field';
import { MatchStartedEvent } from '../../../match/core/domain/events';
import { FIELD_SIZE } from '../constants';
import { BaseEventHandler } from '../../../../../../packages/domain';
import { IdempotencyKey } from '../../../../../../packages/idempotency-key';

@Injectable()
export class MatchStartedEventHandler extends BaseEventHandler {
    constructor(private em: EntityManager) {
        super();
    }

    async handle(event: MatchStartedEvent) {
        await this.tryToHandle(this.handleEvent.bind(this), event);
    }

    private async handleEvent(event: MatchStartedEvent): Promise<void> {
        const em = this.em.fork();

        const field = Field.create(
            randomUUID(),
            event.playersId,
            event.matchId,
            FIELD_SIZE,
            new Date()
        );

        const fieldRepository = em.getRepository(Field);
        const idempotencyKeyRepository = em.getRepository(IdempotencyKey);

        const idempotencyKey = IdempotencyKey.create(
            randomUUID(),
            event.id,
            `field_${event.type}`,
            new Date()
        );

        idempotencyKeyRepository.persist(idempotencyKey);
        fieldRepository.persist(field);

        await em.flush();
    }
}
