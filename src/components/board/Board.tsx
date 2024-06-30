import classNames from "classnames";
import styles from "./Board.module.css";

type BoardProps = {
  board: number[][];
  selected: { row: number; column: number; value: number } | undefined;
  onClick: (row: number, column: number, value: number) => void;
  errors: { row: number; column: number; value: number }[];
};

export const Board = ({ board, onClick, selected, errors }: BoardProps) => {
  const selectedBlock = selected
    ? `${Math.trunc(selected.row / 3)}-${Math.trunc(selected.column / 3)}`
    : "-1";

  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) => {
        return (
          <div
            key={`row-${rowIndex}`}
            className={classNames(styles.row, {
              selected: selected && selected.row === rowIndex,
            })}
          >
            {row.map((value, columnIndex) => {
              const block = `${Math.trunc(rowIndex / 3)}-${Math.trunc(
                columnIndex / 3
              )}`;

              const error = errors.find(
                (error) =>
                  error.row === rowIndex && error.column === columnIndex
              );
              const fullSelected =
                selected &&
                selected.column === columnIndex &&
                selected.row === rowIndex;
              const number = error?.value || (value > 0 ? value : "");

              return (
                <div
                  key={`column-${columnIndex}`}
                  data-row={rowIndex}
                  data-column={columnIndex}
                  data-block={block}
                  className={classNames(styles.column, {
                    [styles.selected]:
                      (selected && selected.column === columnIndex) ||
                      (selected && selectedBlock === block),
                  })}
                >
                  <button
                    onClick={() => onClick(rowIndex, columnIndex, value)}
                    className={classNames(styles.item, {
                      [styles.selected]:
                        selected && value !== 0 && selected.value === value,
                      [styles.fullSelected]: fullSelected,
                      [styles.error]: !!error,
                    })}
                  >
                    {number}
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};