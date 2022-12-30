import { IsString, IsInt, IsDateString } from 'class-validator';

export class MatchStartedDTO {
    @IsString()
    readonly id!: string;

    @IsDateString()
    readonly startedAt!: string;

    @IsInt()
    readonly minutesToPlay!: number;

    @IsString()
    readonly matchId!: string;

    @IsString({ each: true })
    readonly playersId!: string[];
}
