import { Keyboard } from './components/Keyboard';
import { WordInProgress } from './components/WordInProgress';
import { Illustration } from './components/Illustration';
import { Avatar } from './components/Avatar';
import { RemainingAttemptsDisplay } from './components/RemainingAttemptsDisplay';

import { useAppContext } from './context/AppContext';

import './App.css';

function App() {
  const { gameState: { pokemonData: { name, image }, remainingAttempts }, onFindNewPokemon } = useAppContext();
  return (
    <>
      <main>
        <div className="container">
          <Avatar name={name} image={image} />
          <button onClick={onFindNewPokemon}>Find new Pokémon</button>
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
