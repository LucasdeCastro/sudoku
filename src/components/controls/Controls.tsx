import { useState } from "react";
import { GameDifficulty } from "../../game/sudoku";
import { Button } from "../button/Button";
import styles from "./Controls.module.css";
import { DifficultySelect } from "./DifficultySelect";

export const Controls = ({
  onContinue,
  onClick,
}: {
  onContinue?: () => void;
  onClick: (difficulty: GameDifficulty) => void;
}) => {
  const [difficulty, setDifficulty] = useState<GameDifficulty>("easy");
  const handleNewGame = () => {
    onClick(difficulty);
  };

  return (
    <section className={styles.controls}>
      <DifficultySelect
        setDifficulty={(level: GameDifficulty) => setDifficulty(level)}
      />

      <Button onClick={handleNewGame}>New Game</Button>

      {onContinue && (
        <Button theme="secondary" onClick={onContinue}>
          Continue
        </Button>
      )}
    </section>
  );
};
