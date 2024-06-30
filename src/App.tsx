import { useMemo, useState } from "react";
import "./App.css";
import { createSudokuBoard } from "./game/sudoku";
import { Board } from "./components/board";

function App() {
  const [board, setBoard] = useState<number[][]>();

  const handelPlay = () => createSudokuBoard().then((board) => setBoard(board));
  const numbers = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9], []);

  console.log({
    board,
  });

  return (
    <div className="full-screen">
      <section className="main-section">
        <header className="header">
          <h1>Sudoku</h1>
        </header>

        <section className="board-section">
          {board && <Board board={board} />}
        </section>

        <section className="numbers">
          {board &&
            numbers.map((num) => (
              <button>
                <div>{num}</div>
                <span>0</span>
              </button>
            ))}
        </section>

        {!board && (
          <section className="controls">
            <button className="button" onClick={handelPlay}>
              New Game
            </button>
          </section>
        )}
      </section>
    </div>
  );
}

export default App;
