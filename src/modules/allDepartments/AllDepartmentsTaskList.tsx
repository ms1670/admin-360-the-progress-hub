import { Box, Grid, Paper, Typography } from "@mui/material";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"; // Total Task Icon
import SyncIcon from "@mui/icons-material/Sync"; // Progress Icon
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"; // Pending Icon
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Completed Icon
import { Task } from "../../types/taskTypes";
import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails";

interface AllDepartmentsTaskListProps {
  tasks: Task[];
}

const AllDepartmentsTaskList: React.FC<AllDepartmentsTaskListProps> = ({ tasks }) => {
  // ✅ Extract unique department names
  const departmentNames = departmentEmployeesDetails
    .map((dept) => dept.department)
    .filter((dept, index, self) => self.indexOf(dept) === index);

  // ✅ Generate department task counts dynamically
  const departmentTasks = departmentNames.map((dept) => {
    const deptTasks = tasks.filter((task) => task.department === dept);
    
    return {
      department: dept,
      total: deptTasks.length,
      progress: deptTasks.filter((task) => task.status === "In Progress").length,
      pending: deptTasks.filter((task) => task.status === "Pending" || task.status === "New").length,
      completed: deptTasks.filter((task) => task.status === "Completed").length,
    };
  });

  return (
    <Box sx={{ mt: 3, p: 2 }}>
      {/* Title */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        All Departments Task Summary
      </Typography>

      {/* Cards Grid Layout */}
      <Grid container spacing={2}>
        {departmentTasks.map((dept, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper
              sx={{
                p: 2,
                borderRadius: "8px",
                boxShadow: 3,
                textAlign: "center",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              {/* Department Name */}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                {dept.department}
              </Typography>

              {/* Task Stats */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {/* Total Tasks */}
                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FormatListNumberedIcon sx={{ color: "#555" }} />
                  <strong>Total:</strong> {dept.total}
                </Typography>

                {/* Progress */}
                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SyncIcon sx={{ color: "#ff9800" }} />
                  <strong>Progress:</strong> {dept.progress}
                </Typography>

                {/* Pending */}
                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <HourglassEmptyIcon sx={{ color: "#f44336" }} />
                  <strong>Pending:</strong> {dept.pending}
                </Typography>

                {/* Completed */}
                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckCircleIcon sx={{ color: "green" }} />
                  <strong>Completed:</strong> {dept.completed}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllDepartmentsTaskList;


// import { Box, Grid, Paper, Typography } from "@mui/material";
// import ApartmentIcon from "@mui/icons-material/Apartment"; // Department Icon
// import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"; // Total Task Icon
// import SyncIcon from "@mui/icons-material/Sync"; // Progress Icon
// import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"; // Pending Icon
// import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Completed Icon
// import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails"; // Import department details

// // Extract unique department names
// // const departmentNames = departmentEmployeesDetails.map((dept) => dept.department);

// // Extract unique department names using filter
// const departmentNames = departmentEmployeesDetails
//   .map((dept) => dept.department)
//   .filter((dept, index, self) => self.indexOf(dept) === index);

  
// // Generate department task data dynamically
// const departmentTasks = departmentNames.map((dept) => ({
//   department: dept, // Department Name
//   total: Math.floor(Math.random() * 30) + 5, // Dummy total tasks
//   progress: Math.floor(Math.random() * 10),
//   pending: Math.floor(Math.random() * 10),
//   completed: Math.floor(Math.random() * 10),
// }));

// const AllDepartmentsTaskList = () => {
//   return (
//     <Box sx={{ mt: 3, p: 2 }}>
//       {/* Title */}
//       <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
//         All Departments Task Summary
//       </Typography>

//       {/* Cards Grid Layout */}
//       <Grid container spacing={2}>
//         {departmentTasks.map((dept, index) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//             <Paper
//               sx={{
//                 p: 2,
//                 borderRadius: "8px",
//                 boxShadow: 3,
//                 textAlign: "center",
//                 transition: "transform 0.2s",
//                 "&:hover": { transform: "scale(1.05)" },
//               }}
//             >
//               {/* Department Name */}
//               <Typography
//                 variant="subtitle1"
//                 fontWeight="bold"
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: 1,
//                   mb: 1,
//                 }}
//               >
//                 {dept.department}
//               </Typography>

//               {/* Task Stats */}
//               <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//                 {/* Total Tasks */}
//                 <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <FormatListNumberedIcon sx={{ color: "#555" }} />
//                   <strong>Total:</strong> {dept.total}
//                 </Typography>

//                 {/* Progress */}
//                 <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <SyncIcon sx={{ color: "#ff9800" }} />
//                   <strong>Progress:</strong> {dept.progress}
//                 </Typography>

//                 {/* Pending */}
//                 <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <HourglassEmptyIcon sx={{ color: "#f44336" }} />
//                   <strong>Pending:</strong> {dept.pending}
//                 </Typography>

//                 {/* Completed */}
//                 <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <CheckCircleIcon sx={{ color: "green" }} />
//                   <strong>Completed:</strong> {dept.completed}
//                 </Typography>
//               </Box>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default AllDepartmentsTaskList;
