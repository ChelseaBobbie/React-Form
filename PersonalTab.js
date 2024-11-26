import React, { useState, useRef } from "react";
import "./Multiform.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import PhoneInput from "react-phone-input-2";

function PersonalTab({
  formData,
  setFormData,
  errors,
  clearFieldError,
  selectedImage,
  setSelectedImage,
}) {
  const [emailError, setEmailError] = useState("");
  const fileInputRef = useRef(null);
  const validateEmail = (email) => {
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailFormat.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Invalid Email Address!");
      } else {
        setEmailError("");
      }
    }
    clearFieldError(name);
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const [isRemovePictureModal, setRemovePictureModal] = useState(false);
  const deletePicture = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = () => {
    setRemovePictureModal(true);
  };
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setFormData({
      ...formData,
      [e.target.name]: isChecked ? "Resident" : "Not a Resident",
    });
  };

  return (
    <div className="md">
      <div className="leftdiv" style={{ width: "56%" }}>
        <div className="topdiv">
          <div className="iw1">
            <div className="iw">
              {" "}
              <label>Title</label>
              <select
                id="titles"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select your Title
                </option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss">Miss</option>
                <option value="Dr.">Dr.</option>
              </select>
            </div>

            <div className="iw">
              <label>Other Names</label>
              <input
                type="text"
                name="lname"
                value={formData.lname || ""}
                onChange={handleChange}
              />
            </div>

            <div className="iw">
              <label>
                Marital Status <label style={{ color: "red" }}>*</label>
              </label>
              <select
                list="marriedstat"
                name="maritalstat"
                value={formData.maritalstat || ""}
                onChange={handleChange}
                required
                style={{
                  border: errors.maritalstat
                    ? "1px solid red"
                    : "1px solid #ccc",
                  boxShadow: errors.maritalstat ? "0 0 3px 1px red" : "",
                  transition:
                    "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                }}
              >
                <option value="" disabled>
                  Select your Marital Status
                </option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>
          </div>

          <div className="iw1">
            {" "}
            <div className="iw">
              {" "}
              <label>
                First Name <label style={{ color: "red" }}>*</label>
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname || ""}
                onChange={handleChange}
                style={{
                  border: errors.firstname ? "1px solid red" : "1px solid #ccc",
                  boxShadow: errors.firstname ? "0 0 3px 1px red" : "",
                  transition:
                    "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                }}
              />
            </div>
            <div className="iw">
              {" "}
              <label>
                Gender <label style={{ color: "red" }}>*</label>
              </label>
              <select
                list="genders"
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                style={{
                  border: errors.gender ? "1px solid red" : "1px solid #ccc",
                  boxShadow: errors.gender ? "0 0 3px 1px red" : "",
                  transition:
                    "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                }}
              >
                {" "}
                <option value="" disabled>
                  Select your Gender
                </option>
                <option value="Male"> Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="iw1">
            <div className="iw">
              {" "}
              <label>
                Last Name <label style={{ color: "red" }}>*</label>
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname || ""}
                onChange={handleChange}
                style={{
                  border: errors.lastname ? "1px solid red" : "1px solid #ccc",
                  boxShadow: errors.lastname ? "0 0 3px 1px red" : "",
                  transition:
                    "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                }}
              />
            </div>

            <div className="iw">
              {" "}
              <label>
                Date of Birth <label style={{ color: "red" }}>*</label>
              </label>
              <input
                type="date"
                max="2006-12-31"
                name="dob"
                value={formData.dob || ""}
                onChange={handleChange}
                style={{
                  border: errors.dob ? "1px solid red" : "1px solid #ccc",
                  boxShadow: errors.dob ? "0 0 3px 1px red" : "",
                  transition:
                    "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                }}
                required
              />
            </div>
          </div>
        </div>
        <div className="bottomdiv">
          <p>Contact Info</p>

          <div className="iw2">
            <div className="iw">
              <label>
                Email Address <label style={{ color: "red" }}>*</label>
              </label>
              <input
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                style={{
                  border: errors.email ? "1px solid red" : "1px solid #ccc",
                  boxShadow: errors.email ? "0 0 5px 2px red" : "",
                  transition:
                    "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                }}
              />
              {emailError && (
                <span style={{ color: "red", fontSize: "15px" }}>
                  {emailError}
                </span>
              )}
            </div>
            <div className="iw">
              <label>
                Phone <label style={{ color: "red" }}>*</label>
              </label>
              <PhoneInput
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
            <div className="iw">
              <label>Digital Adress</label>
              <input
                type="text"
                name="digitaladdress"
                value={formData.digitaladdress || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="iw">
            <label>Home Adress</label>
            <textarea
              className="responsive-textarea"
              rows="4"
              cols="35"
              type="text"
              name="homeaddress"
              value={formData.homeaddress || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="middlediv">
        <div className="vertical-line"></div>
      </div>
      <div className="rightdiv">
        <div className="top-right">
          <div className="iw1">
            <div className="iw">
              {" "}
              <label>
                Country <label style={{ color: "red" }}>*</label>
              </label>
              <select
                className="lsp"
                id="country"
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
                style={{
                  border: errors.country ? "1px solid red" : "1px solid #ccc",
                  boxShadow: errors.country ? "0 0 3px 1px red" : "",
                  transition:
                    "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                }}
                required
              >
                <option value="" disabled>
                  Select a country
                </option>
                <option value="Ghana">Ghana</option>
                <option value="Nigeria">Nigeria</option>
                <option value="South Africa">South Africa</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="iw">
              <label>National ID </label>
              <input
                type="number"
                name="nationalID"
                pattern="^\d{10}$"
                className="lsp"
                value={formData.nationalID || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="iw1">
            <div className="iw">
              {" "}
              <label>
                Nationality <label style={{ color: "red" }}>*</label>
              </label>
              <select
                className="lsp"
                id="nationality"
                name="nationality"
                value={formData.nationality || ""}
                onChange={handleChange}
                style={{
                  border: errors.nationality
                    ? "1px solid red"
                    : "1px solid #ccc",
                  boxShadow: errors.nationality ? "0 0 3px 1px red" : "",
                  transition:
                    "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                }}
              >
                <option value="" disabled>
                  Select a Nationality
                </option>
                <option value="Ghanaian">Ghanaian</option>
                <option value="Nigerian">Nigerian</option>
                <option value="South African">South African</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="i">
              <label>
                <input
                  type="checkbox"
                  name="resident"
                  checked={formData.resident === "Resident"}
                  onChange={handleCheckboxChange}
                />
              </label>
              <span>Resident</span>
            </div>
          </div>
        </div>

        <div className="bottomdiv">
          <p>Employee Image</p>
          <div className="iw">
            <label>Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="imageUpload"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <label
                htmlFor="imageUpload"
                className="upload-button"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <FontAwesomeIcon icon={faCamera} /> Upload Image
              </label>

              {selectedImage && (
                <button className="deletepic" onClick={handleRemoveImage}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}
            </div>

            {selectedImage && (
              <div style={{ marginTop: "10px", flexDirection: "column" }}>
                <img src={selectedImage} alt="Preview" className="img" />
              </div>
            )}
          </div>
        </div>
      </div>
      {isRemovePictureModal && (
        <div className="overlay">
          <div className="multiModal">
            <div className="multiModal-content">
              <span>Are you sure you want to delete this picture?</span>
            </div>
            <div className="modalbuttons">
              <button
                className="confirmreset"
                onClick={() => {
                  deletePicture();
                  setRemovePictureModal(false);
                }}
              >
                Delete
              </button>
              <button
                className="cancelreset"
                onClick={() => setRemovePictureModal(false)}
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

export default PersonalTab;
