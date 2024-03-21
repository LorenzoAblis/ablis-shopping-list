import "../styles/Navbar.scss";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer>
      <div className="navbar-content">
        <ul className="navbar-buttons">
          <li>
            <button className="navbar-button" onClick={() => navigate("/")}>
              <i
                className={`bi ${
                  location.pathname === "/" ? "bi-cart-fill" : "bi-cart"
                }`}
              ></i>
              <p>Shopping</p>
            </button>
          </li>
          <li>
            <button
              className="navbar-button"
              onClick={() => navigate("/history")}
            >
              <i
                className={`bi ${
                  location.pathname === "/history"
                    ? "bi-clock-fill"
                    : "bi-clock"
                }`}
              ></i>
              <p>History</p>
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Navbar;
