import React, { useState } from "react";
import { Box, Typography, Switch, FormControlLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import MemberSidebar from "./MemberSidebar";
import Topbar from "../topbar/Topbar";

const MemberSettings: React.FC = () => {
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

                {/* ✅ Settings Content */}
                <Box sx={{ flex: 1, p: 3 }}>
                    <Typography variant="h5" gutterBottom>Settings</Typography>
                    <FormControlLabel 
                        control={<Switch />} 
                        label="Enable Notifications" 
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default MemberSettings;
