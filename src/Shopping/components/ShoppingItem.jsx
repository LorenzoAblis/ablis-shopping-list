import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { db } from "/firebaseConfig";
import { ref, set, remove } from "firebase/database";

const ShoppingItem = ({ item, setShowEditItem, setItemToEdit }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".complete")) {
      handleMenu();
    }
  };

  const handleEdit = () => {
    setShowEditItem(true);
    setItemToEdit(item);
  };

  const handleDelete = async () => {
    await remove(ref(db, "shopping_items/" + item.name));
  };

  const handleComplete = async () => {
    await set(ref(db, "shopping_items/" + item.name), {
      name: item.name,
      quantity: item.quantity,
      store: item.store,
      description: item.description,
      completed: item.completed ? false : true,
    });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".shopping-item")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={`${item.completed ? "completed-item" : ""} shopping-item ${
        showMenu ? "shift-left" : ""
      }`}
      onClick={handleOutsideClick}
    >
      <button className="complete" onClick={handleComplete}>
        <i
          className={`bi ${
            item.completed ? "bi-arrow-clockwise" : "bi-check-lg"
          }`}
        ></i>
      </button>
      <h2>{item.name}</h2>
      <div className="details">
        <p>{item.quantity}</p>
        <p>{item.description}</p>
      </div>
      <div className={`menu ${showMenu ? "show" : "hide"}`}>
        {showMenu && (
          <>
            <button className="edit" onClick={handleEdit}>
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
  setShowEditItem: PropTypes.func.isRequired,
  setItemToEdit: PropTypes.func.isRequired,
};

export default ShoppingItem;
