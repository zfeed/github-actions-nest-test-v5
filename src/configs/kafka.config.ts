import { KafkaOptions } from '@nestjs/microservices';

export const kafka: KafkaOptions['options'] = {
    client: {
        brokers: [process.env.KAFKA_BROKER0],
        ssl: false,
        connectionTimeout: 1000,
        authenticationTimeout: 10000,
        reauthenticationThreshold: 10000,
        requestTimeout: 30000,
        enforceRequestTimeout: false,
        retry: {
            maxRetryTime: 30 * 1000,
            initialRetryTime: 300,
            factor: 0.2, // randomization factor
            multiplier: 2, // exponential factor
            retries: 5 // max retries
        }
    },
    consumer: {
        groupId: 'humsters-game',
        metadataMaxAge: 5 * 60 * 1000,
        sessionTimeout: 30 * 1000,
        rebalanceTimeout: 60 * 1000,
        heartbeatInterval: 3 * 1000,
        retry: { retries: 5 },
        allowAutoTopicCreation: true
    }
};
