import { useState } from "react";
import "./board.css";
import classNames from "classnames";

type SelectionState = {
  row: number;
  column: number;
  value: number;
};

export const Board = ({ board }: { board: number[][] }) => {
  const [selected, setSelected] = useState<SelectionState>();

  const handleClick = (row: number, column: number, value: number) => {
    setSelected({ row, column, value });
  };

  const selectedBlock = selected
    ? `${Math.trunc(selected.row / 3)}-${Math.trunc(selected.column / 3)}`
    : "-1";

  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return (
          <div
            className={classNames("row", {
              selected: selected && selected.row === rowIndex,
            })}
          >
            {row.map((value, columnIndex) => {
              const block = `${Math.trunc(rowIndex / 3)}-${Math.trunc(
                columnIndex / 3
              )}`;

              return (
                <div
                  data-row={rowIndex}
                  data-column={columnIndex}
                  data-block={block}
                  className={classNames("column", {
                    selected:
                      (selected && selected.column === columnIndex) ||
                      (selected && selectedBlock === block),
                  })}
                >
                  <button
                    onClick={() => handleClick(rowIndex, columnIndex, value)}
                    className={classNames("item", {
                      selected: selected && selected.value === value,
                    })}
                  >
                    {value}
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
