import { createContext, ReactNode, useContext, useState } from 'react';

export const MathContext = createContext({} as ContextProps);

interface ChildrenProps {
  children: ReactNode;
}

interface ContextProps {
  currentNumber: number;

  formatNumber(number: number): string;
  addNumber(number: number): void;
  deleteNumber(): void;
  resetNumber(): void;
}

export function MathProvider({ children }: ChildrenProps) {
  const [currentNumber, setCurrentNumber] = useState<number>(0);

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

  function resetNumber(): void {
    setCurrentNumber(0);
  }

  return (
    <MathContext.Provider value={{ currentNumber, formatNumber, addNumber, deleteNumber, resetNumber }}>
      {children}
    </MathContext.Provider>
  );
}

export function useMath() {
  return useContext(MathContext);
}
