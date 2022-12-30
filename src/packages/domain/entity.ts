export interface Event {
    id: string;
    type: string;
}

class Entity<E extends Event> {
    private _events: E[] = [];

    get events(): ReadonlyArray<E> {
        // eslint-disable-next-line no-underscore-dangle
        return this._events || [];
    }

    // eslint-disable-next-line no-useless-constructor
    protected constructor(readonly id: string) {}

    protected pushEvent(event: E) {
        // We use MikroORM. It doesn't creates instances by Object.create
        // so setting default value "_event = []" doesn't work
        // It's possible to pass forceCOnstructor: true, but it produces many more bugs
        // eslint-disable-next-line no-underscore-dangle
        if (this._events === undefined) {
            // eslint-disable-next-line no-underscore-dangle
            this._events = [];
        }

        // eslint-disable-next-line no-underscore-dangle
        this._events.push(event);
    }
}

export { Entity };
