import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "../components/Chart";
import Loader from "../components/Loader";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import "../styles/CoinDetail.css";

const CoinDetails = () => {
  const [coinData, setcoinData] = useState([]);
  const [currencySymbol, setcurrencySymbol] = useState("INR");
  const [loader, setloader] = useState(true);
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const params = useParams();

  const currencySign =
    currencySymbol === "inr" ? "₹" : currencySymbol === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setloader(true);
        break;
      case "7d":
        setDays("7d");
        setloader(true);
        break;
      case "14d":
        setDays("14d");
        setloader(true);
        break;
      case "30d":
        setDays("30d");
        setloader(true);
        break;
      case "60d":
        setDays("60d");
        setloader(true);
        break;
      case "200d":
        setDays("200d");
        setloader(true);
        break;
      case "1y":
        setDays("365d");
        setloader(true);
        break;
      case "max":
        setDays("max");
        setloader(true);
        break;

      default:
        setDays("24h");
        setloader(true);
        break;
    }
  };

  useEffect(() => {
    async function apiCall() {
      try {
        const coinDataAPI = await Axios.get(
          `https://cloud.syncloop.com/tenant/1693394170432/packages.syncloop_hackathon.exchangeData.getCoinData.main?coinName=${params.id}`,
          {
            headers: {
              Authorization:
                "Bearer 6KPnAjasx2BzGyQSF2Lnfw51zqpeNjBy5lHN66E8Fgw5s8dxWsDmpr5DQQAOP7uBKhwOeYrBljpGnJKrpaUWEQ6h9JmFScSEHjiYZQ1NZXVIr+OTK6TXB2NWImPfVdzp5zZn3whU5FPFl1xPyCVG8Ug1J7PYhOEIBERuRcusi1gesnoesM5p4u/ZDL9yYQRaUebQo0la7up4inpGRRwa4eQiH4RIFHoleBHsmXp6SoSrrOjIcUpCWjNzg9yufgKnMV2afFwQDgv2pazhrfyTa3HwFXerHrL/9AcV4NXKmGJy+Nu56D3Hg8ufPfjPYsuZG3RRP2Avl36DyAH3sGlirobhrwhcE8yDZ1z6fd1FD/2vsjh/mbvyIcmFiotFmqYWzUU5ub2poFHrFrLgtVOBzEe564lmvaU2XZt9SKhGkH5wc2cM9U1ig9XJRWA8BqKy6/6uIvhYsoGgeWO7VIbOb+23Pd8xV+f7xKfKgpMxu4MTZRtzma1UEAO0QOM5cKHdz4hrqy6ebmKYIh/AtppwBcwy4to9IoGrns36Z9rd+YdpRZo/A8wOyDUAc2y1qXBl",
            },
          }
        );

        const chartData = await Axios.get(
          `https://cloud.syncloop.com/tenant/1693394170432/packages.syncloop_hackathon.exchangeData.getChartData.main?coinName=${params.id}&currency=${currencySymbol}&days=${days}`,
          {
            headers: {
              Authorization:
                "Bearer 6KPnAjasx2BzGyQSF2Lnfw51zqpeNjBy5lHN66E8Fgw5s8dxWsDmpr5DQQAOP7uBKhwOeYrBljpGnJKrpaUWEQ6h9JmFScSEHjiYZQ1NZXVIr+OTK6TXB2NWImPfVdzp5zZn3whU5FPFl1xPyCVG8Ug1J7PYhOEIBERuRcusi1gesnoesM5p4u/ZDL9yYQRaUebQo0la7up4inpGRRwa4eQiH4RIFHoleBHsmXp6SoSrrOjIcUpCWjNzg9yufgKnMV2afFwQDgv2pazhrfyTa3HwFXerHrL/9AcV4NXKmGJy+Nu56D3Hg8ufPfjPYsuZG3RRP2Avl36DyAH3sGlirobhrwhcE8yDZ1z6fd1FD/2vsjh/mbvyIcmFiotFmqYWzUU5ub2poFHrFrLgtVOBzEe564lmvaU2XZt9SKhGkH5wc2cM9U1ig9XJRWA8BqKy6/6uIvhYsoGgeWO7VIbOb+23Pd8xV+f7xKfKgpMxu4MTZRtzma1UEAO0QOM5cKHdz4hrqy6ebmKYIh/AtppwBcwy4to9IoGrns36Z9rd+YdpRZo/A8wOyDUAc2y1qXBl",
            },
          }
        );
        
        setcoinData(coinDataAPI.data.response.jsonDoc);
        setChartArray(chartData.data.response.jsonDoc.prices);
        
        setloader(false);
      } catch (error) {
        console.log(error);
        setloader(true);
      }
    }
    apiCall();
  }, [params.id, currencySymbol, days]);

  console.log(coinData);
  if (loader) {
    return <Loader />;
  }

  return (
    <div className="coin-detail-container">
      <div className="detail-box">
        <a className="rank-tag">Rank #{coinData.market_cap_rank}</a>
        <div className="image-name">
          <img src={coinData.image.small} />
          <p className="coin-detail-name">{coinData.name} </p>
          <p className="coin-detail-symbol">({coinData.symbol})</p>
        </div>

        <div className="chart-div">
          <Chart arr={chartArray} currency={currencySymbol} days={days} />
        </div>

        <div className="chart-btns">
          {btns.map((i) => (
            <button
              disabled={days === i}
              key={i}
              onClick={() => switchChartStats(i)}
            >
              {i}
            </button>
          ))}
        </div>

        <div className="radio-btns">
          <input
            onClick={(event) => setcurrencySymbol(event.target.value)}
            type="radio"
            name="currency"
            value={"INR"}
          />
          INR
          <input
            onClick={(event) => setcurrencySymbol(event.target.value)}
            type="radio"
            name="currency"
            value={"USD"}
          />
          USD
          <input
            onClick={(event) => setcurrencySymbol(event.target.value)}
            type="radio"
            name="currency"
            value={"EUR"}
          />
          EUR
        </div>

        <div className="price-main-div">
          <div className="price-container">
            <h1>
              {currencySymbol == "INR"
                ? `₹${coinData.market_data.current_price.inr}`
                : currencySymbol == "USD"
                ? `$${coinData.market_data.current_price.usd}`
                : `€${coinData.market_data.current_price.eur}`}
            </h1>
            <div className="change-percentage-div">
              <h2
                className="change-percentage-symbol"
                style={
                  coinData.market_data.price_change_percentage_24h > 0
                    ? { color: "#8dc647" }
                    : { color: "red" }
                }
              >
                {coinData.market_data.price_change_percentage_24h > 0 ? (
                  <AiFillCaretUp />
                ) : (
                  <AiFillCaretDown />
                )}{" "}
              </h2>
              <h2 className="percentage-change-value">
                {coinData.market_data.price_change_percentage_24h}
              </h2>
            </div>
          </div>

          <div className="price-container">
            <p>{coinData.market_data.current_price.btc} BTC</p>
            <div className="change-percentage-div">
              <p
                className="change-percentage-symbol"
                style={
                  coinData.market_data
                    .market_cap_change_percentage_24h_in_currency.btc > 0
                    ? { color: "#8dc647" }
                    : { color: "red" }
                }
              >
                {coinData.market_data
                  .market_cap_change_percentage_24h_in_currency.btc > 0 ? (
                  <AiFillCaretUp />
                ) : (
                  <AiFillCaretDown />
                )}{" "}
              </p>
              <p className="percentage-change-value">
                {
                  coinData.market_data
                    .market_cap_change_percentage_24h_in_currency.btc
                }
              </p>
            </div>
          </div>

          <div className="price-container">
            <p>{coinData.market_data.current_price.eth} ETH</p>
            <div className="change-percentage-div">
              <p
                className="change-percentage-symbol"
                style={
                  coinData.market_data
                    .market_cap_change_percentage_24h_in_currency.eth > 0
                    ? { color: "#8dc647" }
                    : { color: "red" }
                }
              >
                {coinData.market_data
                  .market_cap_change_percentage_24h_in_currency.eth > 0 ? (
                  <AiFillCaretUp />
                ) : (
                  <AiFillCaretDown />
                )}{" "}
              </p>
              <p className="percentage-change-value">
                {
                  coinData.market_data
                    .market_cap_change_percentage_24h_in_currency.eth
                }
              </p>
            </div>
          </div>
        </div>

        <div className="progressbar-div">
          <progress
            value={50 + coinData.market_data.price_change_24h}
            max="100"
          />

          <div className="text-data">
            <p className="low_24">
              {currencySymbol == "INR"
                ? `₹${coinData.market_data.high_24h.inr}`
                : currencySymbol == "USD"
                ? `$${coinData.market_data.high_24h.usd}`
                : `€${coinData.market_data.high_24h.eur}`}
            </p>
            <p>24H Range</p>
            <p className="high_24">
              {currencySymbol == "INR"
                ? `₹${coinData.market_data.low_24h.inr}`
                : currencySymbol == "USD"
                ? `$${coinData.market_data.low_24h.usd}`
                : `€${coinData.market_data.low_24h.eur}`}
            </p>
          </div>
        </div>
        <div className="coin-detail-div">
          <p>Market Cap </p>
          <p>
            {currencySymbol == "INR"
              ? `₹${coinData.market_data.market_cap.inr}`
              : currencySymbol == "USD"
              ? `$${coinData.market_data.market_cap.usd}`
              : `€${coinData.market_data.market_cap.eur}`}
          </p>
        </div>
        <div className="coin-detail-div">
          <p>Total Trading Volume </p>
          <p>
            {currencySymbol == "INR"
              ? `₹${coinData.market_data.total_volume.inr}`
              : currencySymbol == "USD"
              ? `$${coinData.market_data.total_volume.usd}`
              : `€${coinData.market_data.total_volume.eur}`}
          </p>
        </div>
        <div className="coin-detail-div">
          <p>Total Supply </p>
          <p style={{ textTransform: "uppercase" }}>
            {coinData.market_data.total_supply} {coinData.symbol}
          </p>
        </div>
        <div className="coin-detail-div">
          <p>Max Supply </p>
          <p style={{ textTransform: "uppercase" }}>
            {coinData.market_data.max_supply} {coinData.symbol}
          </p>
        </div>
        <div className="coin-detail-div">
          <p>Circulating Supply </p>
          <p style={{ textTransform: "uppercase" }}>
            {coinData.market_data.circulating_supply} {coinData.symbol}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
