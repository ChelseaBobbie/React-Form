import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import CustomModal from "./customModal";
import "react-phone-input-2/lib/style.css";

function PaymentModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    paymentOption: "",
    bank: "",
    branch: "",
    accountNumber: "",
    serviceProvider: "",
    phone: "",
    paymentBasis: "",
    bankValue: "",
    mobileValue: "",
    note: "",
    default: false,
  });
  const [errors, setErrors] = useState({
    paymentOption: false,
    bank: false,
    branch: false,
    accountNumber: false,
    serviceProvider: false,
    phone: false,
    paymentBasis: false,
    bankValue: false,
    mobileValue: false,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const clearFieldError = (fieldName) => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    clearFieldError(name);

    if (name === "paymentOption") {
      const resetFields =
        value === "Bank"
          ? {
              serviceProvider: "",
              phone: "",
              mobileValue: "",
              paymentBasis: "",
              note: "",
              bank: "",
              branch: "",
              accountNumber: "",
              bankValue: "",
            }
          : {
              bank: "",
              branch: "",
              accountNumber: "",
              bankValue: "",
              paymentBasis: "",
              note: "",
              serviceProvider: "",
              phone: "",
              mobileValue: "",
            };

      setFormData({
        ...formData,
        ...resetFields,
        [name]: value,
        default: false,
      });
      return;
    }

    if (name === "accountNumber") {
      if (/^\d*$/.test(value) && value.length <= 14) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setFormData({ ...formData, [e.target.name]: isChecked ? "Yes" : "No" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.paymentOption === "Bank" &&
      (formData.accountNumber.length < 12 || formData.accountNumber.length > 14)
    ) {
      setErrors({ ...errors, accountNumber: true });
      setModalMessage("Invalid account number! Please enter 12-14 digits.");
      setIsModalVisible(true);
      return;
    }
    let formErrors = {
      paymentOption: !formData.paymentOption,
      bank: formData.paymentOption === "Bank" && !formData.bank,
      branch: formData.paymentOption === "Bank" && !formData.branch,
      accountNumber:
        formData.paymentOption === "Bank" &&
        (formData.accountNumber.length < 12 ||
          formData.accountNumber.length > 14),
      serviceProvider:
        formData.paymentOption === "Mobile Money" && !formData.serviceProvider,
      phone: formData.paymentOption === "Mobile Money" && !formData.phone,
      paymentBasis: !formData.paymentBasis,
      mobileValue:
        formData.paymentOption === "Mobile Money" && !formData.mobileValue,
      bankValue: !formData.bankValue === "Bank" && !formData.bankValue,
    };
    const hasErrors = Object.values(formErrors).some((error) => error);
    if (hasErrors) {
      setErrors(formErrors);
      setModalMessage("Please fill required fields!");
      setIsModalVisible(true);
      return;
    }
    onSave(formData);
  };
  return (
    <div className="modal">
      <h6
        className="header"
        style={{ background: "#182642", borderRadius: "2px" }}
      >
        Add Payment Info
      </h6>
      <div className="modal-content">
        {isModalVisible && (
          <CustomModal onClose={closeModal} message={modalMessage} />
        )}
        <form
          style={{
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <div className="modal0">
            <div>
              <label>Payment Option</label>
              <select
                style={{ width: "100%" }}
                name="paymentOption"
                value={formData.paymentOption}
                onChange={handleChange}
              >
                <option value="">Select Payment Option</option>
                <option value="Bank">Bank</option>
                <option value="Mobile Money">Mobile Money</option>
              </select>
            </div>
            <div className="defaultcheck" style={{ paddingTop: "25px" }}>
              <label>
                <input
                  style={{ width: "50px" }}
                  type="checkbox"
                  name="default"
                  checked={formData.default === "Yes"}
                  onChange={handleCheckboxChange}
                  disabled={
                    formData.paymentOption !== "Mobile Money" &&
                    formData.paymentOption !== "Bank"
                  }
                />
              </label>
              <span>Default</span>
            </div>
          </div>

          {formData.paymentOption === "Bank" && (
            <>
              <div className="modal2">
                <div>
                  <label>
                    Bank <label style={{ color: "red" }}>*</label>
                  </label>
                  <select
                    name="bank"
                    value={formData.bank}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      border: errors.bank ? "1px solid red" : "1px solid #ccc",
                      boxShadow: errors.bank ? "0 0 3px 1px red" : "",
                      transition:
                        "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                    }}
                  >
                    <option value="" disabled>
                      Select a Bank
                    </option>
                    <option value="Stanbic">Stanbic</option>
                    <option value="Ecobank">Ecobank</option>
                    <option value="Zenith">Zenith</option>
                    <option value="Fidelity">Fidelity</option>
                  </select>
                </div>
                <div>
                  <label>
                    Branch<label style={{ color: "red" }}>*</label>
                  </label>
                  <select
                    style={{
                      width: "100%",
                      border: errors.branch
                        ? "1px solid red"
                        : "1px solid #ccc",
                      boxShadow: errors.branch ? "0 0 3px 1px red" : "",
                      transition:
                        "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                    }}
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select a Branch
                    </option>
                    <option value="Spintex">Spintex</option>
                    <option value="Teshie">Teshie</option>
                    <option value="Adenta">Adenta</option>
                    <option value="Haatso">Haatso</option>
                  </select>
                </div>
              </div>

              <div className="modal1">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label>
                    Account Number <label style={{ color: "red" }}>*</label>
                  </label>
                  <input
                    style={{
                      width: "100%",

                      border: errors.accountNumber
                        ? "1px solid red"
                        : "1px solid #ccc",
                      boxShadow: errors.accountNumber ? "0 0 3px 1px red" : "",
                      transition:
                        "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                    }}
                    type="number"
                    name="accountNumber"
                    value={formData.accountNumber || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>
                    Payment Basis <label style={{ color: "red" }}>*</label>
                  </label>
                  <select
                    style={{
                      width: "100%",
                      border: errors.paymentBasis
                        ? "1px solid red"
                        : "1px solid #ccc",
                      boxShadow: errors.paymentBasis ? "0 0 3px 1px red" : "",
                      transition:
                        "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                    }}
                    name="paymentBasis"
                    value={formData.paymentBasis}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Payment Basis
                    </option>
                    <option value="Percentage">Percentage</option>
                    <option value="Fixed Amount">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    NA<label style={{ color: "red" }}>*</label>
                  </label>
                  <input
                    className="inputt"
                    style={{
                      background:
                        formData.paymentBasis === "Percentage" ||
                        formData.paymentBasis === "Fixed Amount"
                          ? "white"
                          : "#e7e7e7",
                      width: "100%",
                    }}
                    type="number"
                    min={0}
                    name="bankValue"
                    value={formData.bankValue || ""}
                    onChange={handleChange}
                    disabled={
                      formData.paymentBasis !== "Percentage" &&
                      formData.paymentBasis !== "Fixed Amount"
                    }
                  />
                </div>
              </div>
            </>
          )}

          {formData.paymentOption === "Mobile Money" && (
            <>
              <div className="modal3">
                <div>
                  <label>Service Provider</label>
                  <select
                    style={{ width: "100%" }}
                    name="serviceProvider"
                    value={formData.serviceProvider}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select a Service Provider
                    </option>
                    <option value="MTN">MTN</option>
                    <option value="Telecel">Telecel</option>
                    <option value="AirtelTigo">AirtelTigo</option>
                    <option value="Glo">Glo</option>
                  </select>
                </div>
                <div className="iw">
                  <label>
                    Mobile Number <label style={{ color: "red" }}>*</label>
                  </label>
                  <PhoneInput
                    className="custom-phone-input"
                    country={"gh"}
                    placeholder="+233 55 444 7777"
                    value={formData.phone || ""}
                    style={{
                      border: errors.phone ? "1px solid red" : "",
                      boxShadow: errors.phone ? "0 0 3px 1px red" : "",
                      transition:
                        "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                    }}
                    onChange={(phone) => {
                      clearFieldError("phone");
                      setFormData({ ...formData, phone });
                    }}
                  />
                </div>
                <div>
                  <label>Payment Basis</label>
                  <select
                    style={{ width: "100%" }}
                    name="paymentBasis"
                    value={formData.paymentBasis}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Payment Basis
                    </option>
                    <option value="Percentage">Percentage</option>
                    <option value="Fixed Amount">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    NA<label style={{ color: "red" }}>*</label>
                  </label>

                  <input
                    className="inputt"
                    style={{
                      background:
                        formData.paymentBasis === "Percentage" ||
                        formData.paymentBasis === "Fixed Amount"
                          ? "white"
                          : "#e7e7e7",
                      width: "100%",
                      textAlign: "right",
                      border: errors.value ? "1px solid red" : "1px solid #ccc",
                      boxShadow: errors.value ? "0 0 3px 1px red" : "",
                      transition:
                        "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                    }}
                    type="number"
                    min={0}
                    name="mobileValue"
                    value={formData.mobileValue || ""}
                    onChange={handleChange}
                    disabled={
                      formData.paymentBasis !== "Percentage" &&
                      formData.paymentBasis !== "Fixed Amount"
                    }
                  />
                </div>
              </div>
            </>
          )}

          <div className="iw">
            <label>Note</label>
            <textarea
              rows="4"
              cols="50"
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </div>
          <h4></h4>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              style={{ background: "#CED2D8" }}
              id="popup"
              type="button"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faXmark} /> Close
            </button>
            <button style={{ background: "#7893A5" }} id="popup" type="submit">
              <FontAwesomeIcon icon={faFloppyDisk} /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentModal;
