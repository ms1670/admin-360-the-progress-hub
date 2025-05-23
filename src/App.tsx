import React, { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import Login from "./modules/login/Login";  

import MainDashboard from "./modules/mainDashboard/MainDashboard";
import Department from "./pages/Department";
import Task from "./pages/Task";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import CategoryDepartments from "./pages/CategoryDepartments";

import SubDepartments from "./pages/SubDepartments";
import DepartmentDashboard from "./modules/departmentDashboard/DepartmentDashboard";
import DepartmentMembers from "./modules/departmentDashboard/DepartmentMembers";
import DepartmentReports from "./modules/departmentDashboard/DepartmentReports";
import DepartmentSettings from "./modules/departmentDashboard/DepartmentSettings";

import MemberDashboard from "./modules/memberDashboard/MemberDashboard";
import MemberTasks from "./modules/memberDashboard/MemberTasks";
import MemberProfile from "./modules/memberDashboard/MemberProfile";
import MemberSettings from "./modules/memberDashboard/MemberSettings";

import ErrorPage from "./pages/ErrorPage";
import Members from './pages/Members';


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/login" />;
};

// ✅ Wrapper component to pass the department name from the URL
const DepartmentDashboardWrapper: React.FC = () => {
  const { departmentName } = useParams<{ departmentName: string }>();
  return <DepartmentDashboard departmentName={departmentName || "Unknown"} />;
};

const App: React.FC = () => {
  return (

    <Router basename="/">
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1, padding: "16px" }}>
          <Routes>
            {/* ✅ Login Route */}
            <Route path="/login" element={<Login />} />

            {/* ✅ Protected Routes (Require Token) */}
            <Route path="/" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
            <Route path="/mainDashboard" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
            <Route path="/departments" element={<ProtectedRoute><Department /></ProtectedRoute>} />
            <Route path="/members" element={<Members />} />
            <Route path="/category/:categoryName" element={<CategoryDepartments />} />

            <Route path="/tasks" element={<ProtectedRoute><Task /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Report /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/departments/:deptName" element={<ProtectedRoute><SubDepartments /></ProtectedRoute>} />
            <Route path="/departmentDashboard/:departmentName" element={<ProtectedRoute><DepartmentDashboardWrapper /></ProtectedRoute>} />

            {/* ✅ Department-Specific Routes */}
            <Route
              path="/department-dashboard/:departmentName"
              element={<ProtectedRoute><DepartmentDashboardWrapper /></ProtectedRoute>}
            />
            <Route
              path="/department-dashboard/:departmentName/members"
              element={<ProtectedRoute><DepartmentMembers /></ProtectedRoute>}
            />
            <Route
              path="/department-dashboard/:departmentName/reports"
              element={<ProtectedRoute><DepartmentReports /></ProtectedRoute>}
            />

            <Route
              path="/department-dashboard/:departmentName/settings"
              element={<ProtectedRoute><DepartmentSettings /></ProtectedRoute>}
            />

             {/* Member Dashboard Route */}
            <Route path="/memberDashboard/:memberName" element={<ProtectedRoute><MemberDashboard /></ProtectedRoute>} />
            
            <Route
              path="/memberDashboard/:departmentName"
              element={<ProtectedRoute><DepartmentDashboardWrapper /></ProtectedRoute>}
            />
            
            <Route path="/member-dashboard/my-tasks" element={<ProtectedRoute><MemberTasks /></ProtectedRoute>} />
        <Route path="/member-dashboard/profile" element={<ProtectedRoute><MemberProfile /></ProtectedRoute>} />
        <Route path="/member-dashboard/settings" element={<ProtectedRoute><MemberSettings /></ProtectedRoute>} />


            {/* ✅ Redirect unknown routes to Login */}
            <Route path="*" element={<Navigate to="/login" />} />
            
            {/* <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} /> */}

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;



// import React, { ReactNode } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
// import Login from "./modules/login/Login";  
// import MainDashboard from "./modules/mainDashboard/MainDashboard";
// import Department from "./pages/Department";
// import Task from "./pages/Task";
// import Report from "./pages/Report";
// import Settings from "./pages/Settings";
// import SubDepartments from "./pages/SubDepartments";
// import DepartmentDashboard from "./modules/departmentDashboard/DepartmentDashboard";

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? <>{children}</> : <Navigate to="/login" />;
// };

// const App: React.FC = () => {
//   return (
//     <Router>
//       <div style={{ display: "flex" }}>
//         <div style={{ flexGrow: 1, padding: "16px" }}>
//           <Routes>
//             {/* ✅ Login Route */}
//             <Route path="/login" element={<Login />} />

//             {/* ✅ Protected Routes (Require Token) */}
//             <Route path="/" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
//             <Route path="/mainDashboard" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
//             <Route path="/departments" element={<ProtectedRoute><Department /></ProtectedRoute>} />
//             <Route path="/tasks" element={<ProtectedRoute><Task /></ProtectedRoute>} />
//             <Route path="/reports" element={<ProtectedRoute><Report /></ProtectedRoute>} />
//             <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
//             <Route path="/departments/:deptName" element={<ProtectedRoute><SubDepartments /></ProtectedRoute>} />
//             <Route path="/departmentDashboard/:departmentName" element={<ProtectedRoute><DepartmentDashboardWrapper /></ProtectedRoute>} />

//             {/* ✅ Redirect unknown routes to Login */}
//             <Route path="*" element={<Navigate to="/login" />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// // ✅ Wrapper component to pass the department name from the URL
// const DepartmentDashboardWrapper: React.FC = () => {
//   const { departmentName } = useParams<{ departmentName: string }>();
//   return <DepartmentDashboard departmentName={departmentName || "Unknown"} />;
// };

// export default App;



// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./modules/login/Login";  // ✅ Import Login Page
// import MainDashboard from "./modules/mainDashboard/MainDashboard";
// import Department from "./pages/Department";
// import Task from "./pages/Task";
// import Report from "./pages/Report";
// import Settings from "./pages/Settings";
// import SubDepartments from "./pages/SubDepartments";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <div style={{ display: "flex" }}>
//         <div style={{ flexGrow: 1, padding: "16px" }}>
//           <Routes>
//             {/* ✅ Show Login page first */}
//             <Route path="/login" element={<Login />} />

//             {/* ✅ After login, redirect to Main Dashboard */}
//             <Route path="/" element={<MainDashboard />} />

//             <Route path="/departments" element={<Department />} />
//             <Route path="/tasks" element={<Task />} />
//             <Route path="/reports" element={<Report />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/departments/:deptName" element={<SubDepartments />} />

//             {/* ✅ If no token, redirect to Login */}
//             <Route path="*" element={<Navigate to="/login" />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainDashboard from "./modules/mainDashboard/MainDashboard";
// import Department from "./pages/Department";
// import Task from "./pages/Task";
// import Report from "./pages/Report";
// import Settings from "./pages/Settings";
// import SubDepartments from "./pages/SubDepartments"; // ✅ Import

// const App: React.FC = () => {
//   return (
//     <Router>
//       <div style={{ display: "flex" }}>
//         <div style={{ flexGrow: 1, padding: "16px" }}>
//           <Routes>
//             <Route path="/" element={<MainDashboard />} />
//             <Route path="/departments" element={<Department />} />
//             <Route path="/tasks" element={<Task />} />
//             <Route path="/reports" element={<Report />} />
//             <Route path="/settings" element={<Settings />} />

//             {/* ✅ Load tasks based on department */}
//             <Route path="/departments/:deptName" element={<SubDepartments />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;




// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;