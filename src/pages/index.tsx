import App from 'Components/App';

import { ThemeProvider } from 'Contexts/ThemeContext';
import { MathProvider } from 'Contexts/MathContext';

export default function Home() {
  return (
    <MathProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MathProvider>
  );
}
