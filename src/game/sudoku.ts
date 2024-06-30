import { log } from "console";

export const isValidSudokuBoard = (
  board: number[][],
  row: number,
  col: number,
  num: number
) => {
  // Validate by row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) {
      return false;
    }
  }

  // Validate by column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }

  // Validate by section
  const startRow = 3 * Math.trunc(row / 3);
  const startCol = 3 * Math.trunc(col / 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }

  return true;
};

export const getRandomList = () => {
  let values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const getRandomIndex = () => Math.trunc(Math.random() * values.length);
  return Array.from(new Array(9)).map(() => {
    const index = getRandomIndex();
    const value = values[index];
    values = values.filter((n) => n !== value);
    return value;
  });
};

export const createEmptySudokuBoard = () => {
  return Array.from(new Array(9)).map(() => new Array(9).fill(0));
};

export const resolveSudokuBoard = (board: number[][]) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const sequence = getRandomList();
        for (let k = 0; k < sequence.length; k++) {
          const num = sequence[k];
          if (isValidSudokuBoard(board, row, col, num)) {
            board[row][col] = num;
            if (resolveSudokuBoard(board)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }

  return true;
};

export const createSudokuBoard = async () => {
  const board = createEmptySudokuBoard();
  resolveSudokuBoard(board);
  return board;
};
