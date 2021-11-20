import styles from './styles.module.scss';

import { useMath } from 'Contexts/MathContext';

export default function Result() {
  const { currentNumber, formatNumber } = useMath();

  return <div className={styles.resultContainer}>{formatNumber(currentNumber)}</div>;
}
