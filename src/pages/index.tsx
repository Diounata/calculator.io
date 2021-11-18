import App from 'Components/App';

import { ThemeProvider } from 'Contexts/ThemeContext';

export default function Home() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
