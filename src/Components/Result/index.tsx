import styles from './styles.module.scss';

import { useMath } from 'Contexts/MathContext';

export default function Result() {
  const { previousNumber, currentNumber, currentMathOperator, isCurrentNumberNegative, formatNumber } =
    useMath();

  function formatPreviousNumber(): string {
    const numberString = previousNumber < 0 ? `(${previousNumber})` : `${previousNumber}`;

    return numberString;
  }

  return (
    <div className={styles.resultContainer}>
      <div>
        <span>{currentMathOperator}</span>
        {previousNumber !== 0 && formatPreviousNumber()}
      </div>

      <div>
        {isCurrentNumberNegative && '-'}
        {formatNumber(currentNumber)}
      </div>
    </div>
  );
}
