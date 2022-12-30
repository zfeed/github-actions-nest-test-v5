import { EntitySchema, types } from '@mikro-orm/core';
import { Status } from '../../core/domain/bet';

export const statusSchema = new EntitySchema<Status>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class: Status,
    embeddable: true,
    properties: {
        value: { type: types.smallint }
    }
});
