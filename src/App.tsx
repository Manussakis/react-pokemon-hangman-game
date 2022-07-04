import React from 'react';
import { Keyboard } from './components/Keyboard';

const wordInProgress = ['', 'e', 'o', '', '', 'e'];
const guesses = ['o', 'e', 'a'];

function App() {
  return (
    <>
      <main>
        <Keyboard wordInProgress={ wordInProgress} guesses={ guesses}  />
      </main>
    </>
  );
}

export default App;
