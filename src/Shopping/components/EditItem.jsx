import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { db } from "/firebaseConfig";
import { ref, set } from "firebase/database";

import "../styles/EditItem.scss";

const EditItem = ({ showEditItem, setShowEditItem, item }) => {
  const [newItem, setNewItem] = useState({});

  const handleClose = () => {
    setShowEditItem(false);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".card")) {
      handleClose();
    }
  };

  const handleEdit = async () => {
    if (newItem.name) {
      await set(ref(db, "shopping_items/" + newItem.name), {
        name: newItem.name || "",
        quantity: newItem.quantity || 0,
        store: newItem.store || "",
        description: newItem.description || "",
        completed: false,
      });
    }

    handleClose();
  };

  const handleChange = (e) => {
    setNewItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setNewItem(item);
  }, [item]);

  return (
    <aside
      className={`edit-item ${
        showEditItem ? "show-edit-item" : "hide-edit-item"
      }`}
      onClick={handleOutsideClick}
    >
      <div className="card">
        <div className="header">
          <h2>Edit Item</h2>
          <button onClick={() => setShowEditItem(false)}>
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
            <button onClick={handleEdit}>
              <i className="bi bi-check-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

EditItem.propTypes = {
  showEditItem: PropTypes.bool.isRequired,
  setShowEditItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default EditItem;
