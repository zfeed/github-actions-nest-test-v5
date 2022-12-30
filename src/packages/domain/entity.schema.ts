import { EntitySchema, types } from '@mikro-orm/core';
import { Entity } from '.';

export interface IEntity {
    id: Entity<never>['id'];
}

export const entitySchema = new EntitySchema<IEntity>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class: Entity,
    abstract: true,
    properties: {
        id: { type: types.uuid, primary: true }
    }
});
