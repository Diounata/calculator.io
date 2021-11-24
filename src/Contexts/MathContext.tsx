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
  currentDecimalNumber: string;
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
  const [currentDecimalNumber, setCurrentDecimalNumber] = useState<string>('');
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
    if (isCountFinished) setIsCountFinished(false);

    if (isCurrentNumberDecimal) {
      if (!currentDecimalNumber) setCurrentDecimalNumber(String(number));
      else {
        const newCurrentDecimalNumber = currentDecimalNumber + String(number);

        setCurrentDecimalNumber(newCurrentDecimalNumber);
      }
    } else {
      const newCurrentNumber = Number(String(currentNumber) + number);

      setCurrentNumber(newCurrentNumber);
    }
  }

  function deleteNumber(): void {
    if (isCurrentNumberDecimal) {
      if (!currentDecimalNumber) resetCurrentDecimalNumber();
      else {
        let decimalNumberArray = Array.from(currentDecimalNumber);
        decimalNumberArray.pop();
        const newDecimalNumber = decimalNumberArray.join('');

        setCurrentDecimalNumber(String(newDecimalNumber));
      }
    } else {
      const newNumber = Math.floor(currentNumber / 10);

      setCurrentNumber(newNumber);
    }
  }

  function getFinalResult(): void {
    const finalResult = calcPreviousNumberByCurrentNumber();
    const finalResultString = finalResult % 1 === 0 ? finalResult.toFixed(1) : String(finalResult);
    const [intNumber, floatNumber] = finalResultString.split('.');

    setIsCountFinished(true);
    setIsCurrentNumberNegative(false);
    setIsCurrentNumberDecimal(floatNumber !== '0');
    setCurrentNumber(Number(intNumber));
    setCurrentDecimalNumber(floatNumber === '0' ? '' : floatNumber);
    setPreviousNumber(null);
    setCurrentMathOperator(null);
  }

  function resetOperation(): void {
    setCurrentMathOperator(null);
    setPreviousNumber(null);
    setCurrentNumber(0);
    setIsCurrentNumberNegative(false);
    resetCurrentDecimalNumber();
  }

  function resetCurrentDecimalNumber(): void {
    setCurrentDecimalNumber('');
    setIsCurrentNumberDecimal(false);
  }

  function updateCurrentMathOperator(value: MathOperatorsSignProps): void {
    if (isCountFinished) setIsCountFinished(false);

    if (currentNumber === 0 && value === '-' && !isCurrentNumberDecimal) {
      setIsCurrentNumberNegative(prev => !prev);
    } else setCurrentMathOperator(value);
  }

  function toggleIsCurrentNumberDecimal(value: boolean): void {
    setIsCurrentNumberDecimal(value);
  }

  function getCurrentNumberWithItsOperator(): number {
    let convertedCurrentDecimalNumber = 0;

    if (currentDecimalNumber !== '') {
      const decimalNumberLength = Number(currentDecimalNumber.length);
      convertedCurrentDecimalNumber = Number(currentDecimalNumber) / 10 ** decimalNumberLength;
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
    if (currentMathOperator === null || (currentNumber === 0 && !isCurrentNumberDecimal) || isCountFinished) return;

    const newPreviousNumber = calcPreviousNumberByCurrentNumber();

    setPreviousNumber(newPreviousNumber);
    setIsCurrentNumberNegative(false);
    setLastUsedMathOperator(currentMathOperator);
    setCurrentNumber(0);
    setCurrentMathOperator(null);
    resetCurrentDecimalNumber();
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
