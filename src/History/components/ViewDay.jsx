import PropTypes from "prop-types";

import Modal from "../../Common/components/Modal";
import "../styles/ViewDay.scss";

const ViewDay = ({
  showViewDay,
  setShowViewDay,
  date,
  getStoresFromHistory,
  getItemsForStoreAndDate,
  metaItem,
}) => {
  return (
    <Modal
      key={showViewDay ? "show" : "hide"}
      showModal={showViewDay}
      setShowModal={setShowViewDay}
      title={date}
    >
      <div className="content">
        {getStoresFromHistory().map((store) => {
          const storeItems = getItemsForStoreAndDate(store, date);
          if (storeItems.length === 0) {
            return null;
          }
          return (
            <div key={`${date}-${store}`} className="store">
              <h3>{store}</h3>
              <div className="store-items">
                {getItemsForStoreAndDate(store, date).map((item) => (
                  <p key={item.name}>
                    {metaItem.time}
                    {item.quantity} {item.description} x {item.name}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

ViewDay.propTypes = {
  showViewDay: PropTypes.bool.isRequired,
  setShowViewDay: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  getStoresFromHistory: PropTypes.func.isRequired,
  getItemsForStoreAndDate: PropTypes.func.isRequired,
  metaItem: PropTypes.object.isRequired,
};

export default ViewDay;
