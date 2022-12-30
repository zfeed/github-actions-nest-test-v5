import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import { FieldController } from './infrastructure/controllers';
import { FieldService } from './core/services';

import { MatchStartedEventHandler } from './core/handlers';

import {
    MatchStartedEventListener,
    FieldMarkedCellPositionChangedListener
} from './infrastructure/listeners';

import { ServerSentEventsModule } from '../../../../packages/server-sent-events';
import { EventAcknowledger } from '../../../../packages/local-event-storage';

import { MessageBus } from '../../../../packages/message-bus';

@Module({
    imports: [
        MikroOrmModule.forRoot(),
        EventEmitterModule.forRoot(),
        ServerSentEventsModule,
        MessageBus
    ],
    controllers: [
        FieldController,
        MatchStartedEventListener,
        FieldMarkedCellPositionChangedListener
    ],
    providers: [FieldService, MatchStartedEventHandler, EventAcknowledger]
})
export class FieldModule {}
