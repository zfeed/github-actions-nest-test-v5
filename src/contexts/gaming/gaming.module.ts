import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import { FieldModule } from './components/field';
import { MatchModule } from './components/match';

import { ServerSentEventsModule } from '../../packages/server-sent-events';

@Module({
    imports: [
        MikroOrmModule.forRoot(),
        EventEmitterModule.forRoot(),
        MatchModule,
        FieldModule
    ],
    providers: [ServerSentEventsModule]
})
export class GamingModule {}
