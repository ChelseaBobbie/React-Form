import React from "react";

function OtherInfoTab({ formData, setFormData }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="md">
      <div className="leftdiv3" style={{ width: "55%" }}>
        <p style={{ margin: "0px" }}>Salary Info</p>
        <div
          className="org"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "30px",
          }}
        >
          <div id="rows">
            <label>Payroll Hours</label>
            <select
              style={{ width: "100%", padding: "5px" }}
              id="payrollhours"
              name="payrollhours"
              placeholder=""
              value={formData.payrollhours || ""}
              onChange={handleChange}
            >
              <option value="" disabled>
                {" "}
                Select Payroll Hours
              </option>
              <option value="regular">Regular Hours</option>
              <option value="overtime">Overtime Hours</option>
              <option value="holiday">Holiday Hours</option>
              <option value="unpaid">Unpaid Leave</option>
            </select>

            <selection />
          </div>
          <div id="rows">
            {" "}
            <label>Percentage of Basic Salary</label>
            <input
              style={{
                background:
                  formData.payrollhours === "regular" ||
                  formData.payrollhours === "overtime" ||
                  formData.payrollhours === "holiday" ||
                  formData.payrollhours === "unpaid"
                    ? ""
                    : "rgb(216, 219, 224)",
                textAlign: "right",
              }}
              name="salarypercentage"
              type="number"
              min={0}
              placeholder="0.0"
              value={formData.salarypercentage || ""}
              onChange={handleChange}
              disabled={
                (formData.payrollhours !== "regular") &
                (formData.payrollhours !== "overtime") &
                (formData.payrollhours !== "holiday") &
                (formData.payrollhours !== "unpaid")
              }
            />{" "}
          </div>
        </div>

        <div id="rows" style={{ marginTop: "20px" }}>
          {" "}
          <label>Payslip Note</label>
          <textarea
            rows="4"
            cols="50"
            id="payslipnote"
            name="payslipnote"
            placeholder="Enter Payslip Note"
            value={formData.payslipnote || ""}
            onChange={handleChange}
          />{" "}
        </div>
      </div>
      <div className="middlediv2" style={{ height: "40vh" }}>
        <div className="vertical-line"></div>
      </div>
    </div>
  );
}

export default OtherInfoTab;
