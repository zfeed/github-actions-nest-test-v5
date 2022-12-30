const TYPE = 'MATCH_FINISHED' as const;

export class MatchFinishedEvent {
    public readonly id: string;

    static readonly type = TYPE;

    public readonly type = TYPE;

    public readonly startedAt: Date;

    public readonly finishedAt: Date;

    public readonly minutesToPlay: number;

    public readonly matchId: string;

    public readonly players: { id: string; score: number }[];

    constructor(
        id: string,
        minutesToPlay: number,
        startedAt: Date,
        matchId: string,
        players: { id: string; score: number }[],
        finishedAt: Date
    ) {
        this.id = id;
        this.minutesToPlay = minutesToPlay;
        this.startedAt = startedAt;
        this.finishedAt = finishedAt;
        this.matchId = matchId;
        this.players = players;
    }
}
