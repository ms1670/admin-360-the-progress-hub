import React, { useState, useEffect } from "react";
import { 
  FaClipboardList, FaPlus, FaArrowRight, FaFilePdf, 
  FaFileImage, FaFileAlt, FaEdit, FaEllipsisV 
} from "react-icons/fa";
import "./TaskList.css";
import { initialTasks } from "../../data/TaskData"; 
import AddTask from "../AddTask/AddTask";
  
// ✅ Function to get the correct attachment icon based on file type
const getAttachmentIcon = (url) => {
  if (!url || typeof url !== "string") return null;

  // Extract file extension
  const ext = url.split(".").pop().toLowerCase();
	
  // Match with correct icon
  if (ext === "pdf") return <FaFilePdf className="attachment-icon pdf" />;
  if (["png", "jpg", "jpeg", "gif", "bmp", "svg"].includes(ext)) return <FaFileImage className="attachment-icon image" />;
  if (["doc", "docx", "txt"].includes(ext)) return <FaFileAlt className="attachment-icon text" />;
  
  // Default icon for unknown files
  return <FaFileAlt className="attachment-icon other" />;
};

const TaskList = ({ departmentName }) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [openMenu, setOpenMenu] = useState(null);

  // ✅ Ensures the dropdown menu closes when clicking outside
  useEffect(() => {
    const closeMenuOnClickOutside = (e) => {
      if (!e.target.closest(".more-options")) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", closeMenuOnClickOutside);
    return () => document.removeEventListener("click", closeMenuOnClickOutside);
  }, []);

  const handleAddTaskClick = () => setIsAddTaskOpen(true);
  const handleClosePopup = () => setIsAddTaskOpen(false);

  // ✅ Handles adding a new task and ensures immediate UI updates
  const handleNewTask = (newTask) => {
    console.log("Adding Task to List:", newTask);
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // ✅ Filters tasks based on selected department
  const filteredTasks = departmentName 
    ? tasks.filter((task) => task.department.toLowerCase() === departmentName.toLowerCase()) 
    : tasks;

  const toggleMenu = (taskId) => {
    setOpenMenu((prev) => (prev === taskId ? null : taskId));
  };

  return (
    <div className="new-tasks-card">
      <div className="new-tasks-header">
        <div className="header-title">
          <FaClipboardList className="task-icon" />
          <h3>Tasks</h3>
        </div>
        <button className="new-task-btn" onClick={handleAddTaskClick}>
          <FaPlus /> New Task
        </button>
      </div>

      <div className="task-list-header">
        <span className="task-header-title">Task</span>
        <span className="task-header-member">Member & Department</span>
        <span className="task-header-date">Due Date</span>
        <span className="task-header-status">Status</span>
        <span className="task-header-actions"></span>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
            <div className="task-title-container">
              <span className="task-title">{task.title}</span>
              {task.attachment && (
                <div className="task-attachments">
                  <a href={task.attachment} target="_blank" rel="noopener noreferrer">
                    {getAttachmentIcon(task.attachment)}
                    <span className="attachment-text">View Attachment</span>
                  </a>
                </div>
              )}
            </div>

            <div className="task-member-department">
              <span className="task-member">{task.name}</span>
              <span className="task-department">{task.department}</span>
            </div>

            <span className="task-date">{task.date}</span>
            <span className="task-status-new-card">{task.status}</span>

            <div className="task-actions">
              <FaEdit className="task-edit-icon" title="Edit Task" />
              <div className="more-options">
                <FaEllipsisV 
                  className="more-options-icon" 
                  onClick={() => toggleMenu(task.id)} 
                />
                {openMenu === task.id && (
                  <div className="dropdown-menu">
                    <button>Edit Task</button>
                    <button>In Progress</button>
                    <button>Mark Complete</button>
                    <button>View Details</button>
                    <button>Delete Task</button>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="view-more-button-container">
        <button className="view-more-btn">
          View More Tasks <FaArrowRight />
        </button>
      </div>

      <AddTask isOpen={isAddTaskOpen} onClose={handleClosePopup} onAddTask={handleNewTask} />
    </div>
  );
};

export default TaskList;


// import React, { useState, useEffect } from "react";
// import { 
//   FaClipboardList, FaPlus, FaArrowRight, FaFilePdf, 
//   FaFileImage, FaFileAlt, FaEdit, FaEllipsisV 
// } from "react-icons/fa";
// import "./TaskList.css";
// import AddTask from "../AddTask/AddTask";

// const getAttachmentIcon = (url) => {
//   if (!url || typeof url !== "string") return null;
//   const ext = url.split(".").pop().toLowerCase();
//   if (ext === "pdf") return <FaFilePdf className="attachment-icon pdf" />;
//   if (["png", "jpg", "jpeg", "gif", "bmp", "svg"].includes(ext)) return <FaFileImage className="attachment-icon image" />;
//   if (["doc", "docx", "txt"].includes(ext)) return <FaFileAlt className="attachment-icon text" />;
//   return <FaFileAlt className="attachment-icon other" />;
// };

// const TaskList = ({ departmentName, tasks, setTasks }) => {
//   const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
//   const [openMenu, setOpenMenu] = useState(null);

//   useEffect(() => {
//     const closeMenuOnClickOutside = (e) => {
//       if (!e.target.closest(".more-options")) {
//         setOpenMenu(null);
//       }
//     };
//     document.addEventListener("click", closeMenuOnClickOutside);
//     return () => document.removeEventListener("click", closeMenuOnClickOutside);
//   }, []);

//   const handleAddTaskClick = () => setIsAddTaskOpen(true);
//   const handleClosePopup = () => setIsAddTaskOpen(false);

//   const handleNewTask = (newTask) => {
//     if (!setTasks) {
//       console.error("setTasks is not provided.");
//       return;
//     }
//     setTasks((prevTasks) => [newTask, ...prevTasks]);
//   };

//   // ✅ Filtering tasks based on departmentName
//   const filteredTasks = tasks?.filter(
//     (task) => !departmentName || task.department.toLowerCase() === departmentName.toLowerCase()
//   ) || [];

//   console.log("Department Name:", departmentName);
//   console.log("Filtered Tasks:", filteredTasks);

//   const toggleMenu = (taskId) => {
//     setOpenMenu((prev) => (prev === taskId ? null : taskId));
//   };

//   return (
//     <div className="new-tasks-card">
//       <div className="new-tasks-header">
//         <div className="header-title">
//           <FaClipboardList className="task-icon" />
//           <h3>Tasks</h3>
//         </div>
//         <button className="new-task-btn" onClick={handleAddTaskClick}>
//           <FaPlus /> New Task
//         </button>
//       </div>

//       <div className="task-list-header">
//         <span className="task-header-title">Task</span>
//         <span className="task-header-member">Member & Department</span>
//         <span className="task-header-date">Due Date</span>
//         <span className="task-header-status">Status</span>
//         <span className="task-header-actions"></span>
//       </div>

//       <ul className="task-list">
//         {filteredTasks.length > 0 ? (
//           filteredTasks.map((task) => (
//             <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
//               <div className="task-title-container">
//                 <span className="task-title">{task.title}</span>
//                 {task.attachment && (
//                   <div className="task-attachments">
//                     <a href={task.attachment} target="_blank" rel="noopener noreferrer">
//                       {getAttachmentIcon(task.attachment)}
//                       <span className="attachment-text">View Attachment</span>
//                     </a>
//                   </div>
//                 )}
//               </div>

//               <div className="task-member-department">
//                 <span className="task-member">{task.name}</span>
//                 <span className="task-department">{task.department}</span>
//               </div>

//               <span className="task-date">{task.date}</span>
//               <span className="task-status-new-card">{task.status}</span>

//               <div className="task-actions">
//                 <FaEdit className="task-edit-icon" title="Edit Task" />
//                 <div className="more-options">
//                   <FaEllipsisV 
//                     className="more-options-icon" 
//                     onClick={() => toggleMenu(task.id)} 
//                   />
//                   {openMenu === task.id && (
//                     <div className="dropdown-menu">
//                       <button>Edit Task</button>
//                       <button>In Progress</button>
//                       <button>Mark Complete</button>
//                       <button>View Details</button>
//                       <button>Delete Task</button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </li>
//           ))
//         ) : (
//           <li className="no-tasks">No tasks available</li>
//         )}
//       </ul>

//       <div className="view-more-button-container">
//         <button className="view-more-btn">
//           View More Tasks <FaArrowRight />
//         </button>
//       </div>

//       <AddTask isOpen={isAddTaskOpen} onClose={handleClosePopup} onAddTask={handleNewTask} />
//     </div>
//   );
// };

// export default TaskList;


// import React, { useState, useEffect } from "react";
// import { 
//   FaClipboardList, FaPlus, FaArrowRight, FaFilePdf, 
//   FaFileImage, FaFileAlt, FaEdit, FaEllipsisV 
// } from "react-icons/fa";
// import "./TaskList.css";
// import AddTask from "../AddTask/AddTask";

// const getAttachmentIcon = (url) => {
//   if (!url || typeof url !== "string") return null;
//   const ext = url.split(".").pop().toLowerCase();
//   if (ext === "pdf") return <FaFilePdf className="attachment-icon pdf" />;
//   if (["png", "jpg", "jpeg", "gif", "bmp", "svg"].includes(ext)) return <FaFileImage className="attachment-icon image" />;
//   if (["doc", "docx", "txt"].includes(ext)) return <FaFileAlt className="attachment-icon text" />;
//   return <FaFileAlt className="attachment-icon other" />;
// };

// const TaskList = ({ departmentName, tasks, setTasks }) => {
//   const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
//   const [openMenu, setOpenMenu] = useState(null);

//   useEffect(() => {
//     const closeMenuOnClickOutside = (e) => {
//       if (!e.target.closest(".more-options")) {
//         setOpenMenu(null);
//       }
//     };
//     document.addEventListener("click", closeMenuOnClickOutside);
//     return () => document.removeEventListener("click", closeMenuOnClickOutside);
//   }, []);

//   const handleAddTaskClick = () => setIsAddTaskOpen(true);
//   const handleClosePopup = () => setIsAddTaskOpen(false);

//   const handleNewTask = (newTask) => {
//     if (!setTasks) {
//       console.error("setTasks is not provided.");
//       return;
//     }
//     setTasks((prevTasks) => [newTask, ...prevTasks]);
//   };

//   // ✅ Updated: Filter tasks based on the selected department
//   const filteredTasks = tasks?.filter(
//     (task) => !departmentName || task.department.toLowerCase() === departmentName.toLowerCase()
//   ) || [];

//   const toggleMenu = (taskId) => {
//     setOpenMenu((prev) => (prev === taskId ? null : taskId));
//   };

//   return (
//     <div className="new-tasks-card">
//       <div className="new-tasks-header">
//         <div className="header-title">
//           <FaClipboardList className="task-icon" />
//           <h3>Tasks</h3>
//         </div>
//         <button className="new-task-btn" onClick={handleAddTaskClick}>
//           <FaPlus /> New Task
//         </button>
//       </div>

//       <div className="task-list-header">
//         <span className="task-header-title">Task</span>
//         <span className="task-header-member">Member & Department</span>
//         <span className="task-header-date">Due Date</span>
//         <span className="task-header-status">Status</span>
//         <span className="task-header-actions"></span>
//       </div>

//       <ul className="task-list">
//         {filteredTasks.length > 0 ? (
//           filteredTasks.map((task) => (
//             <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
//               <div className="task-title-container">
//                 <span className="task-title">{task.title}</span>
//                 {task.attachment && (
//                   <div className="task-attachments">
//                     <a href={task.attachment} target="_blank" rel="noopener noreferrer">
//                       {getAttachmentIcon(task.attachment)}
//                       <span className="attachment-text">View Attachment</span>
//                     </a>
//                   </div>
//                 )}
//               </div>

//               <div className="task-member-department">
//                 <span className="task-member">{task.name}</span>
//                 <span className="task-department">{task.department}</span>
//               </div>

//               <span className="task-date">{task.date}</span>
//               <span className="task-status-new-card">{task.status}</span>

//               <div className="task-actions">
//                 <FaEdit className="task-edit-icon" title="Edit Task" />
//                 <div className="more-options">
//                   <FaEllipsisV 
//                     className="more-options-icon" 
//                     onClick={() => toggleMenu(task.id)} 
//                   />
//                   {openMenu === task.id && (
//                     <div className="dropdown-menu">
//                       <button>Edit Task</button>
//                       <button>In Progress</button>
//                       <button>Mark Complete</button>
//                       <button>View Details</button>
//                       <button>Delete Task</button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </li>
//           ))
//         ) : (
//           <li className="no-tasks">No tasks available</li>
//         )}
//       </ul>

//       <div className="view-more-button-container">
//         <button className="view-more-btn">
//           View More Tasks <FaArrowRight />
//         </button>
//       </div>

//       <AddTask isOpen={isAddTaskOpen} onClose={handleClosePopup} onAddTask={handleNewTask} />
//     </div>
//   );
// };

// export default TaskList;


// import React, { useState, useEffect } from "react";
// import { 
//   FaClipboardList, FaPlus, FaArrowRight, FaFilePdf, 
//   FaFileImage, FaFileAlt, FaEdit, FaEllipsisV 
// } from "react-icons/fa";
// import "./TaskList.css";
// import AddTask from "../AddTask/AddTask";

// const getAttachmentIcon = (url) => {
//   if (!url || typeof url !== "string") return null;
//   const ext = url.split(".").pop().toLowerCase();
//   if (ext === "pdf") return <FaFilePdf className="attachment-icon pdf" />;
//   if (["png", "jpg", "jpeg", "gif", "bmp", "svg"].includes(ext)) return <FaFileImage className="attachment-icon image" />;
//   if (["doc", "docx", "txt"].includes(ext)) return <FaFileAlt className="attachment-icon text" />;
//   return <FaFileAlt className="attachment-icon other" />;
// };

// const TaskList = ({ departmentName, tasks, setTasks }) => {
//   const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
//   const [openMenu, setOpenMenu] = useState(null);

//   useEffect(() => {
//     const closeMenuOnClickOutside = (e) => {
//       if (!e.target.closest(".more-options")) {
//         setOpenMenu(null);
//       }
//     };
//     document.addEventListener("click", closeMenuOnClickOutside);
//     return () => document.removeEventListener("click", closeMenuOnClickOutside);
//   }, []);

//   const handleAddTaskClick = () => setIsAddTaskOpen(true);
//   const handleClosePopup = () => setIsAddTaskOpen(false);

//   const handleNewTask = (newTask) => {
//     if (!setTasks) {
//       console.error("setTasks is not provided.");
//       return;
//     }
//     setTasks((prevTasks) => [newTask, ...prevTasks]);
//   };

//   const filteredTasks = tasks?.filter(
//     (task) => !departmentName || task.department.toLowerCase() === departmentName.toLowerCase()
//   ) || [];

//   const toggleMenu = (taskId) => {
//     setOpenMenu((prev) => (prev === taskId ? null : taskId));
//   };

//   return (
//     <div className="new-tasks-card">
//       <div className="new-tasks-header">
//         <div className="header-title">
//           <FaClipboardList className="task-icon" />
//           <h3>Tasks</h3>
//         </div>
//         <button className="new-task-btn" onClick={handleAddTaskClick}>
//           <FaPlus /> New Task
//         </button>
//       </div>

//       <div className="task-list-header">
//         <span className="task-header-title">Task</span>
//         <span className="task-header-member">Member & Department</span>
//         <span className="task-header-date">Due Date</span>
//         <span className="task-header-status">Status</span>
//         <span className="task-header-actions"></span>
//       </div>

//       <ul className="task-list">
//         {filteredTasks.length > 0 ? (
//           filteredTasks.map((task) => (
//             <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
//               <div className="task-title-container">
//                 <span className="task-title">{task.title}</span>
//                 {task.attachment && (
//                   <div className="task-attachments">
//                     <a href={task.attachment} target="_blank" rel="noopener noreferrer">
//                       {getAttachmentIcon(task.attachment)}
//                       <span className="attachment-text">View Attachment</span>
//                     </a>
//                   </div>
//                 )}
//               </div>

//               <div className="task-member-department">
//                 <span className="task-member">{task.name}</span>
//                 <span className="task-department">{task.department}</span>
//               </div>

//               <span className="task-date">{task.date}</span>
//               <span className="task-status-new-card">{task.status}</span>

//               <div className="task-actions">
//                 <FaEdit className="task-edit-icon" title="Edit Task" />
//                 <div className="more-options">
//                   <FaEllipsisV 
//                     className="more-options-icon" 
//                     onClick={() => toggleMenu(task.id)} 
//                   />
//                   {openMenu === task.id && (
//                     <div className="dropdown-menu">
//                       <button>Edit Task</button>
//                       <button>In Progress</button>
//                       <button>Mark Complete</button>
//                       <button>View Details</button>
//                       <button>Delete Task</button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </li>
//           ))
//         ) : (
//           <li className="no-tasks">No tasks available</li>
//         )}
//       </ul>

//       <div className="view-more-button-container">
//         <button className="view-more-btn">
//           View More Tasks <FaArrowRight />
//         </button>
//       </div>

//       <AddTask isOpen={isAddTaskOpen} onClose={handleClosePopup} onAddTask={handleNewTask} />
//     </div>
//   );
// };

// export default TaskList;


// import React, { useState, useEffect } from "react";
// import { FaClipboardList, FaPlus, FaFilePdf, FaFileImage, FaFileAlt, FaEdit, FaEllipsisV } from "react-icons/fa";
// import "./TaskList.css";
// import AddTask from "../AddTask/AddTask";

// const getAttachmentIcon = (url) => {
//   if (!url || typeof url !== "string") return null;
//   const ext = url.split(".").pop().toLowerCase();
//   if (ext === "pdf") return <FaFilePdf className="attachment-icon pdf" />;
//   if (["png", "jpg", "jpeg", "gif", "bmp", "svg"].includes(ext)) return <FaFileImage className="attachment-icon image" />;
//   if (["doc", "docx", "txt"].includes(ext)) return <FaFileAlt className="attachment-icon text" />;
//   return <FaFileAlt className="attachment-icon other" />;
// };

// const TaskList = ({ departmentName, tasks, setTasks }) => {
//   const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
//   const [openMenu, setOpenMenu] = useState(null);

//   useEffect(() => {
//     const closeMenuOnClickOutside = (e) => {
//       if (!e.target.closest(".more-options")) {
//         setOpenMenu(null);
//       }
//     };
//     document.addEventListener("click", closeMenuOnClickOutside);
//     return () => document.removeEventListener("click", closeMenuOnClickOutside);
//   }, []);

//   const handleAddTaskClick = () => setIsAddTaskOpen(true);
//   const handleClosePopup = () => setIsAddTaskOpen(false);

//   // ✅ Add new task and update the task list
//   const handleNewTask = (newTask) => {
//     setTasks((prevTasks) => [newTask, ...prevTasks]); // Adds the task at the top
//   };

//   // const filteredTasks = departmentName
//   //   ? tasks.filter((task) => task.department.toLowerCase() === departmentName.toLowerCase())
//   //   : tasks;

//   const filteredTasks = Array.isArray(tasks) 
//   ? (departmentName 
//       ? tasks.filter((task) => task.department?.toLowerCase() === departmentName.toLowerCase()) 
//       : tasks
//     ) 
//   : [];

//   const toggleMenu = (taskId) => {
//     setOpenMenu((prev) => (prev === taskId ? null : taskId));
//   };

//   return (
//     <div className="new-tasks-card">
//       <div className="new-tasks-header">
//         <div className="header-title">
//           <FaClipboardList className="task-icon" />
//           <h3>Tasks</h3>
//         </div>
//         <button className="new-task-btn" onClick={handleAddTaskClick}>
//           <FaPlus /> New Task
//         </button>
//       </div>

//       <div className="task-list-header">
//         <span className="task-header-title">Task</span>
//         <span className="task-header-member">Member & Department</span>
//         <span className="task-header-date">Due Date</span>
//         <span className="task-header-status">Status</span>
//         <span className="task-header-actions"></span>
//       </div>

//       <ul className="task-list">
//         {filteredTasks.map((task) => (
//           <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
//             <div className="task-title-container">
//               <span className="task-title">{task.title}</span>
//               {task.attachment && (
//                 <div className="task-attachments">
//                   <a href={task.attachment} target="_blank" rel="noopener noreferrer">
//                     {getAttachmentIcon(task.attachment)}
//                     <span className="attachment-text">View Attachment</span>
//                   </a>
//                 </div>
//               )}
//             </div>

//             <div className="task-member-department">
//               <span className="task-member">{task.name}</span>
//               <span className="task-department">{task.department}</span>
//             </div>

//             <span className="task-date">{task.date}</span>
//             <span className="task-status-new-card">{task.status}</span>

//             <div className="task-actions">
//               <FaEdit className="task-edit-icon" title="Edit Task" />
//               <div className="more-options">
//                 <FaEllipsisV className="more-options-icon" onClick={() => toggleMenu(task.id)} />
//                 {openMenu === task.id && (
//                   <div className="dropdown-menu">
//                     <button>Edit Task</button>
//                     <button>In Progress</button>
//                     <button>Mark Complete</button>
//                     <button>View Details</button>
//                     <button>Delete Task</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <AddTask isOpen={isAddTaskOpen} onClose={handleClosePopup} onAddTask={handleNewTask} />
//     </div>
//   );
// };

// export default TaskList;


// import React, { useState, useEffect } from "react";
// import { FaClipboardList, FaPlus, FaArrowRight, FaFilePdf, FaFileImage, FaFileAlt, FaEdit, FaEllipsisV } from "react-icons/fa";
// import "./TaskList.css";
// import AddTask from "../AddTask/AddTask";

// const getAttachmentIcon = (url) => {
//   if (!url || typeof url !== "string") return null;
//   const ext = url.split(".").pop().toLowerCase();
//   if (ext === "pdf") return <FaFilePdf className="attachment-icon pdf" />;
//   if (["png", "jpg", "jpeg", "gif", "bmp", "svg"].includes(ext)) return <FaFileImage className="attachment-icon image" />;
//   if (["doc", "docx", "txt"].includes(ext)) return <FaFileAlt className="attachment-icon text" />;
//   return <FaFileAlt className="attachment-icon other" />;
// };

// const TaskList = ({ departmentName, tasks, setTasks, onAddTask }) => {
//   const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
//   const [openMenu, setOpenMenu] = useState(null);

//   useEffect(() => {
//     const closeMenuOnClickOutside = (e) => {
//       if (!e.target.closest(".more-options")) {
//         setOpenMenu(null);
//       }
//     };
//     document.addEventListener("click", closeMenuOnClickOutside);
//     return () => document.removeEventListener("click", closeMenuOnClickOutside);
//   }, []);

//   const handleAddTaskClick = () => setIsAddTaskOpen(true);
//   const handleClosePopup = () => setIsAddTaskOpen(false);

//   // ✅ Function to add a new task and update the state
//   const handleNewTask = (newTask) => {
//     onAddTask(newTask);
//   };

//   const filteredTasks = departmentName 
//     ? tasks.filter((task) => task.department.toLowerCase() === departmentName.toLowerCase()) 
//     : tasks;

//   const toggleMenu = (taskId) => {
//     setOpenMenu((prev) => (prev === taskId ? null : taskId));
//   };

//   return (
//     <div className="new-tasks-card">
//       <div className="new-tasks-header">
//         <div className="header-title">
//           <FaClipboardList className="task-icon" />
//           <h3>Tasks</h3>
//         </div>
//         <button className="new-task-btn" onClick={handleAddTaskClick}>
//           <FaPlus /> New Task
//         </button>
//       </div>

//       <div className="task-list-header">
//         <span className="task-header-title">Task</span>
//         <span className="task-header-member">Member & Department</span>
//         <span className="task-header-date">Due Date</span>
//         <span className="task-header-status">Status</span>
//         <span className="task-header-actions"></span>
//       </div>

//       <ul className="task-list">
//         {filteredTasks.map((task) => (
//           <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
//             <div className="task-title-container">
//               <span className="task-title">{task.title}</span>
//               {task.attachment && (
//                 <div className="task-attachments">
//                   <a href={task.attachment} target="_blank" rel="noopener noreferrer">
//                     {getAttachmentIcon(task.attachment)}
//                     <span className="attachment-text">View Attachment</span>
//                   </a>
//                 </div>
//               )}
//             </div>

//             <div className="task-member-department">
//               <span className="task-member">{task.name}</span>
//               <span className="task-department">{task.department}</span>
//             </div>

//             <span className="task-date">{task.date}</span>
//             <span className="task-status-new-card">{task.status}</span>

//             <div className="task-actions">
//               <FaEdit className="task-edit-icon" title="Edit Task" />
//               <div className="more-options">
//                 <FaEllipsisV 
//                   className="more-options-icon" 
//                   onClick={() => toggleMenu(task.id)} 
//                 />
//                 {openMenu === task.id && (
//                   <div className="dropdown-menu">
//                     <button>Edit Task</button>
//                     <button>In Progress</button>
//                     <button>Mark Complete</button>
//                     <button>View Details</button>
//                     <button>Delete Task</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <AddTask isOpen={isAddTaskOpen} onClose={handleClosePopup} onAddTask={handleNewTask} />
//     </div>
//   );
// };

// export default TaskList;


// import React, { useState, useEffect } from "react";
// import { 
//   FaClipboardList, FaPlus, FaArrowRight, FaFilePdf, 
//   FaFileImage, FaFileAlt, FaEdit, FaEllipsisV 
// } from "react-icons/fa";
// import "./TaskList.css";
// import { initialTasks } from "../../data/TaskData"; 
// import AddTask from "../AddTask/AddTask";
  
// // ✅ Function to get the correct attachment icon based on file type
// const getAttachmentIcon = (url) => {
//   if (!url || typeof url !== "string") return null;

//   // Extract file extension
//   const ext = url.split(".").pop().toLowerCase();

//   // Match with correct icon
//   if (ext === "pdf") return <FaFilePdf className="attachment-icon pdf" />;
//   if (["png", "jpg", "jpeg", "gif", "bmp", "svg"].includes(ext)) return <FaFileImage className="attachment-icon image" />;
//   if (["doc", "docx", "txt"].includes(ext)) return <FaFileAlt className="attachment-icon text" />;
  
//   // Default icon for unknown files
//   return <FaFileAlt className="attachment-icon other" />;
// };

// const TaskList = ({ departmentName }) => {
//   const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
//   const [tasks, setTasks] = useState(initialTasks);
//   const [openMenu, setOpenMenu] = useState(null);

//   // ✅ Ensures the dropdown menu closes when clicking outside
//   useEffect(() => {
//     const closeMenuOnClickOutside = (e) => {
//       if (!e.target.closest(".more-options")) {
//         setOpenMenu(null);
//       }
//     };
//     document.addEventListener("click", closeMenuOnClickOutside);
//     return () => document.removeEventListener("click", closeMenuOnClickOutside);
//   }, []);

//   const handleAddTaskClick = () => setIsAddTaskOpen(true);
//   const handleClosePopup = () => setIsAddTaskOpen(false);

//   // ✅ Handles adding a new task and ensures immediate UI updates
//   const handleNewTask = (newTask) => {
//     console.log("Adding Task to List:", newTask);
//     setTasks((prevTasks) => [newTask, ...prevTasks]);
//   };

//   // ✅ Filters tasks based on selected department
//   const filteredTasks = departmentName 
//     ? tasks.filter((task) => task.department.toLowerCase() === departmentName.toLowerCase()) 
//     : tasks;

//   const toggleMenu = (taskId) => {
//     setOpenMenu((prev) => (prev === taskId ? null : taskId));
//   };

//   return (
//     <div className="new-tasks-card">
//       <div className="new-tasks-header">
//         <div className="header-title">
//           <FaClipboardList className="task-icon" />
//           <h3>Tasks</h3>
//         </div>
//         <button className="new-task-btn" onClick={handleAddTaskClick}>
//           <FaPlus /> New Task
//         </button>
//       </div>

//       <div className="task-list-header">
//         <span className="task-header-title">Task</span>
//         <span className="task-header-member">Member & Department</span>
//         <span className="task-header-date">Due Date</span>
//         <span className="task-header-status">Status</span>
//         <span className="task-header-actions"></span>
//       </div>

//       <ul className="task-list">
//         {filteredTasks.map((task) => (
//           <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
//             <div className="task-title-container">
//               <span className="task-title">{task.title}</span>
//               {task.attachment && (
//                 <div className="task-attachments">
//                   <a href={task.attachment} target="_blank" rel="noopener noreferrer">
//                     {getAttachmentIcon(task.attachment)}
//                     <span className="attachment-text">View Attachment</span>
//                   </a>
//                 </div>
//               )}
//             </div>

//             <div className="task-member-department">
//               <span className="task-member">{task.name}</span>
//               <span className="task-department">{task.department}</span>
//             </div>

//             <span className="task-date">{task.date}</span>
//             <span className="task-status-new-card">{task.status}</span>

//             <div className="task-actions">
//               <FaEdit className="task-edit-icon" title="Edit Task" />
//               <div className="more-options">
//                 <FaEllipsisV 
//                   className="more-options-icon" 
//                   onClick={() => toggleMenu(task.id)} 
//                 />
//                 {openMenu === task.id && (
//                   <div className="dropdown-menu">
//                     <button>Edit Task</button>
//                     <button>In Progress</button>
//                     <button>Mark Complete</button>
//                     <button>View Details</button>
//                     <button>Delete Task</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <div className="view-more-button-container">
//         <button className="view-more-btn">
//           View More Tasks <FaArrowRight />
//         </button>
//       </div>

//       <AddTask isOpen={isAddTaskOpen} onClose={handleClosePopup} onAddTask={handleNewTask} />
//     </div>
//   );
// };

// export default TaskList;


// import React, { useState } from "react";
// import { FaClipboardList, FaPlus, FaArrowRight, FaFilePdf, FaFileImage, FaFileAlt, FaEdit, FaEllipsisV } from "react-icons/fa";
// import "./TaskList.css";
// import { initialTasks } from "../../data/TaskData"; 
// import AddTask from "../AddTask/AddTask";

// // ✅ Function to add a new task at the top
// const addNewTaskAtTop = (setTasks, newTask) => {
//   setTasks((prevTasks) => [newTask, ...prevTasks]);
// };

// const getAttachmentIcon = (url) => {
//   if (!url) return null;
//   const ext = url.split(".").pop().toLowerCase();
//   if (ext === "pdf") return <FaFilePdf className="attachment-icon pdf" />;
//   if (["png", "jpg", "jpeg", "gif"].includes(ext)) return <FaFileImage className="attachment-icon image" />;
//   return <FaFileAlt className="attachment-icon other" />;
// };

// const TaskList = ({ departmentName }) => {
//   const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
//   const [tasks, setTasks] = useState(initialTasks);
//   const [openMenu, setOpenMenu] = useState(null);

//   const handleAddTaskClick = () => setIsAddTaskOpen(true);
//   const handleClosePopup = () => setIsAddTaskOpen(false);

//   const handleNewTask = (newTask) => {
//     console.log("Adding Task to List:", newTask); // Debugging log
//     setTasks((prevTasks) => [newTask, ...prevTasks]); // Newest task at the top
//   };
//   // Filter tasks by department
//   const filteredTasks = departmentName 
//     ? tasks.filter((task) => task.department.toLowerCase() === departmentName.toLowerCase()) 
//     : tasks;

//   const toggleMenu = (taskId) => {
//     setOpenMenu(openMenu === taskId ? null : taskId);
//   };

//   return (
//     <div className="new-tasks-card">
//       <div className="new-tasks-header">
//         <div className="header-title">
//           <FaClipboardList className="task-icon" />
//           <h3>Tasks</h3>
//         </div>
//         <button className="new-task-btn" onClick={handleAddTaskClick}>
//           <FaPlus /> New Task
//         </button>
//       </div>

//       <div className="task-list-header">
//         <span className="task-header-title">Task</span>
//         <span className="task-header-member">Member & Department</span>
//         <span className="task-header-date">Due Date</span>
//         <span className="task-header-status">Status</span>
//         <span className="task-header-actions"></span>
//       </div>

//       <ul className="task-list">
//         {filteredTasks.map((task) => (
//           <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
//             <div className="task-title-container">
//               <span className="task-title">{task.title}</span>
//               {task.attachment && (
//                 <div className="task-attachments">
//                   <a href={task.attachment} target="_blank" rel="noopener noreferrer">
//                     {getAttachmentIcon(task.attachment)}
//                     <span className="attachment-text">View Attachment</span>
//                   </a>
//                 </div>
//               )}
//             </div>

//             <div className="task-member-department">
//               <span className="task-member">{task.name}</span>
//               <span className="task-department">{task.department}</span>
//             </div>

//             <span className="task-date">{task.date}</span>
//             <span className="task-status-new-card">{task.status}</span>

//             <div className="task-actions">
//               <FaEdit className="task-edit-icon" title="Edit Task" />
//               <div className="more-options">
//                 <FaEllipsisV 
//                   className="more-options-icon" 
//                   onClick={() => toggleMenu(task.id)} 
//                 />
//                 {openMenu === task.id && (
//                   <div className="dropdown-menu">
//                     <button>Edit Task</button>
//                     <button>In Progress</button>
//                     <button>Mark Complete</button>
//                     <button>View Details</button>
//                     <button>Delete Task</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <div className="view-more-button-container">
//         <button className="view-more-btn">
//           View More Tasks <FaArrowRight />
//         </button>
//       </div>

//       <AddTask isOpen={isAddTaskOpen} onClose={handleClosePopup} onAddTask={handleNewTask} />
//     </div>
//   );
// };

// export default TaskList;



// src/components/TaskList/TaskList.js
// import React, { useState } from "react";
// import { FaClipboardList, FaPlus, FaArrowRight, FaFilePdf, FaFileImage, FaFileAlt, FaEdit, FaEllipsisV } from "react-icons/fa";
// import "./TaskList.css";
// import { initialTasks } from "../../data/TaskData"; 
// import AddTask from "../AddTask/AddTask";

// const getAttachmentIcon = (url) => {
//   if (!url) return null;
//   const ext = url.split(".").pop().toLowerCase();
//   if (ext === "pdf") return <FaFilePdf className="attachment-icon pdf" />;
//   if (["png", "jpg", "jpeg", "gif"].includes(ext)) return <FaFileImage className="attachment-icon image" />;
//   return <FaFileAlt className="attachment-icon other" />;
// };

// const TaskList = ({ departmentName }) => {
//   const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
//   const [tasks, setTasks] = useState(initialTasks);
//   const [openMenu, setOpenMenu] = useState(null);

//   const handleAddTaskClick = () => setIsAddTaskOpen(true);
//   const handleClosePopup = () => setIsAddTaskOpen(false);

//   const handleNewTask = (newTask) => {
//     setTasks((prevTasks) => [newTask, ...prevTasks]); // Adds new task at the top
//   };

//   // Filter tasks by department
//   const filteredTasks = departmentName 
//     ? tasks.filter((task) => task.department.toLowerCase() === departmentName.toLowerCase()) 
//     : tasks;

//   const toggleMenu = (taskId) => {
//     setOpenMenu(openMenu === taskId ? null : taskId);
//   };

//   return (
//     <div className="new-tasks-card">
//       <div className="new-tasks-header">
//         <div className="header-title">
//           <FaClipboardList className="task-icon" />
//           <h3>Tasks</h3>
//         </div>
//         <button className="new-task-btn" onClick={handleAddTaskClick}>
//           <FaPlus /> New Task
//         </button>
//       </div>

//       <div className="task-list-header">
//         <span className="task-header-title">Task</span>
//         <span className="task-header-member">Member & Department</span>
//         <span className="task-header-date">Due Date</span>
//         <span className="task-header-status">Status</span>
//         <span className="task-header-actions"></span>
//       </div>

//       <ul className="task-list">
//         {filteredTasks.map((task) => (
//           <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
//             <div className="task-title-container">
//               <span className="task-title">{task.title}</span>
//               {task.attachment && (
//                 <div className="task-attachments">
//                   <a href={task.attachment} target="_blank" rel="noopener noreferrer">
//                     {getAttachmentIcon(task.attachment)}
//                     <span className="attachment-text">View Attachment</span>
//                   </a>
//                 </div>
//               )}
//             </div>

//             <div className="task-member-department">
//               <span className="task-member">{task.name}</span>
//               <span className="task-department">{task.department}</span>
//             </div>

//             <span className="task-date">{task.date}</span>
//             <span className="task-status-new-card">{task.status}</span>

//             <div className="task-actions">
//               <FaEdit className="task-edit-icon" title="Edit Task" />
//               <div className="more-options">
//                 <FaEllipsisV 
//                   className="more-options-icon" 
//                   onClick={() => toggleMenu(task.id)} 
//                 />
//                 {openMenu === task.id && (
//                   <div className="dropdown-menu">
//                     <button>Edit Task</button>
//                     <button>In Progress</button>
//                     <button>Mark Complete</button>
//                     <button>View Details</button>
//                     <button>Delete Task</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <div className="view-more-button-container">
//         <button className="view-more-btn">
//           View More Tasks <FaArrowRight />
//         </button>
//       </div>

//       <AddTask isOpen={isAddTaskOpen} onClose={handleClosePopup} onAddTask={handleNewTask} />
//     </div>
//   );
// };

// export default TaskList;


// // src/components/TaskList/TaskList.js
// import React, { useState, useEffect } from "react";
// import { FaClipboardList, FaPlus, FaArrowRight, FaFilePdf, FaFileImage, FaFileAlt, 
//   FaEdit, FaEllipsisV } from "react-icons/fa";
// import "./TaskList.css";
// import { initialTasks } from "../../data/TaskData"; 
// import AddTask from "../AddTask/AddTask";

// const getAttachmentIcon = (url) => {
//   if (!url) return null;

//   const ext = url.split(".").pop().toLowerCase();
//   if (ext === "pdf") return <FaFilePdf className="attachment-icon pdf" />;
//   if (["png", "jpg", "jpeg", "gif"].includes(ext)) return <FaFileImage className="attachment-icon image" />;
//   return <FaFileAlt className="attachment-icon other" />;
// };

// const TaskList = ({ departmentName }) => {
//   const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
//   const [tasks, setTasks] = useState(initialTasks);
//   const [openMenu, setOpenMenu] = useState(null);

//   const handleAddTaskClick = () => setIsAddTaskOpen(true);
//   const handleClosePopup = () => setIsAddTaskOpen(false);

//   const handleNewTask = (newTask) => {
//     setTasks((prevTasks) => [newTask, ...prevTasks]);
//   };

//   // Filter tasks by department
//   const filteredTasks = departmentName 
//     ? tasks.filter((task) => task.department.toLowerCase() === departmentName.toLowerCase()) 
//     : tasks;

//   const toggleMenu = (taskId) => {
//     setOpenMenu(openMenu === taskId ? null : taskId);
//   };

//   return (
//     <div className="new-tasks-card">
//       <div className="new-tasks-header">
//         <div className="header-title">
//           <FaClipboardList className="task-icon" />
//           <h3>Tasks</h3>
//         </div>
//         <button className="new-task-btn" onClick={handleAddTaskClick}>
//           <FaPlus /> New Task
//         </button>
//       </div>

//       <div className="task-list-header">
//         <span className="task-header-title">Task</span>
//         <span className="task-header-member">Member & Department</span>
//         <span className="task-header-date">Due Date</span>
//         <span className="task-header-status">Status</span>
//         <span className="task-header-actions"></span>
//       </div>

//       <ul className="task-list">
//         {filteredTasks.map((task) => (
//           <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
//             <div className="task-title-container">
//               <span className="task-title">{task.title}</span>
//               {task.attachment && (
//                 <div className="task-attachments">
//                   <a href={task.attachment} target="_blank" rel="noopener noreferrer">
//                     {getAttachmentIcon(task.attachment)}
//                     <span className="attachment-text">View Attachment</span>
//                   </a>
//                 </div>
//               )}
//             </div>

//             <div className="task-member-department">
//               <span className="task-member">{task.name}</span>
//               <span className="task-department">{task.department}</span>
//             </div>

//             <span className="task-date">{task.date}</span>
//             <span className="task-status-new-card">{task.status}</span>

//             {/* ✅ Edit and More Options */}
//             <div className="task-actions">
//               <FaEdit className="task-edit-icon" title="Edit Task" />
//               <div className="more-options">
//                 <FaEllipsisV 
//                   className="more-options-icon" 
//                   onClick={() => toggleMenu(task.id)} 
//                 />
//                 {openMenu === task.id && (
//                   <div className="dropdown-menu">
//                     <button>Edit Task</button>
//                     <button>In Progress</button>
//                     <button>Mark Complete</button>
//                     <button>View Details</button>
//                     <button>Delete Task</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <div className="view-more-button-container">
//         <button className="view-more-btn">
//           View More Tasks <FaArrowRight />
//         </button>
//       </div>

//       <AddTask isOpen={isAddTaskOpen} onClose={handleClosePopup} onAddTask={handleNewTask} />
//     </div>
//   );
// };

// export default TaskList;


// import React, { useState } from "react";
// import { 
//   FaClipboardList, FaPlus, FaArrowRight, FaFilePdf, FaFileImage, FaFileAlt, 
//   FaEdit, FaEllipsisV 
// } from "react-icons/fa"; // Added FaEdit and FaEllipsisV icons
// import "./TaskList.css";
// import { initialTasks } from "../../data/TaskData"; 
// import AddTask from "../AddTask/AddTask"; 

// const getAttachmentIcon = (url) => {
//   if (!url) return null;

//   const ext = url.split(".").pop().toLowerCase();
//   if (ext === "pdf") return <FaFilePdf className="attachment-icon pdf" />;
//   if (["png", "jpg", "jpeg", "gif"].includes(ext)) return <FaFileImage className="attachment-icon image" />;
//   return <FaFileAlt className="attachment-icon other" />;
// };

// const TaskList = () => {
//   const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
//   const [tasks, setTasks] = useState(initialTasks);
//   const [openMenu, setOpenMenu] = useState(null); // Track which task's menu is open

//   const handleAddTaskClick = () => setIsAddTaskOpen(true);
//   const handleClosePopup = () => setIsAddTaskOpen(false);

//   const handleNewTask = (newTask) => {
//     setTasks((prevTasks) => [newTask, ...prevTasks]);
//   };

//   const toggleMenu = (taskId) => {
//     setOpenMenu(openMenu === taskId ? null : taskId);
//   };

//   return (
//     <div className="new-tasks-card">
//       <div className="new-tasks-header">
//         <div className="header-title">
//           <FaClipboardList className="task-icon" />
//           <h3>New Tasks</h3>
//         </div>
//         <button className="new-task-btn" onClick={handleAddTaskClick}>
//           <FaPlus /> New Task
//         </button>
//       </div>

//       <div className="task-list-header">
//         <span className="task-header-title">Task</span>
//         <span className="task-header-member">Member & Department</span>
//         <span className="task-header-date">Due Date</span>
//         <span className="task-header-status">Status</span>
//         <span className="task-header-actions"></span>
//       </div>

//       <ul className="task-list">
//         {tasks.map((task) => (
//           <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
//             <div className="task-title-container">
//               <span className="task-title">{task.title}</span>
//               {task.attachment && (
//                 <div className="task-attachments">
//                   <a href={task.attachment} target="_blank" rel="noopener noreferrer">
//                     {getAttachmentIcon(task.attachment)}
//                     <span className="attachment-text">View Attachment</span>
//                   </a>
//                 </div>
//               )}
//             </div>

//             <div className="task-member-department">
//               <span className="task-member">{task.name}</span>
//               <span className="task-department">{task.department}</span>
//             </div>

//             <span className="task-date">{task.date}</span>
//             <span className="task-status-new-card">{task.status}</span>

//             {/* ✅ Edit and More Options */}
//             <div className="task-actions">
//               <FaEdit className="task-edit-icon" title="Edit Task" />
//               <div className="more-options">
//                 <FaEllipsisV 
//                   className="more-options-icon" 
//                   onClick={() => toggleMenu(task.id)} 
//                 />
//                 {openMenu === task.id && (
//                   <div className="dropdown-menu">
//                     <button>Edit Task</button>
//                     <button>In Progress</button>
//                     <button>Mark Complete</button>
//                     <button>View Details</button>
//                     <button>Delete Task</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <div className="view-more-button-container">
//         <button className="view-more-btn">
//           View More Tasks <FaArrowRight />
//         </button>
//       </div>

//       <AddTask isOpen={isAddTaskOpen} onClose={handleClosePopup} onAddTask={handleNewTask} />
//     </div>
//   );
// };

// export default TaskList;

// import React, { useState } from "react";
// import { FaClipboardList, FaPlus, FaArrowRight, FaPaperclip, FaFilePdf, FaFileImage, FaFileAlt } from "react-icons/fa";
// import "./TaskList.css";
// import tasks from "./TaskData"; // Import task data
// import AddTask from "../AddTask/AddTask"; // Import the AddTask component

// const getAttachmentIcon = (url) => {
//   if (!url) return null; // No attachment

//   const ext = url.split(".").pop().toLowerCase();
//   if (ext === "pdf") return <FaFilePdf className="attachment-icon pdf" />;
//   if (["png", "jpg", "jpeg", "gif"].includes(ext)) return <FaFileImage className="attachment-icon image" />;
//   return <FaFileAlt className="attachment-icon other" />;
// };

// const TaskList = () => {
//   const [isAddTaskOpen, setIsAddTaskOpen] = useState(false); // State to control Add Task popup visibility

//   const handleAddTaskClick = () => {
//     setIsAddTaskOpen(true); // Open the "Add Task" popup
//   };

//   const handleClosePopup = () => {
//     setIsAddTaskOpen(false); // Close the "Add Task" popup
//   };

//   return (
//     <div className="new-tasks-card">
//       {/* ✅ New Tasks Header with Button */}
//       <div className="new-tasks-header">
//         <div className="header-title">
//           <FaClipboardList className="task-icon" />
//           <h3>New Tasks</h3>
//         </div>
//         <button className="new-task-btn" onClick={handleAddTaskClick}>
//           <FaPlus /> New Task
//         </button>
//       </div>

//       {/* ✅ Table Headers */}
//       <div className="task-list-header">
//         <span className="task-header-title">Task</span>
//         <span className="task-header-member">Member & Department</span>
//         <span className="task-header-date">Due Date</span>
//         <span className="task-header-status">Status</span>
//       </div>

//       {/* ✅ Task List */}
//       <ul className="task-list">
//         {tasks.map((task) => (
//           <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
//             {/* ✅ Task Title and Attachments Below */}
//             <div className="task-title-container">
//               <span className="task-title">{task.title}</span>
//               {task.attachment && (
//                 <div className="task-attachments">
//                   <a href={task.attachment} target="_blank" rel="noopener noreferrer">
//                     {getAttachmentIcon(task.attachment)}
//                     <span className="attachment-text">View Attachment</span>
//                   </a>
//                 </div>
//               )}
//             </div>

//             {/* Member & Department */}
//             <div className="task-member-department">
//               <span className="task-member">{task.member}</span>
//               <span className="task-department">{task.department}</span>
//             </div>

//             {/* Due Date */}
//             <span className="task-date">{task.date}</span>

//             {/* Status */}
//             <span className="task-status-new-card">{task.status}</span>
//           </li>
//         ))}
//       </ul>

//       {/* ✅ View More Button */}
//       <div className="view-more-button-container">
//         <button className="view-more-btn">
//           View More Tasks <FaArrowRight />
//         </button>
//       </div>

//       {/* ✅ Add Task Popup */}
//       <AddTask isOpen={isAddTaskOpen} onClose={handleClosePopup} />
//     </div>
//   );
// };

// export default TaskList;


// import React from "react";
// import { FaClipboardList, FaPlus, FaArrowRight, FaPaperclip, FaFilePdf, FaFileImage, FaFileAlt } from "react-icons/fa";
// import "./TaskList.css";
// import tasks from "./TaskData"; // Import task data

// const getAttachmentIcon = (url) => {
//   if (!url) return null; // No attachment

//   const ext = url.split(".").pop().toLowerCase();
//   if (ext === "pdf") return <FaFilePdf className="attachment-icon pdf" />;
//   if (["png", "jpg", "jpeg", "gif"].includes(ext)) return <FaFileImage className="attachment-icon image" />;
//   return <FaFileAlt className="attachment-icon other" />;
// };

// const TaskList = () => {
//   return (
//     <div className="new-tasks-card">
//       {/* ✅ New Tasks Header with Button */}
//       <div className="new-tasks-header">
//         <div className="header-title">
//           <FaClipboardList className="task-icon" />
//           <h3>New Tasks</h3>
//         </div>
//         <button className="new-task-btn">
//           <FaPlus /> New Task
//         </button>
//       </div>

//       {/* ✅ Table Headers */}
//       <div className="task-list-header">
//         <span className="task-header-title">Task</span>
//         <span className="task-header-member">Member & Department</span>
//         <span className="task-header-date">Due Date</span>
//         <span className="task-header-status">Status</span>
//       </div>

//       {/* ✅ Task List */}
//       <ul className="task-list">
//         {tasks.map((task) => (
//           <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
//             {/* ✅ Task Title and Attachments Below */}
//             <div className="task-title-container">
//               <span className="task-title">{task.title}</span>
//               {task.attachment && (
//                 <div className="task-attachments">
//                   <a href={task.attachment} target="_blank" rel="noopener noreferrer">
//                     {getAttachmentIcon(task.attachment)}
//                     <span className="attachment-text">View Attachment</span>
//                   </a>
//                 </div>
//               )}
//             </div>

//             {/* Member & Department */}
//             <div className="task-member-department">
//               <span className="task-member">{task.member}</span>
//               <span className="task-department">{task.department}</span>
//             </div>

//             {/* Due Date */}
//             <span className="task-date">{task.date}</span>

//             {/* Status */}
//             <span className="task-status-new-card">{task.status}</span>
//           </li>
//         ))}
//       </ul>

//       {/* ✅ View More Button */}
//       <div className="view-more-button-container">
//         <button className="view-more-btn">
//           View More Tasks <FaArrowRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskList;


// import React from "react";
// import { FaClipboardList, FaPlus, FaArrowRight, FaPaperclip } from "react-icons/fa";
// import "./TaskList.css";
// import tasks from "./TaskData"; // Import task data

// const TaskList = () => {
//   return (
//     <div className="new-tasks-card">
//       {/* ✅ New Tasks Header with Button */}
//       <div className="new-tasks-header">
//         <div className="header-title">
//           <FaClipboardList className="task-icon" />
//           <h3>New Tasks</h3>
//         </div>
//         <button className="new-task-btn">
//           <FaPlus /> New Task
//         </button>
//       </div>

//       {/* ✅ Table Headers */}
//       <div className="task-list-header">
//         <span className="task-header-title">Task</span>
//         <span className="task-header-member">Member & Department</span>
//         <span className="task-header-attachment">Attachment</span>
//         <span className="task-header-date">Due Date</span>
//         <span className="task-header-status">Status</span>
//       </div>

//       {/* ✅ Task List */}
//       <ul className="task-list">
//         {tasks.map((task) => (
//           <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
//             {/* Task Title */}
//             <span className="task-title">{task.title}</span>

//             {/* Member & Department (Stacked) */}
//             <div className="task-member-department">
//               <span className="task-member">{task.member}</span>
//               <span className="task-department">{task.department}</span>
//             </div>

//             {/* ✅ Attachment Column */}
//             <span className="task-attachment">
//               {task.attachment ? (
//                 <a href={task.attachment} target="_blank" rel="noopener noreferrer">
//                   <FaPaperclip className="attachment-icon" />
//                 </a>
//               ) : (
//                 <FaPaperclip className="attachment-icon disabled" />
//               )}
//             </span>

//             {/* Due Date */}
//             <span className="task-date">{task.date}</span>

//             {/* Status */}
//             <span className="task-status">{task.status}</span>
//           </li>
//         ))}
//       </ul>

//       {/* ✅ View More Button */}
//       <div className="view-more-button-container">
//         <button className="view-more-btn">
//           View More Tasks <FaArrowRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskList;
