
import React, { useState, useEffect, useRef } from "react";
import "./Task.css";
import { initialTasks } from "../../data/TaskData";
import { FiEdit, FiMoreVertical, FiPaperclip } from "react-icons/fi";
import { FiPlus, FiFilter, FiCheckSquare, FiClock, FiTrash2 } from "react-icons/fi";

const Task = () => {
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRef = useRef(null);

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = (taskId) => {
    setMenuOpen(menuOpen === taskId ? null : taskId);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "tp-status-completed";
      case "In Progress":
        return "tp-status-inprogress";
      case "Pending":
        return "tp-status-pending";
      default:
        return "";
    }
  };

  return (
    <div className="tp-task-container">
      {initialTasks.map((task) => (
        <div key={task.id} className="tp-task-card">
          {/* ✅ Left Side - Task Details */}
          <div className="tp-task-left">
            <h3 className="tp-task-title">{task.title}</h3>
            <p className="tp-task-assigned">Assigned to: <strong>{task.name}</strong></p>
            <p className="tp-task-department">Department: {task.department}</p>
            {task.attachment && (
              <a href={task.attachment} target="_blank" rel="noopener noreferrer" className="tp-task-attachment">
                <FiPaperclip className="tp-attachment-icon" /> Attachment
              </a>
            )}
          </div>

          {/* ✅ Right Side - Due Date & Status (Aligned to End) */}
          <div className="tp-task-right">
            <div className="tp-task-header">
              <FiEdit className="tp-edit-icon" />
              <div className="more-options" ref={menuRef}>
                <FiMoreVertical className="tp-more-icon" onClick={() => toggleMenu(task.id)} />
                {menuOpen === task.id && (
                  <div className="tp-task-menu">
                    <button>Edit Task</button>
                    <button>Mark as Complete</button>
                    <button>Set as In Progress</button>
                  </div>
                )}
              </div>
            </div>

            {/* ✅ Due Date (At Right End) */}
            <p className="tp-task-date"><FiClock/><strong>Due:</strong> {task.date}</p>

            {/* ✅ Task Status (Below Due Date) */}
            <span className={`tp-task-status ${getStatusClass(task.status)}`}>{task.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Task;


// import React, { useState, useEffect, useRef } from "react";
// import "./Task.css";
// import { initialTasks } from "../../data/TaskData";
// import { FiEdit, FiMoreVertical, FiPaperclip } from "react-icons/fi";
// import { FiPlus, FiFilter, FiCheckSquare, FiClock, FiTrash2 } from "react-icons/fi";

// const Task = () => {
//   const [menuOpen, setMenuOpen] = useState(null);
//   const menuRef = useRef(null);

//   // ✅ Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuOpen(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleMenu = (taskId) => {
//     setMenuOpen(menuOpen === taskId ? null : taskId);
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "Completed":
//         return "status-completed";
//       case "In Progress":
//         return "status-inprogress";
//       case "Pending":
//         return "status-pending";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="task-container">
//       {initialTasks.map((task) => (
//         <div key={task.id} className="task-card">
//           {/* ✅ Left Side - Task Details */}
//           <div className="task-left">
//             <h3 className="task-title">{task.title}</h3>
//             <p className="task-assigned">Assigned to: <strong>{task.name}</strong></p>
//             <p className="task-department">Department: {task.department}</p>
//             {task.attachment && (
//               <a href={task.attachment} target="_blank" rel="noopener noreferrer" className="task-attachment">
//                 <FiPaperclip className="attachment-icon" /> Attachment
//               </a>
//             )}
//           </div>

//           {/* ✅ Right Side - Due Date & Status (Aligned to End) */}
//           <div className="task-right">
//             <div className="task-header">
//               <FiEdit className="edit-icon" />
//               <div className="more-options" ref={menuRef}>
//                 <FiMoreVertical className="more-icon" onClick={() => toggleMenu(task.id)} />
//                 {menuOpen === task.id && (
//                   <div className="task-menu">
//                     <button>Edit Task</button>
//                     <button>Mark as Complete</button>
//                     <button>Set as In Progress</button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* ✅ Due Date (At Right End) */}
//             <p className="task-date"><FiClock/><strong>Due:</strong> {task.date}</p>

//             {/* ✅ Task Status (Below Due Date) */}
//             <span className={`task-status ${getStatusClass(task.status)}`}>{task.status}</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Task;



// import React from "react";
// import "./Task.css";

// const Task = () => {
//   return (
//     <div className="task-container">
//       <h2 className="task-title">Tasks</h2>
//       <p className="task-subtext">Manage your tasks efficiently with a clean and organized interface.</p>
      
//       {/* Task List or Kanban Board will be added here */}
//     </div>
//   );
// };

// export default Task;
