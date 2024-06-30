import { useMemo, useState } from "react";
import "./App.css";
import { Board } from "./components/board/Board";
import {
  GameDifficulty,
  SudokuBoard,
  cloneSudokuBoard,
  createSudokuPuzzle,
  getPuzzleMissingPieces,
} from "./game/sudoku";

type ErrorPlay = { row: number; column: number; value: number };

type SelectionState = {
  row: number;
  column: number;
  value: number;
};

function App() {
  const [errors, setErrors] = useState<ErrorPlay[]>([]);
  const [board, setBoard] = useState<SudokuBoard>();
  const [puzzle, setPuzzle] = useState<SudokuBoard>();
  const [selected, setSelected] = useState<SelectionState>();
  const [difficulty, setDifficulty] = useState<GameDifficulty>("easy");

  const handleClick = (row: number, column: number, value: number) => {
    setSelected({ row, column, value });
  };

  const handleNewGame = () => {
    createSudokuPuzzle(difficulty).then((result) => {
      if (result.puzzle) {
        setBoard(result.board);
        setPuzzle(result.puzzle);
      }
    });
  };

  const handleSetNumber = (row: number, column: number, value: number) => {
    if (!board || !puzzle) return;

    // Clear the errors
    setErrors(
      errors.filter((error) => error.row !== row && error.column !== column)
    );

    if (value !== board[row][column]) {
      setErrors((errors) => (errors || []).concat({ row, column, value }));
      return;
    }

    setPuzzle((puzzle) => {
      const clone = cloneSudokuBoard(puzzle || []);
      clone[row][column] = value;
      return clone;
    });
  };

  const handlePlay = (value: number) => {
    if (!selected || selected.value !== 0 || !value) return;
    handleSetNumber(selected.row, selected.column, value);
  };

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

  return (
    <div className="full-screen">
      <section className="main-section">
        <header className="header">
          <h1>Sudoku</h1>
        </header>

        <section className="board-section">
          {puzzle && (
            <Board
              errors={errors}
              selected={selected}
              onClick={handleClick}
              board={puzzle}
            />
          )}
        </section>

        <section className="numbers">
          {board &&
            missingPieces.map((piece) => (
              <button onClick={() => handlePlay(piece.value)}>
                <div>{piece.value}</div>
                <span>{piece.quantity}</span>
              </button>
            ))}
        </section>

        {!board && (
          <section className="controls">
            <label className="select-label">
              Difficulty
              <select
                id="level"
                className="select"
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

            <button className="button" onClick={handleNewGame}>
              New Game
            </button>
          </section>
        )}
      </section>
    </div>
  );
}

export default App;
