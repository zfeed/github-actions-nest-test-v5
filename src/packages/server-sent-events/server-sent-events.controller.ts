import { Controller, Sse, Param } from '@nestjs/common';

import { ServerSentEvents } from './server-sent-events';

@Controller('events')
export class ServerSentEventsController {
    constructor(private serverSentEvents: ServerSentEvents) {}

    @Sse('sse/:id')
    connectToSSE(@Param('id') id: string) {
        return this.serverSentEvents.connect(id);
    }
}
