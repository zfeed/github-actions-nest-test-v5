export class BetFinishedEvent {
    type = 'BET_FINISHED_EVENT';

    public readonly id: string;

    public readonly matchId: string;

    public readonly amount: number;

    public readonly playerIds: ReadonlyArray<string>;

    public readonly playerWinnerId: string;

    constructor(
        id: string,
        matchId: string,
        amount: number,
        playerIds: ReadonlyArray<string>,
        playerWinnerId: string
    ) {
        this.id = id;
        this.matchId = matchId;
        this.amount = amount;
        this.playerIds = playerIds;
        this.playerWinnerId = playerWinnerId;
    }
}
