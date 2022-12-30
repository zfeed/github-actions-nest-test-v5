import { Controller, ValidationPipe, Body } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MarkedCellHitEvent } from '../../../field/core/domain/events';
import { MarkedCellHitEventHandler } from '../../core/handlers';
import { MarkedCellHitDTO } from './dtos';

@Controller()
export class MarkedCellHitEventListener {
    constructor(private markedCellHitEventHandler: MarkedCellHitEventHandler) {}

    @EventPattern(MarkedCellHitEvent.type)
    async handle(@Body('value', new ValidationPipe()) data: MarkedCellHitDTO) {
        const event = new MarkedCellHitEvent(
            data.id,
            data.playerId,
            data.matchId,
            data.cellPosition
        );

        await this.markedCellHitEventHandler.handle(event);
    }
}
