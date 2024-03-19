import PropTypes from "prop-types";
// import { useState } from "react";
// import { db } from "/firebaseConfig";
// import { ref, set } from "firebase/database";

import "../styles/Checkout.scss";

const Checkout = ({ showCheckout, setShowCheckout }) => {
  const handleClose = () => {
    setShowCheckout(false);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".card")) {
      handleClose();
    }
  };

  const handleCheckout = async () => {
    // if (newItem.name) {
    //   await set(ref(db, "shopping_items/" + newItem.name), {
    //     name: newItem.name || "",
    //     quantity: newItem.quantity || 0,
    //     store: newItem.store || "",
    //     description: newItem.description || "",
    //     completed: false,
    //   });
    // }

    handleClose();
  };

  return (
    <aside
      className={`checkout ${showCheckout ? "show-checkout" : "hide-checkout"}`}
      onClick={handleOutsideClick}
    >
      <div className="card">
        <div className="header">
          <h2>Checkout</h2>
          <button onClick={() => setShowCheckout(false)}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
    </aside>
  );
};

Checkout.propTypes = {
  showCheckout: PropTypes.bool.isRequired,
  setShowCheckout: PropTypes.func.isRequired,
};

export default Checkout;
