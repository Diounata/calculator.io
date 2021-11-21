import styles from './styles.module.scss';

import { useMath } from 'Contexts/MathContext';

export default function Result() {
  const { previousNumber, currentNumber, lastUsedMathOperator, isCurrentNumberNegative, formatNumber } = useMath();

  return (
    <div className={styles.resultContainer}>
      <div>
        {previousNumber !== null && previousNumber}
        <span>{previousNumber !== null && lastUsedMathOperator}</span>
      </div>

      <div>
        {isCurrentNumberNegative && '-'}
        {formatNumber(currentNumber)}
      </div>
    </div>
  );
}
