import { BaseEvent } from '../../../../../../../packages/domain';

const TYPE = 'FIELD_MARKED_CELL_POSITION_CHANGED' as const;

export class FieldMarkedCellPositionChangedEvent extends BaseEvent<
    typeof TYPE
> {
    static readonly type = TYPE;

    public readonly newMarkedCellPosition: number;

    public readonly matchId: string;

    public readonly fieldId: string;

    constructor(
        id: string,
        newMarkedCellPosition: number,
        matchId: string,
        fieldId: string
    ) {
        super(id, TYPE);
        this.newMarkedCellPosition = newMarkedCellPosition;
        this.matchId = matchId;
        this.fieldId = fieldId;
    }
}
