import { useState } from "react";
import { GameDifficulty } from "../../game/sudoku";
import styles from "./Controls.module.css";
import { DifficultySelect } from "./DifficultySelect";
import classNames from "classnames";

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

      <button className={styles.button} onClick={handleNewGame}>
        New Game
      </button>

      {onContinue && (
        <button
          className={classNames(styles.button, styles.secondary)}
          onClick={onContinue}
        >
          Continue
        </button>
      )}
    </section>
  );
};
