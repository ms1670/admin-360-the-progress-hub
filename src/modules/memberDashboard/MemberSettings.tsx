import React from "react";
import { Box, Typography, Switch, FormControlLabel } from "@mui/material";

const MemberSettings: React.FC = () => {
    return (
        <Box p={3}>
            <Typography variant="h5" gutterBottom>Settings</Typography>
            <FormControlLabel 
                control={<Switch />} 
                label="Enable Notifications" 
            />
        </Box>
    );
};

export default MemberSettings;
