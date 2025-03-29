import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, Container } from "@mui/material";
import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails";
import { initialTasks } from "../../data/TaskData"; // ✅ Import Task Data
import { useNavigate } from "react-router-dom";
import Topbar from "../topbar/Topbar";
import TaskList from "../taskList/TaskList"; // ✅ Import Task List Component
import AddTask from "../addTask/AddTask"; // ✅ Import Add Task Component
import { Task } from "../../types/taskTypes"; // ✅ Import Task Type
import Sidebar from "../sidebar/Sidebar"; // Import Sidebar
import DepartmentSidebar from "./DepartmentSidebar"; // Import the new Department Sidebar

interface DepartmentDashboardProps {
  departmentName: string;
}

const DepartmentDashboard: React.FC<DepartmentDashboardProps> = ({ departmentName }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openAddTask, setOpenAddTask] = useState(false); // ✅ State to manage Add Task popup
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar state


  // 🟢 Filter employees by department
  const departmentEmployees = departmentEmployeesDetails.filter(
    (employee) => employee.department === departmentName
  );

  // 🟢 Filter tasks based on department
  useEffect(() => {
    if (departmentName) {
      const filteredTasks = initialTasks.filter(
        (task) => task.department.toLowerCase() === departmentName.toLowerCase()
      );
      setTasks(filteredTasks);
    }
  }, [departmentName]);

  // 🔹 Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove stored token
    navigate("/login"); // Redirect to login page
  };

  // ✅ Function to open Add Task popup
  const handleOpenAddTask = () => {
    setOpenAddTask(true);
  };

  // ✅ Function to close Add Task popup
  const handleCloseAddTask = () => {
    setOpenAddTask(false);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* ✅ Sidebar */}
      {/* <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} /> */}
            <DepartmentSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* ✅ Use the New Department Sidebar */}
        {/* <DepartmentSidebar open={sidebarOpen} setOpen={setSidebarOpen} departmentName={departmentName} /> */}

  
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* ✅ Topbar */}
        <Topbar departmentName={departmentName} />
  
        {/* ✅ Main Content */}
        <Box
          sx={{
            flex: 1,
            mt: 6,
            transition: "margin-left 0.3s ease",
            padding:"16px"
           // ml: sidebarOpen ? "240px" : "60px", // Adjust based on sidebar width
          }}
        >
          {/* ✅ Department Name + Buttons Row */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4 }}>
            <Typography variant="h4" fontWeight="bold">
              {departmentName} Department
            </Typography>
  
            {/* ✅ Buttons */}
            <Box>
              <Button variant="contained" color="primary" onClick={handleOpenAddTask} sx={{ mr: 2 }}>
                Add Task
              </Button>
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Box>
  
          {/* ✅ Task List */}
          <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Typography variant="h5" fontWeight="bold">{departmentName} Tasks</Typography>
  
            {tasks.length > 0 ? (
              <TaskList
                tasks={tasks}
                setTasks={setTasks}
                openAddTask={openAddTask}
                handleOpenAddTask={handleOpenAddTask}
                handleCloseAddTask={handleCloseAddTask}
              />
            ) : (
              <Typography variant="h6" color="textSecondary">
                No tasks found for {departmentName}, Add Your First Task.
              </Typography>
            )}
          </Container>
  
          {/* ✅ Employees List */}
          <Box mt={3}>
            <Typography variant="h5" fontWeight="bold">Employees</Typography>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
              <Typography variant="h6">📌 Total Employees: {departmentEmployees.length}</Typography>
            </Paper>
  
            {departmentEmployees.length > 0 ? (
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2, mt: 2 }}>
                {departmentEmployees.map((employee) => (
                  <Paper key={employee.id} sx={{ padding: 2 }}>
                    <Typography variant="h6">{employee.name} - {employee.designation}</Typography>
                    <Typography variant="body2" color="textSecondary">{employee.email}</Typography>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Typography variant="h6" color="error">
                No employees found for "{departmentName}"
              </Typography>
            )}
          </Box>
  
          {/* ✅ Add Task Popup */}
          <AddTask open={openAddTask} onClose={handleCloseAddTask} setTasks={setTasks} />
        </Box>
      </Box>
    </Box>
  );
  
};

export default DepartmentDashboard;



// import React, { useState, useEffect } from "react";
// import { Box, Typography, Paper, Button, Container } from "@mui/material";
// import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails";
// import { initialTasks } from "../../data/TaskData"; // ✅ Import Task Data
// import { useNavigate } from "react-router-dom";
// import Topbar from "../topbar/Topbar";
// import TaskList from "../taskList/TaskList"; // ✅ Import Task List Component
// import AddTask from "../addTask/AddTask"; // ✅ Import Add Task Component
// import { Task } from "../../types/taskTypes"; // ✅ Import Task Type
// import Sidebar from "../sidebar/Sidebar"; // Import Sidebar
// import DepartmentSidebar from "./DepartmentSidebar"; // Import the new Department Sidebar


// interface DepartmentDashboardProps {
//   departmentName: string;
// }

// const DepartmentDashboard: React.FC<DepartmentDashboardProps> = ({ departmentName }) => {
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [openAddTask, setOpenAddTask] = useState(false); // ✅ State to manage Add Task popup
//   const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar state


//   // 🟢 Filter employees by department
//   const departmentEmployees = departmentEmployeesDetails.filter(
//     (employee) => employee.department === departmentName
//   );

//   // 🟢 Filter tasks based on department
//   useEffect(() => {
//     if (departmentName) {
//       const filteredTasks = initialTasks.filter(
//         (task) => task.department.toLowerCase() === departmentName.toLowerCase()
//       );
//       setTasks(filteredTasks);
//     }
//   }, [departmentName]);

//   // 🔹 Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove stored token
//     navigate("/login"); // Redirect to login page
//   };

//   // ✅ Function to open Add Task popup
//   const handleOpenAddTask = () => {
//     setOpenAddTask(true);
//   };

//   // ✅ Function to close Add Task popup
//   const handleCloseAddTask = () => {
//     setOpenAddTask(false);
//   };

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       {/* ✅ Sidebar */}
//       {/* <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} /> */}
//             <DepartmentSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//         {/* ✅ Use the New Department Sidebar */}
//         {/* <DepartmentSidebar open={sidebarOpen} setOpen={setSidebarOpen} departmentName={departmentName} /> */}

  
//       <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         {/* ✅ Topbar */}
//         <Topbar departmentName={departmentName} />
  
//         {/* ✅ Main Content */}
//         <Box
//           sx={{
//             flex: 1,
//             mt: 6,
//             transition: "margin-left 0.3s ease",
//             padding:"16px"
//            // ml: sidebarOpen ? "240px" : "60px", // Adjust based on sidebar width
//           }}
//         >
//           {/* ✅ Department Name + Buttons Row */}
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4 }}>
//             <Typography variant="h4" fontWeight="bold">
//               {departmentName} Department
//             </Typography>
  
//             {/* ✅ Buttons */}
//             <Box>
//               <Button variant="contained" color="primary" onClick={handleOpenAddTask} sx={{ mr: 2 }}>
//                 Add Task
//               </Button>
//               <Button variant="contained" color="error" onClick={handleLogout}>
//                 Logout
//               </Button>
//             </Box>
//           </Box>
  
//           {/* ✅ Task List */}
//           <Container maxWidth="xl" sx={{ mt: 4 }}>
//             <Typography variant="h5" fontWeight="bold">{departmentName} Tasks</Typography>
  
//             {tasks.length > 0 ? (
//               <TaskList
//                 tasks={tasks}
//                 setTasks={setTasks}
//                 openAddTask={openAddTask}
//                 handleOpenAddTask={handleOpenAddTask}
//                 handleCloseAddTask={handleCloseAddTask}
//               />
//             ) : (
//               <Typography variant="h6" color="textSecondary">
//                 No tasks found for {departmentName}.
//               </Typography>
//             )}
//           </Container>
  
//           {/* ✅ Employees List */}
//           <Box mt={3}>
//             <Typography variant="h5" fontWeight="bold">Employees</Typography>
//             <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
//               <Typography variant="h6">📌 Total Employees: {departmentEmployees.length}</Typography>
//             </Paper>
  
//             {departmentEmployees.length > 0 ? (
//               <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2, mt: 2 }}>
//                 {departmentEmployees.map((employee) => (
//                   <Paper key={employee.id} sx={{ padding: 2 }}>
//                     <Typography variant="h6">{employee.name} - {employee.designation}</Typography>
//                     <Typography variant="body2" color="textSecondary">{employee.email}</Typography>
//                   </Paper>
//                 ))}
//               </Box>
//             ) : (
//               <Typography variant="h6" color="error">
//                 No employees found for "{departmentName}"
//               </Typography>
//             )}
//           </Box>
  
//           {/* ✅ Add Task Popup */}
//           <AddTask open={openAddTask} onClose={handleCloseAddTask} setTasks={setTasks} />
//         </Box>
//       </Box>
//     </Box>
//   );
  
// };

// export default DepartmentDashboard;


// import React, { useState, useEffect } from "react";
// import { Box, Typography, Paper, Button, Container } from "@mui/material";
// import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails";
// import { initialTasks } from "../../data/TaskData"; // ✅ Import Task Data
// import { useNavigate } from "react-router-dom";
// import Topbar from "../topbar/Topbar";
// import TaskList from "../taskList/TaskList"; // ✅ Import Task List Component
// import AddTask from "../addTask/AddTask"; // ✅ Import Add Task Component
// import { Task } from "../../types/taskTypes"; // ✅ Import Task Type

// interface DepartmentDashboardProps {
//   departmentName: string;
// }

// const DepartmentDashboard: React.FC<DepartmentDashboardProps> = ({ departmentName }) => {
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [openAddTask, setOpenAddTask] = useState(false); // ✅ State to manage Add Task popup

//   // 🟢 Filter employees by department
//   const departmentEmployees = departmentEmployeesDetails.filter(
//     (employee) => employee.department === departmentName
//   );

//   // 🟢 Filter tasks based on department
//   useEffect(() => {
//     if (departmentName) {
//       const filteredTasks = initialTasks.filter(
//         (task) => task.department.toLowerCase() === departmentName.toLowerCase()
//       );
//       setTasks(filteredTasks);
//     }
//   }, [departmentName]);

//   // 🔹 Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove stored token
//     navigate("/login"); // Redirect to login page
//   };

//   // ✅ Function to open Add Task popup
//   const handleOpenAddTask = () => {
//     setOpenAddTask(true);
//   };

//   // ✅ Function to close Add Task popup
//   const handleCloseAddTask = () => {
//     setOpenAddTask(false);
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       {/* ✅ Pass departmentName to Topbar */}
//       <Topbar departmentName={departmentName} />

//       <Box sx={{ flex: 1, p: 4, mt: 10 }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4 }}>
//                 {/* ✅ Department Name (Left-Aligned) */}
//                 <Typography variant="h4" fontWeight="bold">
//                     {departmentName} Department
//                 </Typography>

//                 {/* ✅ Logout Button (Right-Aligned) */}
//                 <Button variant="contained" color="error" onClick={handleLogout}>
//                     Logout
//                 </Button>
//                 </Box>

//         {/* ✅ Department Task List */}
//         <Container maxWidth="xl" sx={{ mt: 4 }}>
//           <Typography variant="h5" fontWeight="bold">{departmentName} Tasks</Typography>

//         {tasks.length > 0 ? (
//             <TaskList
//               tasks={tasks}
//               setTasks={setTasks}
//               openAddTask={openAddTask} // ✅ Pass state
//               handleOpenAddTask={handleOpenAddTask} // ✅ Pass function
//               handleCloseAddTask={handleCloseAddTask} // ✅ Pass function
//             />
//           ) : (
//             <Typography variant="h6" color="textSecondary">
//               No tasks found for {departmentName}.
//             </Typography>
//           )}

//           {/* ✅ Add Task Popup */}
//          <AddTask open={openAddTask} onClose={handleCloseAddTask} setTasks={setTasks} />

//         {/* ✅ Employees List */}
//         <Box mt={3}>
//           <Typography variant="h5" fontWeight="bold">Employees</Typography>

//           {/* ✅ Department Details */}
//         <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
//           <Typography variant="h6">📌 Total Employees: {departmentEmployees.length}</Typography>
//         </Paper>

//           {departmentEmployees.length > 0 ? (
//             departmentEmployees.map((employee) => (
//               <Paper key={employee.id} sx={{ padding: 2, marginTop: 1 }}>
//                 <Typography variant="h6">{employee.name} - {employee.designation}</Typography>
//                 <Typography variant="body2" color="textSecondary">{employee.email}</Typography>
//               </Paper>
//             ))
//           ) : (
//             <Typography variant="h6" color="error">
//               No employees found for "{departmentName}"
//             </Typography>
//           )}
//         </Box>

        

//           {/* ✅ Add Task Button 
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleOpenAddTask}
//             sx={{ my: 2 }}
//           >
//             Add Task
//           </Button>*/}

          
//         </Container>


//       </Box>

    
//     </Box>
//   );
// };

// export default DepartmentDashboard;


// import React from "react";
// import { Box, Typography, Paper, Button } from "@mui/material";
// import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails";
// import { useNavigate } from "react-router-dom";
// import Topbar from "../topbar/Topbar";

// interface DepartmentDashboardProps {
//   departmentName: string;
// }

// const DepartmentDashboard: React.FC<DepartmentDashboardProps> = ({ departmentName }) => {
//   const navigate = useNavigate();

//   // 🟢 Filter employees by department
//   const departmentEmployees = departmentEmployeesDetails.filter(
//     (employee) => employee.department === departmentName
//   );

//   // 🔹 Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove stored token
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       {/* ✅ Fixed: Pass departmentName from props to Topbar */}
//       <Topbar departmentName={departmentName} />

//       <Box sx={{ flex: 1, p: 4, mt: 10 }}>
//         {/* ✅ Fixed: Show department name from props */}
//         <Typography variant="h4" fontWeight="bold">
//           {departmentName} Department
//         </Typography>

//         {/* ✅ Department Details */}
//         <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
//           <Typography variant="h6">📌 Total Employees: {departmentEmployees.length}</Typography>
//         </Paper>

//         {/* ✅ Employees List */}
//         <Box mt={3}>
//           <Typography variant="h5" fontWeight="bold">Employees</Typography>
//           {departmentEmployees.length > 0 ? (
//             departmentEmployees.map((employee) => (
//               <Paper key={employee.id} sx={{ padding: 2, marginTop: 1 }}>
//                 <Typography variant="h6">{employee.name} - {employee.designation}</Typography>
//                 <Typography variant="body2" color="textSecondary">{employee.email}</Typography>
//               </Paper>
//             ))
//           ) : (
//             <Typography variant="h6" color="error">
//               No employees found for "{departmentName}"
//             </Typography>
//           )}
//         </Box>

//         {/* ✅ Logout Button */}
//         <Box mt={4}>
//           <Button variant="contained" color="error" onClick={handleLogout}>
//             Logout
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default DepartmentDashboard;


// import React from "react";
// import { Box, Typography, Paper, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails";

// const DepartmentDashboard: React.FC<{ departmentName: string }> = ({ departmentName }) => {
//   const navigate = useNavigate();

//   // 🟢 Filter employees by department
//   const departmentEmployees = departmentEmployeesDetails.filter(
//     (employee) => employee.department === departmentName
//   );

//   // 🔴 Logout function
//   const handleLogout = () => {
//     // 🚀 Clear session storage (if needed in future)
//     sessionStorage.removeItem("user");

//     // 🔄 Redirect to login page
//     navigate("/login");
//   };

//   // 🔴 If no employees found, show error message
//   if (departmentEmployees.length === 0) {
//     return (
//       <Box p={4}>
//         <Typography variant="h5" color="error">
//           No employees found for "{departmentName}"
//         </Typography>
//         <Button 
//           variant="contained" 
//           color="secondary" 
//           onClick={handleLogout} 
//           sx={{ mt: 2 }}
//         >
//           Logout
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box p={4}>
//       {/* 🔹 Department Name */}
//       <Typography variant="h4" fontWeight="bold">
//         {departmentName} Department
//       </Typography>

//       {/* 🔹 Logout Button */}
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={handleLogout}
//         sx={{ mt: 2 }}
//       >
//         Logout
//       </Button>

//       {/* 🔹 Department Details */}
//       <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
//         <Typography variant="h6">📌 Total Employees: {departmentEmployees.length}</Typography>
//       </Paper>

//       {/* 🔹 Employees List */}
//       <Box mt={3}>
//         <Typography variant="h5" fontWeight="bold">Employees</Typography>
//         {departmentEmployees.map((employee) => (
//           <Paper key={employee.id} sx={{ padding: 2, marginTop: 1 }}>
//             <Typography variant="h6">{employee.name} - {employee.designation}</Typography>
//             <Typography variant="body2" color="textSecondary">{employee.email}</Typography>
//           </Paper>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default DepartmentDashboard;
