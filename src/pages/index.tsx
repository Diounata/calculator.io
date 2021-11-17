import styles from '@styles/index.module.scss';

import Result from 'Components/Result';

export default function Home() {
  return (
    <div className={`dark-theme ${styles.container}`}>
      <Result />
    </div>
  );
}
