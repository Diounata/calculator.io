import styles from './styles.module.scss';

import { useMath } from 'Contexts/MathContext';

export default function Result() {
  const {
    previousNumber,
    currentNumber,
    currentDecimalNumber,
    lastUsedMathOperator,
    isCurrentNumberNegative,
    isCurrentNumberDecimal,
    hasBugResult,
    formatNumber,
  } = useMath();

  function getDecimalNumber() {
    if (isCurrentNumberDecimal) {
      if (!currentDecimalNumber) return;

      return currentDecimalNumber;
    }
  }

  return (
    <div className={styles.resultContainer}>
      <div>
        {previousNumber !== null && formatNumber(previousNumber)}
        <span>{previousNumber !== null && lastUsedMathOperator}</span>
      </div>

      <div>
        {isCurrentNumberNegative && '-'}
        {hasBugResult ? <span>Can't divide by 0</span> : formatNumber(currentNumber)}
        {isCurrentNumberDecimal && '.'}
        {getDecimalNumber()}
      </div>
    </div>
  );
}
