import { ApiProperty } from '@nestjs/swagger';
import { Player } from '../../domain';

export class PlayerDTO {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    public readonly score: number;

    private constructor(id: string, name: string, score: number) {
        this.id = id;
        this.name = name;
        this.score = score;
    }

    static create(player: Player) {
        return new this(player.id, player.name, player.getScore());
    }
}
