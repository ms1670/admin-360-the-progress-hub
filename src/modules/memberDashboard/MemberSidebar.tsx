import React, { useState } from "react";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const drawerWidth = 200;
const collapsedWidth = 70;

interface MemberSidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MemberSidebar: React.FC<MemberSidebarProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Toggle drawer open/close
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Handle navigation and logout
  const handleNavigation = (path: string) => {
    if (path === "/login") {
      localStorage.removeItem("token"); // Clear token on logout
    }
    navigate(path);
  };

  // Member-specific menu items
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/memberDashboard" },
    { text: "My Tasks", icon: <TaskIcon />, path: "/member-dashboard/my-tasks" },
    { text: "Profile", icon: <PersonIcon />, path: "/member-dashboard/profile" },
  ];

  const bottomMenuItems = [
    { text: "Settings", icon: <SettingsIcon />, path: "/member-dashboard/settings" },
    { text: "Logout", icon: <LogoutIcon />, path: "/login" },
  ];

  return (
    <Box>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : collapsedWidth,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "width 0.3s ease-in-out",
            padding: "8px 0px 0px 8px",
            zIndex: (theme) => theme.zIndex.appBar - 1,
            overflowX: "hidden",
          },
        }}
      >
        {/* Top Menu Items */}
        <Box
          sx={{
            mt: 10,
            bgcolor: "#fde9b6",
            overflowY: "auto",
            flexGrow: 1,
            padding: "8px 0px 0px 8px",
          }}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItemButton
                key={index}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  padding: "6px 6px",
                  bgcolor: location.pathname === item.path ? "#aaccff" : "transparent", // Highlight active page
                  "&:hover": { bgcolor: "#e4bfa7" },
                  borderRadius: "8px 0px 0px 8px",
                  margin: "1px 0px",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#005500",
                    minWidth: "20%",
                    "& svg": { fontSize: "24px" },
                    padding: "6px 6px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Bottom Menu Items */}
        <List
          sx={{
            marginTop: "auto",
            bgcolor: "#fde9b6",
            padding: "8px 0px 0px 8px",
            mb: 1,
            position: "sticky",
            bottom: 0,
            width: "100%",
            zIndex: 1000,
          }}
        >
          {bottomMenuItems.map((item, index) => (
            <ListItemButton
              key={index}
              onClick={() => handleNavigation(item.path)}
              sx={{
                padding: "6px 6px",
                "&:hover": { bgcolor: "#e4bfa7" },
                borderRadius: "8px 0px 0px 8px",
                margin: "1px 0px",
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#005500",
                  minWidth: "20%",
                  "& svg": { fontSize: "24px" },
                  padding: "6px 6px",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          ))}
        </List>

        {/* Sidebar Toggle Button */}
        <Box
          sx={{
            bgcolor: "#005500",
            position: "sticky",
            bottom: 0,
            width: "100%",
            display: "flex",
            justifyContent: open ? "flex-end" : "center",
            height: "50px",
            alignItems: "center",
          }}
        >
          <IconButton onClick={toggleDrawer} sx={{ color: "#fde9b6" }}>
            {open ? <ArrowBackIosNewIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MemberSidebar;


// import React, { useState } from "react";
// import { Box, Drawer, List, ListItemButton, ListItemIcon, Typography, ListItemText, IconButton } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import TaskIcon from "@mui/icons-material/Assignment";
// import PersonIcon from "@mui/icons-material/Person";
// import SettingsIcon from "@mui/icons-material/Settings";
// import LogoutIcon from "@mui/icons-material/Logout";
// import MenuIcon from "@mui/icons-material/Menu";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// const drawerWidth = 200;
// const collapsedWidth = 70;

// interface MemberSidebarProps {
//     open: boolean;
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     memberName: string;
//     departmentName: string;
// }

// const MemberSidebar: React.FC<MemberSidebarProps> = ({ open, setOpen, memberName, departmentName }) => {
//     const navigate = useNavigate();
//   const location = useLocation();

//   // Toggle drawer open/close
//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   // Handle navigation and logout
//   const handleNavigation = (path: string) => {
//     if (path === "/login") {
//       localStorage.removeItem("token"); // Clear token on logout
//     }
//     navigate(path);
//   };

//   // Member-specific menu items
//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon />, path: "/memberDashboard" },
//     { text: "My Tasks", icon: <TaskIcon />, path: "/member-dashboard/my-tasks" },
//     { text: "Profile", icon: <PersonIcon />, path: "/member-dashboard/profile" },
//   ];

//   const bottomMenuItems = [
//     { text: "Settings", icon: <SettingsIcon />, path: "/member-dashboard/settings" },
//     { text: "Logout", icon: <LogoutIcon />, path: "/login" },
//   ];

//   return (

    
//     <Box>
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: open ? drawerWidth : collapsedWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: open ? drawerWidth : collapsedWidth,
//             boxSizing: "border-box",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             transition: "width 0.3s ease-in-out",
//             padding: "8px 0px 0px 8px",
//             zIndex: (theme) => theme.zIndex.appBar - 1,
//             overflowX: "hidden",
//           },
//         }}
//       >
//         {/* Top Menu Items */}
//         <Box
//           sx={{
//             mt: 10,
//             bgcolor: "#ddeeff",
//             overflowY: "auto",
//             flexGrow: 1,
//             padding: "8px 0px 0px 8px",
//           }}
//         >
//           <List>
//             {menuItems.map((item, index) => (
//               <ListItemButton
//                 key={index}
//                 onClick={() => handleNavigation(item.path)}
//                 sx={{
//                   padding: "6px 6px",
//                   bgcolor: location.pathname === item.path ? "#aaccff" : "transparent", // Highlight active page
//                   "&:hover": { bgcolor: "#aaccff" },
//                   borderRadius: "8px 0px 0px 8px",
//                   margin: "1px 0px",
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     color: "#004080",
//                     minWidth: "20%",
//                     "& svg": { fontSize: "24px" },
//                     padding: "6px 6px",
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>
//                 {open && <ListItemText primary={item.text} />}
//               </ListItemButton>
//             ))}
//           </List>
//         </Box>

//         {/* Bottom Menu Items */}
//         <List
//           sx={{
//             marginTop: "auto",
//             bgcolor: "#ddeeff",
//             padding: "8px 0px 0px 8px",
//             mb: 1,
//             position: "sticky",
//             bottom: 0,
//             width: "100%",
//             zIndex: 1000,
//           }}
//         >
//           {bottomMenuItems.map((item, index) => (
//             <ListItemButton
//               key={index}
//               onClick={() => handleNavigation(item.path)}
//               sx={{
//                 padding: "6px 6px",
//                 "&:hover": { bgcolor: "#aaccff" },
//                 borderRadius: "8px 0px 0px 8px",
//                 margin: "1px 0px",
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   color: "#004080",
//                   minWidth: "20%",
//                   "& svg": { fontSize: "24px" },
//                   padding: "6px 6px",
//                 }}
//               >
//                 {item.icon}
//               </ListItemIcon>
//               {open && <ListItemText primary={item.text} />}
//             </ListItemButton>
//           ))}
//         </List>

//         {/* Sidebar Toggle Button */}
//         <Box
//           sx={{
//             bgcolor: "#004080",
//             position: "sticky",
//             bottom: 0,
//             width: "100%",
//             display: "flex",
//             justifyContent: open ? "flex-end" : "center",
//             height: "50px",
//             alignItems: "center",
//           }}
//         >
//           <IconButton onClick={toggleDrawer} sx={{ color: "#ddeeff" }}>
//             {open ? <ArrowBackIosNewIcon /> : <MenuIcon />}
//           </IconButton>
//         </Box>
//         <Box
//             sx={{
//                 width: open ? 240 : 60,
//                 backgroundColor: "#1976d2",
//                 color: "#fff",
//                 padding: 2,
//             }}
//         >
//             {/* Profile Section */}
//             <Box sx={{ mb: 2 }}>
//                 <Typography variant="h6" fontWeight="bold">
//                     {memberName}
//                 </Typography>
//                 <Typography variant="body2">
//                     {departmentName} Department
//                 </Typography>
//             </Box>
//             {/* Other sidebar content */}
//         </Box>

//       </Drawer>
//     </Box>
//   );
// };

// export default MemberSidebar;
