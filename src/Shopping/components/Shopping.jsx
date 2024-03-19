import { useEffect, useState } from "react";
import { db } from "/firebaseConfig";
import { ref, onValue } from "firebase/database";

import Navbar from "../components/Navbar";
import ShoppingItem from "../components/ShoppingItem";
import AddItem from "../components/AddItem";
import EditItem from "../components/EditItem";
import "../styles/Shopping.scss";

const Shopping = () => {
  const [items, setItems] = useState([]);
  const [stores, setStores] = useState([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});

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
        const uniqueStores = Array.from(
          new Set(newItems.map((item) => item.store))
        );
        setStores(
          uniqueStores.map((storeName) => ({
            name: storeName,
            expanded: true,
            completed: false,
          }))
        );
      } else {
        setItems([]);
        setStores([]);
      }
    });
  };

  const getItemCompleted = (storeName) => {
    return (
      items.filter((item) => item.store === storeName && item.completed)
        .length === 0
    );
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setStores((prevStores) => {
      return prevStores.map((store) => ({
        ...store,
        completed: getItemCompleted(store.name),
      }));
    });
  }, [items]);

  const getStoreItemCount = (storeName) => {
    const itemCount = items.filter((item) => item.store === storeName).length;
    return itemCount === 0 ? `No items for ${storeName}` : `${itemCount} items`;
  };

  const getCompletedProgress = (store) => {
    if (items.filter((item) => item.store === store).length) {
      return `(${
        items.filter((item) => item.store === store && item.completed).length
      }/${items.filter((item) => item.store === store).length})`;
    } else {
      return "";
    }
  };

  return (
    <>
      <Navbar setShowAddItem={setShowAddItem} />
      <main>
        <h1 className="nav-title">Shopping List</h1>
        {items.length == 0 && <h2 className="no-items">No items in list</h2>}
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
            <div className="store-item-count">
              {getStoreItemCount(store.name)}
              <span className="completed-progress">
                {getCompletedProgress(store.name)}
              </span>
            </div>
            <div
              className={`shopping-items ${
                store.expanded ? "show-section" : "hide-section"
              }`}
            >
              {items
                .filter((item) => item.store === store.name && !item.completed)
                .map((item, index) => (
                  <ShoppingItem
                    key={index}
                    item={item}
                    setShowEditItem={setShowEditItem}
                    setItemToEdit={setItemToEdit}
                  />
                ))}
            </div>
            <div
              className={`completed ${
                store.completed ? "hide-completed" : "show-completed"
              } `}
            >
              <h6
                className={`completed-title ${
                  store.expanded ? "show-section" : "hide-section"
                }`}
              >
                &nbsp;Completed&nbsp;
              </h6>
              <div
                className={`shopping-items ${
                  store.expanded ? "show-section" : "hide-section"
                }`}
              >
                {items
                  .filter((item) => item.store === store.name && item.completed)
                  .map((item, index) => (
                    <ShoppingItem
                      key={index}
                      item={item}
                      setShowEditItem={setShowEditItem}
                      setItemToEdit={setItemToEdit}
                    />
                  ))}
              </div>
            </div>
          </section>
        ))}

        <AddItem showAddItem={showAddItem} setShowAddItem={setShowAddItem} />
        <EditItem
          showEditItem={showEditItem}
          setShowEditItem={setShowEditItem}
          item={itemToEdit}
        />
      </main>
    </>
  );
};

export default Shopping;
