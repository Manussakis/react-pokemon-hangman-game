import { useState } from "react";
import { Button } from "../Button";
import { ButtonTypeEnum } from "../Button/enums";
import { WordInProgress } from "../WordInProgress";

import './style.scss';

interface NameTyperProps {
  wordInProgress: string[];
  onSubmitTypedName: (typedName: string) => void;
  onCancel: () => void;
}

export const NameTyper = ({ wordInProgress, onSubmitTypedName, onCancel }: NameTyperProps) => {
  const [tempName, setTempName] = useState<string[]>([...wordInProgress]);

  function onType(letter: string, index: number) {
    const newTempName = [...tempName];

    newTempName[index] = letter;
    setTempName(newTempName);
  }

  function handleSubmitTypedName() {
    const typedName: string = tempName.join('');

    onSubmitTypedName(typedName);
  }

  return (
    <div>
      <WordInProgress wordInProgress={wordInProgress} onType={onType} acceptInput />
      <div className="nametyper__buttons">
        <Button type={ButtonTypeEnum.PRIMARY} onClick={handleSubmitTypedName} disabled={tempName.includes('')}>
          Confirm name
        </Button>
        <br />
        <Button type={ButtonTypeEnum.LINK} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
