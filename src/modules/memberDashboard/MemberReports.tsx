import React from "react";
import { Box, Typography } from "@mui/material";

const MemberReports: React.FC = () => {
    return (
        <Box p={3}>
            <Typography variant="h5" gutterBottom>Reports</Typography>
            <Typography variant="body1">You have completed 5 out of 8 tasks this week.</Typography>
        </Box>
    );
};

export default MemberReports;
