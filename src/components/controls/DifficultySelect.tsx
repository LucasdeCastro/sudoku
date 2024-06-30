import { GameDifficulty } from "../../game/sudoku";
import styles from "./DifficultySelect.module.css";

export const DifficultySelect = ({
  setDifficulty,
}: {
  setDifficulty: (difficulty: GameDifficulty) => void;
}) => {
  return (
    <label className={styles["select-label"]}>
      Difficulty
      <select
        id="level"
        className={styles.select}
        onChange={(event) => {
          setDifficulty(event.target.value as GameDifficulty);
        }}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        <option value="expert">Expert</option>
      </select>
    </label>
  );
};
