/* eslint-disable react/prop-types */
import { HiOutlineStar, HiStar } from "react-icons/hi2";

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = "",
}) => {
  const isFavorite = (curr) => favorites.includes(curr);

  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
      >
        {title}
      </label>

      <div className="relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-3 pr-16 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white appearance-none cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
        >
          {favorites.length > 0 && (
            <>
              <optgroup label="Favorites">
                {favorites.map((currency) => (
                  <option value={currency} key={currency}>
                    {currency}
                  </option>
                ))}
              </optgroup>
              <option disabled>──────────</option>
            </>
          )}
          <optgroup label="All Currencies">
            {currencies
              .filter((c) => !favorites.includes(c))
              .map((currency) => (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              ))}
          </optgroup>
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <button
          onClick={() => handleFavorite(currency)}
          className="absolute right-8 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-400 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400"
          title={isFavorite(currency) ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite(currency) ? <HiStar className="w-5 h-5 text-yellow-500" /> : <HiOutlineStar className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
