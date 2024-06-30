import styles from "./Header.module.css";

export const Header = ({ title }: { title: string }) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
    </header>
  );
};
