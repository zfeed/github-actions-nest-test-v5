import { Event } from '../../../../../../../packages/domain/event';

const TYPE = 'MATCH_STARTED' as const;

export class MatchStartedEvent extends Event<typeof TYPE> {
    static readonly type = TYPE;

    public readonly startedAt: Date;

    public readonly minutesToPlay: number;

    public readonly matchId: string;

    public readonly playersId: string[];

    constructor(
        id: string,
        minutesToPlay: number,
        startedAt: Date,
        matchId: string,
        playersId: string[]
    ) {
        super(id, TYPE);
        this.minutesToPlay = minutesToPlay;
        this.startedAt = startedAt;
        this.matchId = matchId;
        this.playersId = playersId;
    }
}
