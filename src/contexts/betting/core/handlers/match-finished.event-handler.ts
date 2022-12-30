import { randomUUID } from 'node:crypto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Bet } from '../domain/bet';
import { WinnerService } from '../domain/services';
import { MatchFinishedEvent } from '../../../gaming';
import { BaseEventHandler } from '../../../../packages/domain';
import { IdempotencyKey } from '../../../../packages/idempotency-key';

@Injectable()
export class MatchFinishedEventHandler extends BaseEventHandler {
    constructor(private em: EntityManager) {
        super();
    }

    async handle(event: MatchFinishedEvent) {
        await this.tryToHandle(this.handleEvent.bind(this), event);
    }

    async handleEvent(event: MatchFinishedEvent): Promise<void> {
        const em = this.em.fork();

        const betRepository = em.getRepository(Bet);
        const idempotencyKeyRepository = em.getRepository(IdempotencyKey);

        const bet = await betRepository.findOne({ matchId: event.matchId });

        if (!bet) {
            throw new Error("Bet doesn't exist");
        }

        const winner = WinnerService.findWinnerAmongPlayers(event.players);

        bet.finishBet(winner.id);

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
