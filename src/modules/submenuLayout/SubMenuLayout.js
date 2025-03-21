// src/modules/departmentRoute/SubMenuLayout.js
import React from "react";
import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails"; 
import TaskList from "../../components/TaskList/TaskList"; 
import "./SubMenuLayout.css"; 

const SubMenuLayout = ({ departmentName, tasks, setTasks }) => {
  // ✅ Get employees for the selected department
  const employees = departmentEmployeesDetails.filter(emp => emp.department === departmentName);

  return (
    <div className="submenu-layout">
      <h2>Department: {departmentName}</h2>

      {/* ✅ Employee List Section */}
      <div className="employee-list">
        <h3>Employees</h3>
        {employees.length > 0 ? (
          <ul>
            {employees.map((employee) => (
              <li key={employee.id}>
                <strong>{employee.name}</strong> ({employee.email})
              </li>
            ))}
          </ul>
        ) : (
          <p>No employees listed for this department.</p>
        )}
      </div>

      {/* ✅ Task List Section */}
      <div className="task-list-container">
        <TaskList departmentName={departmentName} tasks={tasks} setTasks={setTasks} />
      </div>

      {/* ✅ Other Information Section */}
      <div className="other-section">
        <h3>Other Information</h3>
        <p>Additional information related to {departmentName} will go here.</p>
      </div>

      {/* ✅ Employee Details Table */}
      <div className="sml-employee-table-container">
        <h3 className="sml-table-title">Employee Details</h3>
        {employees.length > 0 ? (
          <table className="sml-employee-table">
            <thead>
              <tr>
                <th className="sml-table-header">ID</th>
                <th className="sml-table-header sml-name-column">Name</th>
                <th className="sml-table-header sml-email-column">Email</th>
                <th className="sml-table-header">Designation</th>
                <th className="sml-table-header sml-actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="sml-table-row">
                  <td className="sml-table-data">{employee.id}</td>
                  <td className="sml-table-data sml-name-cell">
                    <div className="sml-employee-info">
                      <img
                        src={employee.profilePicture || "/src/assets/profile-demo.png"}
                        alt={employee.name}
                        className="sml-employee-avatar"
                      />
                      <span>{employee.name}</span>
                    </div>
                  </td>
                  <td className="sml-table-data sml-email-cell">{employee.email}</td>
                  <td className="sml-table-data">{employee.designation}</td>
                  <td className="sml-table-data sml-actions-cell">
                    <button className="sml-action-btn sml-edit-btn">✏️ Edit</button>
                    <button className="sml-action-btn sml-delete-btn">🗑 Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="sml-no-employees">No employee details available.</p>
        )}
      </div>
    </div>
  );
};

export default SubMenuLayout;


// // src/modules/departmentRoute/SubMenuLayout.js
// import React from "react";
// import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails"; // Import employee details
// import TaskList from "../../components/TaskList/TaskList"; // Import TaskList component
// import "./SubMenuLayout.css"; // Import CSS for styling

// const SubMenuLayout = ({ departmentName }) => {
//   // Get employees for the department
//   const employees = departmentEmployeesDetails.filter(emp => emp.department === departmentName);

//   return (
//     <div className="submenu-layout">
//       <h2>Department: {departmentName}</h2>

//       {/* Employees Section
//       <div className="employee-list">
//         <h3>Employees</h3>
//         {employees.length > 0 ? (
//           <ul>
//             {employees.map((employee) => (
//               <li key={employee.id}>
//                 <strong>{employee.name}</strong> ({employee.email})
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No employees listed for this department.</p>
//         )}
//       </div> */}

//       {/* TaskList Section */}
//       <div className="task-list-container">
//         <TaskList departmentName={departmentName} employees={employees.map(emp => emp.name)} />
//       </div>

//       {/* Other Information Section */}
//       <div className="other-section">
//         <h3>Other Information</h3>
//         <p>Additional information related to {departmentName} will go here.</p>
//       </div>

//       {/* ✅ Employee Details Table */}
// <div className="sml-employee-table-container">
//   <h3 className="sml-table-title">Employee Details</h3>
//   {employees.length > 0 ? (
//     <table className="sml-employee-table">
//       <thead>
//         <tr>
//           <th className="sml-table-header">ID</th>
//           <th className="sml-table-header sml-name-column">Name</th>
//           <th className="sml-table-header sml-email-column">Email</th>
//           <th className="sml-table-header">Designation</th>
//           <th className="sml-table-header sml-actions-column">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {employees.map((employee) => (
//           <tr key={employee.id} className="sml-table-row">
//             <td className="sml-table-data">{employee.id}</td>
//             <td className="sml-table-data sml-name-cell">
//               <div className="sml-employee-info">
//                 <img
//                   src={employee.profilePicture || "/src/assets/profile-demo.png"}
//                   alt={employee.name}
//                   className="sml-employee-avatar"
//                 />
//                 <span>{employee.name}</span>
//               </div>
//             </td>
//             <td className="sml-table-data sml-email-cell">{employee.email}</td>
//             <td className="sml-table-data">{employee.designation}</td>
//             <td className="sml-table-data sml-actions-cell">
//               <button className="sml-action-btn sml-edit-btn">✏️ Edit</button>
//               <button className="sml-action-btn sml-delete-btn">🗑 Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   ) : (
//     <p className="sml-no-employees">No employee details available.</p>
//   )}
// </div>

//     </div>
//   );
// };

// export default SubMenuLayout;


// // src/modules/departmentRoute/SubMenuLayout.js
// import React from "react";
// import { departmentEmployees } from "../../data/departmentEmployees"; // Import employee data
// import TaskList from "../../components/TaskList/TaskList"; // Import TaskList component

// const SubMenuLayout = ({ departmentName }) => {
//   // Get employees for the department
//   const employees = departmentEmployees[departmentName];

//   return (
//     <div className="submenu-layout">
//       <h2>Department: {departmentName}</h2>

//       {/* Employees Section */}
//       <div className="employee-list">
//         <h3>Employees</h3>
//         {employees && employees.length > 0 ? (
//           <ul>
//             {employees.map((employee, index) => (
//               <li key={index}>{employee}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No employees listed for this department.</p>
//         )}
//       </div>

//       {/* TaskList Section */}
//       <div className="task-list-container">
//         <TaskList departmentName={departmentName} employees={employees} />
//       </div>

//       {/* Other Information Section */}
//       <div className="other-section">
//         <h3>Other Information</h3>
//         <p>Additional information related to {departmentName} will go here.</p>
//       </div>
//     </div>
//   );
// };

// export default SubMenuLayout;


// // src/modules/departmentRoute/SubMenuLayout.js
// import React from "react";
// import { departmentEmployees } from "../../data/departmentEmployees"; // Import employee data

// const SubMenuLayout = ({ departmentName }) => {
//   // Get employees for the department
//   const employees = departmentEmployees[departmentName];

//   return (
//     <div className="submenu-layout">
//       <h2>Department: {departmentName}</h2>

//       <div className="employee-list">
//         <h3>Employees</h3>
//         {employees && employees.length > 0 ? (
//           <ul>
//             {employees.map((employee, index) => (
//               <li key={index}>{employee}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No employees listed for this department.</p>
//         )}
//       </div>

//       {/* You can add other sections here */}
//       <div className="other-section">
//         <h3>Other Information</h3>
//         <p>Additional information related to {departmentName} will go here.</p>
//       </div>
//     </div>
//   );
// };

// export default SubMenuLayout;
