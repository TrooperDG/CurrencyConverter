import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState("");
  const [convertedFrom, setConvertedFrom] = useState("usd");
  const [convertedTo, setConvertedTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");
  const { data, fetchData } = useCurrencyInfo(convertedFrom);
  // console.log(fetchCurrencyInfo);

  let currencyInfo = data;
  let currencyOptions = Object.keys(currencyInfo);
  //! need to learn how to put the above lines in states
  async function kipu() {
    const newData = await fetchData(convertedTo);
    currencyInfo = newData;
    currencyOptions = Object.keys(currencyInfo);
  }

  function swap() {
    setConvertedFrom(convertedTo);
    setConvertedTo(convertedFrom);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
    kipu();
  }
  function convert() {
    setConvertedAmount(Number(amount) * currencyInfo[convertedTo]);
    // console.log(convertedTo);
    // console.log(currencyOptions);
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/6764526/pexels-photo-6764526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-500 rounded-lg p-5 backdrop-blur-sm bg-white/30 ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                selectCurrency={convertedFrom}
                onAmountChange={(amount) => setAmount(amount)}
                onCurrencyChange={(currency) => setConvertedFrom(currency)}
                currencyOptions={currencyOptions}
              />
            </div>
            <div className=" relative w-full h-0.5 bg-slate-500">
              <button
                className="absolute bg-blue-600 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md text-white px-2 py-0.5 "
                type="button"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4 bg-orange-200">
              <InputBox
                label="To"
                amount={convertedAmount}
                selectCurrency={convertedTo}
                onCurrencyChange={(currency) => setConvertedTo(currency)}
                currencyOptions={currencyOptions}
                amountDisable={true}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {convertedFrom.toUpperCase()} to
              {convertedTo.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
