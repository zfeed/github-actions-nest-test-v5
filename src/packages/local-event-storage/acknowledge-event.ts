import { Observable } from 'rxjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Logger, Injectable } from '@nestjs/common';

import { Event } from './event';

@Injectable()
export class EventAcknowledger {
    private logger: Logger;

    constructor(private em: EntityManager) {
        this.logger = new Logger(EventAcknowledger.name);
    }

    private handleError(e: unknown) {
        if (e instanceof Error) {
            this.logger.error(e.message, e.stack);
        } else {
            this.logger.error(e);
        }
    }

    // TODO: consider switching to batch handling and offset committing atomically
    acknowledge(observable: Observable<unknown>, event: Event): void {
        observable.subscribe({
            complete: async () => {
                const qb = this.em.createQueryBuilder(Event);

                try {
                    await qb
                        .update({ acknowledgedAt: new Date() })
                        .where({ id: event.id })
                        .execute();
                } catch (e) {
                    this.handleError(e);
                }
            },
            error: (e) => {
                this.handleError(e);
            }
        });
    }
}
