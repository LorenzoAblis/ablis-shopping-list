import PropTypes from "prop-types";
import "../styles/Modal.scss";

const Modal = ({ showModal, setShowModal, children, title }) => {
  const handleClose = () => {
    setShowModal(false);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".modal__body")) {
      handleClose();
    }
  };
  return (
    <aside
      className={`modal ${showModal ? "show-modal" : "hide-modal"}`}
      onClick={handleOutsideClick}
    >
      <div className="modal__body">
        <div className="modal__header">
          <h2>{title}</h2>
          <button onClick={() => setShowModal(false)}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        {children}
      </div>
    </aside>
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;
