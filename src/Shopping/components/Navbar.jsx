import PropTypes from "prop-types";
import "../styles/Navbar.scss";

const Navbar = ({ setShowAddItem, setShowCheckout }) => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <button className="add" onClick={() => setShowAddItem(true)}>
              <i className="bi bi-plus-lg"></i> Add
            </button>
          </li>
          <li>
            <button
              className="checkout-button"
              onClick={() => setShowCheckout(true)}
            >
              <i className="bi bi-basket-fill"></i> Checkout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  setShowAddItem: PropTypes.func.isRequired,
  setShowCheckout: PropTypes.func.isRequired,
};

export default Navbar;
