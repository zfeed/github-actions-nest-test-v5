import { BaseEvent } from '../../../../../../../packages/domain';

const TYPE = 'MARKED_CELL_HIT' as const;

export class MarkedCellHitEvent extends BaseEvent<typeof TYPE> {
    public readonly playerId: string;

    public readonly cellPosition: number;

    public readonly matchId: string;

    static readonly type = TYPE;

    constructor(
        id: string,
        playerId: string,
        matchId: string,
        cellPosition: number
    ) {
        super(id, TYPE);

        this.playerId = playerId;
        this.matchId = matchId;
        this.cellPosition = cellPosition;
    }
}
