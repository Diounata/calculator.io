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
    formatNumber,
  } = useMath();

  return (
    <div className={styles.resultContainer}>
      <div>
        {previousNumber !== null && formatNumber(previousNumber)}
        <span>{previousNumber !== null && lastUsedMathOperator}</span>
      </div>

      <div>
        {isCurrentNumberNegative && '-'}
        {formatNumber(currentNumber)}
        {isCurrentNumberDecimal && `.${currentDecimalNumber}`}
      </div>
    </div>
  );
}
