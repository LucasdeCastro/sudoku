import { useNavigate } from "react-router-dom";
import BoardWithOptions from "../components/board/BoardWithOptions";
import { Header } from "../components/header/Header";
import { useSudokuStore } from "../useSudokuStore";

export function Puzzle() {
  const navigate = useNavigate();
  const { currentGame, updatePuzzleValue, finishGame } = useSudokuStore(
    (state) => ({
      currentGame: state.currentGame,
      updatePuzzleValue: state.updatePuzzleValue,
      finishGame: state.finishGame,
    })
  );

  const handleVictory = (errors: number) => {
    finishGame(errors);
    navigate("/");
  };

  const { board, puzzle, difficulty } = currentGame;
  const showBoard = board && puzzle;

  return (
    <div className="full-screen">
      <section className="main-section">
        <Header title="Sudoku" />
        {showBoard && (
          <BoardWithOptions
            board={board}
            puzzle={puzzle}
            difficulty={difficulty}
            start={currentGame.startDate}
            onUpdatePuzzle={updatePuzzleValue}
            onVictory={handleVictory}
          />
        )}
      </section>
    </div>
  );
}
