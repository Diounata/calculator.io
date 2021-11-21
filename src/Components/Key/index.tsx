import styles from './styles.module.scss';

import { useMath } from 'Contexts/MathContext';

type MathOperatorsProps = '+' | '-' | '×' | '÷' | null;

interface KeyProps {
  children: string;
  number?: number;
  operator?: MathOperatorsProps;
  actionType?: 'number' | 'delete' | 'reset' | 'operator' | 'result' | 'undefined';
}

export default function Key({ children, actionType = 'number', number = 0, operator = null }: KeyProps) {
  const { addNumber, updateCurrentMathOperator, deleteNumber, resetOperation, getFinalResult } = useMath();

  function buttonAction() {
    switch (actionType) {
      case 'number':
        addNumber(number);
        break;
      case 'operator':
        updateCurrentMathOperator(operator);
        break;
      case 'result':
        getFinalResult();
        break;
      case 'delete':
        deleteNumber();
        break;
      case 'reset':
        resetOperation();
        break;
      default:
        return;
    }
  }

  return (
    <div className={styles.keyContainer} onClick={buttonAction}>
      {children}
    </div>
  );
}
