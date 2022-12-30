import { EntitySchema, types } from '@mikro-orm/core';
import { Field } from '../../core/domain';
import { IEntity } from '../../../../../../packages/domain/entity.schema';

interface IField {
    matchId: Field['matchId'];
    size: number;
    markedCellPosition: Field['markedCellPosition'];
    playerIds: Field['playerIds'];
    createdAt: Field['createdAt'];
    finishedAt: Field['finishedAt'];
    version: number;
}

export const fieldSchema = new EntitySchema<IField, IEntity>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class: Field,
    extends: 'Entity',
    properties: {
        matchId: { type: types.uuid },
        size: { type: types.smallint, unsigned: true },
        markedCellPosition: { type: types.smallint, unsigned: true },
        playerIds: { type: types.array },
        version: { type: 'number', version: true },
        finishedAt: { type: types.datetime, nullable: true },
        createdAt: { type: types.datetime, nullable: true }
    }
});
