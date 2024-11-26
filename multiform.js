import React, { useState, useEffect, useRef } from "react";
import { saveAs } from "file-saver";
import "./Multiform.css";
import PersonalTab from "./PersonalTab";
import OrganizationalTab from "./OrganizationalTab";
import PaymentInfoTab from "./PaymentInfoTab";
import OtherInfoTab from "./OtherInfoTab";
import GeneralLedger from "./GeneralLedger";
import CustomModal from "./customModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFloppyDisk,
  faRotateBackward,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function MultiForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    maritalstat: "",
    gender: "",
    dob: "",
    country: "",
    nationality: "",
    hiredate: "",
    employeetype: "",
    taxoption: "",
    salarygrade: "",
    rate: "",
    department: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [cards, setCards] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const deletePicture = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const fileInputRef = useRef(null);
  const validateFields = () => {
    const requiredFields = [
      "firstname",
      "lastname",
      "email",
      "phone",
      "maritalstat",
      "gender",
      "dob",
      "country",
      "nationality",
      "hiredate",
      "employeetype",
      "taxoption",
      "salarygrade",
      "rate",
      "department",
    ];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const clearFieldError = (fieldName) => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };
  const validateEmail = (email) => {
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailFormat.test(email);
  };

  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      maritalstat: "",
      gender: "",
      dob: "",
      country: "",
      nationality: "",
      hiredate: "",
      employeetype: "",
      taxoption: "",
      salarygrade: "",
      rate: "",
      department: "",
    });
    setCards([]);
    setErrors({});
    setSelectedImage(null);

    setResetModalVisible(false);
  };

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [isSaveModalVisible, setSaveModalVisible] = useState(false);
  const [isResetModalVisible, setResetModalVisible] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleSave = () => {
    if (!validateFields()) {
      setModalMessage("Please input required fields!");
      setIsModalVisible(true);

      return;
    }
    if (!validateEmail(formData.email)) {
      setModalMessage(
        "Invalid email address! Please correct it before saving."
      );
      setIsModalVisible(true);
      return;
    }
    setSaveModalVisible(true);
  };
  const saveFile = () => {
    const dataToSave = {
      cards: cards,
      formData: formData,
    };
    const data = JSON.stringify(dataToSave, null, 2);

    const finalFileName = fileName || "employee_data.txt";
    const file = new File([data], { type: "text/plain;charset=utf-8" });
    saveAs(file, finalFileName);

    resetForm();
    setSaveModalVisible(false);
  };

  const handleClear = () => {
    const isFormEmpty = Object.values(formData).every((value) => value === "");
    const areCardsEmpty = cards.length === 0;
    const isImageEmpty = !selectedImage;

    if (isFormEmpty && areCardsEmpty && isImageEmpty) {
      setModalMessage("All fields are empty.");
      setIsModalVisible(true);
      return;
    }

    setResetModalVisible(true);
  };
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const tabs = [
    {
      name: "Personal",
      component: (
        <PersonalTab
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          clearFieldError={clearFieldError}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      ),
    },
    {
      name: "Organizational",
      component: (
        <OrganizationalTab
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          clearFieldError={clearFieldError}
        />
      ),
    },
    {
      name: "Payment Info",
      component: <PaymentInfoTab cards={cards} setCards={setCards} />,
    },
    {
      name: "Other Info",
      component: <OtherInfoTab formData={formData} setFormData={setFormData} />,
    },
    {
      name: "General Ledger",
      component: (
        <GeneralLedger formData={formData} setFormData={setFormData} />
      ),
    },
  ];

  const handleTabClick = (index) => {
    setCurrentTab(index);
    setDropdownVisible(false);
  };

  return (
    <div className="maindiv">
      <h1 className="header">Add Employee Details</h1>
      <div className="container">
        <button
          className="burger-menu"
          onClick={() => setDropdownVisible(!isDropdownVisible)}
        >
          {isDropdownVisible ? (
            <FontAwesomeIcon icon={faXmark} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>

        {isDropdownVisible && (
          <ul className="dropdown2">
            {tabs.map((tab, index) => (
              <li
                key={index}
                onClick={() => handleTabClick(index)}
                className={currentTab === index ? "active" : ""}
              >
                {tab.name}
              </li>
            ))}
          </ul>
        )}
        <div className="tab-buttons">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tabButton ${currentTab === index ? "active" : ""}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="currentTab">{tabs[currentTab].component}</div>

      <h4></h4>
      <div
        className="footer"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div className="lefttext">
          <span
            style={{
              fontStyle: "italic",
            }}
          >
            All fields marked with asteriks are compulsory (
            <label style={{ color: "red" }}> * </label>)
          </span>
        </div>
        <div className="right-buttons">
          <button className="btt1">
            {" "}
            <FontAwesomeIcon icon={faXmark} /> Cancel
          </button>
          <button className="btt2" onClick={handleClear}>
            {" "}
            <FontAwesomeIcon icon={faRotateBackward} /> Reset
          </button>
          <button className="btt3" onClick={handleSave}>
            {" "}
            <FontAwesomeIcon icon={faFloppyDisk} /> Save
          </button>
        </div>
      </div>
      {isModalVisible && (
        <CustomModal onClose={closeModal} message={modalMessage} />
      )}

      {isSaveModalVisible && (
        <div className="overlay">
          <div className="multiModal">
            <div
              style={{ flexDirection: "column" }}
              className="multiModal-content"
            >
              <span style={{ marginBottom: "5px" }}>Save File as:</span>
              <input
                width="70%"
                type="text"
                placeholder="Enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
            <div style={{ margin: "8px" }} className="modalbuttons">
              {" "}
              <button className="confirmsave" onClick={saveFile}>
                Save
              </button>
              <button
                className="confirmcancel"
                onClick={() => setSaveModalVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isResetModalVisible && (
        <div className="overlay">
          <div className="multiModal">
            <div className="multiModal-content">
              <span>Are you sure you want to reset all data?</span>
            </div>
            <div className="modalbuttons">
              <button
                className="confirmreset"
                onClick={() => {
                  setFormData({
                    firstname: "",
                    lastname: "",
                    email: "",
                    phone: "",
                    maritalstat: "",
                    gender: "",
                    dob: "",
                    country: "",
                    nationality: "",
                    hiredate: "",
                    employeetype: "",
                    taxoption: "",
                    salarygrade: "",
                    rate: "",
                    department: "",
                  });
                  setCards([]);
                  setErrors({});
                  deletePicture();
                  setResetModalVisible(false);
                }}
              >
                Reset
              </button>
              <button
                className="cancelreset"
                onClick={() => setResetModalVisible(false)}
              >
                No,Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiForm;
