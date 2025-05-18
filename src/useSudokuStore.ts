import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  GameDifficulty,
  SudokuBoard,
  cloneSudokuBoard,
  createSudokuPuzzle,
} from "./game/sudoku";

export type SudokuGameState = {
  difficulty: GameDifficulty | null;
  board: SudokuBoard | null;
  puzzle: SudokuBoard | null;
  startDate: number | null;
  endDate: number | null;
};

export type Score = Record<
  GameDifficulty | "latest",
  {
    startDate: number;
    endDate: number;
    errors: number;
    difficulty?: GameDifficulty;
  } | null
>;

type SudokuStore = {
  currentGame: SudokuGameState;
  score: Score;
  createNewPuzzle: (difficulty: GameDifficulty) => Promise<void>;
  updatePuzzleValue: (row: number, column: number, value: number) => void;
  finishGame: (numberOfErrors: number, victory: boolean) => void;
};

export const useSudokuStore = create<SudokuStore>()(
  persist(
    (set) => ({
      currentGame: {
        difficulty: null,
        board: null,
        puzzle: null,
        startDate: null,
        endDate: null,
      },
      score: {
        easy: null,
        medium: null,
        hard: null,
        expert: null,
        latest: null,
      },

      createNewPuzzle: async (difficulty: GameDifficulty) => {
        const game = await createSudokuPuzzle(difficulty);

        set((state) => {
          const board = game.puzzle ? game.board : null;
          const puzzle = game.puzzle ? game.puzzle : null;
          const startDate = game.puzzle ? Date.now() : null;

          return {
            ...state,
            currentGame: {
              board,
              puzzle,
              startDate,
              difficulty,
              endDate: null,
            },
          };
        });
      },

      updatePuzzleValue: (row: number, column: number, value: number) => {
        set((state) => {
          const currentGame = state.currentGame;
          if (!currentGame.puzzle || currentGame.puzzle[row][column] !== 0)
            return state;

          const clone = cloneSudokuBoard(currentGame.puzzle || []);
          clone[row][column] = value;

          return {
            ...state,
            currentGame: {
              ...currentGame,
              puzzle: clone,
            },
          };
        });
      },

      finishGame: (numberOfErrors: number, victory: boolean) => {
        set((state) => {
          const newState = { ...state } as SudokuStore;
          const currentGame = state.currentGame;

          if (!currentGame.difficulty || !currentGame.startDate) return state;
          if (!newState.score) {
            newState.score = {
              easy: null,
              medium: null,
              hard: null,
              expert: null,
              latest: null,
            };
          }

          const latest = {
            startDate: currentGame.startDate,
            endDate: Date.now(),
            errors: numberOfErrors,
            difficulty: currentGame.difficulty,
          };

          const currentScore = state.score
            ? state.score[currentGame.difficulty]
            : null;

          if (victory) {
            if (currentScore) {
              const currentRecord =
                currentScore.endDate - currentScore.startDate;
              const interval = latest.endDate - latest.startDate;

              if (interval <= currentRecord) {
                newState.score[currentGame.difficulty] = latest;
              }
            } else {
              newState.score[currentGame.difficulty] = latest;
            }
            newState.score["latest"] = latest;
          }

          newState.currentGame = {
            difficulty: null,
            board: null,
            puzzle: null,
            startDate: null,
            endDate: null,
          };

          return newState;
        });
      },
    }),
    {
      name: "sudoku-storage",
    }
  )
);
