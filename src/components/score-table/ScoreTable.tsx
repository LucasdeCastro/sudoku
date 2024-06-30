import { Score } from "../../useSudokuStore";
import styles from "./ScoreTable.module.css";

export const ScoreTable = ({ score }: { score: Score }) => {
  const values = Object.entries(score);
  const hasValues = values.some(([_, value]) => value && value.startDate);

  if (!hasValues) return null;

  return (
    <section className={styles.section}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th>Difficulty</th>
            <th>Time</th>
            <th>Errors</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {values.map(([difficulty, value]) => {
            const interval = (value?.endDate || 0) - (value?.startDate || 0);
            return (
              <tr key={difficulty}>
                <th scope="row">{difficulty}</th>
                <td>{interval || "-"}</td>
                <td>{value?.errors || "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
