export class Event<T extends string> {
    constructor(public readonly id: string, public readonly type: T) {}

    // we use custom toString method to help Nest.js's kafka serializer
    // https://github.com/nestjs/nest/blob/bf27750620859d5882f1150aae23bbb6a4e6fe18/packages/microservices/serializers/kafka-request.serializer.ts#L45
    toString() {
        return JSON.stringify(this);
    }
}
