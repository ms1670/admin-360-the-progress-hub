import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MailIcon from "@mui/icons-material/Mail";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import logo from "../../assets/admin-360-logo.jpg";
import { useNavigate } from "react-router-dom";


const SearchBar = styled(Box)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "white",
  padding: "4px 8px",
  borderRadius: "4px",
  width: "300px",
});

interface TopbarProps {
    position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
    departmentName?: string; // ✅ Add departmentName prop
  }
  
const Topbar: React.FC<TopbarProps> = ({ position = "fixed", departmentName  }) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();


  const handleIconClick = (icon: string, event?: React.MouseEvent<HTMLDivElement>) => {
    if (icon === "profile") {
      setAnchorEl(event?.currentTarget || null);
    }
    setSelectedIcon(selectedIcon === icon ? null : icon);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIcon(null);
  };
  
    const handleLogout = () => {
        localStorage.removeItem("token"); // 🟢 Remove the JWT token
        navigate("/login"); // 🔄 Redirect to Login Page
    };

  return (
    <AppBar position={position} sx={{ backgroundColor: "#ffc022", boxShadow: "none", height: "80px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", height: "100%" }}>
        {/* ✅ Left Section (Logo & Name) */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Admin 360" style={{ height: "40px", marginRight: "10px" }} />
          <Typography variant="h6" sx={{ color: "#005500", fontWeight: "bold" }}>Admin 360</Typography>
        </Box>

        {/* ✅ Center Section (Search Bar) */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SearchBar sx={{ backgroundColor: "#fde9b6", borderRadius: "32px", padding: "2px", width: "300px", height: "40px" }}>
            <InputBase placeholder="Search..." sx={{ flex: 1, padding: "4px 12px" }} />
            <Box sx={{ backgroundColor: "#005500", borderRadius: "0px 32px 32px 0px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0px 12px" }}>
              <SearchIcon sx={{ color: "#fde9b6" }} />
            </Box>
          </SearchBar>
        </Box>

        {/* ✅ Right Section (Icons & Profile) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* 🔹 Mail & Notification Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* 📧 Mail Icon */}
            <IconButton
              onClick={() => handleIconClick("mail")}
              sx={{
                border: `2px solid #fde9b6`,
                backgroundColor: selectedIcon === "mail" ? "#005500" : "#fde9b6",
                borderRadius: "24%",
                padding: "8px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: selectedIcon === "mail" ? "#005500" : "#e4bfa7",
                  "& svg": { color: selectedIcon === "mail" ? "#fde9b6" : "#005500" },
                  boxShadow: selectedIcon === "mail" ? "none" : "0px 2px 8px rgba(0, 85, 0, 0.3)",
                },
              }}
            >
              {selectedIcon === "mail" ? <MailIcon sx={{ color: "#fde9b6" }} /> : <MailOutlineIcon sx={{ color: "#005500" }} />}
            </IconButton>

            {/* 🔔 Notification Icon */}
            <IconButton
              onClick={() => handleIconClick("notification")}
              sx={{
                border: `2px solid #fde9b6`,
                backgroundColor: selectedIcon === "notification" ? "#005500" : "#fde9b6",
                borderRadius: "24%",
                padding: "8px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: selectedIcon === "notification" ? "#005500" : "#e4bfa7",
                  "& svg": { color: selectedIcon === "notification" ? "#fde9b6" : "#005500" },
                  boxShadow: selectedIcon === "notification" ? "none" : "0px 2px 8px rgba(0, 85, 0, 0.3)",
                },
              }}
            >
              {selectedIcon === "notification" ? <NotificationsIcon sx={{ color: "#fde9b6" }} /> : <NotificationsOutlinedIcon sx={{ color: "#005500" }} />}
            </IconButton>
          </Box>

          {/* 🔹 Profile Section with Dropdown Menu */}
          <Box
            sx={{
              border: `2px solid #fde9b6`,
              backgroundColor: selectedIcon === "profile" ? "#005500" : "#fde9b6",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              padding: "16px 16px",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: selectedIcon === "profile" ? "#005500" : "#e4bfa7",
                "& svg": { color: selectedIcon === "profile" ? "#fde9b6" : "#005500" },
                "& .profile-text": { color: selectedIcon === "profile" ? "#fde9b6" : "#005500" },
                boxShadow: selectedIcon === "profile" ? "none" : "0px 4px 10px rgba(0, 85, 0, 0.3)",
              },
            }}
            onClick={(event) => handleIconClick("profile", event)}
          >
            {selectedIcon === "profile" ? <AccountCircleIcon sx={{ color: "#fde9b6" }} /> : <AccountCircleOutlinedIcon sx={{ color: "#005500" }} />}
            <Typography variant="body1" className="profile-text" sx={{ color: selectedIcon === "profile" ? "#fde9b6" : "#005500", fontWeight: "bold" }}>
            {departmentName ? departmentName : "Admin"} 
            </Typography>

          </Box>

          {/* 🔽 Profile Dropdown Menu */}
          <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                    mt: 1,
                    width: "200px", // ✅ Set fixed width for dropdown
                    "& .MuiPaper-root": {
                    width: "200px", // ✅ Ensure the dropdown maintains the width
                    borderRadius: "8px", // ✅ Rounded dropdown corners

                    },
                }}
                >
                <MenuItem
                    sx={{
                        borderRadius:"8px",
                        margin:"2px 8px",
                    "&:hover": {
                        backgroundColor: "#e4bfa7", // Hover color from theme
                        // padding: "12px 24px", // ✅ Increased hover padding
                    },
                    }}
                    onClick={handleClose}
                >
                    Edit Profile
                </MenuItem>
                <MenuItem
                    sx={{
                        borderRadius:"8px",
                        margin:"2px 8px",
                    "&:hover": {
                        backgroundColor: "#e4bfa7",
                    },
                    }}
                    onClick={handleClose}
                >
                    Settings
                </MenuItem>
                <MenuItem
                    sx={{
                        borderRadius: "8px",
                        margin: "2px 8px",
                        "&:hover": {
                        backgroundColor: "#e4bfa7",
                        },
                    }}
                    onClick={handleLogout} // 🔥 Call handleLogout function on click
                    >
                    Logout
                    </MenuItem>
                </Menu>


        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;


// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   IconButton,
//   InputBase,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import MailIcon from "@mui/icons-material/Mail";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import logo from "../../assets/admin-360-logo.jpg";
// import { useNavigate } from "react-router-dom";


// const SearchBar = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   backgroundColor: "white",
//   padding: "4px 8px",
//   borderRadius: "4px",
//   width: "300px",
// });

// interface TopbarProps {
//   position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
// }

// const Topbar: React.FC<TopbarProps> = ({ position = "fixed" }) => {
//   const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   const navigate = useNavigate();


//   const handleIconClick = (icon: string, event?: React.MouseEvent<HTMLDivElement>) => {
//     if (icon === "profile") {
//       setAnchorEl(event?.currentTarget || null);
//     }
//     setSelectedIcon(selectedIcon === icon ? null : icon);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setSelectedIcon(null);
//   };
  
//     const handleLogout = () => {
//         localStorage.removeItem("token"); // 🟢 Remove the JWT token
//         navigate("/login"); // 🔄 Redirect to Login Page
//     };

//   return (
//     <AppBar position={position} sx={{ backgroundColor: "#ffc022", boxShadow: "none", height: "80px" }}>
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between", height: "100%" }}>
//         {/* ✅ Left Section (Logo & Name) */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <img src={logo} alt="Admin 360" style={{ height: "40px", marginRight: "10px" }} />
//           <Typography variant="h6" sx={{ color: "#005500", fontWeight: "bold" }}>Admin 360</Typography>
//         </Box>

//         {/* ✅ Center Section (Search Bar) */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <SearchBar sx={{ backgroundColor: "#fde9b6", borderRadius: "32px", padding: "2px", width: "300px", height: "40px" }}>
//             <InputBase placeholder="Search..." sx={{ flex: 1, padding: "4px 12px" }} />
//             <Box sx={{ backgroundColor: "#005500", borderRadius: "0px 32px 32px 0px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0px 12px" }}>
//               <SearchIcon sx={{ color: "#fde9b6" }} />
//             </Box>
//           </SearchBar>
//         </Box>

//         {/* ✅ Right Section (Icons & Profile) */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
//           {/* 🔹 Mail & Notification Icons */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             {/* 📧 Mail Icon */}
//             <IconButton
//               onClick={() => handleIconClick("mail")}
//               sx={{
//                 border: `2px solid #fde9b6`,
//                 backgroundColor: selectedIcon === "mail" ? "#005500" : "#fde9b6",
//                 borderRadius: "24%",
//                 padding: "8px",
//                 transition: "all 0.3s ease-in-out",
//                 "&:hover": {
//                   backgroundColor: selectedIcon === "mail" ? "#005500" : "#e4bfa7",
//                   "& svg": { color: selectedIcon === "mail" ? "#fde9b6" : "#005500" },
//                   boxShadow: selectedIcon === "mail" ? "none" : "0px 2px 8px rgba(0, 85, 0, 0.3)",
//                 },
//               }}
//             >
//               {selectedIcon === "mail" ? <MailIcon sx={{ color: "#fde9b6" }} /> : <MailOutlineIcon sx={{ color: "#005500" }} />}
//             </IconButton>

//             {/* 🔔 Notification Icon */}
//             <IconButton
//               onClick={() => handleIconClick("notification")}
//               sx={{
//                 border: `2px solid #fde9b6`,
//                 backgroundColor: selectedIcon === "notification" ? "#005500" : "#fde9b6",
//                 borderRadius: "24%",
//                 padding: "8px",
//                 transition: "all 0.3s ease-in-out",
//                 "&:hover": {
//                   backgroundColor: selectedIcon === "notification" ? "#005500" : "#e4bfa7",
//                   "& svg": { color: selectedIcon === "notification" ? "#fde9b6" : "#005500" },
//                   boxShadow: selectedIcon === "notification" ? "none" : "0px 2px 8px rgba(0, 85, 0, 0.3)",
//                 },
//               }}
//             >
//               {selectedIcon === "notification" ? <NotificationsIcon sx={{ color: "#fde9b6" }} /> : <NotificationsOutlinedIcon sx={{ color: "#005500" }} />}
//             </IconButton>
//           </Box>

//           {/* 🔹 Profile Section with Dropdown Menu */}
//           <Box
//             sx={{
//               border: `2px solid #fde9b6`,
//               backgroundColor: selectedIcon === "profile" ? "#005500" : "#fde9b6",
//               borderRadius: "12px",
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               padding: "16px 16px",
//               cursor: "pointer",
//               transition: "all 0.3s ease-in-out",
//               "&:hover": {
//                 backgroundColor: selectedIcon === "profile" ? "#005500" : "#e4bfa7",
//                 "& svg": { color: selectedIcon === "profile" ? "#fde9b6" : "#005500" },
//                 "& .profile-text": { color: selectedIcon === "profile" ? "#fde9b6" : "#005500" },
//                 boxShadow: selectedIcon === "profile" ? "none" : "0px 4px 10px rgba(0, 85, 0, 0.3)",
//               },
//             }}
//             onClick={(event) => handleIconClick("profile", event)}
//           >
//             {selectedIcon === "profile" ? <AccountCircleIcon sx={{ color: "#fde9b6" }} /> : <AccountCircleOutlinedIcon sx={{ color: "#005500" }} />}
//             <Typography variant="body1" className="profile-text" sx={{ color: selectedIcon === "profile" ? "#fde9b6" : "#005500", fontWeight: "bold" }}>
//               Profile
//             </Typography>
//           </Box>

//           {/* 🔽 Profile Dropdown Menu */}
//           <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//                 sx={{
//                     mt: 1,
//                     width: "200px", // ✅ Set fixed width for dropdown
//                     "& .MuiPaper-root": {
//                     width: "200px", // ✅ Ensure the dropdown maintains the width
//                     borderRadius: "8px", // ✅ Rounded dropdown corners

//                     },
//                 }}
//                 >
//                 <MenuItem
//                     sx={{
//                         borderRadius:"8px",
//                         margin:"2px 8px",
//                     "&:hover": {
//                         backgroundColor: "#e4bfa7", // Hover color from theme
//                         // padding: "12px 24px", // ✅ Increased hover padding
//                     },
//                     }}
//                     onClick={handleClose}
//                 >
//                     Edit Profile
//                 </MenuItem>
//                 <MenuItem
//                     sx={{
//                         borderRadius:"8px",
//                         margin:"2px 8px",
//                     "&:hover": {
//                         backgroundColor: "#e4bfa7",
//                     },
//                     }}
//                     onClick={handleClose}
//                 >
//                     Settings
//                 </MenuItem>
//                 <MenuItem
//                     sx={{
//                         borderRadius: "8px",
//                         margin: "2px 8px",
//                         "&:hover": {
//                         backgroundColor: "#e4bfa7",
//                         },
//                     }}
//                     onClick={handleLogout} // 🔥 Call handleLogout function on click
//                     >
//                     Logout
//                     </MenuItem>
//                 </Menu>


//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Topbar;


// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   IconButton,
//   InputBase,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import MailIcon from "@mui/icons-material/Mail";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import logo from "../../assets/admin-360-logo.jpg";

// const SearchBar = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   backgroundColor: "white",
//   padding: "4px 8px",
//   borderRadius: "4px",
//   width: "300px",
// });

// interface TopbarProps {
//   position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
// }

// const Topbar: React.FC<TopbarProps> = ({ position = "fixed" }) => {
//   const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

//   const handleIconClick = (icon: string) => {
//     setSelectedIcon(selectedIcon === icon ? null : icon);
//   };

//   return (
//     <AppBar
//       position={position}
//       sx={{ backgroundColor: "#ffc022", boxShadow: "none", height: "80px" }}
//     >
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between", height: "100%" }}>
//         {/* ✅ Left Section (Logo & Name) */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <img
//             src={logo}
//             alt="Admin 360"
//             style={{ height: "40px", marginRight: "10px" }}
//           />
//           <Typography variant="h6" sx={{ color: "#005500", fontWeight: "bold" }}>
//             Admin 360
//           </Typography>
//         </Box>

//         {/* ✅ Center Section (Search Bar) */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <SearchBar
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               backgroundColor: "#fde9b6",
//               borderRadius: "32px",
//               padding: "2px 2px",
//               width: "300px",
//               height: "40px",
//             }}
//           >
//             <InputBase
//               placeholder="Search..."
//               sx={{ flex: 1, padding: "4px 12px" }}
//             />
//             <Box
//               sx={{
//                 backgroundColor: "#005500",
//                 borderRadius: "0px 32px 32px 0px",
//                 height: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 padding: "0px 12px",
//               }}
//             >
//               <SearchIcon sx={{ color: "#fde9b6" }} />
//             </Box>
//           </SearchBar>
//         </Box>

//          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>

//                 {/* 🔹 Group 1: Mail & Notification with Border & Background */}
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     {/* 📧 Mail Icon */}
//                     <IconButton
//                         onClick={() => handleIconClick("mail")}
//                         sx={{
//                             border: `2px solid #fde9b6`,
//                             backgroundColor: selectedIcon === "mail" ? "#005500" : "#fde9b6",
//                             borderRadius: "24%",
//                             padding: "8px",
//                             transition: "all 0.3s ease-in-out",
//                             "&:hover": {
//                                 backgroundColor: selectedIcon === "mail" ? "#005500" : "#e4bfa7", // ✅ No hover when selected
//                                 "& svg": { color: selectedIcon === "mail" ? "#fde9b6" : "#005500" }, // ✅ No hover when selected
//                                 boxShadow: selectedIcon === "mail" 
//                                     ? "none" 
//                                     : "0px 2px 8px rgba(0, 85, 0, 0.3)", // ✅ Shadow effect on hover
//                             },
//                         }}
//                     >
//                         {selectedIcon === "mail" ? (
//                             <MailIcon sx={{ color: "#fde9b6" }} />
//                         ) : (
//                             <MailOutlineIcon sx={{ color: "#005500" }} />
//                         )}
//                     </IconButton>

//                     {/* 🔔 Notification Icon (Fixed) */}
//                     <IconButton
//                         onClick={() => handleIconClick("notification")}
//                         sx={{
//                             border: `2px solid #fde9b6`,
//                             backgroundColor: selectedIcon === "notification" ? "#005500" : "#fde9b6",
//                             borderRadius: "24%",
//                             padding: "8px",
//                             transition: "all 0.3s ease-in-out",
//                             "&:hover": {
//                                 backgroundColor: selectedIcon === "notification" ? "#005500" : "#e4bfa7", // ✅ No hover when selected
//                                 "& svg": { color: selectedIcon === "notification" ? "#fde9b6" : "#005500" }, // ✅ No hover when selected
//                                 boxShadow: selectedIcon === "notification" 
//                                     ? "none" 
//                                     : "0px 2px 8px rgba(0, 85, 0, 0.3)", // ✅ Shadow effect on hover
//                             },
//                         }}
//                     >
//                         {selectedIcon === "notification" ? (
//                             <NotificationsIcon sx={{ color: "#fde9b6" }} />
//                         ) : (
//                             <NotificationsOutlinedIcon sx={{ color: "#005500" }} />
//                         )}
//                     </IconButton>
//                 </Box>


//                 {/* 🔹 Group 2: Profile Icon & Name */}
//                 <Box
//                     sx={{
//                         border: `2px solid #fde9b6`, // Third color border
//                         backgroundColor: selectedIcon === "profile" ? "#005500" : "#fde9b6",
//                         borderRadius: "12px",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                         padding: "16px 16px",
//                         cursor: "pointer",
//                         "&:hover": {
//                         backgroundColor: selectedIcon === "profile" ? "#005500" : "#e4bfa7", // ✅ No hover when selected
//                         "& svg": { color: selectedIcon === "profile" ? "#fde9b6" : "#005500" }, // ✅ No hover when selected
//                         "& .profile-text": { color: selectedIcon === "profile" ? "#fde9b6" : "#005500" }, // ✅ No hover when selected
//                         boxShadow: selectedIcon === "profile" 
//                         ? "none" 
//                         : "0px 4px 10px rgba(0, 85, 0, 0.3)", // ✅ Shadow effect on hover
//                         },
//                     }}
//                     onClick={() => handleIconClick("profile")} // ✅ Whole section is clickable
//                     >
//                     {selectedIcon === "profile" ? (
//                         <AccountCircleIcon sx={{ color: "#fde9b6" }} />
//                     ) : (
//                         <AccountCircleOutlinedIcon sx={{ color: "#005500" }} />
//                     )}
//                     <Typography
//                         variant="body1"
//                         className="profile-text"
//                         sx={{
//                         color: selectedIcon === "profile" ? "#fde9b6" : "#005500",
//                         fontWeight: "bold",
//                         }}
//                     >
//                         Profile Name
//                     </Typography>
//                 </Box>

//         </Box>

//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Topbar;
