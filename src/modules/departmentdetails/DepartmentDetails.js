import React from "react";
import { FaTasks, FaHourglassHalf, FaSpinner, FaCheckCircle } from "react-icons/fa";
import { departments } from "../../data/departments"; // Correct path
import "./DepartmentDetails.css"; // Ensure this file exists

// Mock function to get task stats for a department
const getDepartmentStats = (department) => {
  return {
    total: Math.floor(Math.random() * 100),
    pending: Math.floor(Math.random() * 30),
    inProgress: Math.floor(Math.random() * 20),
    completed: Math.floor(Math.random() * 50),
  };
};

const DepartmentDetails = () => {
  return (
    <div className="department-container">
      {departments.map((department, index) => {
        const stats = getDepartmentStats(department);
        return (
          <div key={index} className="department-card">
            <h3 className="dept-header">{department}</h3>
            <div className="dept-body">
              <div className="stat-row">
                <FaTasks className="icon" /> Total Tasks: {stats.total}
              </div>
              <div className="stat-row">
                <FaHourglassHalf className="icon" /> Pending: {stats.pending}
              </div>
              <div className="stat-row">
                <FaSpinner className="icon" /> In Progress: {stats.inProgress}
              </div>
              <div className="stat-row">
                <FaCheckCircle className="icon" /> Completed: {stats.completed}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DepartmentDetails;
