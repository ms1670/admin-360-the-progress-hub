// src/modules/departmentRoute/DepartmentRoute.js
import React from "react";
import { useParams } from "react-router-dom";
import SubMenuLayout from "../submenuLayout/SubMenuLayout";  // Import SubMenuLayout component
import "./departmentRoute.css";

const DepartmentRoute = () => {
  const { departmentName } = useParams(); // Get department name from URL

  return (
    <div className="department-route">
      {/* Render SubMenuLayout for each department */}
      <SubMenuLayout departmentName={departmentName} />
    </div>
  );
};

export default DepartmentRoute;


// import React from "react";
// import { useParams } from "react-router-dom";
// import { departmentEmployees } from "../../data/departmentEmployees";  // Import employee data
// import "./departmentRoute.css";  // Ensure CSS is correctly imported

// const DepartmentRoute = () => {
//   const { departmentName } = useParams(); // Get department name from URL

//   // Fetch the employees for the department
//   const employees = departmentEmployees[departmentName];

//   return (
//     <div className="department-route">
//       <h2>Department: {departmentName}</h2>
//       <p>Welcome to the {departmentName} Department Page!</p>

//       {/* Display the employee list if there are employees */}
//       {employees && employees.length > 0 ? (
//         <div className="employee-list">
//           <h3>Employees</h3>
//           <ul>
//             {employees.map((employee, index) => (
//               <li key={index}>{employee}</li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>No employees listed for this department.</p>
//       )}
//     </div>
//   );
// };

// export default DepartmentRoute;


// import React from "react";
// import { useParams } from "react-router-dom";
// import "./departmentRoute.css";  // ✅ Ensure CSS is correctly imported


// const DepartmentRoute = () => {
//   const { departmentName } = useParams(); // ✅ Get Department Name from URL

//   return (
//     <div className="department-route">
//       <h2>Department: {departmentName}</h2>
//       <p>Welcome to the {departmentName} Department Page!</p>

//       <div>
//       <h2>Department: {departmentName}</h2>
//       </div>
//     </div>
//   );
// };

// export default DepartmentRoute;
