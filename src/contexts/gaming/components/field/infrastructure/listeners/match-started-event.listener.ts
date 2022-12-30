import { Controller, ValidationPipe, Body } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MatchStartedEvent } from '../../../match/core/domain/events';
import { MatchStartedEventHandler } from '../../core/handlers';
import { MatchStartedDTO } from './dtos';

@Controller()
export class MatchStartedEventListener {
    constructor(private matchStartedEventHandler: MatchStartedEventHandler) {}

    @EventPattern(MatchStartedEvent.type)
    async handle(@Body('value', new ValidationPipe()) data: MatchStartedDTO) {
        const event = new MatchStartedEvent(
            data.id,
            data.minutesToPlay,
            new Date(data.startedAt),
            data.matchId,
            data.playersId
        );

        await this.matchStartedEventHandler.handle(event);
    }
}
