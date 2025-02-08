import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  async function fetchData(newCurrency) {
    const res = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${newCurrency}.json`
    );
    const data = await res.json();
    setData(data[currency]);
    return data;
  }

  useEffect(() => {
    fetchData(currency);
  }, [currency]);
  // console.log(data);
  //* returning the funtion so that it can be called inside a funtion
  return { data, fetchData };
}

export default useCurrencyInfo;
