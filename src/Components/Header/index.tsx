import styles from './styles.module.scss';

import { useTheme } from 'Contexts/ThemeContext';

type ThemeProps = 'dark' | 'light' | 'alt';

export default function Header() {
  const { currentTheme, updateTheme } = useTheme();

  const themes: ThemeProps[] = ['dark', 'light', 'alt'];

  return (
    <header className={styles.headerContainer}>
      <h3>calc</h3>

      <div className={styles.themeContainer}>
        <h3>THEME</h3>

        <div>
          {themes.map((theme, key) => (
            <div
              className={currentTheme === theme ? styles.selected : undefined}
              onClick={() => updateTheme(theme)}
              key={key}
            ></div>
          ))}
        </div>
      </div>
    </header>
  );
}
