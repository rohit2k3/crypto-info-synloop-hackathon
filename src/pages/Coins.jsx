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
                "Bearer 6KPnAjasx2BzGyQSF2Lnfw51zqpeNjBy5lHN66E8Fgw5s8dxWsDmpr5DQQAOP7uBKhwOeYrBljpGnJKrpaUWEQ6h9JmFScSEHjiYZQ1NZXVIr+OTK6TXB2NWImPfVdzp5zZn3whU5FPFl1xPyCVG8Ug1J7PYhOEIBERuRcusi1gesnoesM5p4u/ZDL9yYQRaUebQo0la7up4inpGRRwa4eQiH4RIFHoleBHsmXp6SoSrrOjIcUpCWjNzg9yufgKnMV2afFwQDgv2pazhrfyTa3HwFXerHrL/9AcV4NXKmGJy+Nu56D3Hg8ufPfjPYsuZG3RRP2Avl36DyAH3sGlirobhrwhcE8yDZ1z6fd1FD/2vsjh/mbvyIcmFiotFmqYWzUU5ub2poFHrFrLgtVOBzEe564lmvaU2XZt9SKhGkH5wc2cM9U1ig9XJRWA8BqKy6/6uIvhYsoGgeWO7VIbOb+23Pd8xV+f7xKfKgpMxu4MTZRtzma1UEAO0QOM5cKHdz4hrqy6ebmKYIh/AtppwBcwy4to9IoGrns36Z9rd+YdpRZo/A8wOyDUAc2y1qXBl",
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
