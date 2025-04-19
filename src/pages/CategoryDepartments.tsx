
import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { useState } from "react";
import Sidebar from "../modules/sidebar/Sidebar"; // Ensure the correct import path
import Topbar from "../modules/topbar/Topbar"; // Ensure the correct import path
import { departmentData } from "../data/departmentCategoryData";
import { Department, DepartmentCategory } from '../data/departmentCategoryData';
import { slugify } from "../utils/slugify"; // ✅


const CategoryDepartments = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(true);

//   const categoryDetails = departmentData.find(
//     (cat) => cat.category === decodeURIComponent(categoryName ?? "")
//   );

  // For categoryDetails
  const categoryDetails = departmentData.find(
    (cat: DepartmentCategory) => slugify(cat.category) === categoryName // ✅ compare slugified form
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* ✅ Topbar Component */}
      <Topbar />

      {/* ✅ Add marginTop to prevent content overlap */}
      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
        {/* Sidebar Component */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            transition: "margin-left 0.3s ease-in-out",
            // marginLeft: sidebarOpen ? ${drawerWidth}px : ${collapsedWidth}px,
            // ml: sidebarOpen ? ${drawerWidth}px : ${collapsedWidth}px, // ✅ Sidebar Offset
           // marginLeft:"200px",
            padding: "16px",
          }}
        >
                    <Typography variant="h5" gutterBottom>
                    {categoryDetails?.category} - Departments
                </Typography>

                <Paper elevation={3} sx={{ padding: 2 }}>
                    <List>
                    {/* {categoryDetails?.departments.map((dept) => (
                        <ListItem key={dept.id}>
                        <ListItemText primary={dept.name} />
                        </ListItem>
                    ))} */}

                      
                    {/* // For departments mapping */}
                    {categoryDetails?.departments.map((dept: Department) => (
                        <ListItem key={dept.id}>
                        <ListItemText primary={dept.name} />
                        </ListItem>
                    ))}
  

                    </List>
                </Paper>
        </Box>

      </Box>

    </Box>
  );
};

export default CategoryDepartments;


// import React from "react";
// import { useParams } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
// } from "@mui/material";
// import { useState } from "react";
// import Sidebar from "../modules/sidebar/Sidebar"; // Ensure the correct import path
// import Topbar from "../modules/topbar/Topbar"; // Ensure the correct import path
// import { departmentData } from "../data/departmentCategoryData";
// import { Department, DepartmentCategory } from '../data/departmentCategoryData';


// const CategoryDepartments = () => {
//   const { categoryName } = useParams<{ categoryName: string }>();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

// //   const categoryDetails = departmentData.find(
// //     (cat) => cat.category === decodeURIComponent(categoryName ?? "")
// //   );

//   // For categoryDetails
// const categoryDetails = departmentData.find(
//     (cat: DepartmentCategory) => cat.category === decodeURIComponent(categoryName ?? "")
//   );


//   return (
    
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       {/* ✅ Topbar Component */}
//       <Topbar />

//       {/* ✅ Add marginTop to prevent content overlap */}
//       <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
//         {/* Sidebar Component */}
//         <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//         {/* Main Content Area */}
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             transition: "margin-left 0.3s ease-in-out",
//             // marginLeft: sidebarOpen ? ${drawerWidth}px : ${collapsedWidth}px,
//             // ml: sidebarOpen ? ${drawerWidth}px : ${collapsedWidth}px, // ✅ Sidebar Offset
//            // marginLeft:"200px",
//             padding: "16px",
//           }}
//         >
//                     <Typography variant="h5" gutterBottom>
//                     {categoryDetails?.category} - Departments
//                 </Typography>

//                 <Paper elevation={3} sx={{ padding: 2 }}>
//                     <List>
//                     {/* {categoryDetails?.departments.map((dept) => (
//                         <ListItem key={dept.id}>
//                         <ListItemText primary={dept.name} />
//                         </ListItem>
//                     ))} */}

                      
//                     {/* // For departments mapping */}
//                     {categoryDetails?.departments.map((dept: Department) => (
//                         <ListItem key={dept.id}>
//                         <ListItemText primary={dept.name} />
//                         </ListItem>
//                     ))}
  

//                     </List>
//                 </Paper>
//         </Box>

//       </Box>

//     </Box>
//   );
// };

// export default CategoryDepartments;
