import useTheme from "../contexts/theme";
import { HiMoon, HiSun } from "react-icons/hi2";

export default function ThemeToggle() {
    const { themeMode, lightTheme, darkTheme } = useTheme();

    const toggleTheme = () => {
        if (themeMode === "dark") {
            lightTheme();
        } else {
            darkTheme();
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle Dark Mode"
        >
            {themeMode === "dark" ? (
                <HiSun className="w-6 h-6 text-yellow-500" />
            ) : (
                <HiMoon className="w-6 h-6 text-gray-700" />
            )}
        </button>
    );
}
