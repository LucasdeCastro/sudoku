import classNames from "classnames";
import styles from "./Modal.module.css";

export const Modal = ({
  show = false,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className={classNames(styles.modal, { [styles.visible]: show })}>
      <section className={styles.content}>{children}</section>
    </div>
  );
};
