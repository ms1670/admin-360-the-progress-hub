import React, { useState } from "react";
import { departments } from "../../data/departments"; // Assuming departments data
import { departmentEmployees } from "../../data/departmentEmployees"; // Import departmentEmployees data
import "./AddTask.css";

const AddTask = ({ isOpen, onClose, onAddTask }) => {
  const [taskDetails, setTaskDetails] = useState({
    department: "",
    userName: "",
    taskName: "",
    attachment: null,
    dueDate: "",
  });

  // ✅ Get users based on the selected department
  const getUsersForDepartment = (department) => {
    return departmentEmployees[department] || [];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setTaskDetails((prev) => ({
      ...prev,
      attachment: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Construct the new task object
    const newTask = {
      id: new Date().toISOString(), // Unique ID for the new task
      title: taskDetails.taskName,
      name: taskDetails.userName,
      department: taskDetails.department,
      attachment: taskDetails.attachment,
      date: taskDetails.dueDate,
      status: "New", // Default status
    };

    console.log("Task details submitted:", newTask);

    // ✅ Check if onAddTask exists before calling it
    if (typeof onAddTask === "function") {
      onAddTask(newTask);
    } else {
      console.error("onAddTask is not passed correctly or is not a function");
    }

    // ✅ Reset form fields
    setTaskDetails({
      department: "",
      userName: "",
      taskName: "",
      attachment: null,
      dueDate: "",
    });

    onClose(); // ✅ Close the modal after submitting
  };

  const handleCancel = () => {
    // ✅ Reset form fields when canceling
    setTaskDetails({
      department: "",
      userName: "",
      taskName: "",
      attachment: null,
      dueDate: "",
    });

    onClose(); // ✅ Close the modal when canceling
  };

  return (
    isOpen && (
      <div className="add-task-overlay">
        <div className="add-task-container">
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Department:
              <select
                name="department"
                value={taskDetails.department}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </label>

            {/* ✅ Conditional rendering for User Name */}
            {taskDetails.department && (
              <label>
                User Name:
                <select
                  name="userName"
                  value={taskDetails.userName}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select User</option>
                  {getUsersForDepartment(taskDetails.department).map((user, index) => (
                    <option key={index} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label>
              Task Name:
              <input
                type="text"
                name="taskName"
                value={taskDetails.taskName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Attachment (Optional):
              <input type="file" onChange={handleFileChange} />
            </label>
            <label>
              Due Date:
              <input
                type="date"
                name="dueDate"
                value={taskDetails.dueDate}
                onChange={handleInputChange}
                required
              />
            </label>
            <div className="button-group">
              <button type="submit">Submit</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddTask;


// import React, { useState } from "react";
// import { departments } from "../../data/departments"; // Assuming departments data
// import { departmentEmployees } from "../../data/departmentEmployees"; // Import departmentEmployees data
// import "./AddTask.css";

// const AddTask = ({ isOpen, onClose, onAddTask }) => {
//   const [taskDetails, setTaskDetails] = useState({
//     department: "",
//     userName: "",
//     taskName: "",
//     attachment: null,
//     dueDate: "",
//   });

//   // Get the users based on the selected department
//   const getUsersForDepartment = (department) => {
//     return departmentEmployees[department] || [];
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTaskDetails((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setTaskDetails((prev) => ({
//       ...prev,
//       attachment: e.target.files[0],
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Construct the new task object
//     const newTask = {
//       id: new Date().toISOString(), // Unique ID for the new task
//       title: taskDetails.taskName,
//       name: taskDetails.userName,
//       department: taskDetails.department,
//       attachment: taskDetails.attachment,
//       date: taskDetails.dueDate,
//       status: "New", // Default status
//     };
//     console.log("Task details submitted:", newTask);

//     // Pass the new task to the parent (TaskList)
//     if (onAddTask) {
//       onAddTask(newTask);
//     } else {
//       console.error("onAddTask is not passed correctly");
//     }

//     // Reset form fields
//     setTaskDetails({
//       department: "",
//       userName: "",
//       taskName: "",
//       attachment: null,
//       dueDate: "",
//     });

//     onClose(); // Close the modal after submitting
//   };

//   const handleCancel = () => {
//     // Reset form fields when canceling
//     setTaskDetails({
//       department: "",
//       userName: "",
//       taskName: "",
//       attachment: null,
//       dueDate: "",
//     });

//     onClose(); // Close the modal when canceling
//   };

//   return (
//     isOpen && (
//       <div className="add-task-overlay">
//         <div className="add-task-container">
//           <h2>Add New Task</h2>
//           <form onSubmit={handleSubmit}>
//             <label>
//               Department:
//               <select
//                 name="department"
//                 value={taskDetails.department}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="">Select Department</option>
//                 {departments.map((department, index) => (
//                   <option key={index} value={department}>
//                     {department}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             {/* Conditional rendering for User Name */}
//             {taskDetails.department && (
//               <label>
//                 User Name:
//                 <select
//                   name="userName"
//                   value={taskDetails.userName}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="">Select User</option>
//                   {getUsersForDepartment(taskDetails.department).map((user, index) => (
//                     <option key={index} value={user}>
//                       {user}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//             )}

//             <label>
//               Task Name:
//               <input
//                 type="text"
//                 name="taskName"
//                 value={taskDetails.taskName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               Attachment (Optional):
//               <input type="file" onChange={handleFileChange} />
//             </label>
//             <label>
//               Due Date:
//               <input
//                 type="date"
//                 name="dueDate"
//                 value={taskDetails.dueDate}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <div className="button-group">
//               <button type="submit">Submit</button>
//               <button type="button" onClick={handleCancel}>
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )
//   );
// };

// export default AddTask;




// import React, { useState } from "react";
// import "./AddTask.css";

// const AddTask = ({ isOpen, onClose }) => {
//   const [taskDetails, setTaskDetails] = useState({
//     department: "",
//     userName: "",
//     taskName: "",
//     attachment: null,
//     dueDate: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTaskDetails((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setTaskDetails((prev) => ({
//       ...prev,
//       attachment: e.target.files[0],
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Task details submitted:", taskDetails);
//     // Add logic to handle task submission (e.g., save to state or backend)
//     onClose(); // Close the modal after submitting
//   };

//   return (
//     isOpen && (
//       <div className="add-task-overlay">
//         <div className="add-task-container">
//           <h2>Add New Task</h2>
//           <form onSubmit={handleSubmit}>
//             <label>
//               Department:
//               <input
//                 type="text"
//                 name="department"
//                 value={taskDetails.department}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               User Name:
//               <input
//                 type="text"
//                 name="userName"
//                 value={taskDetails.userName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               Task Name:
//               <input
//                 type="text"
//                 name="taskName"
//                 value={taskDetails.taskName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               Attachment (Optional):
//               <input type="file" onChange={handleFileChange} />
//             </label>
//             <label>
//               Due Date:
//               <input
//                 type="date"
//                 name="dueDate"
//                 value={taskDetails.dueDate}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <div className="button-group">
//               <button type="submit">Submit</button>
//               <button type="button" onClick={onClose}>
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )
//   );
// };

// export default AddTask;
