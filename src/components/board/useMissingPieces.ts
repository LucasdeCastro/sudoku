import { useMemo } from "react";
import { SudokuBoard, getPuzzleMissingPieces } from "../../game/sudoku";

export const useMissingPieces = (board: SudokuBoard, puzzle: SudokuBoard) => {
  const missingPieces = useMemo(() => {
    if (board && puzzle) {
      const missingPieces = getPuzzleMissingPieces(board, puzzle);
      const entries = Array.from(missingPieces.entries());
      return entries
        .map(([value, quantity]) => ({ value, quantity }))
        .sort((a, b) => a.value - b.value);
    }

    return [];
  }, [board, puzzle]);

  return missingPieces;
};
