import { useParams } from "react-router-dom";
import { Box, Typography, Container, Button } from "@mui/material";
import TaskList from "../modules/taskList/TaskList";
import { initialTasks } from "../data/TaskData";
import { useState, useEffect } from "react";
import Sidebar from "../modules/sidebar/Sidebar";
import Topbar from "../modules/topbar/Topbar";
import { Task } from "../types/taskTypes";
import AddTask from "../modules/addTask/AddTask"; // ✅ Import AddTask component

const SubDepartments = () => {
  const { deptName } = useParams(); // Get department from URL
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openAddTask, setOpenAddTask] = useState(false); // ✅ State to manage Add Task popup

  useEffect(() => {
    if (deptName) {
      // Convert to lowercase for case-insensitive comparison
      const filteredTasks = initialTasks.filter(
        (task) => task.department.toLowerCase() === deptName.toLowerCase()
      );
      setTasks(filteredTasks);
    }
  }, [deptName]); // Runs when deptName changes

  // ✅ Function to open Add Task popup
  const handleOpenAddTask = () => {
    setOpenAddTask(true);
  };

  // ✅ Function to close Add Task popup
  const handleCloseAddTask = () => {
    setOpenAddTask(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Topbar />

        <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

          <Box component="main" sx={{ flexGrow: 1, padding: "16px" }}>
            <Container maxWidth="xl">
              <Typography variant="h4" sx={{ my: 3 }}>
                {deptName
                  ? deptName.charAt(0).toUpperCase() + deptName.slice(1).toLowerCase()
                  : ""}{" "}
                Department Tasks
              </Typography>

              {/* ✅ Add Task Button */}
              {/* <Button
                variant="contained"
                color="primary"
                onClick={handleOpenAddTask}
                sx={{ mb: 2 }}
              >
                Add Task
              </Button> */}

              {tasks.length > 0 ? (
                <TaskList
                tasks={tasks}
                setTasks={setTasks}
                openAddTask={openAddTask} // ✅ Pass state
                handleOpenAddTask={handleOpenAddTask} // ✅ Pass function
                handleCloseAddTask={handleCloseAddTask} // ✅ Pass function
              />
              ) : (
                <Typography variant="h6" color="textSecondary">
                  No tasks found for {deptName}.
                </Typography>
              )}
            </Container>
          </Box>
        </Box>
      </Box>

      {/* ✅ Add Task Popup */}
      <AddTask open={openAddTask} onClose={handleCloseAddTask} setTasks={setTasks} />
    </Box>
  );
};

export default SubDepartments;


// import { useParams } from "react-router-dom";
// import { Box, Typography, Container } from "@mui/material";
// import TaskList from "../modules/taskList/TaskList";
// import { initialTasks } from "../data/TaskData";
// import { useState, useEffect } from "react";
// import Sidebar from "../modules/sidebar/Sidebar";
// import Topbar from "../modules/topbar/Topbar";
// import { Task } from "../types/taskTypes";

// const SubDepartments = () => {
//   const { deptName } = useParams(); // Get department from URL
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [tasks, setTasks,] = useState<Task[]>([]);

//   useEffect(() => {
//     if (deptName) {
//       // Convert to lowercase for case-insensitive comparison
//       const filteredTasks = initialTasks.filter(
//         (task) => task.department.toLowerCase() === deptName.toLowerCase()
//       );
//       setTasks(filteredTasks);
//     }
//   }, [deptName]); // Runs when deptName changes

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//         <Topbar />

//         <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
//           <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//           <Box component="main" sx={{ flexGrow: 1, padding: "16px" }}>
//             <Container maxWidth="xl">
//               <Typography variant="h4" sx={{ my: 3 }}>
//               {deptName
//                 ? deptName.charAt(0).toUpperCase() + deptName.slice(1).toLowerCase()
//                 : ""}{" "}Department Tasks
//               </Typography>

//               {tasks.length > 0 ? (
//                 <TaskList tasks={tasks} setTasks={setTasks} handleOpenAddTask={handleOpenAddTask}/>
//               ) : (
//                 <Typography variant="h6" color="textSecondary">
//                   No tasks found for {deptName}.
//                 </Typography>
//               )}
//             </Container>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default SubDepartments;



// import { useParams } from "react-router-dom";
// import { Box, Typography, Container } from "@mui/material";
// import TaskList from "../modules/taskList/TaskList";
// import { initialTasks } from "../data/TaskData";
// import { useState } from "react";
// import Sidebar from "../modules/sidebar/Sidebar"; // Ensure the correct import path
// import Topbar from "../modules/topbar/Topbar"; // Ensure the correct import path
// import { Task } from "../types/taskTypes"; // Import Task type if needed

// const SubDepartments = () => {
//   const { deptName } = useParams();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // ✅ Manage tasks in state
//   const [tasks, setTasks] = useState<Task[]>(
//     initialTasks.filter((task) => task.department === deptName)
//   );

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//         {/* ✅ Topbar Component */}
//         <Topbar />

//         {/* ✅ Add marginTop to prevent content overlap */}
//         <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
//           {/* Sidebar Component */}
//           <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//           {/* Main Content Area */}
//           <Box
//             component="main"
//             sx={{
//               flexGrow: 1,
//               transition: "margin-left 0.3s ease-in-out",
//               padding: "16px",
//             }}
//           >
//             <Container maxWidth="xl">
//               <Typography variant="h4" sx={{ my: 3 }}>
//                 {deptName} Department Tasks
//               </Typography>

//               {/* ✅ Pass tasks state as props */}
//               <TaskList tasks={tasks} setTasks={setTasks} />
//             </Container>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default SubDepartments;
