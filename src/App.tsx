import React from 'react';
import { Keyboard } from './components/Keyboard';
import { WordInProgress } from './components/WordInProgress';

import './App.css';

const wordInProgress = ['_', 'e', 'o', '_', '_', 'e'];
const guesses = ['o', 'e', 'a'];

function App() {
  return (
    <>
      <main>
        <div className="container">
          <WordInProgress wordInProgress={wordInProgress} />
          <Keyboard wordInProgress={wordInProgress} guesses={guesses} />
        </div>
      </main>
    </>
  );
}

export default App;
