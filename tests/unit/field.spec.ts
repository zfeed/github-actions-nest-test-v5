import { randomUUID } from 'node:crypto';
import * as dayjs from 'dayjs';

import { Field } from '../../src/contexts/gaming/components/field/core/domain';
import {
    MarkedCellHitEvent,
    FieldMarkedCellPositionChangedEvent
} from '../../src/contexts/gaming/components/field/core/domain/events';

describe('Field', () => {
    test('Field is created', () => {
        const now = new Date();
        const field = Field.create('1', ['2', '3'], '4', 16, now);

        expect(field.id).toBe('1');
        expect(field.getPlayerIds()).toEqual(['2', '3']);
        expect(field.getMatchId()).toBe('4');
        expect(field.getCreatedAt()).toEqual(now);
        expect(field.getFinishedAt()).toEqual(null);
        expect(field.getSize()).toBe(16);
        expect(field.getMarkedCellPosition()).toBeGreaterThanOrEqual(1);
        expect(field.getMarkedCellPosition()).toBeLessThanOrEqual(16);
    });

    test("Field's marked cell is hit", () => {
        const eventId = randomUUID();
        const field = Field.create('1', ['2', '3'], '4', 16, new Date());
        const markedCellPosition = field.getMarkedCellPosition();

        field.hit(markedCellPosition, '2', eventId);

        expect(field.events).toEqual([
            new MarkedCellHitEvent(eventId, '2', '4', markedCellPosition)
        ]);
        expect(field.getMarkedCellPosition()).not.toBe(markedCellPosition);
        expect(field.getMarkedCellPosition()).toBeGreaterThanOrEqual(0);
        expect(field.getMarkedCellPosition()).toBeLessThanOrEqual(15);
    });

    test("Field's marked cell is hit by player that doesn't exit", () => {
        const field = Field.create('1', ['2', '3'], '4', 16, new Date());

        expect(() => field.hit(3, '4', randomUUID())).toThrow();
    });

    test("Field's marked cell position changed", () => {
        const eventId = randomUUID();
        const field = Field.create('1', ['2', '3'], '4', 16, new Date());
        const previousMarkedCellPosition = field.getMarkedCellPosition();

        field.changeMarkedCellPosition(eventId);

        const currentMarkedCellPosition = field.getMarkedCellPosition();

        expect(field.events).toEqual([
            new FieldMarkedCellPositionChangedEvent(
                eventId,
                currentMarkedCellPosition,
                '4',
                '1'
            )
        ]);
        expect(currentMarkedCellPosition).not.toBe(previousMarkedCellPosition);
        expect(field.getMarkedCellPosition()).toBeGreaterThanOrEqual(1);
        expect(field.getMarkedCellPosition()).toBeLessThanOrEqual(16);
    });

    test("Field can't be hit when session is over", () => {
        const field = Field.create('1', ['2', '3'], '4', 16, new Date());

        field.finish(dayjs().add(2, 'minutes').toDate());

        expect(() => field.hit(1, '2', randomUUID())).toThrow();
    });

    test("Field's marked cell position can't be changed when match is over", () => {
        const field = Field.create('1', ['2', '3'], '4', 16, new Date());

        field.finish(dayjs().add(2, 'minutes').toDate());

        expect(() => field.changeMarkedCellPosition(randomUUID())).toThrow();
    });
});
