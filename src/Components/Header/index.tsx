import styles from './styles.module.scss';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <h3>calc</h3>

      <div className={styles.themeContainer}>
        <h3>THEME</h3>

        <div>
          <div className={styles.selected}></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </header>
  );
}
