import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import {
    MatchStartedEventListener,
    MatchFinishedEventListener
} from './infrastructure/listeners';

import {
    MatchFinishedEventHandler,
    MatchStartedEventHandler
} from './core/handlers';

@Module({
    imports: [MikroOrmModule.forRoot(), EventEmitterModule.forRoot()],
    controllers: [MatchFinishedEventListener, MatchStartedEventListener],
    providers: [MatchStartedEventHandler, MatchFinishedEventHandler]
})
export class BettingModule {}
