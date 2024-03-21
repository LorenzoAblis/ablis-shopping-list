import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { db } from "/firebaseConfig";
import { ref, set } from "firebase/database";

import Modal from "../../Common/components/Modal";
import Dropdown from "../../Common/components/Dropdown";
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
        quantity: newItem.quantity || 1,
        store: newItem.store || "Costco",
        description: newItem.description || "",
        completed: false,
      });
    }

    setNewItem({});
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
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
      <div className="add-item-form">
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
          <div className="form-group">
            <h3>Amount</h3>
            <Dropdown
              options={[1, 2, 3, 4, 5]}
              className="amount"
              selectedOption={newItem.quantity}
              setSelectedOption={(quantity) =>
                handleChange({ target: { name: "quantity", value: quantity } })
              }
            />
          </div>
          <div className="form-group">
            <h3>Location</h3>
            <Dropdown
              options={["Costco", "Walmart", "Other"]}
              className="store"
              selectedOption={newItem.store}
              setSelectedOption={(store) =>
                handleChange({ target: { name: "store", value: store } })
              }
            />
            <input
              type="text"
              name="store"
              placeholder="Enter store name"
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
