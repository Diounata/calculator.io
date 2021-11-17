import styles from '@styles/index.module.scss';

import Title from 'utils/Title';
import Header from 'Components/Header';
import Result from 'Components/Result';
import Keypad from 'Components/Keypad';

export default function Home() {
  return (
    <div className={`dark-theme ${styles.container}`}>
      <Title />

      <Header />
      <Result />
      <Keypad />
    </div>
  );
}
