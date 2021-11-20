import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export const MathContext = createContext({} as ContextProps);

interface ChildrenProps {
  children: ReactNode;
}

type MathOperatorsProps = '+' | '-' | '×' | '÷' | null;

interface ContextProps {
  previousNumber: number;
  currentNumber: number;
  currentMathOperator: MathOperatorsProps;
  isCurrentNumberNegative: boolean;

  formatNumber(number: number): string;
  addNumber(number: number): void;
  deleteNumber(): void;
  resetOperation(): void;
  updateCurrentMathOperator(value: MathOperatorsProps): void;
}

export function MathProvider({ children }: ChildrenProps) {
  const [previousNumber, setPreviousNumber] = useState<number>(10);
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [currentMathOperator, setCurrentMathOperator] = useState<MathOperatorsProps>(null);
  const [isCurrentNumberNegative, setIsCurrentNumberNegative] = useState(false);

  function formatNumber(number: number): string {
    const numberString = new Intl.NumberFormat().format(number);

    return numberString;
  }

  function addNumber(number: number): void {
    const newNumber = Number(String(currentNumber) + number);

    setCurrentNumber(newNumber);
  }

  function deleteNumber(): void {
    const newNumber = Math.floor(currentNumber / 10);

    setCurrentNumber(newNumber);
  }

  function resetOperation(): void {
    setPreviousNumber(0);
    setCurrentNumber(0);
    setCurrentMathOperator(null);
    setIsCurrentNumberNegative(false);
  }

  function updateCurrentMathOperator(value: MathOperatorsProps): void {
    if (currentNumber === 0 && value === '-') {
      setIsCurrentNumberNegative(prev => !prev);
    } else setCurrentMathOperator(value);
  }

  function getCurrentNumberWithItsOperator(): number {
    const number = isCurrentNumberNegative ? currentNumber * -1 : currentNumber;

    return number;
  }

  useEffect(() => {
    if (currentNumber === 0) return;

    const number = getCurrentNumberWithItsOperator();

    setPreviousNumber(number);
    setIsCurrentNumberNegative(false);
    setCurrentNumber(0);
  }, [currentMathOperator]);

  return (
    <MathContext.Provider
      value={{
        previousNumber,
        currentNumber,
        currentMathOperator,
        isCurrentNumberNegative,
        formatNumber,
        addNumber,
        deleteNumber,
        resetOperation,
        updateCurrentMathOperator,
      }}
    >
      {children}
    </MathContext.Provider>
  );
}

export function useMath() {
  return useContext(MathContext);
}
