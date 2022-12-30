import { Controller, ValidationPipe, Body } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MatchFinishedEventHandler } from '../../core/handlers';
import { MatchFinishedEvent } from '../../../gaming/components/match/core/domain/events';
import { MatchFinishedDTO } from './dtos';

@Controller()
export class MatchFinishedEventListener {
    constructor(private matchFinishedEventHandler: MatchFinishedEventHandler) {}

    @EventPattern(MatchFinishedEvent.type)
    async handle(@Body('value', new ValidationPipe()) data: MatchFinishedDTO) {
        const event = new MatchFinishedEvent(
            data.id,
            data.minutesToPlay,
            new Date(data.startedAt),
            data.matchId,
            data.players,
            new Date(data.finishedAt)
        );

        await this.matchFinishedEventHandler.handle(event);
    }
}
