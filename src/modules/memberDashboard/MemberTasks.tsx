import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const MemberTasks: React.FC = () => {
    return (
        <Box p={3}>
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
    );
};

export default MemberTasks;
