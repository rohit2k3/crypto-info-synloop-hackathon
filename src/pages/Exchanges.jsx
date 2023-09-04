import React, { useEffect, useState } from "react";
import ExchangeCard from "../components/ExchangeCard";
import Axios from "axios";
import "../styles/Exchanges.css";
import Loader from "../components/Loader";
const Exchanges = () => {
  const [exchangeData, setexchangeData] = useState([]);
  const [pageNum, setpageNum] = useState(1);
  const [loader, setloader] = useState(true);
  
  const incrementPage = () => {
    if (pageNum > 0 && pageNum < 6) {
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
          `https://cloud.syncloop.com/tenant/1693394170432/packages.syncloop_hackathon.exchangeData.getData.main?page=${pageNum}`,
          {
            headers: {
              Authorization:
                "Bearer 6KPnAjasx2BzGyQSF2Lnfw51zqpeNjBy5lHN66E8Fgw5s8dxWsDmpr5DQQAOP7uBKhwOeYrBljpGnJKrpaUWEQ6h9JmFScSEHjiYZQ1NZXVIr+OTK6TXB2NWImPfVdzp5zZn3whU5FPFl1xPyCVG8Ug1J7PYhOEIBERuRcusi1gesnoesM5p4u/ZDL9yYQRaUebQo0la7up4inpGRRwa4eQiH4RIFHoleBHsmXp6SoRDjEH77UoZYnr5la3UcBWo0GhjbZvf164i+2kZlwysMy6rrtD+PSAZz9tavyKg1vLKgHA5ebgBpgaCh4HRYSHhjdbilDVii1Fk+Ydh5wwHblQ7m82WkZXWiR+ICl16yMbvHMjOW1VPyTNpA+lCWKdyMw1RYzCFSMx26Xm7iG82SCmiYpNVSodgvkvQo8KR3cWkUgh3DnFpk4rG9EYyv9h2i4qhintlNKHKPoRZclHSxcsIx7lulzJ2x19NRnayyiOfAHeF/1Q5VITxNm5owkQp",
            },
          }
        );
        setexchangeData(apiData.data.response.jsonDoc);
        setloader(false);
      } catch (error) {
        console.log(error);
      }
    }
    apiCall();
  }, [pageNum]);

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
        Exchanges
      </h1>
      <div className="card-container">
        {exchangeData.map((data) => (
          <ExchangeCard
            key={data.id}
            name={data.name}
            image={data.image}
            rank={data.trust_score_rank}
            url={data.url}
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

export default Exchanges;
