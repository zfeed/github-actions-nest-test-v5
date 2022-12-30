import { ApiProperty } from '@nestjs/swagger';
import { Field } from '../../../domain/field';

export class FieldDTO {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty({ type: ['string'] })
    playerIds: ReadonlyArray<string>;

    @ApiProperty()
    public readonly matchId: string;

    @ApiProperty()
    public readonly markedCellPosition: number;

    @ApiProperty()
    public readonly size: number;

    @ApiProperty()
    readonly createdAt: string;

    @ApiProperty()
    readonly finishedAt: string | null;

    private constructor(
        id: string,
        playerIds: ReadonlyArray<string>,
        matchId: string,
        markedCellPosition: number,
        size: number,
        createdAt: string,
        finishedAt: string | null
    ) {
        this.id = id;
        this.playerIds = playerIds;
        this.matchId = matchId;
        this.markedCellPosition = markedCellPosition;
        this.size = size;
        this.createdAt = createdAt;
        this.finishedAt = finishedAt;
    }

    static create(field: Field) {
        const finishedAt = field.getFinishedAt();

        return new this(
            field.id,
            [...field.getPlayerIds()],
            field.getMatchId(),
            field.getMarkedCellPosition(),
            field.getSize(),
            field.getCreatedAt().toISOString(),
            finishedAt ? finishedAt.toISOString() : finishedAt
        );
    }
}
