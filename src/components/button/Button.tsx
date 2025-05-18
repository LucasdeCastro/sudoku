import { ReactNode } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

export const Button = ({
  children,
  onClick,
  theme = "primary",
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  theme?: "secondary" | "primary";
  className?: string;
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        {
          [styles.secondary]: theme === "secondary",
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
