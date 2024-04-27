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
      , playerPoints
    });
    nav(-2);
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='card bg-base-200 shadow-xl'>
        <div className='card-body  '>
          <ul className='list-disc'>
            <li>
              Play Game as normal
            </li>
            <li>
              At game end track Points Stashed per player
            </li>
            <li>
              Then choose a winner
            </li>
            <li>
              Chosing a winner saves game results
            </li>
            <li>
              Or quit to not save your game results
            </li>
          </ul>
          <p className="self-center">
            <button className="btn btn-warning btn-lg text-lg " onClick={() => nav(-2)}>Quit</button>
          </p>
        </div>
      </div>

      {
        chosenPlayers.map(x => (
          <div key={x} className="card bg-base-200 shadow-xl ">
            <div className="card-body">
              <h2 className='card-title text-3xl text-bold justify-center'>
                {x}
              </h2>
              <div className="card-actions justify-center p-2">
                <div>
                  <h2 className="text-left text-2xl">Points Stashed</h2>
                </div>
                <div>
                  <button className="btn btn-warning"
                    onClick={() => setPlayerPoints(
                      playerPoints.map(y => [
                        y[0]
                        , y[0] === x ? y[1] - 1 : y[1]
                      ])
                    )}
                  >
                    - 1
                  </button>
                  <button className="btn btn-warning"
                    onClick={() => setPlayerPoints(
                      playerPoints.map(y => [
                        y[0]
                        , y[0] === x ? y[1] - 5 : y[1]
                      ])
                    )}
                  >
                    - 5
                  </button>
                  <button className="btn btn-info"
                    onClick={() =>
                      setPlayerPoints(playerPoints.map(y => [
                        y[0]
                        , y[0] === x ? y[1] + 1 : y[1]
                      ])
                      )} > +1
                  </button>
                  <button className="btn btn-info"
                    onClick={() =>
                      setPlayerPoints(playerPoints.map(y => [
                        y[0]
                        , y[0] === x ? y[1] + 5 : y[1]
                      ])
                      )} > +5
                  </button>
                  <button className="btn btn-info"
                    onClick={() =>
                      setPlayerPoints(playerPoints.map(y => [
                        y[0]
                        , y[0] === x ? y[1] + 10 : y[1]
                      ])
                      )} > +10
                  </button>
                </div>
                <h2 className="text-left text-2xl">Total Points</h2>
                <h2 className='text-2xl font-bold text-right'>
                  {playerPoints.find(y => y[0] === x)![1]}
                </h2>

              </div>


              <button key={x} className="btn btn-lg  text-lg btn-success"
                onClick={() => gameOver(x)}>
                {x} Won
              </button>
            </div>
          </div >
        ))
      }
    </div >
  );
};
