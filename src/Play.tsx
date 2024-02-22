import { useNavigate } from 'react-router-dom';
import { GameResult } from './GameResults';
import { FC, useEffect } from 'react';

interface PlayProps {
  addNewGameResult: (result: GameResult) => void;
  setTitle: (t: string) => void;
}


export const Play: FC<PlayProps> = ({ addNewGameResult, setTitle }) => {

  useEffect(
    () => setTitle("Play Trash Pandas")
    , []
  );

  const nav = useNavigate();

  return (
    <div
      className='flex flex-col gap-3'
    >

      <button
        className="btn btn-lg btn-primary"
        onClick={() => {
          addNewGameResult({
            winner: "Tom"
            , players: [
              "Tom"
              , "Taylor"
            ]
          });
          nav(-2)
        }}
      >
        Done
      </button>
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

