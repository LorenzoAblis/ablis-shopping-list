import { useState, useEffect } from "react";
import { db } from "/firebaseConfig";
import { ref, onValue } from "firebase/database";

import Navbar from "../../Common/components/Navbar";
import ViewDay from "./ViewDay";
import "../styles/History.scss";

const History = () => {
  const [history, setHistory] = useState({});
  const [showViewDay, setShowViewDay] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMetaItem, setSelectedMetaItem] = useState(null);

  const fetchHistory = () => {
    const historyRef = ref(db, "history");
    onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setHistory(data);
      }
    });
  };

  const getStoresFromHistory = () => {
    const stores = new Set();
    Object.values(history).forEach((dateItems) => {
      Object.values(dateItems).forEach((item) => {
        stores.add(item.store);
      });
    });
    return Array.from(stores);
  };

  const getItemsForStoreAndDate = (store, date) => {
    const dateItems = history[date] || {};
    const items = Object.values(dateItems).filter(
      (item) => item.store === store
    );
    return items;
  };

  const handleViewDay = (date, metaItem) => {
    setShowViewDay(true);
    setSelectedDate(date);
    setSelectedMetaItem(metaItem);
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
          {Object.entries(history)
            .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
            .map(([date, storeItems]) => (
              <div
                key={date}
                className="history-item"
                onClick={() =>
                  handleViewDay(date, Object.values(storeItems)[0])
                }
              >
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
                  {getStoresFromHistory().map((store) => {
                    const storeItems = getItemsForStoreAndDate(store, date);
                    if (storeItems.length === 0) {
                      return null;
                    }
                    return (
                      <div key={`${date}-${store}`} className="store">
                        <h3>{store}</h3>
                        <div className="store-items">
                          {getItemsForStoreAndDate(store, date).map((item) => (
                            <p key={item.name}>
                              {item.quantity} {item.description} x {item.name}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </section>
        <ViewDay
          showViewDay={showViewDay}
          setShowViewDay={setShowViewDay}
          date={selectedDate}
          getStoresFromHistory={getStoresFromHistory}
          getItemsForStoreAndDate={getItemsForStoreAndDate}
          metaItem={selectedMetaItem}
        />
        <div className="spacer"></div>
      </main>
      <Navbar />
    </>
  );
};

export default History;
