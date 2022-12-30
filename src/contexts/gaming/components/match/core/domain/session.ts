import * as dayjs from 'dayjs';

export class Session {
    readonly startedAt: Date;

    readonly minutesToPlay: number;

    private constructor(minutesToPlay: number, startedAt: Date) {
        this.minutesToPlay = minutesToPlay;
        this.startedAt = startedAt;
    }

    isOver(now: Date) {
        return dayjs(now).diff(this.startedAt, 'minute') >= this.minutesToPlay;
    }

    static create(minutesToPlay: number, startedAt: Date): Session {
        if (minutesToPlay <= 0) {
            throw new Error('Minutes to play must be >= 0');
        }

        return new Session(minutesToPlay, startedAt);
    }
}
