import { IsString, IsInt } from 'class-validator';

export class MarkedCellHitDTO {
    @IsString()
    readonly id!: string;

    @IsString()
    readonly playerId!: string;

    @IsString()
    readonly matchId!: string;

    @IsInt()
    readonly cellPosition!: number;
}
