// import PropTypes from "prop-types";

import Navbar from "../../Common/components/Navbar";
import "../styles/History.scss";

const History = () => {
  return (
    <>
      <main>
        <header>
          <h1>Recently Bought</h1>
        </header>
        <section className="history-items">
          <div className="history-item">
            <div className="header">
              <h2>Friday, Mar 15</h2>
              <div className="header-details">
                <p>
                  <i className="bi bi-geo-alt-fill"></i> Costco
                </p>
                <p>
                  <i className="bi bi-clock-fill"></i> 07:34 AM
                </p>
                <p>
                  <i className="bi bi-basket-fill"></i> 13 items
                </p>
              </div>
            </div>
            <div className="content">
              <div className="store">
                <h3>Costco</h3>
                <div className="store-items">
                  <p>1 bottle x Handsoap</p>
                  <p>3 packs x Oreos</p>
                  <p>2 loaves x Bread</p>
                  <p>4 packs x Toilet Paper</p>
                </div>
              </div>
            </div>
          </div>
          <div className="history-item">
            <div className="header">
              <h2>Friday, Mar 15</h2>
              <div className="header-details">
                <p>Costco</p>
                <p>07:34 AM</p>
                <p>13 items</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Navbar></Navbar>
    </>
  );
};

export default History;
