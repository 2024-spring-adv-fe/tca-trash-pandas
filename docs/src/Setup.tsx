import { isDisabled } from '@testing-library/user-event/dist/utils';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SetupProps {
    setTitle: (t: string) => void;
    previousPlayers: string[];
    setChosenPlayers: (players: string[]) => void;
};

export const Setup: FC<SetupProps> = ({
    setTitle
    , previousPlayers
    , setChosenPlayers
}) => {

    const [availablePlayers, setAvailablePlayers] = useState(previousPlayers.map(x => ({
        name: x
        , checked: false
    })));

    const [newPlayerName, setNewPlayerName] = useState("");

    useEffect(
        () => setTitle("Game Setup")
        , []
    );

    const nav = useNavigate();

    const validateAndAddNewPlayer = () => {

        if (
            newPlayerName.length > 0
            && !availablePlayers.some(x => x.name.toUpperCase() === newPlayerName.toUpperCase())
        ) {
            setAvailablePlayers(
                [
                    ...availablePlayers
                    , {
                        name: newPlayerName
                        , checked: true
                    }
                ].sort((a, b) => a.name.localeCompare(b.name))
            );

            setNewPlayerName("");
        }
    };

    return (
        <div
            className='flex flex-col gap-3'
        >
            <button
                className="btn btn-lg btn-primary"
                onClick={
                    () => {
                        setChosenPlayers(
                            availablePlayers
                                .filter(x => x.checked)
                                .map(x => x.name)
                        );
                        nav('/play');
                    }
                }
                disabled={availablePlayers.filter(x => x.checked).length < 2}
            >
                Start the Game
            </button>
            <div
                className='card bg-base-200 shadow-xl m-1.5'
            >
                <div
                    className='flex items-center mb-5'
                >
                    <input
                        type="text"
                        placeholder="Enter new player name"
                        className="input input-bordered w-full max-w-xs"
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                    />
                    <button
                        className='btn btn-md btn-primary ml-3'
                        onClick={validateAndAddNewPlayer}
                    >
                        Add
                    </button>
                </div>

                {
                    availablePlayers.map(x => (
                        <div className="form-control"
                            key={x.name}>
                            <label className="flex">
                                <input type="checkbox"
                                    className="checkbox checkbox-primary"
                                    checked={x.checked}
                                    onChange={() => setAvailablePlayers([
                                        ...availablePlayers.map(y => ({
                                            name: y.name
                                            , checked: y.name === x.name
                                                ? !y.checked
                                                : y.checked
                                        }))
                                    ])}
                                />
                                <span className="label-text ml-3 ">{x.name}</span>
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};