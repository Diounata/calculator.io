import { createContext, ReactNode, useContext, useState } from 'react';

export const ThemeContext = createContext({} as ContextProps);

interface ChildrenProps {
  children: ReactNode;
}

type ThemeProps = 'dark' | 'light' | 'alt';

interface ContextProps {
  currentTheme: ThemeProps;
  updateTheme(value: ThemeProps): void;
}

export function ThemeProvider({ children }: ChildrenProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeProps>('dark');

  function updateTheme(value: ThemeProps): void {
    setCurrentTheme(value);
  }

  return <ThemeContext.Provider value={{ currentTheme, updateTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
