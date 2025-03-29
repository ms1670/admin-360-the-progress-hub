import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";
import MemberSidebar from "./MemberSidebar";
import Topbar from "../topbar/Topbar";
import TaskList from "../taskList/TaskList"; // ✅ Import TaskList
import { Task } from "../../types/taskTypes";
import { initialTasks } from "../../data/TaskData";

const MemberDashboard: React.FC = () => {
    const { memberName } = useParams<{ memberName: string }>();
    const [open, setOpen] = useState(true);

    // ✅ Filter tasks by member name
    const filteredTasks = initialTasks.filter((task) => task.name === memberName);

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            {/* ✅ Sidebar */}
            <MemberSidebar open={open} setOpen={setOpen} />

            {/* ✅ Dashboard Content */}
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                {/* ✅ Topbar with Member Name */}
                <Topbar memberName={memberName} />

                <Box sx={{ flex: 1, p: 3 }}>
                    <Typography variant="h4">Member Dashboard</Typography>
                    <Typography variant="h6">Hello, {memberName}!</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Welcome to your personal dashboard. Here you can view your tasks and profile settings.
                    </Typography>

                    {/* ✅ Task List or No Task Message */}
                    <Container maxWidth="xl">
                        {filteredTasks.length > 0 ? (
                            <TaskList
                                tasks={filteredTasks}
                                setTasks={() => {}}
                                openAddTask={false}
                                handleOpenAddTask={() => {}}
                                handleCloseAddTask={() => {}}
                                hideAddTask={true}  // ✅ Pass the prop to hide the Add Task button
                            />
                        ) : (
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                                No tasks found for {memberName}, Add Your First Task.
                            </Typography>
                        )}
                    </Container>
                </Box>
            </Box>
        </Box>
    );
};

export default MemberDashboard;


// import React ,{ useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography } from "@mui/material";
// import MemberSidebar from "./MemberSidebar";

// const MemberDashboard: React.FC = () => {
//     const { memberName } = useParams<{ memberName: string }>();
//     const [open, setOpen] = useState(true);


//     return (
//         <Box sx={{ display: "flex" }}>
//             {/* Sidebar */}
//             <MemberSidebar open={open} setOpen={setOpen} />

//             {/* Dashboard Content */}
//             <Box sx={{ flexGrow: 1, p: 3 }}>
//                 <Typography variant="h4">Member Dashboard</Typography>
//                 <Typography variant="h6">Hello, {memberName}!</Typography>
//                 <Typography variant="body1">
//                     Welcome to your personal dashboard. Here you can view your tasks and profile settings.
//                 </Typography>
//             </Box>
//         </Box>
//     );
// };

// export default MemberDashboard;
