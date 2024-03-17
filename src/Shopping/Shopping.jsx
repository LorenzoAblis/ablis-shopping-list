import PropTypes from "prop-types";

import "./Shopping.scss";

const ShoppingItem = ({ name, quantity, description }) => {
  return (
    <div className="shopping-item">
      <button className="complete">
        <i className="bi bi-check-lg"></i>
      </button>
      <h2>{name}</h2>
      <p>{quantity}</p>
      <p>{description}</p>
      <button className="menu">
        <i className="bi bi-three-dots"></i>
      </button>
    </div>
  );
};

ShoppingItem.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Shopping = () => {
  let stores = ["Costco", "Walmart"];

  return (
    <main>
      {stores.map((store, index) => (
        <section key={index}>
          <h1>{store}</h1>
          <div className="shopping-items">
            <ShoppingItem name="Parsley" quantity="12" description="pack" />
            <ShoppingItem name="Apple" quantity="9" description="adas" />
            <ShoppingItem name="Banana" quantity="4" description="adas" />
          </div>
        </section>
      ))}
    </main>
  );
};

export default Shopping;
