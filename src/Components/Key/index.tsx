import styles from './styles.module.scss';

import { useMath } from 'Contexts/MathContext';

interface KeyProps {
  children: string;
  number?: number;
  actionType?: 'number' | 'delete' | 'reset' | 'undefined';
}

export default function Key({ children, actionType = 'number', number = 0 }: KeyProps) {
  const { addNumber, deleteNumber, resetNumber } = useMath();

  function buttonAction() {
    switch (actionType) {
      case 'number':
        addNumber(number);
        break;
      case 'delete':
        deleteNumber();
        break;
      case 'reset':
        resetNumber();
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
