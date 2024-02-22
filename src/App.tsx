import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './Home'
import { Play } from './Play'
import { Setup } from './Setup'
import { GameResult, getLeaderboard } from './GameResults'

const dummyGameResults: GameResult[] = [
  {
    winner: "Tom"
    , players: [
      "Tom"
      , "Batu"
      , "Julia"
      , "Melisa"
      , "John"
    ]
  }
  , {
    winner: "John"
    , players: [
      "Batu"
      , "Julia"
      , "Melisa"
      , "John"
    ]
  }
  , {
    winner: "John"
    , players: [
      "Tom"
      , "Batu"
      , "Julia"
      , "Melisa"
      , "John"
    ]
  }
  , {
    winner: "Harry"
    , players: [
      "Harry"
      , "hermione"
      , "Ron"
    ]
  }
];

const App = () => {

  const [gameResults, setGameResults] = useState<GameResult[]>(dummyGameResults);

  const [title, setTitle] = useState("Trash Pandas Companion App");

  const addNewGameResult = (result: GameResult) => setGameResults(
    [
      ...gameResults
      , result
    ]
  );

  const router = createHashRouter([
    {
      path: "/",
      element: <Home
        leaderboardData={getLeaderboard(gameResults)}
      />
    },
    {
      path: "/setup",
      element: <Setup />
    },
    {
      path: "/play",
      element: <Play
        addNewGameResult={addNewGameResult}
      />
    },
  ]);

  return (
    <div className="App" >
      <div className='navbar bg-base-300'>
        <span className='text-lg font-bold ml-3'
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
          </svg>

          {title}
        </span>
      </div>
      <div className="p-3">
        <RouterProvider
          router={router}
        />
      </div>
    </div>
  );
}

export default App;
