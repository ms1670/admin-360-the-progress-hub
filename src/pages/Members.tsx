import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Sidebar from '../modules/sidebar/Sidebar';
import Topbar from '../modules/topbar/Topbar';
import MemberList from '../modules/memberList/MemberList';
import { departmentEmployeesDetails } from '../data/departmentEmployeesDetails';

const Members: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Flattening employee details from all departments
  const members = departmentEmployeesDetails; // ✅ Already flat

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar />

      <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '80px' }}>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: '16px',
          }}
        >
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ my: 3 }}>
              Members Dashboard
            </Typography>

            {/* ✅ Member List Section */}
            <MemberList members={members} />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Members;


// import React from 'react';
// import { Box, Container, Typography } from "@mui/material";
// import { useState } from "react";
// import Sidebar from "../modules/sidebar/Sidebar"; // Ensure the correct import path
// import Topbar from "../modules/topbar/Topbar"; // Ensure the correct import path


// const Members: React.FC = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//     {/* ✅ Topbar Component */}
//     <Topbar />

//     {/* ✅ Add marginTop to prevent content overlap */}
//     <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
//       {/* Sidebar Component */}
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//       {/* Main Content Area */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           transition: "margin-left 0.3s ease-in-out",
//           // marginLeft: sidebarOpen ? ${drawerWidth}px : ${collapsedWidth}px,
//           // ml: sidebarOpen ? ${drawerWidth}px : ${collapsedWidth}px, // ✅ Sidebar Offset
//          // marginLeft:"200px",
//           padding: "16px",
//         }}
//       >
//         <Container maxWidth="xl">
//         <Typography variant="h4" sx={{ my: 3 }}>
//         Members Dashboard
//         </Typography>
//       </Container>
//       </Box>

//     </Box>

//   </Box>
//   );
// };

// export default Members;