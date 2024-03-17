import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { ref, set, onValue } from "firebase/database";

import Navbar from "./Navbar";
import "./Shopping.scss";

const ShoppingItem = ({ name, quantity, description }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <div className={`shopping-item `}>
      <button className="complete">
        <i className="bi bi-check-lg"></i>
      </button>
      <h2>{name}</h2>
      <p>{quantity}</p>
      <p>{description}</p>
      <button
        className={`menu-button ${showMenu ? "shift" : ""}`}
        onClick={handleMenu}
      >
        <i className="bi bi-three-dots"></i>
      </button>
      <div className={`menu ${showMenu ? "show" : "hide"}`}>
        <button className="edit">
          <i className="bi bi-pencil-square"></i>
        </button>
        <button className="edit">
          <i className="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  );
};

ShoppingItem.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Shopping = () => {
  //   let stores = ["Costco", "Walmart"];
  const [items, setItems] = useState([]);
  const [stores, setStores] = useState([
    {
      name: "Costco",
      expanded: true,
    },
    {
      name: "Walmart",
      expanded: true,
    },
  ]);

  const handleExpand = (storeIndex) => {
    setStores((prevStores) => {
      const updatedStores = [...prevStores];
      updatedStores[storeIndex] = {
        ...updatedStores[storeIndex],
        expanded: !updatedStores[storeIndex].expanded,
      };
      return updatedStores;
    });
  };

  const fetchItems = () => {
    const itemsRef = ref(db, "shopping_items");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newItems = Object.values(data).map((item) => item);
        setItems(newItems);
      } else {
        setItems([]);
      }
    });
  };

  const test = async () => {
    await set(ref(db, "shopping_items/" + "test"), {
      name: "parsley",
      quantity: 2,
      store: "costco",
      description: "sdas",
      completed: true,
    });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {stores.map((store, index) => (
          <section key={index}>
            <div className="header">
              <h1>{store.name}</h1>
              <button onClick={() => handleExpand(index)}>
                <i
                  className={`bi ${
                    store.expanded ? "bi-caret-up-fill" : "bi-caret-down-fill"
                  }`}
                ></i>
              </button>
            </div>
            <div
              className={`shopping-items ${store.expanded ? "show" : "hide"}`}
            >
              <ShoppingItem name="Parsley" quantity="12" description="packs" />
              <ShoppingItem name="Apple" quantity="9" description="adas" />
              <ShoppingItem name="Banana" quantity="4" description="adas" />
              {items
                .filter((item) => item.store === store.name && !item.completed)
                .map((item, index) => (
                  <ShoppingItem
                    key={index}
                    name={item.name}
                    quantity={item.quantity}
                    description={item.description}
                  />
                ))}
            </div>
          </section>
        ))}

        <button onClick={test}>asdasd</button>
      </main>
    </>
  );
};

export default Shopping;
