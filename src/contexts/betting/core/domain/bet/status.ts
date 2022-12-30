// eslint-disable-next-line no-shadow
export enum code {
    ACTIVE,
    FINISHED
}

export class Status {
    static readonly code = code;

    protected constructor(private readonly value: code) {}

    getValue() {
        return this.value;
    }

    isFinished() {
        return this.value === code.FINISHED;
    }

    public static create(value: code): Status {
        return new Status(value);
    }
}
