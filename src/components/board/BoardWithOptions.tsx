import { useEffect, useState } from "react";
import { GameDifficulty, SudokuBoard } from "../../game/sudoku";
import { Options } from "./Options";
import { Board } from "./Board";
import { useErrors } from "./useErrors";
import { useMissingPieces } from "./useMissingPieces";
import styles from "./BoardWithOptions.module.css";
import { Timer } from "../timer/Timer";

type SelectionState = {
  row: number;
  column: number;
  value: number;
};

export const BoardWithOptions = ({
  board,
  puzzle,
  start,
  difficulty,
  onUpdatePuzzle,
  onVictory,
}: {
  board: SudokuBoard;
  puzzle: SudokuBoard;
  start: number | null;
  difficulty: GameDifficulty | null;
  onVictory: (numberOfErrors: number) => void;
  onUpdatePuzzle: (row: number, column: number, value: number) => void;
}) => {
  const [errors, numberOfErrors, syncErrors] = useErrors();
  const [selected, setSelected] = useState<SelectionState>();
  const missingPieces = useMissingPieces(board, puzzle);

  const handleClick = (row: number, column: number, value: number) => {
    setSelected({ row, column, value });
  };

  const handleSetNumber = (row: number, column: number, value: number) => {
    if (!board || !puzzle) return;

    if (!syncErrors(board, row, column, value)) {
      onUpdatePuzzle(row, column, value);
      setSelected({ row, column, value });
    }
  };

  const handlePlay = (value: number) => {
    if (!selected || selected.value !== 0 || !value) return;
    handleSetNumber(selected.row, selected.column, value);
  };

  useEffect(() => {
    if (missingPieces.length === 0) {
      onVictory(numberOfErrors);
    }
  }, [missingPieces, numberOfErrors, onVictory]);

  return (
    <>
      <section className={styles.header}>
        <span>Errors: {numberOfErrors}</span>
        <span className={styles.level}>Level: {difficulty}</span>
        <span>
          Time: <Timer start={start || 0} />
        </span>
      </section>
      <section>
        {puzzle && (
          <Board
            errors={errors}
            selected={selected}
            onClick={handleClick}
            board={puzzle}
          />
        )}
      </section>

      <Options missingPieces={missingPieces} onClick={handlePlay} />
    </>
  );
};

export default BoardWithOptions;
