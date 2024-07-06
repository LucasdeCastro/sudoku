import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardWithOptions from "../components/board/BoardWithOptions";
import { Button } from "../components/button/Button";
import { Header } from "../components/header/Header";
import { ScoreModal } from "../components/modal/ScoreModal";
import { useSudokuStore } from "../useSudokuStore";

export function Puzzle() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<number>();
  const [victory, setVictory] = useState<boolean | null>(null);

  const { currentGame, updatePuzzleValue, finishGame } = useSudokuStore(
    (state) => ({
      currentGame: state.currentGame,
      updatePuzzleValue: state.updatePuzzleValue,
      finishGame: state.finishGame,
    })
  );

  const handleVictory = (errors: number) => {
    setErrors(errors);
    setVictory(true);
  };

  const handleFail = (errors: number) => {
    setErrors(errors);
    setVictory(false);
  };

  const handleOnClose = () => {
    navigate("/");
    finishGame(errors || 0);
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
            onFail={handleFail}
          />
        )}

        {!showBoard && <Button onClick={() => navigate("/")}>Back Home</Button>}
      </section>

      <ScoreModal
        title={"You Win!"}
        show={victory === true}
        onClose={handleOnClose}
      />

      <ScoreModal
        title={"You Lose!!"}
        show={victory === false}
        onClose={handleOnClose}
      />
    </div>
  );
}
