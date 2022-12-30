import { Injectable } from '@nestjs/common';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class ServerSentEvents {
    private connections: Map<string, Set<Subscriber<unknown>>> = new Map();

    private setSubscriber(namespace: string, subscriber: Subscriber<unknown>) {
        let connection = this.connections.get(namespace);

        if (!connection) {
            connection = new Set();

            this.connections.set(namespace, connection);
        }

        connection.add(subscriber);
    }

    private deleteSubscriber(
        namespace: string,
        subscriber: Subscriber<unknown>
    ) {
        const connection = this.connections.get(namespace);

        if (!connection) {
            return;
        }

        connection.delete(subscriber);
    }

    broadсast(namespace: string, message: object) {
        const connection = this.connections.get(namespace);

        if (connection === undefined) {
            return;
        }

        connection.forEach((subscriber) =>
            subscriber.next(JSON.stringify(message))
        );
    }

    connect(namespace: string): Observable<unknown> {
        const connectionExists = Boolean(this.connections.get(namespace));

        if (connectionExists) {
            return new Observable(() => {
                throw new Error('CONNECTION_ALREADY_EXISTS');
            });
        }

        const observable = new Observable((subscriber) => {
            this.setSubscriber(namespace, subscriber);

            return () => this.deleteSubscriber(namespace, subscriber);
        });

        return observable;
    }
}
