import React, { useState } from "react";
import { Box, Typography, Paper, Container } from "@mui/material";
import { useParams } from "react-router-dom"; // ✅ Import useParams
import Topbar from "../topbar/Topbar";
import DepartmentSidebar from "./DepartmentSidebar";
import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails";

const DepartmentMembers: React.FC = () => {
  // State to control the sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ✅ Get departmentName from the URL
  const { departmentName } = useParams<{ departmentName: string }>();

  // Filter employees based on the department name
  const departmentEmployees = departmentEmployeesDetails.filter(
    (employee) => employee.department.toLowerCase() === departmentName?.toLowerCase()
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <DepartmentSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <Topbar departmentName={departmentName || "Department"} />

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            mt: 6,
            padding: "16px",
            transition: "margin-left 0.3s ease",
          }}
        >
          {/* Department Members Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4 }}>
            <Typography variant="h4" fontWeight="bold">
              {departmentName} Members
            </Typography>
          </Box>

          {/* Employees List */}
          <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Typography variant="h5" fontWeight="bold">Members of {departmentName}</Typography>

            <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
              <Typography variant="h6">📌 Total Members: {departmentEmployees.length}</Typography>
            </Paper>

            {departmentEmployees.length > 0 ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 2,
                  mt: 2,
                }}
              >
                {departmentEmployees.map((employee) => (
                  <Paper key={employee.id} sx={{ padding: 2 }}>
                    <Typography variant="h6">{employee.name} - {employee.designation}</Typography>
                    <Typography variant="body2" color="textSecondary">{employee.email}</Typography>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Typography variant="h6" color="error">
                No members found for "{departmentName}"
              </Typography>
            )}
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default DepartmentMembers;


// import React, { useState } from "react";
// import { Box, Typography } from "@mui/material";
// import Topbar from "../topbar/Topbar";
// import DepartmentSidebar from "./DepartmentSidebar";

// const DepartmentMembers: React.FC = () => {
//   // Define the state for the sidebar and department name
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const departmentName = "Department Name"; // You can set this dynamically if needed

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       {/* Sidebar */}
//       <DepartmentSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//       <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         {/* Topbar */}
//         <Topbar departmentName={departmentName} />

//         {/* Main Content */}
//         <Box sx={{ padding: 3, mt: 6 }}>
//           <Typography variant="h4" fontWeight="bold">
//             Department Members
//           </Typography>
//           <Typography variant="body1" sx={{ mt: 2 }}>
//             Manage department members here.
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default DepartmentMembers;
