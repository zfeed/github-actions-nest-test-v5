import { EntitySchema, types } from '@mikro-orm/core';
import { Bet } from '../../core/domain/bet';
import { IEntity } from '../../../../packages/domain/entity.schema';

interface IBet {
    id: Bet['id'];
    matchId: Bet['matchId'];
    amount: Bet['amount'];
    playerIds: Bet['playerIds'];
    winnerPlayerId: Bet['winnerPlayerId'];
    status: Bet['status'];
    version: number;
}

export const betSchema = new EntitySchema<IBet, IEntity>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class: Bet,
    extends: 'Entity',
    properties: {
        version: { type: 'number', version: true },
        playerIds: { type: types.array },
        winnerPlayerId: { type: types.uuid, nullable: true },
        amount: { type: types.smallint },
        matchId: { type: types.uuid },
        status: {
            reference: 'embedded',
            entity: 'Status'
        }
    }
});
