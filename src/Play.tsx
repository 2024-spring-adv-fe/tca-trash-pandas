import { useNavigate } from 'react-router-dom';

export const Play = () => {

  const nav = useNavigate();

  return (
    <>
      <h1>
        Play Trash Pandas
      </h1>
      <p>
        Play the game and tap-a-tap-a-tap
      </p>

      <div className="card-bordered w-96 bg-base-100  shadow-xl ">
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
            <button className="btn btn-outline btn-warning self-center">Forced Roll</button>
            <button className="btn btn-outline btn-error self-center">BUST!</button>
            <button className="btn btn-outline btn-success">End Turn</button>
            {/* the p above is placeholder where I Will display # of rolls. also need to fix spacing  */}
          </div>

        </div>

      </div >

      <button
        className="btn btn-outline btn-primary"
        onClick={() => nav(-2)}
      >
        Done
      </button>
    </>
  );
};