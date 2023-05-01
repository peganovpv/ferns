import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Typography } from '@mui/material';

import './App.css'

import logo from './logo.png';

function App() {

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" style={{
            width: '150px',
            borderRadius: '20px',
          }}/>
        </header>
        <h3> Created with FERNS </h3>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          Boilerplate has been for Firebase and Stripe.
        </p>
        <p>
          The following dependencies are included:
        </p>
        <Typography variant="body1" component="div">
          <p>
            <code>react-router-dom for routing</code>
          </p>
          <p>
            <code>@mui/material for styles</code>
          </p>
          <p>
            <code>Firebase (firebase directory included)</code>
          </p>
          <p>
            <code>Stripe (please see payments directory)</code>
          </p>
        </Typography>
      </div>
    </>
  )
}

export default App
