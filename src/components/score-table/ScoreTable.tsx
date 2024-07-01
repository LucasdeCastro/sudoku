import classNames from "classnames";
import { formatMinutes } from "../../helpers";
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
            const hasDates = value?.startDate && value.endDate;
            const isLatest = difficulty === "latest";
            return (
              <tr
                className={classNames({
                  [styles.latest]: isLatest,
                })}
                key={difficulty}
              >
                <th scope="row">
                  {difficulty}
                  {isLatest ? ` (${value?.difficulty})` : null}
                </th>
                <td>
                  {hasDates
                    ? formatMinutes(value?.startDate, value?.endDate)
                    : "-"}
                </td>
                <td>{value?.errors || "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
