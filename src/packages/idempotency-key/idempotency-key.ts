export class IdempotencyKey {
    private constructor(
        readonly id: string,
        readonly key: string,
        readonly type: string,
        readonly createdAt: Date
    ) {}

    public static create(
        id: string,
        key: string,
        type: string,
        createdAt: Date
    ) {
        return new IdempotencyKey(id, key, type, createdAt);
    }
}
