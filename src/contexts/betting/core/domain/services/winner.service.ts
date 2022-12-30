interface Player {
    readonly id: string;
    readonly score: number;
}

export class WinnerService {
    // TODO: handle draw
    static findWinnerAmongPlayers(players: Player[]): Player {
        if (players.length === 0) {
            throw new Error('Players list is empty');
        }

        const winner = players.reduce((item, player) => {
            if (player.score > item!.score) {
                return player;
            }

            return item;
        }, players[0]) as Player;

        return winner;
    }
}
