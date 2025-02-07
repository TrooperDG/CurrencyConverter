import React, { useId } from "react";

function InputBox({
  label,
  amount,
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  className = "",
}) {
  const amountInputId = useId();
  // console.log(currencyOptions);
  return (
    <div>
      <div>
        <label htmlFor={amountInputId}>{label}</label>
        <input
          id={amountInputId}
          className="bg-slate-400 text-3xl placeholder-white p-3 text-white"
          placeholder="Amount"
          type="number"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => {
            onAmountChange && onAmountChange(Number(e.target.value));
            console.log(e.target.value);
          }}
        />
        <div>
          <p>Currency type</p>
          <select
            value={selectCurrency}
            onChange={(e) => {
              onCurrencyChange(e.target.value);
            }}
            disabled={currencyDisable}
          >
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
