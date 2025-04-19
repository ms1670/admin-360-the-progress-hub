import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import Sidebar from "../modules/sidebar/Sidebar"; // Ensure the correct import path
import Topbar from "../modules/topbar/Topbar"; // Ensure the correct import path

import TaskList from "../modules/taskList/TaskList";
import EventCalendar from "../modules/calendar/EventCalendar";
import { initialTasks } from "../data/TaskData";
import { Task as TaskType } from "../types/taskTypes";


const Task = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* ✅ Topbar Component */}
      <Topbar />

      {/* ✅ Add marginTop to prevent content overlap */}
      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
        {/* Sidebar Component */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            transition: "margin-left 0.3s ease-in-out",
            // marginLeft: sidebarOpen ? ${drawerWidth}px : ${collapsedWidth}px,
            // ml: sidebarOpen ? ${drawerWidth}px : ${collapsedWidth}px, // ✅ Sidebar Offset
           // marginLeft:"200px",
            padding: "16px",
          }}
        >
          <Container maxWidth="xl">
              <Typography variant="h4" sx={{ my: 3 }}>
                Tasks
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 2 }}>
                  <TaskList 
                    tasks={tasks} 
                    setTasks={setTasks} 
                    openAddTask={false} // If you don't use AddTask popup here
                    handleOpenAddTask={() => {}} 
                    handleCloseAddTask={() => {}} 
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <EventCalendar />
                </Box>
              </Box>
            </Container>

        </Box>

      </Box>

    </Box>


  );
};

export default Task;
