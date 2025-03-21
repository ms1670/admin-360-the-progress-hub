import React from "react";
import "./TaskSummary.css";
import { FiList, FiClock, FiRefreshCw, FiCheckCircle } from "react-icons/fi";

const TaskSummary = ({ tasks }) => {
  // Count task statuses dynamically
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.status === "Pending").length;
  const inProgressTasks = tasks.filter(task => task.status === "In Progress").length;
  const completedTasks = tasks.filter(task => task.status === "Completed").length;

  const summaryData = [
    { id: 1, icon: <FiList />, count: totalTasks, status: "Total Tasks", color: "#007bff" },
    { id: 2, icon: <FiClock />, count: pendingTasks, status: "Pending Tasks", color: "#ffc107" },
    { id: 3, icon: <FiRefreshCw />, count: inProgressTasks, status: "In Progress", color: "#17a2b8" },
    { id: 4, icon: <FiCheckCircle />, count: completedTasks, status: "Completed Tasks", color: "#28a745" },
  ];

  return (
    <div className="task-summary">
      {summaryData.map((item) => (
        <div key={item.id} className="task-card" style={{ borderLeft: `6px solid ${item.color}` }}>
          <div className="task-icon" style={{ color: item.color }}>{item.icon}</div>
          <div className="task-count">{item.count}</div>
          <div className="task-status">{item.status}</div>
        </div>
      ))}
    </div>
  );
};

export default TaskSummary;


// import React from "react";
// import "./TaskSummary.css";
// import { FiList, FiClock, FiRefreshCw, FiCheckCircle } from "react-icons/fi";

// const TaskSummary = () => {
//   const summaryData = [
//     { id: 1, icon: <FiList />, count: 120, status: "Total Tasks", color: "#007bff" },
//     { id: 2, icon: <FiClock />, count: 45, status: "Pending Tasks", color: "#ffc107" },
//     { id: 3, icon: <FiRefreshCw />, count: 30, status: "In Progress", color: "#17a2b8" },
//     { id: 4, icon: <FiCheckCircle />, count: 45, status: "Completed Tasks", color: "#28a745" },
//   ];

//   return (
//     <div className="task-summary">
//       {summaryData.map((item) => (
//         <div key={item.id} className="task-card" style={{ borderLeft: `6px solid ${item.color}` }}>
//           <div className="task-icon" style={{ color: item.color }}>
//             {item.icon}
//           </div>
//           <div className="task-count">{item.count}</div>
//           <div className="task-status">{item.status}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TaskSummary;
