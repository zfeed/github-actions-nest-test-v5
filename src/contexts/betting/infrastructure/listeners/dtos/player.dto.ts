import { IsString, IsInt } from 'class-validator';

export class PlayerDTO {
    @IsString()
    readonly id!: string;

    @IsInt()
    readonly score!: number;
}
