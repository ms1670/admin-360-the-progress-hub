import React from "react";
import "./TaskSummary.css";
import { FiList, FiClock, FiRefreshCw, FiCheckCircle } from "react-icons/fi";

const TaskSummary = () => {
  const summaryData = [
    { id: 1, icon: <FiList />, count: 120, status: "Total Tasks", color: "#007bff" },
    { id: 2, icon: <FiClock />, count: 45, status: "Pending Tasks", color: "#ffc107" },
    { id: 3, icon: <FiRefreshCw />, count: 30, status: "In Progress", color: "#17a2b8" },
    { id: 4, icon: <FiCheckCircle />, count: 45, status: "Completed Tasks", color: "#28a745" },
  ];

  return (
    <div className="task-summary">
      {summaryData.map((item) => (
        <div key={item.id} className="task-card" style={{ borderLeft: `6px solid ${item.color}` }}>
          <div className="task-icon" style={{ color: item.color }}>
            {item.icon}
          </div>
          <div className="task-count">{item.count}</div>
          <div className="task-status">{item.status}</div>
        </div>
      ))}
    </div>
  );
};

export default TaskSummary;
