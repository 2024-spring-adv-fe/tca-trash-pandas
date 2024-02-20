import { useNavigate } from 'react-router-dom';
import { LeaderboardEntry } from './GameResults';
import { FC } from 'react';


interface HomeProps {
    leaderboardData: LeaderboardEntry[];
}

export const Home: FC<HomeProps> = ({ leaderboardData }) => {
    console.log(leaderboardData);

    const nav = useNavigate();
    return (
        <>
            <h3>
                Trash Pandas Companion App
            </h3>
            <button
                className="btn btn-secondary"
                onClick={() => nav('/setup')}
            >
                Setup Game
            </button>
            <div className='card mt-3 bg-base-100 shadow-xl'>
                <div className='card-body'>
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
                                    <tr>
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
        </>
    );
};
