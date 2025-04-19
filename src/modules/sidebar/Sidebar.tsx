
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
import { departmentData } from '../../data/departmentCategoryData';
import { slugify } from '../../utils/slugify'; // update path accordingly


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
import PersonIcon from '@mui/icons-material/Person';

import AgricultureIcon from '@mui/icons-material/Agriculture';
import PetsIcon from '@mui/icons-material/Pets';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import TerrainIcon from '@mui/icons-material/Terrain';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import WarningIcon from '@mui/icons-material/Warning';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkIcon from '@mui/icons-material/Work';
import FemaleIcon from '@mui/icons-material/Female';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import BoltIcon from '@mui/icons-material/Bolt';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import OpacityIcon from '@mui/icons-material/Opacity';
import BusinessIcon from '@mui/icons-material/Business';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CampaignIcon from '@mui/icons-material/Campaign';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DevicesIcon from '@mui/icons-material/Devices';
import TranslateIcon from '@mui/icons-material/Translate';
import TempleBuddhistIcon from '@mui/icons-material/TempleBuddhist';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


import CategoryIcon from '@mui/icons-material/Category';
import ForestIcon from '@mui/icons-material/Forest';
import ComputerIcon from '@mui/icons-material/Computer';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';



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

const departmentIcons: { [key: string]: React.ReactNode } = {
  "Agriculture - Farmers Welfare Department": <AgricultureIcon />,
  "Animal Husbandry, Dairying, Fisheries and Fishermen Welfare": <PetsIcon />,
  "Co-operation, Food and Consumer Protection Department": <FoodBankIcon />,
  "Natural Resources Department": <TerrainIcon />,
  "Rural Development and Panchayat Raj Department": <EmojiNatureIcon />,
  "Health and Family Welfare Department": <LocalHospitalIcon />,
  "School Education Department": <SchoolIcon />,
  "Higher Education Department": <MenuBookIcon />,
  "Home, Prohibition and Excise Department": <LocalPoliceIcon />,
  "Human Resources Management Department": <PeopleAltIcon />,
  "Law Department": <GavelIcon />,
  "Legislative Assembly Department": <AccountBalanceIcon />,
  "Mudalvarin Mugavari Department": <AccountBalanceIcon />,
  "Public Department": <AccountBalanceIcon />,
  "Public (Elections) Department": <HowToVoteIcon />,
  "Revenue and Disaster Management Department": <WarningIcon />,
  "Adi Dravidar and Tribal Welfare Department": <Diversity1Icon />,
  "BC, MBC & Minorities Welfare Department": <GroupsIcon />,
  "Labour Welfare and Skill Development Department": <WorkIcon />,
  "Social Reforms Department": <FemaleIcon />,
  "Social Welfare and Women Empowerment Department": <FemaleIcon />,
  "Welfare of Differently Abled Persons": <AccessibilityNewIcon />,
  "Youth Welfare and Sports Development Department": <SportsSoccerIcon />,
  "Energy Department": <BoltIcon />,
  "Highways and Minor Ports Department": <DirectionsCarIcon />,
  "Housing and Urban Development Department": <LocationCityIcon />,
  "Municipal Administration and Water Supply Department": <OpacityIcon />,
  "Public Works Department": <BusinessIcon />,
  "Transport Department": <DirectionsCarIcon />,
  "Water Resources Department": <OpacityIcon />,
  "Commercial Taxes and Registration Department": <LocalAtmIcon />,
  "Finance Department": <AccountBalanceIcon />,
  "Planning, Development and Special Initiatives Department": <BarChartIcon />,
  "Special Programme Implementation": <BarChartIcon />,
  "Handlooms, Handicrafts, Textiles and Khadi Department": <StorefrontIcon />,
  "Industries, Investment Promotion & Commerce Department": <BusinessIcon />,
  "Information Technology and Digital Services Department": <DevicesIcon />,
  "Micro, Small and Medium Enterprises Department": <StorefrontIcon />,
  "Environment, Climate Change and Forests Department": <ForestIcon />,
  "Tamil Development and Information Department": <TranslateIcon />,
  "Tourism, Culture and Religious Endowments Department": <TempleBuddhistIcon />,
  "default": <MoreHorizIcon />
};

const categoryIcons: { [key: string]: React.ReactNode } = {
  "Agriculture, Rural & Natural Resources": <AgricultureIcon />,
  "Health & Education": <SchoolIcon />,
  "Administration, Law & Governance": <GavelIcon />,
  "Welfare & Social Services": <EmojiPeopleIcon />,
  "Infrastructure & Energy": <LocationCityIcon />,
  "Finance, Economy & Planning": <AccountBalanceIcon />,
  "Industries, IT & Commerce": <ComputerIcon />,
  "Culture, Environment & Tourism": <ForestIcon />,
};


  const handleSelect = (name: string, route: string) => {
    setSelected(name);
    navigate(route); // Navigate to the selected route
    localStorage.setItem("selectedMenu", name); // ✅ Store selection
    window.scrollTo(0, 0); // 👈 Reset scroll position to top
  };

  // const departmentSubMenus = departments;

  // const departmentSubMenus = departmentEmployeesDetails.map(dept => dept.department);
  // const departmentSubMenus = Array.from(
  //   new Set(departmentEmployeesDetails.map((dept) => dept.department))
  // );

  const departmentSubMenus = departmentData.flatMap((category) => category.departments);


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

  const [categoryOpen, setCategoryOpen] = useState<boolean>(
    JSON.parse(localStorage.getItem("categoryOpen") || "false")
  );
  
  const toggleCategoryMenu = () => {
    setCategoryOpen((prev) => !prev);
  };
  

  useEffect(() => {
    const storedMenu = localStorage.getItem("selectedMenu");
    localStorage.setItem("deptOpen", JSON.stringify(deptOpen));
    localStorage.setItem("categoryOpen", JSON.stringify(categoryOpen));


    if (storedMenu) {
      setSelected(storedMenu);
    }

  }, [deptOpen, categoryOpen]);


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
    { 
      name: "Members", 
      icon: <PersonIcon />, // You can choose a different icon if needed
      route: "/members" 
    },
  
    { name: "Task", icon: <AssignmentIcon />, route: "/tasks"  },
    { name: "Report", icon: <BarChartIcon />, route: "/reports" },
    { name: "Category", icon: <CategoryIcon />, route: "/tasks", isCategoryDropdown: true },
  ];

  const bottomMenuItems = [
    { name: "Settings", icon: <SettingsIcon />, route: "/Settings" },
    { name: "Logout", icon: <LogoutIcon />, route: "/Logout" },
  ];

  // const categoryData = Array.from(
  //   new Set(departmentEmployeesDetails.map(emp => emp.category))
  // ).map(category => ({ category }));
  

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
                  // onClick={() => (item.isDropdown ? toggleDeptMenu() : handleSelect(item.name, item.route))}
                    onClick={() => {
                      if (item.isDropdown) {
                        toggleDeptMenu();
                      } else if (item.isCategoryDropdown) {
                        toggleCategoryMenu();
                      } else {
                        handleSelect(item.name, item.route);
                      }
                    }}
                  sx={{
                    padding: "6px 6px",
                    bgcolor: selected === item.name ? "#ffc022" : "transparent",
                    "&:hover": { bgcolor: "#d1e7dd" },
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
                        {item.isCategoryDropdown &&
                          (categoryOpen ? <ArrowDropUpIcon sx={{ color: "#005500" }} /> : <ArrowDropDownIcon sx={{ color: "#005500" }} />)}
                      </>
                    )}

                  {/* {open && (
                    <>
                      <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: "16px" }} />
                      {item.isDropdown &&
                        (deptOpen ? <ArrowDropUpIcon sx={{ color: "#005500" }} /> : <ArrowDropDownIcon sx={{ color: "#005500" }} />)}
                    </>
                  )} */}
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
                          overflowX: "auto",
                          "&::-webkit-scrollbar": {
                            width: "4px",
                            height: "6px",
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
                          // <ListItem key={dept} disablePadding>
                          <ListItem key={dept.id} disablePadding>

                            <ListItemButton
                              sx={{
                                pl: 4,
                                padding: "4px 4px 4px 8px",
                                // bgcolor: selected === dept ? "#e4bfa7" : "transparent",
                                bgcolor: selected === dept.name ? "#e4bfa7" : "transparent",
                                "&:hover": { bgcolor: "#d1e7dd" },
                                borderRadius: "8px 0px 0px 8px",
                                // margin: "1px 0px 0px 8px",
                                margin: open ? "1px 0px 0px 24px" : "1px 0px 0px 8px", // ✅ Dynamic margin

                              }}
                              // onClick={() => handleSelect(dept, `/departments/${dept.toLowerCase()}`)}
                              // onClick={() => handleSelect(dept.name, `/departments/${dept.name.toLowerCase()}`)}
                              onClick={() => handleSelect(dept.name, `/departments/${slugify(dept.name)}`)}
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
                                {/* {departmentIcons[dept] || <ApartmentIcon />} Show corresponding icon */}
                                {departmentIcons[dept.name] || <ApartmentIcon />}
                              </ListItemIcon>

                              {/* ✅ Show text when expanded */}
                              {open && (
                                // <ListItemText primary={dept} primaryTypographyProps={{ fontSize: "14px" }} />
                                <ListItemText primary={dept.name} primaryTypographyProps={{ fontSize: "14px" }} />

                              )}
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}

                {item.isCategoryDropdown && (
                <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
                  <List
                        component="div"
                        disablePadding
                        sx={{
                          maxHeight: "200px",
                          overflowY: "auto",
                          overflowX: "auto",
                          "&::-webkit-scrollbar": {
                            width: "4px",
                            height: "6px",
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
                    {departmentData.map((categoryData, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton
                          sx={{
                            pl: 4,
                            padding: "4px 4px 4px 8px",
                            bgcolor: selected === categoryData.category ? "#e4bfa7" : "transparent",
                            "&:hover": { bgcolor: "#d1e7dd" },
                            borderRadius: "8px 0px 0px 8px",
                            margin: open ? "1px 0px 0px 24px" : "1px 0px 0px 8px",
                          }}
                          // onClick={() => handleSelect(categoryData.category, `/categories/${categoryData.category.toLowerCase()}`)}

                          // onClick={() => navigate(`/category/${encodeURIComponent(categoryData.category)}`)}
                          onClick={() => navigate(`/category/${slugify(categoryData.category)}`)}
                          >
                          <ListItemIcon 
                                sx={{
                                  color: "#005500",
                                  minWidth: "20%",
                                  "& svg": { fontSize: "20px" },
                                  padding: "6px 6px",
                                }}>
                            {categoryIcons[categoryData.category] || <MoreHorizIcon />}
                          </ListItemIcon>
                          {open && (
                            <ListItemText primary={categoryData.category} primaryTypographyProps={{ fontSize: "14px" }} />
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
                  "&:hover": { bgcolor: "#d1e7dd" },
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
// // import { departments } from "../../data/departments";
// import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails";


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
// import PersonIcon from '@mui/icons-material/Person';
// import CategoryIcon from '@mui/icons-material/Category';

// const drawerWidth = 200;
// const collapsedWidth = 70;

// interface SidebarProps {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
//   const navigate = useNavigate();
//   // const [selected, setSelected] = useState<string>("Dashboard"); // Default selected menu

//   const [selected, setSelected] = useState<string>(
//     localStorage.getItem("selectedMenu") || "Dashboard"
//   );

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
//     localStorage.setItem("selectedMenu", name); // ✅ Store selection
//     window.scrollTo(0, 0); // 👈 Reset scroll position to top
//   };

//   // const departmentSubMenus = departments;

//   // const departmentSubMenus = departmentEmployeesDetails.map(dept => dept.department);
//   const departmentSubMenus = Array.from(
//     new Set(departmentEmployeesDetails.map((dept) => dept.department))
//   );

//   const [deptOpen, setDeptOpen] = useState<boolean>(
//     JSON.parse(localStorage.getItem("deptOpen") || "false")
//   );

//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     localStorage.setItem("scrollPosition", JSON.stringify(window.scrollY));
//   //   };

//   //   window.addEventListener("scroll", handleScroll);
//   //   return () => {
//   //     window.removeEventListener("scroll", handleScroll);
//   //   };
//   // }, []);

//   // useEffect(() => {
//   //   const savedScrollPosition = localStorage.getItem("scrollPosition");
//   //   if (savedScrollPosition) {
//   //     window.scrollTo(0, JSON.parse(savedScrollPosition));
//   //   }
//   // }, []);


//   // useEffect(() => {
//   //   localStorage.setItem("deptOpen", JSON.stringify(deptOpen));
//   // }, [deptOpen]);

//   useEffect(() => {
//     window.scrollTo(0, 0); // Reset scroll position on refresh
//   }, []);

//   useEffect(() => {
//     const storedMenu = localStorage.getItem("selectedMenu");
//     localStorage.setItem("deptOpen", JSON.stringify(deptOpen));

//     if (storedMenu) {
//       setSelected(storedMenu);
//     }

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
//     { 
//       name: "Members", 
//       icon: <PersonIcon />, // You can choose a different icon if needed
//       route: "/members" 
//     },
  
//     { name: "Task", icon: <AssignmentIcon />, route: "/tasks"  },
//     { name: "Report", icon: <BarChartIcon />, route: "/reports" },
//     { name: "Category", icon: <CategoryIcon />, route: "/reports" },
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




// {/* <Box>
//   <Typography variant="subtitle2" sx={{ px: 2, mt: 2, fontWeight: 'bold', color: 'gray' }}>
//     Categories
//   </Typography>
//   {departmentData.map((categoryData, index) => (
//     <Box key={index}>
//       <ListItemButton onClick={() => handleToggleCategory(index)}>
//         <ListItemIcon>
//           <CategoryIcon />
//         </ListItemIcon>
//         <ListItemText primary={categoryData.category} />
//         {openCategoryIndex === index ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={openCategoryIndex === index} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           {categoryData.departments.map((dept) => (
//             <ListItemButton key={dept.id} sx={{ pl: 4 }}>
//               <ListItemIcon>
//                 <ApartmentIcon />
//               </ListItemIcon>
//               <ListItemText primary={dept.name} />
//             </ListItemButton>
//           ))}
//         </List>
//       </Collapse>
//     </Box>
//   ))}
// </Box> */}

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
// // import { departments } from "../../data/departments";
// import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails";


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
// import PersonIcon from '@mui/icons-material/Person';

// const drawerWidth = 200;
// const collapsedWidth = 70;

// interface SidebarProps {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
//   const navigate = useNavigate();
//   // const [selected, setSelected] = useState<string>("Dashboard"); // Default selected menu

//   const [selected, setSelected] = useState<string>(
//     localStorage.getItem("selectedMenu") || "Dashboard"
//   );

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
//     localStorage.setItem("selectedMenu", name); // ✅ Store selection
//     window.scrollTo(0, 0); // 👈 Reset scroll position to top
//   };

//   // const departmentSubMenus = departments;

//   // const departmentSubMenus = departmentEmployeesDetails.map(dept => dept.department);
//   const departmentSubMenus = Array.from(
//     new Set(departmentEmployeesDetails.map((dept) => dept.department))
//   );

//   const [deptOpen, setDeptOpen] = useState<boolean>(
//     JSON.parse(localStorage.getItem("deptOpen") || "false")
//   );

//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     localStorage.setItem("scrollPosition", JSON.stringify(window.scrollY));
//   //   };

//   //   window.addEventListener("scroll", handleScroll);
//   //   return () => {
//   //     window.removeEventListener("scroll", handleScroll);
//   //   };
//   // }, []);

//   // useEffect(() => {
//   //   const savedScrollPosition = localStorage.getItem("scrollPosition");
//   //   if (savedScrollPosition) {
//   //     window.scrollTo(0, JSON.parse(savedScrollPosition));
//   //   }
//   // }, []);


//   // useEffect(() => {
//   //   localStorage.setItem("deptOpen", JSON.stringify(deptOpen));
//   // }, [deptOpen]);

//   useEffect(() => {
//     window.scrollTo(0, 0); // Reset scroll position on refresh
//   }, []);

//   useEffect(() => {
//     const storedMenu = localStorage.getItem("selectedMenu");
//     localStorage.setItem("deptOpen", JSON.stringify(deptOpen));

//     if (storedMenu) {
//       setSelected(storedMenu);
//     }

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
//     { 
//       name: "Members", 
//       icon: <PersonIcon />, // You can choose a different icon if needed
//       route: "/members" 
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



////////// old codes ///////////////////

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
// // import { departments } from "../../data/departments";
// import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails";


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
//   // const [selected, setSelected] = useState<string>("Dashboard"); // Default selected menu

//   const [selected, setSelected] = useState<string>(
//     localStorage.getItem("selectedMenu") || "Dashboard"
//   );

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
//     localStorage.setItem("selectedMenu", name); // ✅ Store selection
//     window.scrollTo(0, 0); // 👈 Reset scroll position to top
//   };

//   // const departmentSubMenus = departments;

//   // const departmentSubMenus = departmentEmployeesDetails.map(dept => dept.department);
//   const departmentSubMenus = Array.from(
//     new Set(departmentEmployeesDetails.map((dept) => dept.department))
//   );

//   const [deptOpen, setDeptOpen] = useState<boolean>(
//     JSON.parse(localStorage.getItem("deptOpen") || "false")
//   );

//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     localStorage.setItem("scrollPosition", JSON.stringify(window.scrollY));
//   //   };

//   //   window.addEventListener("scroll", handleScroll);
//   //   return () => {
//   //     window.removeEventListener("scroll", handleScroll);
//   //   };
//   // }, []);

//   // useEffect(() => {
//   //   const savedScrollPosition = localStorage.getItem("scrollPosition");
//   //   if (savedScrollPosition) {
//   //     window.scrollTo(0, JSON.parse(savedScrollPosition));
//   //   }
//   // }, []);


//   // useEffect(() => {
//   //   localStorage.setItem("deptOpen", JSON.stringify(deptOpen));
//   // }, [deptOpen]);

//   useEffect(() => {
//     window.scrollTo(0, 0); // Reset scroll position on refresh
//   }, []);

//   useEffect(() => {
//     const storedMenu = localStorage.getItem("selectedMenu");
//     localStorage.setItem("deptOpen", JSON.stringify(deptOpen));

//     if (storedMenu) {
//       setSelected(storedMenu);
//     }

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
