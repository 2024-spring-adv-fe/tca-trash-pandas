import { durationFormatter } from 'human-readable';

const formatterDefault = durationFormatter();
const formatterYMD = durationFormatter({
    allowMultiples: ['y', 'mo', 'd']
})

// Type Definitions

export type GameResult = {
    winner: string;
    players: string[];
    start: string;
    end: string;
    playerPoints: [string, number][];
};

export type LeaderboardEntry = {
    wins: number;
    losses: number;
    avg: number;
    name: string;
};

export type GeneralFacts = {
    totalGames: number;
    lastPlayed: string;
    shortestGame: string;
    longestGame: string;
};

export type PointFunFacts = {
    // totalPoints: number;
    // totalGames: number;
    //Not sure I need those two lines above as i am only using the bottom two on the leaderboard
    avg: number;
    name: string;
};

// Exported Funcitons

export const getPreviousPlayers = (results: GameResult[]) => {

    const previousPlayers = results.flatMap(
        x => x.players
    );

    return [
        ...new Set(previousPlayers)
    ].sort(
        (a, b) => a.localeCompare(b)
    );
};

export const getLeaderboard = (results: GameResult[]): LeaderboardEntry[] => {
    const players = getPreviousPlayers(results);

    return players.map(
        x => getLeaderboardEntryForPlayer(results, x)
    ).sort(
        // (a, b) => b.avg - a.avg

        // i-o-g
        (a, b) => (b.avg * 1000 + b.wins + b.losses) - (a.avg * 1000 + a.wins + a.losses)
    );
};

export const getGeneralFacts = (results: GameResult[]): GeneralFacts => {
    const now = Date.now();
    const gameEndDatesInMilliseconds = results.map(
        x => Date.parse(x.end)
    );

    const gameDurationsInMilliseconds = results.map(
        x => Date.parse(x.end) - Date.parse(x.start)
    );
    return {
        totalGames: results.length
        , lastPlayed:
            results.length
                ? `${formatterYMD(
                    now - Math.max(...gameEndDatesInMilliseconds)
                )} ago`
                : "n/a"
        , shortestGame:
            results.length
                ? formatterDefault(
                    Math.min(...gameDurationsInMilliseconds)
                ) as string
                : "n/a"
        , longestGame:
            results.length
                ? formatterDefault(
                    Math.max(...gameDurationsInMilliseconds)
                ) as string
                : "n/a"
    };
};

//comment in this line to play and get the pointfunfactsworking

export const getPointFunFacts = (results: GameResult[]): PointFunFacts[] => {
    const players = getPreviousPlayers(results);
    return players.map(
        x => getPointEntryForPlayer(results, x)
    ).sort(
        (a, b) => b.avg - a.avg
    )
}

// internal functions

const getLeaderboardEntryForPlayer = (results: GameResult[], player: string): LeaderboardEntry => {
    const playerWins = results.filter(x => x.winner === player).length;
    const playerGames = results.filter(
        x => x.players.some(
            y => y === player
        )
    ).length;

    return {
        wins: playerWins
        , losses: playerGames - playerWins
        , avg: playerGames > 0
            ? playerWins / playerGames
            : 0
        , name: player
    };
};

const getPointEntryForPlayer = (results: GameResult[], player: string): PointFunFacts => {
    const playerGames = results.filter(
        x => x.players.some(
            y => y === player
        )
    );
    const playerTotalPoints = playerGames.flatMap
        (x => x.playerPoints).filter
        (x => x[0] === player).reduce
        ((acc, x) => acc + x[1], 0
        );
    return {
        avg: playerGames.length > 0
            ? playerTotalPoints / playerGames.length
            : 0
        , name: player
    };
};