import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState("");
  const [convertedFrom, setConvertedFrom] = useState("usd");
  const [convertedTo, setConvertedTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");

  const currencyInfo = useCurrencyInfo(convertedFrom);
  const currencyOptions = Object.keys(currencyInfo);

  function swap() {
    setConvertedFrom(convertedTo);
    setConvertedTo(convertedFrom);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }
  function convert() {
    setConvertedAmount(Number(amount) * currencyInfo[convertedTo]);
    // console.log(currencyOptions);
  }

  return (
    <div>
      <div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div>
              <InputBox
                label="From"
                amount={amount}
                selectCurrency={convertedFrom}
                onAmountChange={(amount) => setAmount(amount)}
                onCurrencyChange={(currency) => setConvertedFrom(currency)}
                currencyOptions={currencyOptions}
              />
            </div>
            <div>
              <button type="button" onClick={swap}>
                swap
              </button>
            </div>
            <div>
              <InputBox
                label="To"
                amount={convertedAmount}
                selectCurrency={convertedTo}
                onCurrencyChange={(currency) => setConvertedTo(currency)}
                currencyOptions={currencyOptions}
                amountDisable={true}
              />
            </div>
            <button type="submit">
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
