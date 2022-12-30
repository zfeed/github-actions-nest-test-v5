import { EntitySchema, types } from '@mikro-orm/core';
import { IdempotencyKey } from './idempotency-key';

export const UNIQUE_CONSTRAINT_NAME = 'idempotency_key_event_unique';

export const idempotencyKeySchema = new EntitySchema({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class: IdempotencyKey,
    uniques: [
        {
            name: UNIQUE_CONSTRAINT_NAME,
            properties: ['key', 'type']
        }
    ],
    properties: {
        id: { type: types.uuid, nullable: false, primary: true },
        key: { type: types.uuid, nullable: false },
        type: { type: types.text, nullable: false },
        createdAt: { type: types.datetime }
    }
});
