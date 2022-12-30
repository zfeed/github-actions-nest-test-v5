import { EntitySchema, types } from '@mikro-orm/core';
import { Event } from './event';

export const eventSchema = new EntitySchema({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class: Event,
    properties: {
        id: { type: types.uuid, nullable: false, primary: true },
        type: { type: types.text, nullable: false },
        json: { type: types.text, nullable: false },
        acknowledgedAt: { type: types.datetime, nullable: true },
        createdAt: { type: types.datetime }
    }
});
