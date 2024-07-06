import { useEffect, useState } from "react";
import { GameDifficulty, SudokuBoard } from "../../game/sudoku";
import { Button } from "../button/Button";
import { Timer } from "../timer/Timer";
import { Board } from "./Board";
import styles from "./BoardWithOptions.module.css";
import { Options } from "./Options";
import { useErrors } from "./useErrors";
import { useMissingPieces } from "./useMissingPieces";

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
  onFail,
}: {
  board: SudokuBoard;
  puzzle: SudokuBoard;
  start: number | null;
  difficulty: GameDifficulty | null;
  onVictory: (numberOfErrors: number) => void;
  onFail: (numberOfErrors: number) => void;
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

  const handleAutoComplete = () => {
    board.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        if (puzzle[rowIndex][columnIndex] === 0) {
          onUpdatePuzzle(rowIndex, columnIndex, value);
        }
      });
    });
  };

  useEffect(() => {
    if (missingPieces.length === 0) {
      onVictory(numberOfErrors);
    }
  }, [missingPieces, numberOfErrors, onVictory]);

  useEffect(() => {
    if (numberOfErrors >= 3) {
      onFail(numberOfErrors);
    }
  }, [numberOfErrors, onFail]);

  return (
    <>
      <section className={styles.header}>
        <span>Errors: {numberOfErrors}/3</span>
        <span className={styles.level}>Level: {difficulty}</span>
        <span>
          Time: <Timer start={start || 0} />
        </span>
      </section>
      <section className={styles.boardSection}>
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
      {missingPieces.length <= 2 ? (
        <section className={styles.autoCompleteSection}>
          <Button theme="secondary" onClick={handleAutoComplete}>
            Auto Complete
          </Button>
        </section>
      ) : null}
    </>
  );
};

export default BoardWithOptions;
