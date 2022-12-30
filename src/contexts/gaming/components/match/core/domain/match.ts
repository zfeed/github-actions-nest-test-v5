import { Player } from './player';
import { Entity, AggregateRoot } from '../../../../../../packages/domain';
import { Session } from './session';
import { MatchStartedEvent, MatchFinishedEvent } from './events';
import { MINUTES_TO_PLAY } from '../constants';

export class Match
    extends Entity<MatchStartedEvent | MatchFinishedEvent>
    implements AggregateRoot
{
    private constructor(
        id: Match['id'],
        private players: Player[],
        private session: Session | undefined,
        public readonly maxPlayers: number,
        private finishedAt: null | Date
    ) {
        super(id);
    }

    allPlayersJoined(): boolean {
        return this.players.length === this.maxPlayers;
    }

    isPlayerAlreadyJoined(player: Player): boolean {
        return this.players.some(({ id }) => id === player.id);
    }

    private start(now: Date, startEventId: string): void {
        this.session = Session.create(MINUTES_TO_PLAY, now);

        this.pushEvent(
            new MatchStartedEvent(
                startEventId,
                MINUTES_TO_PLAY,
                this.session.startedAt,
                this.id,
                this.players.map(({ id }) => id)
            )
        );
    }

    getMaxPlayers(): number {
        return this.maxPlayers;
    }

    // TODO: add this-based type guards
    isFinished() {
        return this.finishedAt !== null;
    }

    getFinishedAt() {
        return this.finishedAt;
    }

    getSession(): Readonly<Session | undefined> {
        return this.session;
    }

    getPlayers(): ReadonlyArray<Player> {
        return this.players;
    }

    increasePlayerScore(playerId: Player['id'], now: Date): void {
        const player = this.players.find(({ id }) => id === playerId);

        if (player === undefined) {
            throw Error('Player does not exist');
        }

        if (this.session === undefined) {
            throw Error('Match not started yet');
        }

        if (this.session.isOver(now)) {
            throw Error('Match is finished');
        }

        player.increaseScoreBy(1);
    }

    // TODO: add this-based type guards
    isMatchStarted() {
        return this.session !== undefined;
    }

    join(player: Player, now: Date, startEventId: string): void {
        if (this.isMatchStarted()) {
            throw new Error('Match already started');
        }

        if (this.allPlayersJoined()) {
            throw new Error('Max number of players reached');
        }

        if (this.isPlayerAlreadyJoined(player)) {
            throw new Error('Player already joined');
        }

        if (player.getScore() !== 0) {
            throw new Error('Player must have 0 score');
        }

        this.players.push(player);

        if (this.allPlayersJoined()) {
            this.start(now, startEventId);
        }
    }

    finish(now: Date, finishEventId: string) {
        if (this.isMatchStarted() === false) {
            throw new Error('Match not started yet');
        }

        if (this.session?.isOver(now) === false) {
            throw new Error('Match is not over yet');
        }

        if (this.isFinished() === true) {
            throw new Error('Match is finished already');
        }

        this.finishedAt = now;

        this.pushEvent(
            new MatchFinishedEvent(
                finishEventId,
                MINUTES_TO_PLAY,
                this.session!.startedAt,
                this.id,
                this.players.map((player) => ({
                    id: player.id,
                    score: player.getScore()
                })),
                this.finishedAt
            )
        );
    }

    static create(
        matchId: Match['id'],
        player: Player,
        maxPlayers: number
    ): Match {
        if (player.getScore() !== 0) {
            throw new Error('Player must have 0 score');
        }

        return new Match(matchId, [player], undefined, maxPlayers, null);
    }
}
