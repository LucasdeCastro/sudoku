export type SudokuBoard = number[][];

export const isValidSudokuBoard = (
  board: SudokuBoard,
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

export const createEmptySudokuBoard = (): SudokuBoard => {
  return Array.from(new Array(9)).map(() => new Array(9).fill(0));
};

export const resolveSudokuBoard = (board: SudokuBoard) => {
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

export const getRandomPositions = (qt: number) => {
  const positions = {} as Record<string, [number, number]>;

  let count = qt;
  while (count > 0) {
    const position = [
      Math.trunc(Math.random() * 9),
      Math.trunc(Math.random() * 9),
    ] as [number, number];

    const key = `${position[0]}-${position[1]}`;

    if (!positions[key]) {
      positions[key] = position;
      count--;
    }
  }

  return positions;
};

export type GameDifficulty = "easy" | "medium" | "hard" | "expert";

export const getNumberOfPiecesByDifficulty = (difficulty: GameDifficulty) => {
  const intervalByDifficulty = {
    easy: [32, 36],
    medium: [37, 45],
    hard: [46, 52],
    expert: [53, 58],
  };

  const randomNumber = (start: number, end: number) =>
    start + Math.trunc(Math.random() * (end - start));

  if (!(difficulty in intervalByDifficulty)) return -1;

  const settings = intervalByDifficulty[difficulty];

  return randomNumber(settings[0], settings[1]);
};

export const cloneSudokuBoard = (board: SudokuBoard): SudokuBoard => {
  return board.map((row) => [...row]);
};

export const removeSudokuBoardPieces = (
  board: SudokuBoard,
  numberOfHoles: number
) => {
  const positions = Object.values(getRandomPositions(numberOfHoles));

  for (let i = 0; i < positions.length; i++) {
    const [row, column] = positions[i];
    board[row][column] = 0;
  }

  return board;
};

export const getPuzzleMissingPieces = (
  board: SudokuBoard,
  puzzle: SudokuBoard
) => {
  const missingPieces = new Map<number, number>();

  puzzle.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      if (value === 0) {
        const num = board[rowIndex][columnIndex];
        missingPieces.set(num, (missingPieces.get(num) || 0) + 1);
      }
    });
  });

  return missingPieces;
};

export const createSudokuPuzzle = async (difficulty: GameDifficulty) => {
  const board = await createSudokuBoard();
  const numberOfHoles = getNumberOfPiecesByDifficulty(difficulty);

  if (numberOfHoles >= 0) {
    const puzzle = removeSudokuBoardPieces(
      cloneSudokuBoard(board),
      numberOfHoles
    );

    return { board, puzzle: puzzle };
  }

  return { board, puzzle: null };
};
