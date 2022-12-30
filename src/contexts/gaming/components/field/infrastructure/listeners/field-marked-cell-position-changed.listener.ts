import { Controller, ValidationPipe, Body } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { FieldMarkedCellPositionChangedEvent } from '../../core/domain/events';
import { ServerSentEvents } from '../../../../../../packages/server-sent-events';
import { FieldMarkedCellPositionChangedDTO } from './dtos';

@Controller()
export class FieldMarkedCellPositionChangedListener {
    constructor(private serverSentEvents: ServerSentEvents) {}

    @EventPattern(FieldMarkedCellPositionChangedEvent.type)
    async handle(
        @Body('value', new ValidationPipe())
        data: FieldMarkedCellPositionChangedDTO
    ) {
        const event = new FieldMarkedCellPositionChangedEvent(
            data.id,
            data.newMarkedCellPosition,
            data.matchId,
            data.fieldId
        );

        await this.serverSentEvents.broadсast(event.matchId, event);
    }
}
