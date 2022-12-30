import { IsString, IsInt, IsDateString, ValidateNested } from 'class-validator';
import { PlayerDTO } from './player.dto';

export class MatchFinishedDTO {
    @IsString()
    readonly id!: string;

    @IsDateString()
    readonly startedAt!: string;

    @IsDateString()
    readonly finishedAt!: string;

    @IsInt()
    readonly minutesToPlay!: number;

    @IsString()
    readonly matchId!: string;

    @ValidateNested({ each: true })
    readonly players!: PlayerDTO[];
}
