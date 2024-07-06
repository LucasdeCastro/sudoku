import { useSudokuStore } from "../../useSudokuStore";
import { Button } from "../button/Button";
import { ScoreTable } from "../score-table/ScoreTable";
import { Modal } from "./Modal";
import styles from "./ScoreModal.module.css";

export const ScoreModal = ({
  show,
  title,
  onClose,
}: {
  title: string;
  show: boolean;
  onClose: () => void;
}) => {
  const { score } = useSudokuStore((state) => ({
    score: state.score,
  }));

  return (
    <Modal show={show}>
      <div className={styles.content}>
        <h2>{title}</h2>

        <ScoreTable
          theme="error"
          full={false}
          score={{
            easy: null,
            medium: null,
            hard: null,
            expert: null,
            latest: score.latest,
          }}
        />

        <Button onClick={() => onClose()}>Close</Button>
      </div>
    </Modal>
  );
};
