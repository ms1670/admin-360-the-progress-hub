import React, { useState } from "react";
import "./AddMember.css";

const AddMember = ({ isOpen, onClose, onAddMember }) => {
  const [memberDetails, setMemberDetails] = useState({
    name: "",
    email: "",
    department: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!memberDetails.name || !memberDetails.email || !memberDetails.department) {
      alert("Please fill all fields.");
      return;
    }

    // Send data to parent component
    onAddMember(memberDetails);

    // Reset fields
    setMemberDetails({
      name: "",
      email: "",
      department: "",
    });

    onClose(); // Close the modal after submitting
  };

  return (
    isOpen && (
      <div className="add-member-overlay">
        <div className="add-member-container">
          <h2>Add New Member</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={memberDetails.name}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={memberDetails.email}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Department:
              <input
                type="text"
                name="department"
                value={memberDetails.department}
                onChange={handleInputChange}
                required
              />
            </label>

            <div className="button-group">
              <button type="submit">Add Member</button>
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

export default AddMember;
