import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import { departments } from "../../data/departments";
import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails";


import AgricultureIcon from "@mui/icons-material/Grass"; // Agriculture
import SchoolIcon from "@mui/icons-material/School"; // Education
import WorkIcon from "@mui/icons-material/Work"; // Labor
import FoodBankIcon from "@mui/icons-material/Fastfood"; // Co-operation & Food
import LocationCityIcon from "@mui/icons-material/LocationCity"; // Town Planning
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Finance
import SupportAgentIcon from "@mui/icons-material/SupportAgent"; // Customer Support
import GavelIcon from "@mui/icons-material/Gavel"; // Legal
import BuildIcon from "@mui/icons-material/Build"; // Support
import LocalPoliceIcon from "@mui/icons-material/LocalPolice"; // Law and Order
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"; // More

const drawerWidth = 200;
const collapsedWidth = 70;

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  // const [selected, setSelected] = useState<string>("Dashboard"); // Default selected menu

  const [selected, setSelected] = useState<string>(
    localStorage.getItem("selectedMenu") || "Dashboard"
  );

  const toggleDrawer = () => {
    setOpen(!open);
  };

// ✅ Define department icons mapping
const departmentIcons: { [key: string]: React.ReactNode } = {
  "Agriculture": <AgricultureIcon />,
  "Education": <SchoolIcon />,
  "Labor": <WorkIcon />,
  "Co-operation & Food": <FoodBankIcon />,
  "Town Planning": <LocationCityIcon />,
  "Finance": <AccountBalanceIcon />,
  "Customer Support": <SupportAgentIcon />,
  "Legal": <GavelIcon />,
  "Support": <BuildIcon />,
  "Fine": <AccountBalanceIcon />, // Change this if needed
  "Law and Order": <LocalPoliceIcon />,
  "More": <MoreHorizIcon />,
};

  const handleSelect = (name: string, route: string) => {
    setSelected(name);
    navigate(route); // Navigate to the selected route
    localStorage.setItem("selectedMenu", name); // ✅ Store selection
    window.scrollTo(0, 0); // 👈 Reset scroll position to top
  };

  // const departmentSubMenus = departments;

  // const departmentSubMenus = departmentEmployeesDetails.map(dept => dept.department);
  const departmentSubMenus = Array.from(
    new Set(departmentEmployeesDetails.map((dept) => dept.department))
  );

  const [deptOpen, setDeptOpen] = useState<boolean>(
    JSON.parse(localStorage.getItem("deptOpen") || "false")
  );

  // useEffect(() => {
  //   const handleScroll = () => {
  //     localStorage.setItem("scrollPosition", JSON.stringify(window.scrollY));
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // useEffect(() => {
  //   const savedScrollPosition = localStorage.getItem("scrollPosition");
  //   if (savedScrollPosition) {
  //     window.scrollTo(0, JSON.parse(savedScrollPosition));
  //   }
  // }, []);


  // useEffect(() => {
  //   localStorage.setItem("deptOpen", JSON.stringify(deptOpen));
  // }, [deptOpen]);

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll position on refresh
  }, []);

  useEffect(() => {
    const storedMenu = localStorage.getItem("selectedMenu");
    localStorage.setItem("deptOpen", JSON.stringify(deptOpen));

    if (storedMenu) {
      setSelected(storedMenu);
    }

  }, [deptOpen]);


  const toggleDeptMenu = () => {
    // setDeptOpen(!deptOpen);
    setDeptOpen((prev) => !prev);
  };




  const topMenuItems = [
    { name: "Dashboard", icon: <DashboardIcon />, route: "/" },
    {
      name: "Department",
      icon: <ApartmentIcon />, route: "/departments", 
      isDropdown: true, // Identifies this menu as a dropdown
    },
    { name: "Task", icon: <AssignmentIcon />, route: "/tasks"  },
    { name: "Report", icon: <BarChartIcon />, route: "/reports" },
  ];

  const bottomMenuItems = [
    { name: "Settings", icon: <SettingsIcon />, route: "/Settings" },
    { name: "Logout", icon: <LogoutIcon />, route: "/Logout" },
  ];

  return (
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
      }}
    >
      {/* Top Menu */}
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
          {topMenuItems.map((item) => (
            <React.Fragment key={item.name}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => (item.isDropdown ? toggleDeptMenu() : handleSelect(item.name, item.route))}
                  sx={{
                    padding: "6px 6px",
                    bgcolor: selected === item.name ? "#ffc022" : "transparent",
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
                  {open && (
                    <>
                      <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: "16px" }} />
                      {item.isDropdown &&
                        (deptOpen ? <ArrowDropUpIcon sx={{ color: "#005500" }} /> : <ArrowDropDownIcon sx={{ color: "#005500" }} />)}
                    </>
                  )}
                </ListItemButton>
              </ListItem>

              {/* Department Submenu */}
                  {item.isDropdown && (
                    <Collapse in={deptOpen} timeout="auto" unmountOnExit>
                      <List
                        component="div"
                        disablePadding
                        sx={{
                          maxHeight: "200px",
                          overflowY: "auto",
                          "&::-webkit-scrollbar": {
                            width: "4px",
                          },
                          "&::-webkit-scrollbar-track": {
                            background: "#fde9b6",
                            borderRadius: "6px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "#005500",
                            borderRadius: "12px",
                          },
                          "&::-webkit-scrollbar-thumb:hover": {
                            background: "#555",
                          },
                        }}
                      >
                        {departmentSubMenus.map((dept) => (
                          <ListItem key={dept} disablePadding>
                            <ListItemButton
                              sx={{
                                pl: 4,
                                padding: "4px 4px 4px 8px",
                                bgcolor: selected === dept ? "#e4bfa7" : "transparent",
                                "&:hover": { bgcolor: "#e4bfa7" },
                                borderRadius: "8px 0px 0px 8px",
                                // margin: "1px 0px 0px 8px",
                                margin: open ? "1px 0px 0px 24px" : "1px 0px 0px 8px", // ✅ Dynamic margin

                              }}
                              onClick={() => handleSelect(dept, `/departments/${dept.toLowerCase()}`)}
                            >
                              {/* ✅ Always show icons on the left */}
                              <ListItemIcon
                                sx={{
                                  color: "#005500",
                                  minWidth: "20%",
                                  "& svg": { fontSize: "20px" },
                                  padding: "6px 6px",
                                }}
                              >
                                {departmentIcons[dept] || <ApartmentIcon />} {/* Show corresponding icon */}
                              </ListItemIcon>

                              {/* ✅ Show text when expanded */}
                              {open && (
                                <ListItemText primary={dept} primaryTypographyProps={{ fontSize: "14px" }} />
                              )}
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}


              {/* Department Submenu (not diplayed when expaned)*/}
              {/* {item.isDropdown && (
                  <Collapse in={deptOpen} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      sx={{
                        maxHeight: "200px",
                        overflowY: "auto",
                        "&::-webkit-scrollbar": {
                          width: "4px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "#fde9b6",
                          borderRadius: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "#005500",
                          borderRadius: "12px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          background: "#555",
                        },
                      }}
                    >
                      {departmentSubMenus.map((dept) => (
                        <ListItem key={dept} disablePadding>
                          <ListItemButton
                            sx={{
                              pl: 4,
                              padding: "4px 4px 4px 8px",
                              bgcolor: selected === dept ? "#e4bfa7" : "transparent",
                              "&:hover": { bgcolor: "#e4bfa7" },
                              borderRadius: "8px 0px 0px 8px",
                              margin: "1px 0px 0px 32px",
                            }}
                            onClick={() => handleSelect(dept, `/departments/${dept.toLowerCase()}`)}
                          >
                            {!open ? (
                              <ListItemIcon
                                sx={{
                                  color: "#005500",
                                  minWidth: "20%",
                                  "& svg": { fontSize: "20px" },
                                  padding: "6px 6px",
                                }}
                              >
                                {departmentIcons[dept] || <ApartmentIcon />} {/* Show corresponding icon 
                              </ListItemIcon>
                            ) : (
                              <ListItemText primary={dept} primaryTypographyProps={{ fontSize: "14px" }} />
                            )}
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )} */}

            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Bottom Menu */}
      <Box sx={{ 
        bgcolor: "#fde9b6", 
        padding: "8px 0px 0px 8px", 
        mb: 1,
        position: "sticky",
        bottom: 0,
        width: "100%",
        zIndex: 1000,
        }}>
        <Divider />
        <List>
          {bottomMenuItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                    onClick={() => handleSelect(item.name, item.route)}
                sx={{
                  padding: "6px 6px",
                  bgcolor: selected === item.name ? "#ffc022" : "transparent",
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
                    position:"sticky"
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: "16px" }} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>

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
  );
};

export default Sidebar;




// import React, { useState, useEffect } from "react"; 
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
//   Divider,
//   Collapse,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ApartmentIcon from "@mui/icons-material/Apartment";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import SettingsIcon from "@mui/icons-material/Settings";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import { departments } from "../../data/departments";

// import AgricultureIcon from "@mui/icons-material/Grass"; // Agriculture
// import SchoolIcon from "@mui/icons-material/School"; // Education
// import WorkIcon from "@mui/icons-material/Work"; // Labor
// import FoodBankIcon from "@mui/icons-material/Fastfood"; // Co-operation & Food
// import LocationCityIcon from "@mui/icons-material/LocationCity"; // Town Planning
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Finance
// import SupportAgentIcon from "@mui/icons-material/SupportAgent"; // Customer Support
// import GavelIcon from "@mui/icons-material/Gavel"; // Legal
// import BuildIcon from "@mui/icons-material/Build"; // Support
// import LocalPoliceIcon from "@mui/icons-material/LocalPolice"; // Law and Order
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz"; // More

// const drawerWidth = 200;
// const collapsedWidth = 70;

// interface SidebarProps {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
//   const navigate = useNavigate();
//   const [selected, setSelected] = useState<string>("Dashboard"); // Default selected menu

//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

// // ✅ Define department icons mapping
// const departmentIcons: { [key: string]: React.ReactNode } = {
//   "Agriculture": <AgricultureIcon />,
//   "Education": <SchoolIcon />,
//   "Labor": <WorkIcon />,
//   "Co-operation & Food": <FoodBankIcon />,
//   "Town Planning": <LocationCityIcon />,
//   "Finance": <AccountBalanceIcon />,
//   "Customer Support": <SupportAgentIcon />,
//   "Legal": <GavelIcon />,
//   "Support": <BuildIcon />,
//   "Fine": <AccountBalanceIcon />, // Change this if needed
//   "Law and Order": <LocalPoliceIcon />,
//   "More": <MoreHorizIcon />,
// };

//   const handleSelect = (name: string, route: string) => {
//     setSelected(name);
//     navigate(route); // Navigate to the selected route
//     window.scrollTo(0, 0); // 👈 Reset scroll position to top
//   };

//   const departmentSubMenus = departments;

//   const [deptOpen, setDeptOpen] = useState<boolean>(
//     JSON.parse(localStorage.getItem("deptOpen") || "false")
//   );

//   useEffect(() => {
//     localStorage.setItem("deptOpen", JSON.stringify(deptOpen));
//   }, [deptOpen]);


//   const toggleDeptMenu = () => {
//     // setDeptOpen(!deptOpen);
//     setDeptOpen((prev) => !prev);
//   };


//   const topMenuItems = [
//     { name: "Dashboard", icon: <DashboardIcon />, route: "/" },
//     {
//       name: "Department",
//       icon: <ApartmentIcon />, route: "/departments", 
//       isDropdown: true, // Identifies this menu as a dropdown
//     },
//     { name: "Task", icon: <AssignmentIcon />, route: "/tasks"  },
//     { name: "Report", icon: <BarChartIcon />, route: "/reports" },
//   ];

//   const bottomMenuItems = [
//     { name: "Settings", icon: <SettingsIcon />, route: "/Settings" },
//     { name: "Logout", icon: <LogoutIcon />, route: "/Logout" },
//   ];

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: open ? drawerWidth : collapsedWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: open ? drawerWidth : collapsedWidth,
//           boxSizing: "border-box",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           transition: "width 0.3s ease-in-out",
//           padding: "8px 0px 0px 8px",
//           zIndex: (theme) => theme.zIndex.appBar - 1,

//           overflowX: "hidden",
//         //   "&::-webkit-scrollbar": {
//         //   width: "5px",
//         // },
//         // "&::-webkit-scrollbar-track": {
//         //   background: "#fde9b6",
//         //   borderRadius: "12px",
//         // },
//         // "&::-webkit-scrollbar-thumb": {
//         //   background: "#005500",
//         //   borderRadius: "12px",
//         // },
//         // "&::-webkit-scrollbar-thumb:hover": {
//         //   background: "#555",
//         // },
//         },
//       }}
//     >
//       {/* Top Menu */}
//       <Box sx={{ 
//         mt: 10,
//         bgcolor: "#fde9b6", 
//          overflowY: "auto", // Enable scrolling
//         flexGrow: 1, 
//         padding: "8px 0px 0px 8px",
//         "&::-webkit-scrollbar": {
//           width: "5px",
//         },
//         "&::-webkit-scrollbar-track": {
//           background: "#fde9b6",
//           borderRadius: "12px",
//         },
//         "&::-webkit-scrollbar-thumb": {
//           background: "#005500",
//           borderRadius: "12px",
//         },
//         "&::-webkit-scrollbar-thumb:hover": {
//           background: "#555",
//         },
//         }}>
//         <List>
//           {topMenuItems.map((item) => (
//             <React.Fragment key={item.name}>
//               <ListItem disablePadding>
//                 <ListItemButton
//                   onClick={() => (item.isDropdown ? toggleDeptMenu() : handleSelect(item.name, item.route))}
//                   sx={{
//                     padding: "6px 6px",
//                     bgcolor: selected === item.name ? "#ffc022" : "transparent",
//                     "&:hover": { bgcolor: "#e4bfa7" },
//                     borderRadius: "8px 0px 0px 8px",
//                     margin: "1px 0px",
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       color: "#005500",
//                       minWidth: "20%",
//                       "& svg": { fontSize: "24px" },
//                       padding: "6px 6px",
//                     }}
//                   >
//                     {item.icon}
//                   </ListItemIcon>
//                   {open && (
//                     <>
//                       <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: "16px" }} />
//                       {item.isDropdown &&
//                         (deptOpen ? <ArrowDropUpIcon sx={{ color: "#005500" }} /> : <ArrowDropDownIcon sx={{ color: "#005500" }} />)}
//                     </>
//                   )}
//                 </ListItemButton>
//               </ListItem>

//               {/* Department Submenu */}
//                   {item.isDropdown && (
//                     <Collapse in={deptOpen} timeout="auto" unmountOnExit>
//                       <List
//                         component="div"
//                         disablePadding
//                         sx={{
//                           maxHeight: "200px",
//                           overflowY: "auto",
//                           "&::-webkit-scrollbar": {
//                             width: "4px",
//                           },
//                           "&::-webkit-scrollbar-track": {
//                             background: "#fde9b6",
//                             borderRadius: "6px",
//                           },
//                           "&::-webkit-scrollbar-thumb": {
//                             background: "#005500",
//                             borderRadius: "12px",
//                           },
//                           "&::-webkit-scrollbar-thumb:hover": {
//                             background: "#555",
//                           },
//                         }}
//                       >
//                         {departmentSubMenus.map((dept) => (
//                           <ListItem key={dept} disablePadding>
//                             <ListItemButton
//                               sx={{
//                                 pl: 4,
//                                 padding: "4px 4px 4px 8px",
//                                 bgcolor: selected === dept ? "#e4bfa7" : "transparent",
//                                 "&:hover": { bgcolor: "#e4bfa7" },
//                                 borderRadius: "8px 0px 0px 8px",
//                                 // margin: "1px 0px 0px 8px",
//                                 margin: open ? "1px 0px 0px 24px" : "1px 0px 0px 8px", // ✅ Dynamic margin

//                               }}
//                               onClick={() => handleSelect(dept, `/departments/${dept.toLowerCase()}`)}
//                             >
//                               {/* ✅ Always show icons on the left */}
//                               <ListItemIcon
//                                 sx={{
//                                   color: "#005500",
//                                   minWidth: "20%",
//                                   "& svg": { fontSize: "20px" },
//                                   padding: "6px 6px",
//                                 }}
//                               >
//                                 {departmentIcons[dept] || <ApartmentIcon />} {/* Show corresponding icon */}
//                               </ListItemIcon>

//                               {/* ✅ Show text when expanded */}
//                               {open && (
//                                 <ListItemText primary={dept} primaryTypographyProps={{ fontSize: "14px" }} />
//                               )}
//                             </ListItemButton>
//                           </ListItem>
//                         ))}
//                       </List>
//                     </Collapse>
//                   )}


//               {/* Department Submenu (not diplayed when expaned)*/}
//               {/* {item.isDropdown && (
//                   <Collapse in={deptOpen} timeout="auto" unmountOnExit>
//                     <List
//                       component="div"
//                       disablePadding
//                       sx={{
//                         maxHeight: "200px",
//                         overflowY: "auto",
//                         "&::-webkit-scrollbar": {
//                           width: "4px",
//                         },
//                         "&::-webkit-scrollbar-track": {
//                           background: "#fde9b6",
//                           borderRadius: "6px",
//                         },
//                         "&::-webkit-scrollbar-thumb": {
//                           background: "#005500",
//                           borderRadius: "12px",
//                         },
//                         "&::-webkit-scrollbar-thumb:hover": {
//                           background: "#555",
//                         },
//                       }}
//                     >
//                       {departmentSubMenus.map((dept) => (
//                         <ListItem key={dept} disablePadding>
//                           <ListItemButton
//                             sx={{
//                               pl: 4,
//                               padding: "4px 4px 4px 8px",
//                               bgcolor: selected === dept ? "#e4bfa7" : "transparent",
//                               "&:hover": { bgcolor: "#e4bfa7" },
//                               borderRadius: "8px 0px 0px 8px",
//                               margin: "1px 0px 0px 32px",
//                             }}
//                             onClick={() => handleSelect(dept, `/departments/${dept.toLowerCase()}`)}
//                           >
//                             {!open ? (
//                               <ListItemIcon
//                                 sx={{
//                                   color: "#005500",
//                                   minWidth: "20%",
//                                   "& svg": { fontSize: "20px" },
//                                   padding: "6px 6px",
//                                 }}
//                               >
//                                 {departmentIcons[dept] || <ApartmentIcon />} {/* Show corresponding icon 
//                               </ListItemIcon>
//                             ) : (
//                               <ListItemText primary={dept} primaryTypographyProps={{ fontSize: "14px" }} />
//                             )}
//                           </ListItemButton>
//                         </ListItem>
//                       ))}
//                     </List>
//                   </Collapse>
//                 )} */}

//             </React.Fragment>
//           ))}
//         </List>
//       </Box>

//       {/* Bottom Menu */}
//       <Box sx={{ 
//         bgcolor: "#fde9b6", 
//         padding: "8px 0px 0px 8px", 
//         mb: 1,
//         position: "sticky",
//         bottom: 0,
//         width: "100%",
//         zIndex: 1000,
//         }}>
//         <Divider />
//         <List>
//           {bottomMenuItems.map((item) => (
//             <ListItem key={item.name} disablePadding>
//               <ListItemButton
//                     onClick={() => handleSelect(item.name, item.route)}
//                 sx={{
//                   padding: "6px 6px",
//                   bgcolor: selected === item.name ? "#ffc022" : "transparent",
//                   "&:hover": { bgcolor: "#e4bfa7" },
//                   borderRadius: "8px 0px 0px 8px",
//                   margin: "1px 0px",
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     color: "#005500",
//                     minWidth: "20%",
//                     "& svg": { fontSize: "24px" },
//                     padding: "6px 6px",
//                     position:"sticky"
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>
//                 {open && <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: "16px" }} />}
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//       </Box>

//       {/* Sidebar Toggle Button */}
//       <Box
//         sx={{
//           bgcolor: "#005500",
//           position: "sticky",
//           bottom: 0,
//           width: "100%",
//           display: "flex",
//           justifyContent: open ? "flex-end" : "center",
//           height: "50px",
//           alignItems: "center",
//         }}
//       >
//         <IconButton onClick={toggleDrawer} sx={{ color: "#fde9b6" }}>
//           {open ? <ArrowBackIosNewIcon /> : <MenuIcon />}
//         </IconButton>
//       </Box>
//     </Drawer>
//   );
// };

// export default Sidebar;
