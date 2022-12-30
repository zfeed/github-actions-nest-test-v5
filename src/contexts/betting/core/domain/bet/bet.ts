import { Entity, AggregateRoot } from '../../../../../packages/domain';
import { Status } from './status';
import { BetFinishedEvent } from './bet-finished.event';

export class Bet extends Entity<BetFinishedEvent> implements AggregateRoot {
    protected constructor(
        id: string,
        public readonly matchId: string,
        public readonly amount: number,
        public playerIds: ReadonlyArray<string>,
        private winnerPlayerId: string | null,
        private status: Status
    ) {
        super(id);
    }

    getStatus() {
        return this.status;
    }

    getWinnerPlayerId() {
        return this.winnerPlayerId;
    }

    finishBet(winnerPlayerId: string) {
        if (this.status.isFinished()) {
            throw new Error('Bet is finished laready');
        }

        this.winnerPlayerId = winnerPlayerId;
        this.status = Status.create(Status.code.FINISHED);

        this.pushEvent(
            new BetFinishedEvent(
                this.id,
                this.matchId,
                this.amount,
                this.playerIds,
                winnerPlayerId
            )
        );
    }

    public static create(
        id: string,
        matchId: string,
        amount: number,
        playerIds: string[]
    ): Bet {
        const status = Status.create(Status.code.ACTIVE);

        return new Bet(id, matchId, amount, playerIds, null, status);
    }
}
