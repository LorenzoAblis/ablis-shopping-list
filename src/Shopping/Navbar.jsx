import "./Navbar.scss";

const Navbar = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <button className="add">
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

export default Navbar;
