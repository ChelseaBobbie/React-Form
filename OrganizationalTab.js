import React from "react";

function OrganizationalTab({ formData, setFormData, errors, clearFieldError }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    clearFieldError(name);
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="md">
        <div className="leftdiv" style={{ width: "50%" }}>
          <div>
            <div className="org">
              <div className="iw">
                {" "}
                <label>Staff ID</label>
                <input
                  style={{ background: "#D8DBE0" }}
                  type="text"
                  name="staffid"
                  placeholder="AUTO GENERATE ID"
                  value={formData.staffid || ""}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div id="rows">
                <label>
                  Hire Date <label style={{ color: "red" }}>*</label>{" "}
                </label>
                <input
                  type="date"
                  name="hiredate"
                  value={formData.hiredate || ""}
                  onChange={handleChange}
                  style={{
                    border: errors.hiredate
                      ? "1px solid red"
                      : "1px solid #ccc",
                    boxShadow: errors.hiredate ? "0 0 3px 1px red" : "",
                    transition:
                      "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="bottomdiv">
            <p style={{ color: "black" }}>Segments</p>

            <div
              className="org1"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
              }}
            >
              <div id="rows">
                <label>Section</label>
                <select
                  id="section"
                  name="section"
                  value={formData.section || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select section
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div id="rows">
                {" "}
                <label>
                  Department <label style={{ color: "red" }}>*</label>
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department || ""}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    border: errors.department
                      ? "1px solid red"
                      : "1px solid #ccc",
                    boxShadow: errors.department ? "0 0 3px 1px red" : "",
                    transition:
                      "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                  }}
                >
                  <option value="" disabled>
                    Select Department
                  </option>{" "}
                  <option value="si">Systems Integration</option>
                  <option value="software">Software Department</option>
                  <option value="consulting">IT consulting</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
              <div id="rows">
                <label>Division</label>
                <select
                  id="division"
                  name="division"
                  placeholder="Select Unit"
                  value={formData.division || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled style={{ color: "red" }}>
                    Select division
                  </option>{" "}
                  <option value="1stdivision">1st Division</option>
                  <option value="2nddivision">2nd Division</option>
                </select>
              </div>
              <div id="rows">
                <label>
                  Employee Type<label style={{ color: "red" }}>*</label>
                </label>
                <select
                  id="employeetype"
                  name="employeetype"
                  placeholder="Select Employee type"
                  value={formData.employeetype || ""}
                  onChange={handleChange}
                  style={{
                    border: errors.employeetype
                      ? "1px solid red"
                      : "1px solid #ccc",
                    boxShadow: errors.employeetype ? "0 0 3px 1px red" : "",
                    transition:
                      "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                  }}
                >
                  <option value="" disabled>
                    Select Employee Type
                  </option>{" "}
                  <option value="fulltime">Full-Time</option>
                  <option value="parttime">Part-Time</option>
                  <option value="intern">Intern</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
              <div id="rows">
                <label>Position</label>
                <select
                  id="position"
                  name="position"
                  value={formData.position || ""}
                  onChange={handleChange}
                >
                  {" "}
                  <option value="" disabled>
                    Select Position
                  </option>{" "}
                  <option value="projectmanager">Project Manager</option>
                  <option value="hrmanager">HR Manager</option>
                  <option value="nss">NSS Peronnel</option>
                  <option value="softwareengineer">Software Engineer</option>
                </select>
              </div>
              <div id="rows">
                <label>Unit</label>
                <select
                  id="unit"
                  name="unit"
                  value={formData.unit || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Unit
                  </option>{" "}
                  <option value="1unit">1st Unit</option>
                  <option value="2unit">2nd Unit</option>
                </select>
              </div>
              <div id="rows">
                <label>Location</label>
                <select
                  id="location2"
                  name="location2"
                  value={formData.location2 || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Locataion
                  </option>{" "}
                  <option value="Spintex">Spintex</option>
                  <option value="Teshie">Teshie</option>
                  <option value="East Legon">East Legon</option>
                  <option value="Dansoman">Dansoman</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="middlediv" style={{ height: "40vh" }}>
          <div className="vertical-line"></div>
        </div>
        <div className="rightdiv" style={{ width: "67%" }}>
          <div>
            <div
              className="org2"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
              }}
            >
              <div id="rows">
                <label>
                  Tax Option <label style={{ color: "red" }}>*</label>
                </label>
                <select
                  name="taxoption"
                  value={formData.taxoption || ""}
                  onChange={handleChange}
                  style={{
                    border: errors.taxoption
                      ? "1px solid red"
                      : "1px solid #ccc",
                    boxShadow: errors.taxoption ? "0 0 3px 1px red" : "",
                    transition:
                      "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                  }}
                >
                  <option value="" disabled>
                    Select Tax Option
                  </option>{" "}
                  <option value="personalincome">Personal Income Tax</option>
                  <option value="corporateincome">Coporate Income Tax</option>
                  <option value="property">Property Tax</option>
                </select>
              </div>
              <div className="iw">
                {" "}
                <label>Employment Option</label>
                <select
                  name="employmentOption"
                  value={formData.employmentOption || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Employee Option
                  </option>{" "}
                  <option value="fulltime">Full-time</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="temporary">Temporary</option>
                </select>
              </div>
              <div className="i">
                <label>
                  <input
                    type="checkbox"
                    name="ID"
                    value={formData.ID || ""}
                    onChange={handleChange}
                  />
                </label>
                <span>Overtime Exempt</span>
              </div>
            </div>
          </div>
          <div className="bottomdiv">
            <p>Salary Info</p>

            <div
              className="org3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "15px",
              }}
            >
              <div id="rows">
                <label>
                  Salary Grade <label style={{ color: "red" }}>*</label>
                </label>
                <select
                  id="salarygrade"
                  name="salarygrade"
                  value={formData.salarygrade || ""}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    border: errors.salarygrade
                      ? "1px solid red"
                      : "1px solid #ccc",
                    boxShadow: errors.salarygrade ? "0 0 3px 1px red" : "",
                    transition:
                      "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                  }}
                >
                  <option value="" disabled>
                    Select Salary Grade
                  </option>
                  <option value="junior">Junior Grade</option>
                  <option value="intermediate">Intermediate Grade</option>
                  <option value="specialist">Specialist Grade</option>
                  <option value="managerial">Managerial Grade</option>
                  <option value="director">Director Grade</option>
                </select>
              </div>
              <div id="rows">
                {" "}
                <label>Notch</label>
                <select
                  style={{ width: "100%" }}
                  id="notch"
                  name="notch"
                  value={formData.notch || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Notch
                  </option>
                  <option value="taxbracket"> Tax Bracket</option>
                  <option value="benefitcliff">Benefit Cliff</option>
                  <option value="socialsecurity">Social Security</option>
                  <option value="salaryband">Salary Band</option>
                </select>
              </div>
            </div>
            <div
              className="org3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
              }}
            >
              <div id="rows">
                <label>Currency</label>
                <select
                  style={{
                    background:
                      formData.salarygrade === "junior" ||
                      formData.salarygrade === "intermediate" ||
                      formData.salarygrade === "specialist" ||
                      formData.salarygrade === "managerial" ||
                      formData.salarygrade === "director"
                        ? ""
                        : "rgb(216, 219, 224)",
                    width: "100%",
                  }}
                  name="currency"
                  value={formData.currency || ""}
                  onChange={handleChange}
                  disabled={
                    (formData.salarygrade !== "junior") &
                    (formData.salarygrade !== "intermediate") &
                    (formData.salarygrade !== "specialist") &
                    (formData.salarygrade !== "managerial") &
                    (formData.salarygrade !== "director")
                  }
                >
                  <option value="" disabled></option>
                  <option value="GH">Ghanaian Cedi (GH)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                  <option value="ZAR">South African Rand (ZAR)</option>
                </select>
              </div>
              <div id="rows">
                {" "}
                <label>Salary Type</label>
                <select
                  style={{
                    background:
                      formData.salarygrade === "junior" ||
                      formData.salarygrade === "intermediate" ||
                      formData.salarygrade === "specialist" ||
                      formData.salarygrade === "managerial" ||
                      formData.salarygrade === "director"
                        ? ""
                        : "rgb(216, 219, 224)",
                    width: "100%",
                  }}
                  name="salarytype"
                  value={formData.salarytype || ""}
                  onChange={handleChange}
                  disabled={
                    (formData.salarygrade !== "junior") &
                    (formData.salarygrade !== "intermediate") &
                    (formData.salarygrade !== "specialist") &
                    (formData.salarygrade !== "managerial") &
                    (formData.salarygrade !== "director")
                  }
                >
                  <option value="" disabled></option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Biweekly</option>
                </select>
              </div>
              <div id="rows">
                {" "}
                <label>
                  Rate <label style={{ color: "red" }}>*</label>
                </label>
                <input
                  type="number"
                  min={0}
                  name="rate"
                  value={formData.rate || ""}
                  onChange={handleChange}
                  style={{
                    border: errors.rate ? "1px solid red" : "1px solid #ccc",
                    boxShadow: errors.rate ? "0 0 3px 1px red" : "",
                    transition:
                      "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
                  }}
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrganizationalTab;
