import React, { useEffect, useState } from "react";
import Axios from "axios";
import CoinCard from "../components/CoinCard";
import Loader from "../components/Loader";
import "../styles/Coin.css";

const Coins = () => {
  const [coinData, setcoinData] = useState([]);
  const [currencySymbol, setcurrencySymbol] = useState("INR");
  const [pageNum, setpageNum] = useState(1);
  const [loader, setloader] = useState(true);

  const incrementPage = () => {
    if (pageNum > 0 && pageNum < 130) {
      setpageNum(pageNum + 1);
    }
  };
  const decrementPage = () => {
    if (pageNum > 0 && pageNum > 1) {
      setpageNum(pageNum - 1);
    }
  };

  useEffect(() => {
    async function apiCall() {
      try {
        const apiData = await Axios.get(
          `https://cloud.syncloop.com/tenant/1693394170432/packages.syncloop_hackathon.exchangeData.getCoins.main?currencySymbol=${currencySymbol}&per_page=100&page=${pageNum}`,
          {
            headers: {
              Authorization:
                "Bearer 6KPnAjasx2BzGyQSF2Lnfw51zqpeNjBy5lHN66E8Fgw5s8dxWsDmpr5DQQAOP7uBKhwOeYrBljpGnJKrpaUWEQ6h9JmFScSEHjiYZQ1NZXVIr+OTK6TXB2NWImPfVdzp5zZn3whU5FPFl1xPyCVG8Ug1J7PYhOEIBERuRcusi1gesnoesM5p4u/ZDL9yYQRaUebQo0la7up4inpGRRwa4eQiH4RIFHoleBHsmXp6SoRDjEH77UoZYnr5la3UcBWo0GhjbZvf164i+2kZlwysMy6rrtD+PSAZz9tavyKg1vLKgHA5ebgBpgaCh4HRYSHhjdbilDVii1Fk+Ydh5wwHblQ7m82WkZXWiR+ICl16yMbvHMjOW1VPyTNpA+lCWKdyMw1RYzCFSMx26Xm7iG82SCmiYpNVSodgvkvQo8KR3cWkUgh3DnFpk4rG9EYyv9h2i4qhintlNKHKPoRZclHSxcsIx7lulzJ2x19NRnayyiOfAHeF/1Q5VITxNm5owkQp",
            },
          }
        );
        setcoinData(apiData.data.response.jsonDoc);
        setloader(false);
      } catch (error) {
        setloader(true);
        alert("Something went wrong!!!");
        console.log(error);
      }
    }
    apiCall();
  }, [pageNum, currencySymbol]);

  if (loader) {
    return <Loader />;
  }

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          letterSpacing: "5px",
          textTransform: "uppercase",
        }}
      >
        Coins
      </h1>
      <div className="radio-btns">
        <input
          onClick={() => setcurrencySymbol(event.target.value)}
          type="radio"
          name="currency"
          value={"INR"}
        />
        INR
        <input
          onClick={() => setcurrencySymbol(event.target.value)}
          type="radio"
          name="currency"
          value={"USD"}
        />
        USD
        <input
          onClick={() => setcurrencySymbol(event.target.value)}
          type="radio"
          name="currency"
          value={"EUR"}
        />
        EUR
      </div>
      <div className="coin-container">
        {coinData.map((i) => (
          <CoinCard
            key={i.id}
            id={i.id}
            name={i.name}
            price={i.current_price}
            image={i.image}
            coinSymbol={i.symbol}
            currrencySymbol={currencySymbol}
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={decrementPage}>{"< Prev"}</button>
        <a>{pageNum}</a>
        <button onClick={incrementPage}>{"Next >"}</button>
      </div>
    </div>
  );
};

export default Coins;
