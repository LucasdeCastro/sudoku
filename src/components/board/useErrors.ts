import { useCallback, useState } from "react";
import { SudokuBoard } from "../../game/sudoku";

type ErrorPlay = { row: number; column: number; value: number };

export const useErrors = (): [
  ErrorPlay[],
  number,
  (board: SudokuBoard, row: number, column: number, value: number) => void
] => {
  const [numberOfErrors, setErrorsQuantity] = useState<number>(0);
  const [errors, setErrors] = useState<ErrorPlay[]>([]);

  const handleSetErrors = useCallback(
    (board: SudokuBoard, row: number, column: number, value: number) => {
      // Clear the errors
      setErrors(
        errors.filter((error) => error.row !== row && error.column !== column)
      );

      if (value !== board[row][column]) {
        setErrorsQuantity((value) => value + 1);
        setErrors((errors) => (errors || []).concat({ row, column, value }));
      }
    },
    [errors]
  );

  return [errors, numberOfErrors, handleSetErrors];
};
