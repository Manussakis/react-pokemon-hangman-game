import { GenerationBar } from '../GenerationBar';

export const GenerationSelector = () => {
  return (
    <>
      <div>
        <h4>Game level</h4>
        <p>Up to which Pokémon generation do you want to play?</p>
      </div>
      <GenerationBar></GenerationBar>
    </>
  )
}
