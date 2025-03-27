import { Box, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import QuickActionPanel from "../quickActions/QuickActionPanel";
import ProgressCards from "../progressCards/ProgressCards";
import TaskList from "../taskList/TaskList"; // ✅ TaskList is included
import EventCalendar from "../calendar/EventCalendar";
import AllDepartmentsTaskList from "../allDepartments/AllDepartmentsTaskList";
import AddTask from "../addTask/AddTask"; // ✅ Import AddTask Component
import { initialTasks } from "../../data/TaskData";
import { Task } from "../../types/taskTypes";  // ✅ Import Task type

const MainDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [addTaskOpen, setAddTaskOpen] = useState(false); // ✅ State for AddTask Dialog

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // ✅ Function to Open AddTask Dialog
  const handleOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  // ✅ Function to Close AddTask Dialog
  const handleCloseAddTask = () => {
    setAddTaskOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Topbar />

      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <Box component="main" sx={{ flexGrow: 1, padding: "16px" }}>
          <Container maxWidth="xl">
            {/* ✅ Pass setTasks to QuickActionPanel */}
            <QuickActionPanel setTasks={setTasks} handleOpenAddTask={handleOpenAddTask} />
            <ToastContainer />

            <ProgressCards tasks={tasks} />
            <AddTask open={addTaskOpen} onClose={handleCloseAddTask} setTasks={setTasks} />

            {/* ✅ TaskList receives tasks */}
            <TaskList 
                tasks={tasks} 
                setTasks={setTasks}  
                openAddTask={addTaskOpen}         // ✅ Pass the state for Add Task Popup
                handleOpenAddTask={handleOpenAddTask} 
                handleCloseAddTask={handleCloseAddTask} // ✅ Pass close function

              /> 

            <EventCalendar />
            <AllDepartmentsTaskList  tasks={tasks}/>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default MainDashboard;


// import { Box, Container } from "@mui/material";
// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import Sidebar from "../sidebar/Sidebar";
// import Topbar from "../topbar/Topbar";
// import QuickActionPanel from "../quickActions/QuickActionPanel";
// import ProgressCards from "../progressCards/ProgressCards";
// import TaskList from "../taskList/TaskList"; // ✅ TaskList is included
// import EventCalendar from "../calendar/EventCalendar";
// import AllDepartmentsTaskList from "../allDepartments/AllDepartmentsTaskList";
// import AddTask from "../addTask/AddTask"; // ✅ Import AddTask Component
// import { initialTasks } from "../../data/TaskData";
// import { Task } from "../../types/taskTypes";  // ✅ Import Task type

// const MainDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [tasks, setTasks] = useState<Task[]>(initialTasks);
//   const [addTaskOpen, setAddTaskOpen] = useState(false); // ✅ State for AddTask Dialog

//   const location = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]);

//   // ✅ Function to Open AddTask Dialog
//   const handleOpenAddTask = () => {
//     setAddTaskOpen(true);
//   };

//   // ✅ Function to Close AddTask Dialog
//   const handleCloseAddTask = () => {
//     setAddTaskOpen(false);
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       <Topbar />

//       <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
//         <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//         <Box component="main" sx={{ flexGrow: 1, padding: "16px" }}>
//           <Container maxWidth="xl">
//             {/* ✅ Pass setTasks to QuickActionPanel */}
//             <QuickActionPanel setTasks={setTasks} handleOpenAddTask={handleOpenAddTask} />
//             <ToastContainer />

//             <ProgressCards tasks={tasks} />
//             <AddTask open={addTaskOpen} onClose={handleCloseAddTask} setTasks={setTasks} />

//             {/* ✅ TaskList receives tasks */}
//             <TaskList 
//                 tasks={tasks} 
//                 setTasks={setTasks}  
//                 openAddTask={addTaskOpen}         // ✅ Pass the state for Add Task Popup
//                 handleOpenAddTask={handleOpenAddTask} 
//                 handleCloseAddTask={handleCloseAddTask} // ✅ Pass close function

//               /> 

//             <EventCalendar />
//             <AllDepartmentsTaskList  tasks={tasks}/>
//           </Container>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default MainDashboard;




// const MainDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [tasks, setTasks] = useState<Task[]>(initialTasks);
//   const [addTaskOpen, setAddTaskOpen] = useState(false); // ✅ State for AddTask Dialog

//   const location = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]);

//   // ✅ Function to Open AddTask Dialog
//   const handleOpenAddTask = () => {
//     setAddTaskOpen(true);
//   };

//   // ✅ Function to Close AddTask Dialog
//   const handleCloseAddTask = () => {
//     setAddTaskOpen(false);
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       <Topbar />

//       <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
//         <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//         <Box component="main" sx={{ flexGrow: 1, padding: "16px" }}>
//           <Container maxWidth="xl">
//             <QuickActionPanel />
//             <ToastContainer />

//             <ProgressCards />
//             <AddTask open={addTaskOpen} onClose={handleCloseAddTask} setTasks={setTasks} />

//             {/* ✅ TaskList is here, not removed */}
//             <TaskList tasks={tasks} setTasks={setTasks} /> 

//             <EventCalendar />
//             <AllDepartmentsTaskList />
//           </Container>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default MainDashboard;



// import { Box, Container, Typography } from "@mui/material";
// import { useState } from "react";
// import Sidebar from "../sidebar/Sidebar"; // Ensure the correct import path
// import Topbar from "../topbar/Topbar"; // Ensure the correct import path
// import QuickActionPanel from "../quickActions/QuickActionPanel"; // ✅ Import here
// import ProgressCards from "../progressCards/ProgressCards";
// import TaskList from "../taskList/TaskList"; // Ensure correct path
// import Calendar from "../calendar/Calendar"; // Import Calendar component
// import EventCalendar from "../calendar/EventCalendar"; // Import Calendar Component
// import AllDepartmentsTaskList from "../allDepartments/AllDepartmentsTaskList"
// import { initialTasks } from "../../data/TaskData"; // Import task data
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { ToastContainer } from "react-toastify";


// // const drawerWidth = 200;
// // const collapsedWidth = 80;

// const MainDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [tasks, setTasks] = useState(initialTasks);

//   const location = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]); // Runs every time the route changes

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       {/* ✅ Topbar Component */}
//       <Topbar />

//       {/* ✅ Add marginTop to prevent content overlap */}
//       <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
//         {/* Sidebar Component */}
//         <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//         {/* Main Content Area */}
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             transition: "margin-left 0.3s ease-in-out",
//             // marginLeft: sidebarOpen ? ${drawerWidth}px : ${collapsedWidth}px,
//             // ml: sidebarOpen ? ${drawerWidth}px : ${collapsedWidth}px, // ✅ Sidebar Offset
//            // marginLeft:"200px",
//             padding: "16px",
//           }}
//         >
//           <Container maxWidth="xl">
//           <QuickActionPanel />
//           <ToastContainer />

//           <ProgressCards />
//           <TaskList tasks={tasks}/>
//           <EventCalendar />
//           <AllDepartmentsTaskList />

//         </Container>
//         </Box>

//       </Box>

//     </Box>


//   );
// };

// export default MainDashboard;




// import { Box, Container, Typography } from "@mui/material";
// import { useState } from "react";
// import Sidebar from "../sidebar/Sidebar"; // Ensure the correct import path
// import Topbar from "../topbar/Topbar"; // Ensure the correct import path

// // const drawerWidth = 200;
// // const collapsedWidth = 80;

// const MainDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       {/* ✅ Topbar Component */}
//       <Topbar />

//       {/* ✅ Add marginTop to prevent content overlap */}
//       <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
//         {/* Sidebar Component */}
//         <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//         {/* Main Content Area */}
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             transition: "margin-left 0.3s ease-in-out",
//             // marginLeft: sidebarOpen ? `${drawerWidth}px` : `${collapsedWidth}px`,
//             // ml: sidebarOpen ? `${drawerWidth}px` : `${collapsedWidth}px`, // ✅ Sidebar Offset
//            // marginLeft:"200px",
//             padding: "16px",
//           }}
//         >
//           <Container maxWidth="xl">
//           <Typography variant="h4" sx={{ my: 3 }}>
//             Main Dashboard
//           </Typography>
//         </Container>
//         </Box>

//       </Box>

//     </Box>


//   );
// };

// export default MainDashboard;


// import { Container, Typography } from "@mui/material";

// const MainDashboard = () => {
//   return (
//     <Container maxWidth="xl">
//       <Typography variant="h4" sx={{ my: 3 }}>
//         Main Dashboard
//       </Typography>

//     </Container>
//   );
// };

// export default MainDashboard;


// import { Container, Typography, Grid, Paper } from "@mui/material";
// import Sidebar from "../sidebar/Sidebar";
// import Topbar from "../topbar/Topbar";
// import TaskSummary from "../taskSummary/TaskSummary";
// import Calendar from "../calendar/Calendar";
// import Chatbox from "../chatbox/Chatbox";

// const MainDashboard = () => {
//   return (
//     <Container maxWidth="xl">
//       {/* Top Navigation Bar */}
//       <Topbar />

//       <Grid container spacing={3} sx={{ mt: 2 }}>
//         {/* Sidebar */}
//         <Grid item xs={12} md={3} lg={2}>
//           <Sidebar />
//         </Grid>

//         {/* Main Content */}
//         <Grid item xs={12} md={9} lg={10}>
//           <Typography variant="h4" sx={{ mb: 3 }}>
//             Main Dashboard
//           </Typography>

//           <Grid container spacing={3}>
//             {/* Task Summary Section */}
//             <Grid item xs={12} md={6} lg={4}>
//               <Paper sx={{ p: 3 }}>
//                 <TaskSummary />
//               </Paper>
//             </Grid>

//             {/* Calendar Section */}
//             <Grid item xs={12} md={6} lg={4}>
//               <Paper sx={{ p: 3 }}>
//                 <Calendar />
//               </Paper>
//             </Grid>

//             {/* Chatbox Section */}
//             <Grid item xs={12} md={6} lg={4}>
//               <Paper sx={{ p: 3 }}>
//                 <Chatbox />
//               </Paper>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default MainDashboard;

