import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../../domain';
import { PlayerDTO } from './player.dto';
import { SessionDTO } from './session.dto';
import { MAX_PLAYERS } from '../../constants';

export class MatchDTO {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty({ default: MAX_PLAYERS })
    public readonly maxPlayers: number;

    @ApiProperty({ type: [PlayerDTO] })
    public readonly players: ReadonlyArray<PlayerDTO>;

    @ApiProperty({
        type: SessionDTO,
        nullable: true,
        description:
            "It's populated when all player goined the match and it started"
    })
    public readonly session: undefined | SessionDTO;

    @ApiProperty()
    public readonly finishedAt: string | null;

    private constructor(
        id: string,
        maxPlayers: number,
        players: ReadonlyArray<PlayerDTO>,
        session: undefined | SessionDTO,
        finishedAt: string | null
    ) {
        this.id = id;
        this.maxPlayers = maxPlayers;
        this.players = players;
        this.session = session;
        this.finishedAt = finishedAt;
    }

    static create(match: Match) {
        const session = match.getSession();
        const finishedAt = match.getFinishedAt();

        return new this(
            match.id,
            match.maxPlayers,
            match.getPlayers().map((player) => PlayerDTO.create(player)),
            session ? SessionDTO.create(session) : undefined,
            finishedAt ? finishedAt.toISOString() : finishedAt
        );
    }
}
