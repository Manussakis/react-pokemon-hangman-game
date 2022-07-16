import { Keyboard } from './components/Keyboard';
import { WordInProgress } from './components/WordInProgress';
import { Illustration } from './components/Illustration';

import { useAppContext } from './context/AppContext';

import './App.css';
import { RemainingAttemptsDisplay } from './components/RemainingAttemptsDisplay';

function App() {
  const {remainingAttempts} = useAppContext();
  return (
    <>
      <main>
        <div className="container">
          <div className="game-section">
            <Illustration remainingAttempts={remainingAttempts} />
            <RemainingAttemptsDisplay remainingAttempts={remainingAttempts} />
            <WordInProgress />
            <Keyboard />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
