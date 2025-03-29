import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const MemberProfile: React.FC = () => {
    return (
        <Box p={3}>
            <Typography variant="h5" gutterBottom>Profile</Typography>
            <TextField label="Name" fullWidth margin="normal" />
            <TextField label="Email" fullWidth margin="normal" />
            <Button variant="contained" color="primary">Update Profile</Button>
        </Box>
    );
};

export default MemberProfile;
