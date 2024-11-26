import React, { useState, useEffect, useRef } from "react";

function GeneralLedger({ formData, setFormData }) {
  const GL_VALUES = [
    "002 - Basic Salary",
    "0025 - General Deduction GL",
    "GL001 - Gross Income",
    "003 - Income Tax",
    "001 - Net Salary",
    "006 - Staff Loan",
    "007 - Staff Loan Interest",
    "004 - Tier 1 Sz",
  ];

  const [searchResults, setSearchResults] = useState({});
  const [showResults, setShowResults] = useState({});
  const inputRefs = useRef({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const filteredGLs = GL_VALUES.filter((gl) =>
      gl.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults((prevResults) => ({
      ...prevResults,
      [name]: filteredGLs,
    }));
  };

  const handleSelect = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setShowResults((prevShow) => ({ ...prevShow, [name]: false }));
  };
  const handleFocus = (name) => {
    setShowResults((prevShow) => ({ ...prevShow, [name]: true }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideClick = Object.keys(inputRefs.current).every(
        (key) =>
          inputRefs.current[key] &&
          !inputRefs.current[key].contains(event.target)
      );

      if (isOutsideClick) {
        setShowResults({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClear = (name) => {
    setFormData({ ...formData, [name]: "" });
    setShowResults((prevShow) => ({ ...prevShow, [name]: false }));
    setSearchResults((prevResults) => ({ ...prevResults, [name]: [] }));
  };

  return (
    <div className="md">
      <div className="leftdiv" style={{ width: "50%" }}>
        <div style={{ marginTop: "15px" }}>
          <p style={{ margin: "0" }}>Regular</p>
        </div>

        <div
          className="org"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}
        >
          <div id="rows">
            <label>Salary</label>

            <div className="input-container">
              <input
                style={{ width: "90%" }}
                id="salary"
                name="salary"
                placeholder="Search GL"
                value={formData.salary || ""}
                onChange={handleChange}
                onFocus={() => handleFocus("salary")}
              />{" "}
              {formData.salary && (
                <button
                  type="button"
                  className="clearsearch"
                  onClick={() => handleClear("salary")}
                >
                  ✕
                </button>
              )}
            </div>

            {showResults.salary && (
              <ul className="dropdown">
                {searchResults.salary &&
                  searchResults.salary.map((item, index) => (
                    <li
                      onMouseDown={(e) => e.stopPropagation()}
                      key={index}
                      onClick={() => handleSelect("salary", item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div id="rows">
            {" "}
            <label>Income Tax</label>
            <div className="input-container">
              <input
                style={{ width: "90%" }}
                id="incometax"
                name="incometax"
                placeholder="Search GL"
                value={formData.incometax || ""}
                onChange={handleChange}
                onFocus={() => handleFocus("incometax")}
              />{" "}
              {formData.incometax && (
                <button
                  type="button"
                  className="clearsearch"
                  onClick={() => handleClear("incometax")}
                >
                  ✕
                </button>
              )}
            </div>
            {showResults.incometax && (
              <ul className="dropdown">
                {searchResults.incometax &&
                  searchResults.incometax.map((item, index) => (
                    <li
                      onMouseDown={(e) => e.stopPropagation()}
                      key={index}
                      onClick={() => handleSelect("incometax", item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div id="rows">
            {" "}
            <label>Net Salary Payable</label>
            <div className="input-container">
              <input
                style={{ width: "90%" }}
                id="netsalary"
                name="netsalary"
                placeholder="Search GL"
                value={formData.netsalary || ""}
                onChange={handleChange}
                onFocus={() => handleFocus("netsalary")}
              />{" "}
              {formData.netsalary && (
                <button
                  type="button"
                  className="clearsearch"
                  onClick={() => handleClear("netsalary")}
                >
                  ✕
                </button>
              )}
            </div>
            {showResults.netsalary && (
              <ul className="dropdown">
                {searchResults.netsalary &&
                  searchResults.netsalary.map((item, index) => (
                    <li
                      onMouseDown={(e) => e.stopPropagation()}
                      key={index}
                      onClick={() => handleSelect("netsalary", item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div id="rows">
            {" "}
            <label>Operating Overtime</label>
            <div className="input-container">
              <input
                style={{ width: "90%" }}
                id="overtime"
                name="overtime"
                placeholder="Search GL"
                value={formData.overtime || ""}
                onChange={handleChange}
                onFocus={() => handleFocus("overtime")}
              />{" "}
              {formData.overtime && (
                <button
                  type="button"
                  className="clearsearch"
                  onClick={() => handleClear("overtime")}
                >
                  ✕
                </button>
              )}
            </div>
            {showResults.overtime && (
              <ul className="dropdown">
                {searchResults.overtime &&
                  searchResults.overtime.map((item, index) => (
                    <li
                      onMouseDown={(e) => e.stopPropagation()}
                      key={index}
                      onClick={() => handleSelect("overtime", item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div id="rows">
            {" "}
            <label>Shift Allowance</label>
            <div className="input-container">
              {" "}
              <input
                style={{ width: "90%" }}
                id="allowance"
                name="allowance"
                placeholder="Search GL"
                value={formData.allowance || ""}
                onChange={handleChange}
                onFocus={() => handleFocus("allowance")}
              />{" "}
              {formData.allowance && (
                <button
                  type="button"
                  className="clearsearch"
                  onClick={() => handleClear("allowance")}
                >
                  ✕
                </button>
              )}
            </div>
            {showResults.allowance && (
              <ul className="dropdown">
                {searchResults.allowance &&
                  searchResults.allowance.map((item, index) => (
                    <li
                      onMouseDown={(e) => e.stopPropagation()}
                      key={index}
                      onClick={() => handleSelect("allowance", item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div id="rows">
            {" "}
            <label>Text Relief</label>
            <div className="input-container">
              <input
                style={{ width: "90%" }}
                id="taxrelief"
                name="taxrelief"
                placeholder="Search GL"
                value={formData.taxrelief || ""}
                onChange={handleChange}
                onFocus={() => handleFocus("taxrelief")}
              />{" "}
              {formData.taxrelief && (
                <button
                  type="button"
                  className="clearsearch"
                  onClick={() => handleClear("taxrelief")}
                >
                  ✕
                </button>
              )}
            </div>
            {showResults.taxrelief && (
              <ul className="dropdown">
                {searchResults.taxrelief &&
                  searchResults.taxrelief.map((item, index) => (
                    <li
                      onMouseDown={(e) => e.stopPropagation()}
                      key={index}
                      onClick={() => handleSelect("taxrelief", item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="middlediv" style={{ height: "40vh" }}>
        <div className="vertical-line"></div>
      </div>
      <div className="rightdiv2">
        <div className="rd2">
          <p style={{ marginTop: "15px", marginBottom: "1px" }}>Mandatory</p>

          <div id="rows">
            {" "}
            <label>Employee Contribution GL</label>
            <div className="input-container">
              <input
                className="ecgl"
                id="ecgl"
                name="ecgl1"
                placeholder="Search GL"
                value={formData.ecgl1 || ""}
                onChange={handleChange}
                onFocus={() => handleFocus("ecgl1")}
              />{" "}
              {formData.ecgl1 && (
                <button
                  type="button"
                  className="clearsearch"
                  onClick={() => handleClear("ecgl1")}
                >
                  ✕
                </button>
              )}
            </div>
            {showResults.ecgl1 && (
              <ul className="dropdown">
                {searchResults.ecgl1 &&
                  searchResults.ecgl1.map((item, index) => (
                    <li
                      onMouseDown={(e) => e.stopPropagation()}
                      key={index}
                      onClick={() => handleSelect("ecgl1", item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div id="rows">
            {" "}
            <label>Employer Contribution GL</label>
            <div className="input-container">
              {" "}
              <input
                className="ecgl"
                id="ecgl"
                name="ecgl2"
                placeholder="Search GL"
                value={formData.ecgl2 || ""}
                onChange={handleChange}
                onFocus={() => handleFocus("ecgl2")}
              />{" "}
              {formData.ecgl2 && (
                <button
                  type="button"
                  className="clearsearch"
                  onClick={() => handleClear("ecgl2")}
                >
                  ✕
                </button>
              )}
            </div>
            {showResults.ecgl2 && (
              <ul className="dropdown">
                {searchResults.ecgl2 &&
                  searchResults.ecgl2.map((item, index) => (
                    <li
                      onMouseDown={(e) => e.stopPropagation()}
                      key={index}
                      onClick={() => handleSelect("ecgl2", item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div id="rows">
            {" "}
            <label>Employer Total Payable</label>
            <div className="input-container">
              <input
                className="ecgl"
                id="ecgl"
                name="ecgl3"
                placeholder="Search GL"
                value={formData.ecgl3 || ""}
                onChange={handleChange}
                onFocus={() => handleFocus("ecgl3")}
              />{" "}
              {formData.ecgl3 && (
                <button
                  type="button"
                  className="clearsearch"
                  onClick={() => handleClear("ecgl3")}
                >
                  ✕
                </button>
              )}
            </div>
            {showResults.ecgl3 && (
              <ul className="dropdown">
                {searchResults.ecgl3 &&
                  searchResults.ecgl3.map((item, index) => (
                    <li
                      onMouseDown={(e) => e.stopPropagation()}
                      key={index}
                      onClick={() => handleSelect("ecgl3", item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        <div className="rd2">
          <p style={{ marginTop: "15px", marginBottom: "1px" }}>Voluntary</p>
          <div id="rows">
            {" "}
            <label>Employee Contribution GL</label>
            <div className="input-container">
              {" "}
              <input
                className="ecgl"
                id="ecgl"
                name="ecgl4"
                placeholder="Search GL"
                value={formData.ecgl4 || ""}
                onChange={handleChange}
                onFocus={() => handleFocus("ecgl4")}
              />{" "}
              {formData.ecgl4 && (
                <button
                  type="button"
                  className="clearsearch"
                  onClick={() => handleClear("ecgl4")}
                >
                  ✕
                </button>
              )}
            </div>
            {showResults.ecgl4 && (
              <ul className="dropdown">
                {searchResults.ecgl4 &&
                  searchResults.ecgl4.map((item, index) => (
                    <li
                      onMouseDown={(e) => e.stopPropagation()}
                      key={index}
                      onClick={() => handleSelect("ecgl4", item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div id="rows">
            {" "}
            <label>Employer Contribution GL</label>
            <div className="input-container">
              {" "}
              <input
                className="ecgl"
                id="ecgl"
                name="ecgl5"
                placeholder="Search GL"
                value={formData.ecgl5 || ""}
                onChange={handleChange}
                onFocus={() => handleFocus("ecgl5")}
              />{" "}
              {formData.ecgl5 && (
                <button
                  type="button"
                  className="clearsearch"
                  onClick={() => handleClear("ecgl5")}
                >
                  ✕
                </button>
              )}
            </div>
            {showResults.ecgl5 && (
              <ul className="dropdown">
                {searchResults.ecgl5 &&
                  searchResults.ecgl5.map((item, index) => (
                    <li
                      onMouseDown={(e) => e.stopPropagation()}
                      key={index}
                      onClick={() => handleSelect("ecgl5", item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div id="rows">
            {" "}
            <label>Employer Total Payable</label>
            <div className="input-container">
              {" "}
              <input
                className="ecgl"
                id="ecgl"
                name="ecgl6"
                placeholder="Search GL"
                value={formData.ecgl6 || ""}
                onChange={handleChange}
                onFocus={() => handleFocus("ecgl6")}
              />{" "}
              {formData.ecgl6 && (
                <button
                  type="button"
                  className="clearsearch"
                  onClick={() => handleClear("ecgl6")}
                >
                  ✕
                </button>
              )}
            </div>
            {showResults.ecgl6 && (
              <ul className="dropdown">
                {searchResults.ecgl6 &&
                  searchResults.ecgl6.map((item, index) => (
                    <li
                      onMouseDown={(e) => e.stopPropagation()}
                      key={index}
                      onClick={() => handleSelect("ecgl6", item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralLedger;
