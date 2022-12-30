import { randomUUID } from 'node:crypto';
import { Injectable, Inject } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { MESSAGE_BUS, Client } from '../../../../../../packages/message-bus';

import { Field } from '../domain/field';
import {
    Event,
    EventAcknowledger
} from '../../../../../../packages/local-event-storage';
import * as HitResult from './results/hit.result';

@Injectable()
export class FieldService {
    constructor(
        private em: EntityManager,
        @Inject(MESSAGE_BUS) private bus: Client,
        private eventAcknowledger: EventAcknowledger
    ) {}

    async hit(fieldId: string, index: number, playerId: string) {
        const eventRepository = this.em.getRepository(Event);
        const fieldRepository = this.em.getRepository(Field);

        const field = await fieldRepository.findOne(fieldId);

        if (!field) {
            return HitResult.FieldNotFoundResult.create();
        }

        if (field.playerExists(playerId) === false) {
            return HitResult.PlayerDoesNotExistResult.create();
        }

        field.hit(index, playerId, randomUUID());

        const persistedEventsMap = new Map<string, Event>();

        field.events.forEach((data) => {
            const event = Event.create(
                data.id,
                JSON.stringify(data),
                data.type,
                null,
                new Date()
            );

            persistedEventsMap.set(event.id, event);

            eventRepository.persist(event);
        });

        await this.em.flush();

        field.events.forEach((event) => {
            const observable = this.bus.emit(event.type, event);
            const persistedEvent = persistedEventsMap.get(event.id) as Event;

            this.eventAcknowledger.acknowledge(observable, persistedEvent);
        });

        return HitResult.HitResult.create(field);
    }

    async changeMarkedCellPosition(fieldId: string) {
        const eventRepository = this.em.getRepository(Event);
        const fieldRepository = this.em.getRepository(Field);

        const field = await fieldRepository.findOne(fieldId);

        if (!field) {
            throw new Error('Field does not exist');
        }

        field.changeMarkedCellPosition(randomUUID());

        const persistedEventsMap = new Map<string, Event>();

        field.events.forEach((data) => {
            const event = Event.create(
                data.id,
                JSON.stringify(data),
                data.type,
                null,
                new Date()
            );

            persistedEventsMap.set(event.id, event);

            eventRepository.persist(event);
        });

        await this.em.flush();

        field.events.forEach((event) => {
            const observable = this.bus.emit(event.type, event);
            const persistedEvent = persistedEventsMap.get(event.id) as Event;

            this.eventAcknowledger.acknowledge(observable, persistedEvent);
        });
    }
}
