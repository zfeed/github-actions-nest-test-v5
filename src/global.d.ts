/// <reference types="jest-extended" />

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StripInternalMethods<T, K extends keyof any> = Omit<T, K>;

declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: string;
        APP_PORT: string;
        POSTGRES_HOST: string;
        POSTGRES_PASSWORD: string;
        POSTGRES_USER: string;
        POSTGRES_DB: string;
        POSTGRES_PORT: string;
        KAFKA_BROKER0: string;
    }
}
