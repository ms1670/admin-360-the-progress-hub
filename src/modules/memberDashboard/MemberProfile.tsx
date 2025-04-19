import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import MemberSidebar from "./MemberSidebar";
import Topbar from "../topbar/Topbar";

const MemberProfile: React.FC = () => {
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

                {/* ✅ Profile Content */}
                <Box sx={{ flex: 1, p: 3 }}>
                    <Typography variant="h5" gutterBottom>Profile</Typography>
                    <TextField label="Name" fullWidth margin="normal" />
                    <TextField label="Email" fullWidth margin="normal" />
                    <Button variant="contained" color="primary">Update Profile</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default MemberProfile;
