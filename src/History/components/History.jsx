import { useState, useEffect } from "react";
import { db } from "/firebaseConfig";
import { ref, onValue } from "firebase/database";
import Navbar from "../../Common/components/Navbar";
import "../styles/History.scss";

const History = () => {
  const [history, setHistory] = useState({});

  const fetchHistory = () => {
    const historyRef = ref(db, "history");
    onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <main>
        <header>
          <h1>Recently Bought</h1>
        </header>
        <section className="history-items">
          {Object.entries(history).map(([date, storeItems]) => (
            <div key={date} className="history-item">
              <div className="header">
                <h2>{date}</h2>
                <div className="header-details">
                  <p>
                    <i className="bi bi-geo-alt-fill"></i>{" "}
                    {Object.values(storeItems)[0]?.store}
                  </p>
                  <p>
                    <i className="bi bi-clock-fill"></i>
                    {Object.values(storeItems)[0]?.time}
                  </p>
                  <p>
                    <i className="bi bi-basket-fill"></i>{" "}
                    {Object.values(storeItems).length} items
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="store">
                  <h3>{Object.values(storeItems)[0]?.store}</h3>
                  <div className="store-items">
                    {Object.values(storeItems).flatMap((item) => (
                      <p key={item.name}>
                        {item.quantity} {item.description} x {item.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        <div className="spacer"></div>
      </main>
      <Navbar />
    </>
  );
};

export default History;
