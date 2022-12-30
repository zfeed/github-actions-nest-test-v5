# Introduction

This project is overengineered Proof of Concept and not finished yet. The main purpose is to show how to create modular monolith using DDD practices and cover it with unit tests without pain

# Usage

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# integration tests
$ npm run test:integration

# test coverage
$ npm run test:cov
```

# System Overview

Application consists of two bounded contexts:

1. Betting
2. Gaming

Betting is responsibly for making bets, finding a winner etc. Gaming is responsible for creating a match, game field, etc.
Each of the contexts exists on its own ubiquitous language, communication is handler asynchronously by exchanging domain events.

![Untitled-Page-1 drawio](https://user-images.githubusercontent.com/40887690/201039370-3c6afefc-d829-4df1-b9eb-17dd061224ee.svg)

# Contexts

## Gaming

Gaming context is divided in two components:

1. Match
2. Field

Components are organized around one aggregate root. Synchronization between components is done by exchanging domain events asynchronously. Each component is divided in layers, so we have "vertical" + "horizontal" devision. The purpose of such division is that each component loosely coupled and can be rebuilt/refactored without affection other components

![Untitled-Page-2 drawio (3)](https://user-images.githubusercontent.com/40887690/201042538-168eb5e8-7d75-49d3-9228-32d5c8674e46.svg)

## Betting

Betting context has only one aggregate root, so there is no need to divide it in components. Internal structure is pretty similar to Match or Field components from the Gaming Context. The only difference is that it doesn't have HTTP Controllers at this moment

![Untitled-Page-3 drawio (1)](https://user-images.githubusercontent.com/40887690/201044345-05511a06-f4b8-410e-8cc1-82ee8d91fc17.svg)

# Naming convention

File names MUST follow the following structure:

```text
{name}.{type}.{extension}
{name}.{extension}
```

File names and types MUST me written in kebab-case:

```text
user.controller.ts
user.service.ts
mikro-orm.config.ts
order-created.event-handler.ts
```

Class names MUST be written in PascalCase:

```typescript
class User {
    /* ... */
}

class UserService {
    /* ... */
}

class ApplicationModule {
    /* ... */
}

class OrderCreatedEvent {
    /* ... */
}
```

Constant names MUST be written in PascalCase:

```typescript
const ACTIVE_STATUS = 1;

const PORT = 443;

process.env.PORT = 80;
```

Other names MUST be written in camelCase:

```typescript
const userStatus = 0;

const isActive = true;

const userService = new UserService();
```

# Library

-   [Domain-Driven Design: Tackling Complexity in the Heart of Software by Eric Evans](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)
-   [Implementing Domain-Driven Design by Vaughn Vernon](https://www.amazon.com/Implementing-Domain-Driven-Design-Vaughn-Vernon/dp/0321834577)
-   [Unit Testing Principles, Practices, and Patterns: Effective testing styles, patterns, and reliable automation for unit testing, mocking, and integration testing with examples in C# 1st Edition by Vladimir Khorikov ](https://www.amazon.com/Unit-Testing-Principles-Practices-Patterns/dp/1617296279)
-   [Patterns of Enterprise Application Architecture by Martin Fowler](https://www.amazon.com/Patterns-Enterprise-Application-Architecture-Martin/dp/0321127420)
-   [Vertical Slice Architecture](https://jimmybogard.com/vertical-slice-architecture/)
-   [Advanced Distributed Systems Design using SOA & DDD](https://udidahan.com/training/)
-   [Enterprise Craftsmanship Blog](https://enterprisecraftsmanship.com/posts)
-   [Udi Dahan Blog](https://udidahan.com/?blog=true)
