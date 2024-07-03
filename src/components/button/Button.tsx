import { ReactNode } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

export const Button = ({
  children,
  onClick,
  theme = "primary",
}: {
  children: ReactNode;
  onClick: () => void;
  theme?: "secondary" | "primary";
}) => {
  return (
    <button
      className={classNames(styles.button, {
        [styles.secondary]: theme === "secondary",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
