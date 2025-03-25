import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainDashboard from "./modules/mainDashboard/MainDashboard";
import Department from "./pages/Department";
import Task from "./pages/Task";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import SubDepartments from "./pages/SubDepartments"; // ✅ Import

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/departments" element={<Department />} />
            <Route path="/tasks" element={<Task />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/settings" element={<Settings />} />

            {/* ✅ Load tasks based on department */}
            <Route path="/departments/:deptName" element={<SubDepartments />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;




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
