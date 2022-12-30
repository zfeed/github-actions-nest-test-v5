export class Event {
    private constructor(
        readonly id: string,
        readonly json: string,
        readonly type: string,
        readonly acknowledgedAt: Date | null,
        readonly createdAt: Date
    ) {}

    public static create(
        id: string,
        json: string,
        type: string,
        acknowledgedAt: Date | null,
        createdAt: Date
    ) {
        return new Event(id, json, type, acknowledgedAt, createdAt);
    }
}
