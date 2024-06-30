import { useNavigate } from "react-router-dom";
import { Controls } from "../components/controls/Controls";
import { Header } from "../components/header/Header";
import { ScoreTable } from "../components/score-table/ScoreTable";
import { GameDifficulty } from "../game/sudoku";
import { useSudokuStore } from "../useSudokuStore";

export function Home() {
  const navigate = useNavigate();
  const { currentGame, score } = useSudokuStore((state) => ({
    currentGame: state.currentGame,
    score: state.score,
  }));
  const createNewPuzzle = useSudokuStore((state) => state.createNewPuzzle);

  const handleClick = async (difficulty: GameDifficulty) => {
    createNewPuzzle(difficulty).then(() => {
      navigate("/puzzle");
    });
  };

  const handleOnContinue = () => {
    navigate("/puzzle");
  };

  return (
    <div className="full-screen">
      <section className="main-section">
        <Header title="Sudoku" />
        <ScoreTable score={score} />
        <Controls
          onClick={handleClick}
          onContinue={currentGame.board ? handleOnContinue : undefined}
        />
      </section>
    </div>
  );
}
