import { GenerationBar } from '../GenerationBar';

export const GenerationSelector = () => {
  return (
    <>
      <div>
        <h4>Choose the Pokémon Generation</h4>
        <p>The higher the generation, the more uncommon Pokémons you will come across.</p>
      </div>
      <GenerationBar></GenerationBar>
    </>
  )
}
