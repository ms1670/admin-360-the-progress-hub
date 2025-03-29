import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Topbar from "../topbar/Topbar";
import DepartmentSidebar from "./DepartmentSidebar";

const DepartmentReports: React.FC = () => {
  // Define the state for the sidebar and department name
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const departmentName = "Department Name"; // You can set this dynamically if needed

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <DepartmentSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <Topbar departmentName={departmentName} />

        {/* Main Content */}
        <Box sx={{ padding: 3, mt: 6 }}>
          <Typography variant="h4" fontWeight="bold">
          Department Reports
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Manage department Reports here.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DepartmentReports;
