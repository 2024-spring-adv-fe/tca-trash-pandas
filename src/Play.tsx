import { useNavigate } from 'react-router-dom';
import { GameResult } from './GameResults';
import { FC, useEffect, useState } from 'react';

interface PlayProps {
  addNewGameResult: (result: GameResult) => void;
  setTitle: (t: string) => void;
  chosenPlayers: string[];
}


export const Play: FC<PlayProps> = ({
  addNewGameResult
  , setTitle
  , chosenPlayers
}) => {
  const [start, setStart] = useState(new Date().toISOString());

  useEffect(
    () => setTitle("Play Trash Pandas")
    , []
  );

  const nav = useNavigate();

  return (
    <div
      className='flex flex-col gap-3'
    >
      <div className="card-bordered w-96 bg-base-200  shadow-xl ">
        <div className="card-body">
          <h2 className="card-title underline">Player 1</h2>
          {/* Need to make the card put the player name and copy cart for each player is this going to make it too complicated??? */}
          <div className="  card-actions justify-center p-2">
            <p className="self-center">Roll Count</p>
            <button className="btn btn-error self-center">-</button>
            <p className="p-3 self-center border-b-2">#</p>
            <button className="btn btn-success">+</button>
            {/* the p above is placeholder where I Will display # of rolls. also need to fix spacing  */}
          </div>

          <div className="  card-actions justify-center p-2">
            {/* <button className="btn btn-outline btn-warning self-center">Forced Roll</button> */}
            <button className="btn btn-outline btn-error self-center">BUST End Turn</button>
            <button className="btn btn-outline btn-success">End Turn</button>
            {/* the p above is placeholder where I Will display # of rolls. also need to fix spacing  */}
          </div>

        </div>

      </div >

      <div className="card-bordered w-96 bg-base-200  shadow-xl ">
        <div className="card-body">
          <h2 className="card-title underline">Player 2</h2>
          {/* Need to make the card put the player name and copy cart for each player is this going to make it too complicated??? */}
          <div className="  card-actions justify-center p-2">
            <p className="self-center">Roll Count</p>
            <button className="btn btn-error self-center">-</button>
            <p className="p-3 self-center border-b-2">#</p>
            <button className="btn btn-success">+</button>
            {/* the p above is placeholder where I Will display # of rolls. also need to fix spacing  */}
          </div>

          <div className="  card-actions justify-center p-2">
            {/* <button className="btn btn-outline btn-warning self-center">Forced Roll</button> */}
            <button className="btn btn-outline btn-error self-center">BUST End Turn</button>
            <button className="btn btn-outline btn-success">End Turn</button>
            {/* the p above is placeholder where I Will display # of rolls. also need to fix spacing  */}
          </div>

        </div>

      </div >
      {
        chosenPlayers.map(x => (
          <button
            key={x}
            className="btn btn-lg btn-primary"
            onClick={() => {
              addNewGameResult({
                winner: x
                , players: chosenPlayers
                , start: start
                , end: new Date().toISOString()
              });
              nav(-2);
            }}
          >
            {x} Won
          </button>

        ))
      }

      <p className='text-xs'>
        Play the game and tap-a-tap-a-tap
      </p>
    </div>
  );
};


// Minus Button
// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
// </svg>
// cicrcle<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
// <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
// </svg>

