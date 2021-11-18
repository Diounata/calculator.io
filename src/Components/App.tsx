import styles from '@styles/index.module.scss';

import Title from 'utils/Title';
import Header from 'Components/Header';
import Result from 'Components/Result';
import Keypad from 'Components/Keypad';

import { useTheme } from 'Contexts/ThemeContext';

export default function App() {
  const { currentTheme } = useTheme();

  return (
    <div className={`${currentTheme} ${styles.container}`}>
      <Title />

      <Header />
      <Result />
      <Keypad />
    </div>
  );
}
