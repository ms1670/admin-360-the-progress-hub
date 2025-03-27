import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../sidebar/Sidebar"; // Import the existing Sidebar component

import { useState } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";


const drawerWidth = 200;
const collapsedWidth = 70;

interface DepartmentSidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Member", icon: <GroupIcon /> },
    { text: "Reports", icon: <BarChartIcon /> },
  ];
  
  const bottomMenuItems = [
    { text: "Settings", icon: <SettingsIcon /> },
    { text: "Logout", icon: <LogoutIcon /> },
  ];

const DepartmentSidebar: React.FC<DepartmentSidebarProps> = ({ open, setOpen }) => {


    const toggleDrawer = () => {
        setOpen(!open);
      };

  return (
    <Box>
      {/* <Sidebar open={open} setOpen={setOpen} /> */}

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
              //   "&::-webkit-scrollbar": {
              //   width: "5px",
              // },
              // "&::-webkit-scrollbar-track": {
              //   background: "#fde9b6",
              //   borderRadius: "12px",
              // },
              // "&::-webkit-scrollbar-thumb": {
              //   background: "#005500",
              //   borderRadius: "12px",
              // },
              // "&::-webkit-scrollbar-thumb:hover": {
              //   background: "#555",
              // },
              },
            }}>

                {/* Top Menu Items */}
                <Box sx={{ 
                        mt: 10,
                        bgcolor: "#fde9b6", 
                         overflowY: "auto", // Enable scrolling
                        flexGrow: 1, 
                        padding: "8px 0px 0px 8px",
                        "&::-webkit-scrollbar": {
                          width: "5px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "#fde9b6",
                          borderRadius: "12px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "#005500",
                          borderRadius: "12px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          background: "#555",
                        },
                        }}>
                <List>
                {menuItems.map((item, index) => (
                    <ListItemButton key={index} 
                    sx={{
                        padding: "6px 6px",
                        // bgcolor: selected === item.name ? "#ffc022" : "transparent",
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
                    >{item.icon}</ListItemIcon>
                    {open && <ListItemText primary={item.text} />}
                    </ListItemButton>
                ))}
                </List>

                </Box>

                {/* Bottom Menu Items */}
                <List sx={{ marginTop: "auto",
                    bgcolor: "#fde9b6", 
                    padding: "8px 0px 0px 8px", 
                    mb: 1,
                    position: "sticky",
                    bottom: 0,
                    width: "100%",
                    zIndex: 1000,
                }}>
                {bottomMenuItems.map((item, index) => (
                    <ListItemButton key={index} 
                    sx={{
                        padding: "6px 6px",
                        // bgcolor: selected === item.name ? "#ffc022" : "transparent",
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
                      >{item.icon}</ListItemIcon>
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

export default DepartmentSidebar;



// import { useState } from "react";
// import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import GroupIcon from "@mui/icons-material/Group";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import SettingsIcon from "@mui/icons-material/Settings";
// import LogoutIcon from "@mui/icons-material/Logout";
// import MenuOpenIcon from "@mui/icons-material/MenuOpen";
// import MenuIcon from "@mui/icons-material/Menu";

// const menuItems = [
//   { text: "Dashboard", icon: <DashboardIcon /> },
//   { text: "Member", icon: <GroupIcon /> },
//   { text: "Reports", icon: <BarChartIcon /> },
// ];

// const bottomMenuItems = [
//   { text: "Settings", icon: <SettingsIcon /> },
//   { text: "Logout", icon: <LogoutIcon /> },
// ];

// const DepartmentSidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: isOpen ? 240 : 60,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: isOpen ? 240 : 60,
//           transition: "width 0.3s ease",
//           overflowX: "hidden",
//         },
//       }}
//     >
//       <List>
//         {menuItems.map((item) => (
//           <ListItemButton key={item.text}>
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             {isOpen && <ListItemText primary={item.text} />}
//           </ListItemButton>
//         ))}
//       </List>

//       {/* Bottom Menu */}
//       <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
//         {bottomMenuItems.map((item) => (
//           <ListItemButton key={item.text}>
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             {isOpen && <ListItemText primary={item.text} />}
//           </ListItemButton>
//         ))}

//         {/* Toggle Button */}
//         <ListItemButton onClick={() => setIsOpen(!isOpen)}>
//           <ListItemIcon>
//             {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
//           </ListItemIcon>
//           {isOpen && <ListItemText primary="Collapse" />}
//         </ListItemButton>
//       </List>
//     </Drawer>
//   );
// };

// export default DepartmentSidebar;
