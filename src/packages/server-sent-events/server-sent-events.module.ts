import { Module } from '@nestjs/common';
import { ServerSentEvents } from './server-sent-events';
import { ServerSentEventsController } from './server-sent-events.controller';

@Module({
    imports: [],
    exports: [ServerSentEvents],
    controllers: [ServerSentEventsController],
    providers: [ServerSentEvents]
})
export class ServerSentEventsModule {}
