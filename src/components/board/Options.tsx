import styles from "./Options.module.css";

type MissingPiece = { value: number; quantity: number };

export const Options = ({
  missingPieces,
  onClick,
}: {
  missingPieces: MissingPiece[];
  onClick: (value: number) => void;
}) => {
  return (
    <section className={styles.options}>
      {missingPieces.length &&
        missingPieces.map((piece) => (
          <button
            key={`${piece.value}-${piece.quantity}`}
            onClick={() => onClick(piece.value)}
          >
            <div>{piece.value}</div>
            <span>{piece.quantity}</span>
          </button>
        ))}
    </section>
  );
};
