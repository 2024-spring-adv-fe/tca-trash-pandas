import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { Home, AppTitle } from './Home'
import { Play } from './Play'
import { Setup } from './Setup'
import {
  GameResult
  , getLeaderboard
  , getGeneralFacts
  , getPreviousPlayers
  , getPointFunFacts
} from './GameResults'
import { saveGameToCloud, loadGamesFromCloud } from './tca-cloud-api';
import localforage from 'localforage';

const App = () => {

  const [gameResults, setGameResults] = useState<GameResult[]>([]);

  const [title, setTitle] = useState(AppTitle);

  const [chosenPlayers, setChosenPlayers] = useState<string[]>([]);

  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const [dialogEmail, setDialogEmail] = useState("");

  const [cloudApiEmail, setcloudApiEmail] = useState("");

  useEffect(
    () => {
      const init = async () => {

        if (!ignore) {

          const savedEmail = await localforage.getItem<string>("email") ?? "";
          if (savedEmail?.length > 0) {
            setcloudApiEmail(savedEmail);
            setDialogEmail(savedEmail);

            const cloudGameResults = await loadGamesFromCloud(
              savedEmail
              , "tca-trash-pandas-24s"
            );

            setGameResults(cloudGameResults);
          }
          else {
            dialogRef.current?.showModal()
          }
        }
      };

      let ignore = false;
      init();

      return () => {
        ignore = true;
      };
    }
    , [cloudApiEmail]
  );

  const addNewGameResult = async (result: GameResult) => {
    // Save the game result to the cloud.
    await saveGameToCloud(
      cloudApiEmail // hard coded for now
      , "tca-trash-pandas-24s"
      , result.end
      , result
    )
    // Optimistically update the lifted state with the new game result.
    setGameResults(
      [
        ...gameResults
        , result
      ]
    );
  };

  const router = createHashRouter([
    {
      path: "/",
      element: <Home
        leaderboardData={getLeaderboard(gameResults)}
        generalFacts={getGeneralFacts(gameResults)}
        setTitle={setTitle}
        pointFunFacts={getPointFunFacts(gameResults)}
      />
    },
    {
      path: "/setup",
      element: <Setup
        setTitle={setTitle}
        previousPlayers={getPreviousPlayers(gameResults)}
        setChosenPlayers={setChosenPlayers}
      />
    },


    {
      path: "/play",
      element: <Play
        addNewGameResult={addNewGameResult}
        setTitle={setTitle}
        chosenPlayers={chosenPlayers}
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

        <div className='ml-auto mr-3'>
          <button
            className='mr-3'
            onClick={() => dialogRef.current?.showModal()}
          >

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-3">
        <RouterProvider
          router={router}
        />
      </div>

      <dialog ref={dialogRef} id="email-dialog" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Enter email Address for saving game results . . . !</h3>
          <input
            type="text"
            placeholder="Email Address"
            className="input input-bordered w-full max-mt-3"
            value={dialogEmail}
            onChange={(e) => setDialogEmail(e.target.value)}
          />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-primary"
                onClick={async () => {
                  await localforage.setItem<string>("email", dialogEmail);
                  setcloudApiEmail(dialogEmail);
                }}
              >Save
              </button>
            </form>
          </div>
        </div>
      </dialog>



    </div>
  );
}

export default App;