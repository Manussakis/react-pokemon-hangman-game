import { Keyboard } from './components/Keyboard';
import { WordInProgress } from './components/WordInProgress';
import { Avatar } from './components/Avatar';
import { AttemptsDisplay } from './components/AttemptsDisplay';

import { useAppContext } from './context/AppContext';

import './App.css';

function App() {
  const { gameState: { pokemonData: { name, image, flavorText }, remainingAttempts, wordInProgress }, onFindNewPokemon } = useAppContext();
  return (
    <>
      <main>
        <div className="container">
          <AttemptsDisplay remainingAttempts={remainingAttempts} />
          <Avatar name={name} image={image} flavorText={flavorText} />
          <WordInProgress wordInProgress={wordInProgress} />
          <Keyboard />
          <button onClick={onFindNewPokemon}>Find new Pokémon</button>
        </div>
      </main>
    </>
  );
}

export default App;
