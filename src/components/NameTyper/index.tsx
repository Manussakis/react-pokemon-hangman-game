import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Button } from "../Button";
import { ButtonTypeEnum } from "../Button/enums";
import { WordInProgress } from "../WordInProgress";

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
      <Button type={ButtonTypeEnum.PRIMARY} onClick={handleSubmitTypedName} disabled={tempName.includes('')}>
        Confirm name
      </Button>
      <Button type={ButtonTypeEnum.LINK} onClick={onCancel}>
        Cancel
      </Button>
    </div>
  )
}
