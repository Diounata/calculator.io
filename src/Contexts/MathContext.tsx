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
  currentDecimalNumber: number | null;
  currentMathOperator: MathOperatorsSignProps;
  lastUsedMathOperator: MathOperatorsSignProps;
  isCurrentNumberNegative: boolean;
  isCurrentNumberDecimal: boolean;

  formatNumber(number: number): string;
  addNumber(number: number): void;
  getFinalResult(): void;
  deleteNumber(): void;
  resetOperation(): void;
  updateCurrentMathOperator(value: MathOperatorsSignProps): void;
  toggleIsCurrentNumberDecimal(value: boolean): void;
}

export function MathProvider({ children }: ChildrenProps) {
  const [previousNumber, setPreviousNumber] = useState<number | null>(null);
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [currentDecimalNumber, setCurrentDecimalNumber] = useState<number | null>(null);
  const [currentMathOperator, setCurrentMathOperator] = useState<MathOperatorsSignProps>(null);
  const [lastUsedMathOperator, setLastUsedMathOperator] = useState<MathOperatorsSignProps>(null);
  const [isCurrentNumberNegative, setIsCurrentNumberNegative] = useState(false);
  const [isCurrentNumberDecimal, setIsCurrentNumberDecimal] = useState(false);
  const [isCountFinished, setIsCountFinished] = useState(false);

  function formatNumber(number: number): string {
    const numberString = new Intl.NumberFormat().format(number);

    return numberString;
  }

  function addNumber(number: number): void {
    function concatNumber(number2: number): number {
      return Number(String(number2) + number);
    }

    const newCurrentNumber = concatNumber(currentNumber);

    if (isCountFinished) setIsCountFinished(false);

    if (isCurrentNumberDecimal) {
      if (currentDecimalNumber === null) setCurrentDecimalNumber(0);

      if (currentDecimalNumber !== null) {
        const newCurrentDecimalNumber = concatNumber(currentDecimalNumber);

        setCurrentDecimalNumber(newCurrentDecimalNumber);
      }
    } else setCurrentNumber(newCurrentNumber);
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
    setCurrentMathOperator(null);
    setPreviousNumber(null);
    setCurrentNumber(0);
    setCurrentDecimalNumber(null);
    setIsCurrentNumberNegative(false);
    setIsCurrentNumberDecimal(false);
  }

  function updateCurrentMathOperator(value: MathOperatorsSignProps): void {
    if (isCountFinished) setIsCountFinished(false);

    if (currentNumber === 0 && value === '-') {
      setIsCurrentNumberNegative(prev => !prev);
    } else setCurrentMathOperator(value);
  }

  function toggleIsCurrentNumberDecimal(value: boolean): void {
    setCurrentDecimalNumber(0);
    setIsCurrentNumberDecimal(value);
  }

  function getCurrentNumberWithItsOperator(): number {
    let convertedCurrentDecimalNumber = 0;

    if (currentDecimalNumber !== null) {
      const decimalNumberLength = Number(String(currentDecimalNumber).length);
      convertedCurrentDecimalNumber = currentDecimalNumber / 10 ** decimalNumberLength;
    }

    const newCurrentNumber = currentNumber + convertedCurrentDecimalNumber;
    const number = isCurrentNumberNegative ? newCurrentNumber * -1 : newCurrentNumber;

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
    setIsCurrentNumberDecimal(false);
    setLastUsedMathOperator(currentMathOperator);
    setCurrentNumber(0);
    setCurrentMathOperator(null);
    setCurrentDecimalNumber(null);
  }, [currentMathOperator]);

  return (
    <MathContext.Provider
      value={{
        previousNumber,
        currentNumber,
        currentDecimalNumber,
        currentMathOperator,
        lastUsedMathOperator,
        isCurrentNumberNegative,
        isCurrentNumberDecimal,
        formatNumber,
        addNumber,
        getFinalResult,
        deleteNumber,
        resetOperation,
        updateCurrentMathOperator,
        toggleIsCurrentNumberDecimal,
      }}
    >
      {children}
    </MathContext.Provider>
  );
}

export function useMath() {
  return useContext(MathContext);
}
