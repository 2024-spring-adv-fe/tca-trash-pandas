import { useNavigate} from 'react-router-dom' ;

export const Play = () => {
  
  const nav = useNavigate();
  
  return (
      <>
        <h3>
          Play
        </h3>
        <p>
          Play the game and tap-a-tap-a-tap
        </p>
        <button
            className="btn btn-outline btn-primary"
            onClick={() => nav(-2)}
        >
            Done
        </button>
      </>
    );
  };