import { useEffect, useState } from "react";
import { HiArrowsRightLeft } from "react-icons/hi2";
import CurrencyDropdown from "./dropdown";

function CurrencyConvertor() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [rates, setRates] = useState({});
  const [result, setResult] = useState("");
  const [favorites, setFavorites] = useState(["USD", "INR", "EUR"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFavorite = (currency) => {
    setFavorites((prev) =>
      prev.includes(currency)
        ? prev.filter((c) => c !== currency)
        : [...prev, currency]
    );
  };

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  useEffect(() => {
    if (!from || !to) return;
    setLoading(true);
    setError(null);

    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setRates(data.rates);
        const rate = data.rates[to];
        if (rate) {
          setResult((amount * rate).toFixed(2));
        } else {
          setResult("");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch exchange rates");
        setLoading(false);
      });
  }, [amount, from, to]);

  return (
    <div className="max-w-xl mx-auto p-6 md:p-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Currency Converter
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">Check live foreign currency exchange rates</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-lg transition-colors placeholder-gray-400 dark:placeholder-gray-500"
            min="0"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full">
            <CurrencyDropdown
              title="From"
              currencies={Object.keys(rates)}
              currency={from}
              setCurrency={setFrom}
              favorites={favorites}
              handleFavorite={handleFavorite}
            />
          </div>

          <div className="flex items-center justify-center mt-6">
            <button onClick={swapCurrencies} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-sm" title="Swap currencies">
              <HiArrowsRightLeft className="text-xl text-gray-700 dark:text-white" />
            </button>
          </div>

          <div className="w-full">
            <CurrencyDropdown
              title="To"
              currencies={Object.keys(rates)}
              currency={to}
              setCurrency={setTo}
              favorites={favorites}
              handleFavorite={handleFavorite}
            />
          </div>
        </div>

      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-100/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-center backdrop-blur-sm">
          <p className="text-red-700 dark:text-red-200 text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="mt-8 text-center p-6 bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-xl shadow-inner border border-white/40 dark:border-gray-600">
        <div className="text-sm text-gray-500 dark:text-gray-300 mb-2 font-medium">
          {amount} {from} =
        </div>
        <div className="text-4xl font-extrabold text-blue-900 dark:text-blue-200 tracking-tight">
          {loading ? <span className="animate-pulse">---</span> : result}
        </div>
        <div className="text-lg text-blue-800 dark:text-blue-300 mt-2 font-semibold">{to}</div>
      </div>
    </div>
  );
}

export default CurrencyConvertor;
