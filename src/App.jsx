import "./App.css";
import CurrencyConvertor from "./components/currency-convertor";

import { ThemeProvider } from "./contexts/theme";
import ThemeToggle from "./components/theme-toggle";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <div className="relative z-10 container w-full max-w-lg">
          <CurrencyConvertor />

          <footer className="mt-8 text-center text-sm text-gray-600 dark:text-gray-200/80">
            <p>Real-time exchange rates powered by ExchangeRate-API</p>
            <p className="mt-1">Built with React & Tailwind CSS</p>
            <p className="mt-2 font-medium text-gray-800 dark:text-white/90">Developed by YASH RAJ SINGH</p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
