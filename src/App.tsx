import { Keyboard } from './components/Keyboard';
import { WordInProgress } from './components/WordInProgress';
import { Illustration } from './components/Illustration';

import { useAppContext } from './context/AppContext';

import './App.css';

function App() {
  const {remainingAttempts} = useAppContext();
  return (
    <>
      <main>
        <div className="container">
          <Illustration remainingAttempts={remainingAttempts} />
          <WordInProgress />
          <Keyboard />
        </div>
      </main>
    </>
  );
}

export default App;
