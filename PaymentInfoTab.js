import React, { useState, useEffect } from "react";
import PaymentModal from "./PaymentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "react-phone-input-2/lib/style.css";

const PaymentInfoTab = ({ cards, setCards }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deleteRowIndex, setDeleteRowIndex] = useState(null);
  const handleAddOrEditCard = (cardInfo) => {
    if (editingIndex !== null) {
      const updatedCards = cards.map((card, index) =>
        index === editingIndex ? cardInfo : card
      );
      setCards(updatedCards);
      setEditingIndex(null);
    } else {
      setCards([...cards, cardInfo]);
    }
    setShowModal(false);
  };

  const deleteRow = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
    setDeleteRowIndex(null);
  };

  const handleDeleteClick = (index) => {
    setDeleteRowIndex(index);
  };

  useEffect(() => {}, [showModal]);

  return (
    <div className="tabletop">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="add-button" onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faPlus} /> Add Option
        </button>
      </div>

      <div style={{ marginTop: "10px", overflowX: "auto" }}>
        <table className="responsive-table">
          <thead style={{ background: "#EFF2F7" }}>
            <tr>
              <th>Payment Option</th>
              <th>Service Provider/Bank</th>
              <th>Branch</th>
              <th>Account#/Phone Number</th>
              <th>Payment Basis</th>
              <th>Value</th>
              <th>Default</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cards.length === 0 ? (
              <tr>
                <span
                  className="tablespan"
                  style={{ fontSize: "1rem", marginTop: "100px" }}
                >
                  No records to display
                </span>
              </tr>
            ) : (
              cards.map((card, index) => (
                <tr key={index}>
                  <td>{card.paymentOption}</td>
                  <td>
                    {card.serviceProvider} {card.bank}
                  </td>
                  <td>{card.branch}</td>
                  <td>
                    {card.accountNumber} {card.countryCode}
                    {card.phone}
                  </td>
                  <td>{card.paymentBasis}</td>
                  <td>
                    {card.bankValue}
                    {card.mobileValue}
                  </td>
                  <td>{card.default}</td>
                  <td>
                    <button
                      className="deletebutton"
                      onClick={() => handleDeleteClick(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="overlay" onClick={() => setShowModal(false)}></div>
      )}
      {showModal && (
        <PaymentModal
          onClose={() => {
            setEditingIndex(null);
            setShowModal(false);
          }}
          onSave={handleAddOrEditCard}
          formData={editingIndex !== null ? cards[editingIndex] : null}
        />
      )}
      {deleteRowIndex !== null && (
        <div className="overlay">
          <div className="multiModal">
            <div className="multiModal-content">
              <span>Are you sure you want to delete this row?</span>
            </div>
            <div className="modalbuttons">
              <button
                className="confirmreset"
                onClick={() => deleteRow(deleteRowIndex)}
              >
                Delete
              </button>
              <button
                className="cancelreset"
                onClick={() => setDeleteRowIndex(null)}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentInfoTab;
