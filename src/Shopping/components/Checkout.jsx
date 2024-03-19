import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { db } from "/firebaseConfig";
import { ref, set, remove } from "firebase/database";

import Modal from "../../Common/components/Modal";
import "../styles/Checkout.scss";

const Checkout = ({ showCheckout, setShowCheckout, items, stores }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmation = () => {
    if (!showConfirmation) {
      setShowConfirmation(true);
    } else {
      handleCheckout();
      setShowConfirmation(false);
    }
  };

  const handleCheckout = async () => {
    const itemsToRemove = items.filter((item) => item.completed);
    for (const item of itemsToRemove) {
      await remove(ref(db, "shopping_items/" + item.name));
    }

    setShowCheckout(false);
  };

  const handleClear = async () => {
    const itemsToClear = items.filter((item) => item.completed);
    for (const item of itemsToClear) {
      if (item.name) {
        await set(ref(db, "shopping_items/" + item.name), {
          name: item.name || "",
          quantity: item.quantity || 0,
          store: item.store || "",
          description: item.description || "",
          completed: false,
        });
      }
    }

    setShowCheckout(false);
  };

  useEffect(() => {
    if (!showCheckout) {
      setShowConfirmation(false);
    }
  });

  return (
    <Modal
      showModal={showCheckout}
      setShowModal={setShowCheckout}
      title="Checkout"
    >
      <button className="clear-button" onClick={handleClear}>
        Clear
      </button>
      <div className="stores">
        {stores
          .filter((store) => !store.completed)
          .map((store, index) => (
            <div key={index} className="store">
              <h2 className="store-name">{store.name}</h2>
              <ul className="store-items">
                {items
                  .filter((item) => item.store === store.name && item.completed)
                  .map((item, index) => (
                    <li key={index} className="item">
                      {item.quantity} x {item.name}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      </div>
      {items.filter((item) => item.completed).length === 0 && (
        <p>No items to checkout</p>
      )}
      {showConfirmation && (
        <p className="confirmation">
          Are you sure you want to checkout?{" "}
          <span className="confirmation-warning">
            This will delete {items.filter((item) => item.completed).length}{" "}
            items
          </span>
        </p>
      )}
      <div className="footer">
        <button className="checkout-button" onClick={handleConfirmation}>
          <i className="bi bi-basket-fill"></i>
        </button>
      </div>
    </Modal>
  );
};

Checkout.propTypes = {
  showCheckout: PropTypes.bool.isRequired,
  setShowCheckout: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  stores: PropTypes.array.isRequired,
};

export default Checkout;