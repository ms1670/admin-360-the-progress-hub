import React, { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useParams } from "react-router-dom";
import MemberSidebar from "./MemberSidebar";
import Topbar from "../topbar/Topbar";

const MemberTasks: React.FC = () => {
    const [open, setOpen] = useState(true);
    const { memberName } = useParams<{ memberName: string }>();

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            {/* ✅ Sidebar */}
            <MemberSidebar open={open} setOpen={setOpen} />

            {/* ✅ Main Content */}
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                {/* ✅ Topbar */}
                <Topbar memberName={memberName} />

                {/* ✅ Tasks Content */}
                <Box sx={{ flex: 1, p: 3 }}>
                    <Typography variant="h5" gutterBottom>My Tasks</Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="Task 1 - Complete the project report" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Task 2 - Attend the team meeting" />
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Box>
    );
};

export default MemberTasks;
