import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { db } from "/firebaseConfig";
import { ref, set } from "firebase/database";

import Modal from "../../Common/components/Modal";
import Dropdown from "../../Common/components/Dropdown";
import "../styles/EditItem.scss";

const EditItem = ({ showEditItem, setShowEditItem, item }) => {
  const [newItem, setNewItem] = useState({});

  const handleEdit = async () => {
    if (newItem.name) {
      await set(ref(db, "shopping_items/" + newItem.name), {
        name: newItem.name || "",
        quantity: newItem.quantity || 0,
        store: newItem.store || "",
        description: newItem.description || "",
        completed: newItem.completed || false,
      });
    }

    setShowEditItem(false);
  };

  const handleChange = (e) => {
    setNewItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setNewItem(item);
  }, [item]);

  return (
    <Modal
      key={showEditItem ? "show" : "hide"}
      showModal={showEditItem}
      setShowModal={setShowEditItem}
      title="Edit Item"
    >
      <div className="edit-item-form">
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
    </Modal>
  );
};

EditItem.propTypes = {
  showEditItem: PropTypes.bool.isRequired,
  setShowEditItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default EditItem;
