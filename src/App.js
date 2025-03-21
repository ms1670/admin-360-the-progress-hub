import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./modules/Sidebar/Sidebar";
import Topbar from "./modules/Topbar/topbar";
import FiltersActions from "./modules/FiltersActions";
import TaskSummary from "./modules/taskSummary/TaskSummary"; 
import TaskList from "./components/TaskList/TaskList"; 
import Calendar from "./modules/calendar/Calendar";  
import DepartmentDetails from "./modules/departmentdetails/DepartmentDetails";
import DepartmentRoute from "./modules/departmentRoute/DepartmentRoute";
import Task from "./modules/task/Task";
import { initialTasks } from "./data/TaskData";  // ✅ Import initial task data
import "./App.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState(initialTasks);  // ✅ Manage tasks globally

  return (
    <Router>
      <div className={`app-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        {/* ✅ Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          

        {/* ✅ Main Content */}
        <div className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
          <Topbar />
          
          <div className="content-area">
            <Routes>
              {/* ✅ Dashboard Route (Main Dashboard with Full Task List) */}
              <Route 
                path="/" 
                element={
                  <>
                    {/* ✅ Pass tasks & setTasks to FiltersActions so it can add tasks */}
                    <FiltersActions tasks={tasks} setTasks={setTasks} /> 
                    <TaskSummary tasks={tasks} />
                    <div className="task-calendar-row">
                      {/* ✅ Pass tasks & setTasks to TaskList so it updates */}
                      <TaskList tasks={tasks} setTasks={setTasks} /> 
                      <Calendar />
                    </div>
                    <DepartmentDetails />
                  </>
                } 
              />

              {/* ✅ Department Route (Department-specific Tasks filtered) */}
              <Route path="/departments/:departmentName" element={<DepartmentRoute />} />

              {/* ✅ Additional Routes */}
              <Route path="/tasks" element={<Task />} />  
              <Route path="/reports" element={<h2>Reports Page</h2>} />  
              <Route path="/settings" element={<h2>Settings Page</h2>} />  
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;


// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./modules/Sidebar/Sidebar";
// import Topbar from "./modules/Topbar/topbar";
// import FiltersActions from "./modules/FiltersActions";
// import TaskSummary from "./modules/taskSummary/TaskSummary"; 
// import TaskList from "./components/TaskList/TaskList"; 
// import Calendar from "./modules/calendar/Calendar";  
// import DepartmentDetails from "./modules/departmentdetails/DepartmentDetails";
// import DepartmentRoute from "./modules/departmentRoute/DepartmentRoute";
// import "./App.css";
// import Task from "./modules/task/Task";

// const App = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (

//     <Router>
//       <div className={`app-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
//         {/* ✅ Sidebar */}
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

//         {/* ✅ Main Content */}
//         <div className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
//           <Topbar />
//           <div className="content-area">
//             <Routes>
//               {/* ✅ Dashboard Route (Main Dashboard with Full Task List) */}
//               <Route 
//                 path="/" 
//                 element={
//                   <>
//                     <FiltersActions />
//                     <TaskSummary />
//                     <div className="task-calendar-row">
//                       {/* Full Task List displayed here */}
//                       <TaskList />
//                       <Calendar />
//                     </div>
//                     <DepartmentDetails />
//                   </>
//                 } 
//               />
              

//               {/* ✅ Department Route (Department-specific Tasks filtered) */}
//               <Route 
//                 path="/departments/:departmentName" 
//                 element={<DepartmentRoute />} 
//               />

//               {/* ✅ Newly Added Routes */}
//               <Route path="/tasks" element={<Task />} />  {/* Tasks Page */}
//               <Route path="/reports" element={<h2>Reports Page</h2>} />  {/* Reports Page Placeholder */}
//               <Route path="/settings" element={<h2>Settings Page</h2>} />  {/* Settings Page Placeholder */}
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;


// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./modules/Sidebar/Sidebar";
// import Topbar from "./modules/Topbar/topbar";
// import FiltersActions from "./modules/FiltersActions";
// import TaskSummary from "./modules/taskSummary/TaskSummary"; 
// import TaskList from "./components/TaskList/TaskList"; 
// import Calendar from "./modules/calendar/Calendar";  
// import DepartmentDetails from "./modules/departmentdetails/DepartmentDetails";
// import DepartmentRoute from "./modules/departmentRoute/DepartmentRoute";
// import "./App.css";
// import Task from "./modules/task/Task";

// const App = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <Router>
//       <div className={`app-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
//         {/* ✅ Sidebar */}
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

//         {/* ✅ Main Content */}
//         <div className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
//           <Topbar />
//           <div className="content-area">
//             <Routes>
//               {/* ✅ Dashboard Route */}
//               <Route 
//                 path="/" 
//                 element={
//                   <>
//                     <FiltersActions />
//                     <TaskSummary />
//                     <div className="task-calendar-row">
//                       <TaskList />
//                       <Calendar />
//                     </div>
//                     <DepartmentDetails />
//                   </>
//                 } 
//               />

//               {/* ✅ Department Route */}
//               <Route path="/departments/:departmentName" element={<DepartmentRoute />} />

//               {/* ✅ Newly Added Routes */}
//               <Route path="/tasks" element={<Task />} />  {/* Tasks Page */}
//               <Route path="/reports" element={<h2>Reports Page</h2>} />  {/* Reports Page Placeholder */}
//               <Route path="/settings" element={<h2>Settings Page</h2>} />  {/* Settings Page Placeholder */}
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;


// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./modules/Sidebar/Sidebar";
// import Topbar from "./modules/Topbar/topbar";
// import FiltersActions from "./modules/FiltersActions";
// import TaskSummary from "./modules/taskSummary/TaskSummary"; 
// import TaskList from "./components/TaskList/TaskList"; 
// import Calendar from "./modules/calendar/Calendar";  // Import Calendar
// import DepartmentDetails from "./modules/departmentdetails/DepartmentDetails";
// import DepartmentRoute from "./modules/departmentRoute/DepartmentRoute";
// import "./App.css";

// const App = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <Router>
//       <div className={`app-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
//         {/* ✅ Sidebar */}
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

//         {/* ✅ Main Content */}
//         <div className="main-content">
//           <Topbar />
//           <div className="content-area">
//             <Routes>
//               {/* ✅ Dashboard Route */}
//               <Route 
//                 path="/" 
//                 element={
//                   <>
//                     <FiltersActions />
//                     <TaskSummary />
//                     <div className="task-calendar-row">
//                       <TaskList />
//                       <Calendar />  {/* Ensure Calendar is in the same row as TaskList */}
//                     </div>
//                     <DepartmentDetails />
//                   </>
//                 } 
//               />

//               {/* ✅ Department Route */}
//               <Route path="/departments/:departmentName" element={<DepartmentRoute />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;


// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./modules/Sidebar/Sidebar";
// import Topbar from "./modules/Topbar/topbar";
// import FiltersActions from "./modules/FiltersActions";
// import TaskSummary from "./modules/taskSummary/TaskSummary"; 
// import TaskList from "./components/TaskList/TaskList"; 
// import DepartmentDetails from "./modules/departmentdetails/DepartmentDetails";
// import DepartmentRoute from "./modules/departmentRoute/DepartmentRoute";
// import "./App.css";

// const App = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <Router>
//       <div className={`app-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
//         {/* ✅ Sidebar */}
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

//         {/* ✅ Main Content */}
//         <div className="main-content">
//           <Topbar />
//           <div className="content-area">
//             <Routes>
//               {/* ✅ Dashboard Route */}
//               <Route 
//                 path="/" 
//                 element={
//                   <>
//                     <FiltersActions />
//                     <TaskSummary />
//                     <TaskList />
//                     <DepartmentDetails />
//                   </>
//                 } 
//               />

//               {/* ✅ Department Route */}
//               <Route path="/departments/:departmentName" element={<DepartmentRoute />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;



// import React, { useState } from "react";
// import Sidebar from "./modules/Sidebar/Sidebar";
// import Topbar from "./modules/Topbar/topbar";
// import FiltersActions from "./modules/FiltersActions";
// import TaskSummary from "./modules/taskSummary/TaskSummary"; 
// import "./App.css";
// import TaskList from "./components/TaskList/TaskList"; // ✅ Import TaskList component
// import DepartmentDetails from "./modules/departmentdetails/DepartmentDetails";

// const App = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <div className={`app-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
//       {/* ✅ Sidebar */}
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

//       {/* ✅ Main Content */}
//       <div className="main-content">
//         <Topbar />
//         <div className="content-area">
//           <FiltersActions /> {/* ✅ New Filters & Actions Row */}
//           <TaskSummary />  
//           <TaskList/>
//           <DepartmentDetails />

//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
