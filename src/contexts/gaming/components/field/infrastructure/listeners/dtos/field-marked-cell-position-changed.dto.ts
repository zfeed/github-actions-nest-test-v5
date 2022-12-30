import { IsString, IsInt } from 'class-validator';

export class FieldMarkedCellPositionChangedDTO {
    @IsString()
    readonly id!: string;

    @IsInt()
    readonly newMarkedCellPosition!: number;

    @IsString()
    readonly matchId!: string;

    @IsString()
    readonly fieldId!: string;
}
