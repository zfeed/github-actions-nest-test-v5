import { Entity, AggregateRoot } from '../../../../../../packages/domain';
import {
    FieldMarkedCellPositionChangedEvent,
    MarkedCellHitEvent
} from './events';

export class Field
    extends Entity<MarkedCellHitEvent | FieldMarkedCellPositionChangedEvent>
    implements AggregateRoot
{
    protected constructor(
        id: Field['id'],
        private playerIds: string[],
        private matchId: string,
        private createdAt: Date,
        private finishedAt: Date | null,
        private markedCellPosition: number,
        private size: number
    ) {
        super(id);
    }

    private static getNextCellPosition(
        prevPosition: number,
        size: number
    ): number {
        const min = 0;
        const max = size - 1;

        for (;;) {
            const nextCellPosition = Math.floor(
                Math.random() * (max - min + 1) + min
            );

            if (nextCellPosition !== prevPosition) {
                return nextCellPosition;
            }
        }
    }

    getPlayerIds(): ReadonlyArray<string> {
        return this.playerIds;
    }

    getMatchId() {
        return this.matchId;
    }

    getFinishedAt() {
        return this.finishedAt;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    finish(now: Date) {
        if (this.finishedAt !== null) {
            throw new Error('Match is already finished');
        }

        this.finishedAt = now;
    }

    getSize() {
        return this.size;
    }

    getMarkedCellPosition() {
        return this.markedCellPosition;
    }

    playerExists(playerId: string) {
        return this.playerIds.includes(playerId);
    }

    hit(cellPosition: number, playerId: string, hitEventId: string) {
        if (this.playerExists(playerId) === false) {
            throw new Error('Player does not exits');
        }

        if (this.getFinishedAt()) {
            throw new Error('Match is finished');
        }

        const hit = this.markedCellPosition === cellPosition;

        if (hit) {
            this.markedCellPosition = Field.getNextCellPosition(
                cellPosition,
                this.size
            );

            this.pushEvent(
                new MarkedCellHitEvent(
                    hitEventId,
                    playerId,
                    this.matchId,
                    cellPosition
                )
            );
        }
    }

    changeMarkedCellPosition(positionChangedEventId: string): void {
        if (this.getFinishedAt()) {
            throw new Error('Match is finished');
        }

        this.markedCellPosition = Field.getNextCellPosition(
            this.markedCellPosition,
            this.size
        );

        this.pushEvent(
            new FieldMarkedCellPositionChangedEvent(
                positionChangedEventId,
                this.markedCellPosition,
                this.matchId,
                this.id
            )
        );
    }

    public static create(
        id: Field['id'],
        playerIds: string[],
        matchId: string,
        size: number,
        createdAt: Date
    ): Field {
        const markedCellPosition = Field.getNextCellPosition(-1, size);

        return new Field(
            id,
            playerIds,
            matchId,
            createdAt,
            null,
            markedCellPosition,
            size
        );
    }
}
