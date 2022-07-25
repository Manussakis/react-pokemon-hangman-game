import { ReactComponent as Pokeball } from '../../assets/pokeball.svg';
import { Button } from '../Button';
import { ButtonTypeEnum } from '../Button/enums';

import { useAppContext } from '../../contexts/AppContext';

import './style.scss';

export const Introduction = () => {
  const { onStartGame } = useAppContext();

  return (
    <div className="introduction text-center">
      <Pokeball className="introduction__icon" />
      <h1>Can you spell any Pokémon name?</h1>
      <div className="introduction__content">
        <p>This is a Pokémon version of the hangman game.</p>
        <p>A random Pokémon will appear, can you spell its name correctly? You'll have 6 attemps to do that.</p>
        <p className="font-bold">Good luck!</p>
      </div>
      <Button type={ButtonTypeEnum.PRIMARY} onClick={() => onStartGame()}>Start</Button>
    </div>
  )
}
