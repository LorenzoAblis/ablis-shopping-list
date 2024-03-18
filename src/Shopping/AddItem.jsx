import PropTypes from "prop-types";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { ref, set } from "firebase/database";

import "./AddItem.scss";

const AddItem = ({ showAddItem, setShowAddItem }) => {
  const [newItem, setNewItem] = useState({});

  const handleClose = () => {
    setShowAddItem(false);
    setNewItem({
      name: "",
      quantity: 0,
      store: "",
      description: "",
    });
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".card")) {
      handleClose();
    }
  };

  const handleAdd = async () => {
    await set(ref(db, "shopping_items/" + newItem.name), {
      name: newItem.name || "",
      quantity: newItem.quantity || 0,
      store: newItem.store || "",
      description: newItem.description || "",
      completed: false,
    });

    handleClose();
  };

  const handleChange = (e) => {
    setNewItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <aside
      className={`add-item ${showAddItem ? "show-add-item" : "hide-add-item"}`}
      onClick={handleOutsideClick}
    >
      <div className="card">
        <div className="header">
          <h2>Add Item</h2>
          <button onClick={() => setShowAddItem(false)}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="form">
          <div className="form-group">
            <h3>Name </h3>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-big">
            <div className="form-group amount">
              <h3>Amount </h3>
              <input
                type="number"
                name="quantity"
                value={newItem.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <h3>Store </h3>
              <input
                type="text"
                name="store"
                value={newItem.store}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <h3>Description </h3>
            <input
              type="text"
              name="description"
              value={newItem.description}
              onChange={handleChange}
            />
          </div>
          <div className="footer">
            <button onClick={handleAdd}>
              <i className="bi bi-check-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

AddItem.propTypes = {
  showAddItem: PropTypes.bool.isRequired,
  setShowAddItem: PropTypes.func.isRequired,
};

export default AddItem;
