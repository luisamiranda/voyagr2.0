import React from 'react';
import { Outlet } from "react-router-dom"

import './App.css';

import NavComponent from './nav/NavComponent';


function App() {
  return (
    <div>
      <header>
        <NavComponent />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
