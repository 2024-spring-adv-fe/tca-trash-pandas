import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const Home = () => {
  return (
    <h3>
      Home
    </h3>
  );
};

const Setup = () => {
  return (
    <h3>
      Setup
    </h3>
    );
};

const Play = () => {
  return (
    <>
    <h3>
      Play
    </h3>
    <p>
      play the game and just tab-a-tap-a-tap
    </p>
  </>
  );
};

const App = () => {

  const router = createHashRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/setup",
      element: <Setup />
    },
    {
      path: "/play",
      element: <Play />
    },
  ]);  

  return (
    <div 
      className="App p-3"
    >
      <RouterProvider 
        router={router} 
      />
    </div>
  );
}

export default App;
