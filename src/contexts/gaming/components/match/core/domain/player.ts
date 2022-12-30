import { Entity } from '../../../../../../packages/domain';

export class Player extends Entity<never> {
    private score = 0;

    public readonly name: string;

    private constructor(id: Player['id'], name: string) {
        super(id);
        this.score = 0;
        this.name = name;
    }

    getScore() {
        return this.score;
    }

    public static create(id: Player['id'], name: string): Player {
        const handledName = name.trim();

        if (handledName.length === 0) {
            throw new Error("Name can't be empty");
        }

        return new Player(id, handledName);
    }

    public increaseScoreBy(score: number) {
        this.score += score;
    }
}
