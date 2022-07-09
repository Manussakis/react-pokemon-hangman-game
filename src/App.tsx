import React from 'react';
import { Keyboard } from './components/Keyboard';
import { WordInProgress } from './components/WordInProgress';

import './App.css';

function App() {
  return (
    <>
      <main>
        <div className="container">
          <WordInProgress />
          <Keyboard />
        </div>
      </main>
    </>
  );
}

export default App;
