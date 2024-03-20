import "../styles/Navbar.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <footer>
      <div className="navbar-content">
        <ul className="navbar-buttons">
          <li>
            <button
              className="shopping-button navbar-button"
              onClick={() => navigate("/shopping")}
            >
              <i className="bi bi-cart-fill"></i>
              <p>Shopping</p>
            </button>
          </li>
          <li>
            <button
              className="history-button navbar-button"
              onClick={() => navigate("/history")}
            >
              <i className="bi bi-clock-history"></i>
              <p>History</p>
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Navbar;
