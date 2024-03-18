import PropTypes from "prop-types";
import "./Navbar.scss";

const Navbar = ({ setShowAddItem }) => {
  const handleShow = () => {
    setShowAddItem((prevState) => !prevState);
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <button className="add" onClick={handleShow}>
              <i className="bi bi-plus-lg"></i> Add
            </button>
          </li>
          <li>
            <button className="cart">
              <i className="bi bi-basket-fill"></i> Cart
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  setShowAddItem: PropTypes.func.isRequired,
};

export default Navbar;
