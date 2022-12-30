import { Options } from '@mikro-orm/core';
import * as betting from '../contexts/betting/infrastructure/database-schemas';
import * as gamingField from '../contexts/gaming/components/field/infrastructure/database-schemas';
import * as gamingMatch from '../contexts/gaming/components/match/infrastructure/database-schemas';
import { entitySchema } from '../packages/domain/entity.schema';
import { eventSchema } from '../packages/local-event-storage';
import { idempotencyKeySchema } from '../packages/idempotency-key';

const options: Options = {
    type: 'postgresql',
    debug: process.env.NODE_ENV === 'development',
    dbName: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    password: process.env.POSTGRES_PASSWORD,
    entities: [
        entitySchema,
        gamingField.fieldSchema,
        gamingMatch.matchSchema,
        gamingMatch.playerSchema,
        gamingMatch.sessionSchema,
        betting.betSchema,
        betting.statusSchema,
        eventSchema,
        idempotencyKeySchema
    ]
};

// eslint-disable-next-line import/no-default-export
export default options;
