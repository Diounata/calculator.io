import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export const MathContext = createContext({} as ContextProps);

interface ChildrenProps {
  children: ReactNode;
}

type MathOperatorsSignProps = '+' | '-' | '×' | '÷' | null;
type MathOperatorsNameProps = 'sum' | 'subtract' | 'multiply' | 'divide' | 'error';

interface ContextProps {
  previousNumber: number | null;
  currentNumber: number;
  currentMathOperator: MathOperatorsSignProps;
  lastUsedMathOperator: MathOperatorsSignProps;
  isCurrentNumberNegative: boolean;

  formatNumber(number: number): string;
  addNumber(number: number): void;
  getFinalResult(): void;
  deleteNumber(): void;
  resetOperation(): void;
  updateCurrentMathOperator(value: MathOperatorsSignProps): void;
}

export function MathProvider({ children }: ChildrenProps) {
  const [previousNumber, setPreviousNumber] = useState<number | null>(null);
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [currentMathOperator, setCurrentMathOperator] = useState<MathOperatorsSignProps>(null);
  const [lastUsedMathOperator, setLastUsedMathOperator] = useState<MathOperatorsSignProps>(null);
  const [isCurrentNumberNegative, setIsCurrentNumberNegative] = useState(false);
  const [isCountFinished, setIsCountFinished] = useState(false);

  function formatNumber(number: number): string {
    const numberString = new Intl.NumberFormat().format(number);

    return numberString;
  }

  function addNumber(number: number): void {
    const newNumber = Number(String(currentNumber) + number);

    if (isCountFinished) setIsCountFinished(false);

    setCurrentNumber(newNumber);
  }

  function getFinalResult(): void {
    const finalResult = calcPreviousNumberByCurrentNumber();

    setIsCountFinished(true);
    setCurrentNumber(finalResult);
    setPreviousNumber(null);
    setCurrentMathOperator(null);
    setIsCurrentNumberNegative(false);
  }

  function deleteNumber(): void {
    const newNumber = Math.floor(currentNumber / 10);

    setCurrentNumber(newNumber);
  }

  function resetOperation(): void {
    setPreviousNumber(null);
    setCurrentNumber(0);
    setCurrentMathOperator(null);
    setIsCurrentNumberNegative(false);
  }

  function updateCurrentMathOperator(value: MathOperatorsSignProps): void {
    if (isCountFinished) setIsCountFinished(false);

    if (currentNumber === 0 && value === '-') {
      setIsCurrentNumberNegative(prev => !prev);
    } else setCurrentMathOperator(value);
  }

  function getCurrentNumberWithItsOperator(): number {
    const number = isCurrentNumberNegative ? currentNumber * -1 : currentNumber;

    return number;
  }

  function getMathOperatorName(): MathOperatorsNameProps {
    switch (lastUsedMathOperator) {
      case '+':
        return 'sum';
      case '-':
        return 'subtract';
      case '×':
        return 'multiply';
      case '÷':
        return 'divide';
      default:
        return 'error';
    }
  }

  function calcPreviousNumberByCurrentNumber(): number {
    const latestNumber = getCurrentNumberWithItsOperator();

    if (previousNumber === null) return latestNumber;
    else {
      const mathOperator = getMathOperatorName();

      const operation = {
        sum: previousNumber + latestNumber,
        subtract: previousNumber - latestNumber,
        multiply: previousNumber * latestNumber,
        divide: previousNumber / latestNumber,
        error: -1,
      };

      return operation[mathOperator];
    }
  }

  useEffect(() => {
    if (currentMathOperator === null || currentNumber === 0 || isCountFinished) return;

    const newPreviousNumber = calcPreviousNumberByCurrentNumber();

    setPreviousNumber(newPreviousNumber);
    setIsCurrentNumberNegative(false);
    setCurrentNumber(0);
    setLastUsedMathOperator(currentMathOperator);
    setCurrentMathOperator(null);
  }, [currentMathOperator]);

  return (
    <MathContext.Provider
      value={{
        previousNumber,
        currentNumber,
        currentMathOperator,
        lastUsedMathOperator,
        isCurrentNumberNegative,
        formatNumber,
        addNumber,
        getFinalResult,
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
