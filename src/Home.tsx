import { useNavigate } from 'react-router-dom';
import { LeaderboardEntry } from './GameResults';
import { FC, useEffect } from 'react';

export const AppTitle = "Trash Pandas Companion App";

interface HomeProps {
    leaderboardData: LeaderboardEntry[];
    setTitle: (t: string) => void;
}

export const Home: FC<HomeProps> = ({ leaderboardData, setTitle }) => {
    useEffect(
        () => setTitle(AppTitle)
        , []
    );

    const nav = useNavigate();
    return (
        <div
            className='flex flex-col '
        >
            <button
                className="btn btn-lg btn-primary"
                onClick={() => nav('/setup')}
            >
                Play
            </button>

            <div className='card bg-base-200 shadow-xl m-1.5'>
                <div className='card-body p-2' >
                    <h2 className='card-title'>
                        General
                    </h2>
                    <table className='table'>

                        <tbody>
                            <tr>
                                <td>Total Games</td>
                                <td> 10</td>
                            </tr>
                            <tr>
                                <td>Last Played</td>
                                <td>2d ago</td>
                            </tr>
                            <tr>
                                <td>Shortest Game</td>
                                <td>3m 25s</td>
                            </tr>
                            <tr>
                                <td>Longest Game</td>
                                <td>10m 12s</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>


            <div className='card bg-base-200 shadow-xl m-1.5'>
                <div className='card-body p-2' >
                    <h2 className='card-title'>
                        Leaderboard
                    </h2>
                    {leaderboardData.length > 0
                        ? (<table className='table'>
                            <thead>
                                <tr>
                                    <th>W</th>
                                    <th>L</th>
                                    <th>AVE</th>
                                    <th>Player</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboardData.map(lbe => (
                                    <tr key={lbe.name}                                    >
                                        <td>{lbe.wins}</td>
                                        <td>{lbe.losses}</td>
                                        <td>{lbe.avg.toFixed(3)}</td>
                                        <td>{lbe.name}</td>
                                    </tr>
                                ))
                                }
                            </tbody>

                        </table>
                        )
                        : (<p> Play a game to see the leaderboard!</p>)
                    }
                </div>
            </div>

            <div className='card mt-3 bg-base-200 shadow-xl m-1.5'>
                <div className='card-body'>
                    <h2 className='card-title'>
                        Average Rolls / Turn
                    </h2>
                    <table className='table '>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th># Rolls</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Melisa</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>Hailey</td>
                                <td>3.5</td>
                            </tr>
                            <tr>
                                <td>Katlyn</td>
                                <td>4</td>
                            </tr>

                        </tbody>

                    </table>
                </div>
            </div>
        </div>

    );
};
