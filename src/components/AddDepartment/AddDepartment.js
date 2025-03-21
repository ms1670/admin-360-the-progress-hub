import React, { useState } from "react";
import "./AddDepartment.css";

const AddDepartment = ({ isOpen, onClose, onAddDepartment }) => {
  const [departmentName, setDepartmentName] = useState("");

  const handleInputChange = (e) => {
    setDepartmentName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!departmentName.trim()) {
      alert("Please enter a department name.");
      return;
    }

    // Send department data to parent
    onAddDepartment(departmentName);

    // Reset input field
    setDepartmentName("");

    onClose(); // Close popup after submission
  };

  return (
    isOpen && (
      <div className="add-department-overlay">
        <div className="add-department-container">
          <h2>Add New Department</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Department Name:
              <input
                type="text"
                value={departmentName}
                onChange={handleInputChange}
                required
              />
            </label>

            <div className="button-group">
              <button type="submit">Add Department</button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddDepartment;
