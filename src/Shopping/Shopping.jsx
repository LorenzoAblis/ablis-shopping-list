import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { ref, onValue, remove } from "firebase/database";

import Navbar from "./Navbar";
import AddItem from "./AddItem";
import "./Shopping.scss";

const ShoppingItem = ({ item }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".complete")) {
      handleMenu();
    }
  };

  const handleDelete = async () => {
    await remove(ref(db, "shopping_items/" + item.name));
  };

  const handleComplete = async () => {
    // await set(ref(db, "shopping_items/" + item.name), {
    //   name: item.name,
    //   quantity: item.quantity,
    //   store: item.store,
    //   description: item.description,
    //   completed: true,
    // });
  };

  return (
    <div
      className={`shopping-item ${showMenu ? "shift-left" : ""}`}
      onClick={handleOutsideClick}
    >
      <button className="complete" onClick={handleComplete}>
        <i className="bi bi-check-lg"></i>
      </button>
      <h2>{item.name}</h2>
      <div className="details">
        <p>{item.quantity}</p>
        <p>{item.description}</p>
      </div>
      <div className={`menu ${showMenu ? "show" : "hide"}`}>
        {showMenu && (
          <>
            <button className="edit">
              <i className="bi bi-pencil-square"></i>
            </button>
            <button className="delete" onClick={handleDelete}>
              <i className="bi bi-trash-fill"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

ShoppingItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const Shopping = () => {
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
  const [showAddItem, setShowAddItem] = useState(false);

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

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <Navbar setShowAddItem={setShowAddItem} />
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
              className={`shopping-items ${
                store.expanded ? "show-section" : "hide-section"
              }`}
            >
              {items
                .filter((item) => item.store === store.name && !item.completed)
                .map((item, index) => (
                  <ShoppingItem key={index} item={item} />
                ))}
            </div>
          </section>
        ))}

        <AddItem showAddItem={showAddItem} setShowAddItem={setShowAddItem} />
      </main>
    </>
  );
};

export default Shopping;
