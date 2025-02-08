import { useEffect, useState } from "react";

function currencyInfoT(currency) {
  const [data, setData] = useState({});

  async function fetchData() {
    const res = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    );
    const data = await res.json();
    setData(data[currency]);
  }

  useEffect(() => fetchData, [currency]);
  // console.log(data);
  return data;
}

export default currencyInfoT;
