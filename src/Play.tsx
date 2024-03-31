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

  const [playerPoints, setPlayerPoints] = useState<[string, number][]>(chosenPlayers.map(x => [x, 0]));

  useEffect(
    () => setTitle("Play Trash Pandas")
    , []
  );

  const nav = useNavigate();

  const gameOver = (winner: string) => {
    addNewGameResult({
      winner: winner
      , players: chosenPlayers
      , start: start
      , end: new Date().toISOString()
    });
    nav(-2);
  };

  return (
    <div className='flex flex-col gap-3'>
      {chosenPlayers.map(x => (
        <div className="card-bordered w-96 bg-base-200  shadow-xl ">
          <div className="card-body">
            <h2 className='card-title'
            // key={x}
            >
              {x}
            </h2>
            <div className="card-actions justify-center p-2">
              <p className="self-center">Points Stashed</p>
              <button className="btn btn-success"
                onClick={() =>
                  setPlayerPoints(playerPoints.map(y => [
                    y[0]
                    , y[0] === x ? y[1] + 1 : y[1]
                  ])
                  )} > +1  </button>
              <button className="btn btn-success"
                onClick={() =>
                  setPlayerPoints(playerPoints.map(y => [
                    y[0]
                    , y[0] === x ? y[1] + 5 : y[1]
                  ])
                  )} > +5  </button>
              <button className="btn btn-success"
                onClick={() =>
                  setPlayerPoints(playerPoints.map(y => [
                    y[0]
                    , y[0] === x ? y[1] + 10 : y[1]
                  ])
                  )} > +10  </button>
              <h2 className="text-left">Total Points</h2>
              <h2 className='text-2xl font-bold text-right'>
                {playerPoints.find(y => y[0] === x)![1]}
              </h2>
            </div>

            <button key={x} className="btn btn-lg btn-primary"
              onClick={() => gameOver(x)}>
              {x} Won
            </button>
          </div>
        </div >
      ))
      }
    </div>
  );
};
