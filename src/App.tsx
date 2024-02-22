import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { Home, AppTitle } from './Home'
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

  const [title, setTitle] = useState(AppTitle);

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
        setTitle={setTitle}
      />
    },
    {
      path: "/setup",
      element: <Setup setTitle={setTitle} />

    },
    {
      path: "/play",
      element: <Play
        addNewGameResult={addNewGameResult}
        setTitle={setTitle}
      />
    },
  ]);

  return (
    <div className="App" >
      <div className='navbar bg-base-300'>
        {
          title === AppTitle &&
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        }
        <span className='text-lg font-bold ml-3'
        >



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
