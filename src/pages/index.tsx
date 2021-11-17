import styles from '@styles/index.module.scss';

import Header from 'Components/Header';
import Result from 'Components/Result';

export default function Home() {
  return (
    <div className={`dark-theme ${styles.container}`}>
      <Header />
      <Result />
    </div>
  );
}
