import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import { MessageBus } from '../../../../packages/message-bus';

import { MatchController } from './infrastructure/controllers';
import { MatchService } from './core/services';
import { EventAcknowledger } from '../../../../packages/local-event-storage';

import { MarkedCellHitEventHandler } from './core/handlers';
import { MarkedCellHitEventListener } from './infrastructure/listeners';

@Module({
    imports: [
        MikroOrmModule.forRoot(),
        EventEmitterModule.forRoot(),
        MessageBus
    ],
    controllers: [MatchController, MarkedCellHitEventListener],
    providers: [MatchService, MarkedCellHitEventHandler, EventAcknowledger]
})
export class MatchModule {}
