import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { db } from "/firebaseConfig";
import { ref, set } from "firebase/database";

import Modal from "../../Common/components/Modal";
import "../styles/AddItem.scss";

const AddItem = ({ showAddItem, setShowAddItem }) => {
  const [newItem, setNewItem] = useState({});

  const handleClose = () => {
    setShowAddItem(false);
  };

  const handleAdd = async () => {
    if (newItem.name) {
      await set(ref(db, "shopping_items/" + newItem.name), {
        name: newItem.name || "",
        quantity: newItem.quantity || 0,
        store: newItem.store || "",
        description: newItem.description || "",
        completed: false,
      });
    }

    setNewItem({});
    handleClose();
  };

  const handleChange = (e) => {
    setNewItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(newItem);
  }, [newItem]);

  return (
    <Modal
      key={showAddItem ? "show" : "hide"}
      showModal={showAddItem}
      setShowModal={setShowAddItem}
      title="Add Item"
    >
      <div className="form">
        <div className="form-group">
          <h3>Name</h3>
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-big">
          <div className="form-group amount">
            <h3>Amount</h3>
            <input
              type="number"
              name="quantity"
              value={newItem.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <h3>Store</h3>
            <input
              type="text"
              name="store"
              value={newItem.store}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <h3>Description</h3>
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
    </Modal>
  );
};

AddItem.propTypes = {
  showAddItem: PropTypes.bool.isRequired,
  setShowAddItem: PropTypes.func.isRequired,
};

export default AddItem;
