import { ClientsModule, Transport, ClientKafka } from '@nestjs/microservices';
import { kafka } from '../../configs';

export { KafkaMessage as Message } from '@nestjs/microservices/external/kafka.interface';

export const MESSAGE_BUS = Symbol('MESSAGE_BUS');

export type Client = ClientKafka;

export const MessageBus = ClientsModule.register([
    {
        name: MESSAGE_BUS,
        transport: Transport.KAFKA,
        options: {
            producerOnlyMode: true,
            ...kafka
        }
    }
]);
