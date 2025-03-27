import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Popover,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails"; // ✅ Updated department import
import AddTask from "../addTask/AddTask";
import { initialTasks } from "../../data/TaskData";
import { Task } from "../../types/taskTypes"; // ✅ Ensure this path is correct

const QuickActionPanel = ({ setTasks, handleOpenAddTask }: { 
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  handleOpenAddTask: () => void 
}) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [tasks, ] = useState<Task[]>(initialTasks); // ✅ Add Task type

  // ✅ Fetch department names correctly
  const departmentNames = departmentEmployeesDetails.map((dept) => dept.department);

  const handleActionClick = (
    action: string,
    event?: React.MouseEvent<HTMLElement>
  ) => {
    if (action === "filter") {
      setAnchorEl(event?.currentTarget || null);
    }
    setActiveAction((prev) => (prev === action ? null : action));
  };

  const handleCheckboxChange = (department: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(department) ? prev.filter((d) => d !== department) : [...prev, department]
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        border: "1px solid #ddd",
        padding: "12px",
        borderRadius: "8px",
        justifyContent: "end",
        background: "#fff",
        mb: 3,
      }}
    >
      {/* Filter IconButton */}
      <IconButton
        onClick={(event) => handleActionClick("filter", event)}
        sx={{
          borderRadius: "16%",
          border: "1px solid #aaa",
          color: activeAction === "filter" ? "#fff" : "black",
          bgcolor: activeAction === "filter" ? "black" : "transparent",
          "&:hover": { bgcolor: activeAction === "filter" ? "#333" : "#f0f0f0" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FilterListIcon sx={{ fontSize: "20px" }} />
      </IconButton>

      {/* Popover for department filtering */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            minWidth: "250px",
            maxHeight: "400px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Title */}
          <Typography variant="subtitle1" sx={{ p: 2 }}>
            Filter by Department
          </Typography>

          {/* Scrollable Checkbox List */}
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                px: 2,
                "&::-webkit-scrollbar": { width: "5px" },
                "&::-webkit-scrollbar-track": { background: "#fde9b6", borderRadius: "12px" },
                "&::-webkit-scrollbar-thumb": { background: "#005500", borderRadius: "12px" },
                "&::-webkit-scrollbar-thumb:hover": { background: "#555" },
              }}
              >
              {Array.from(new Set(departmentNames)).map((dept, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={selectedDepartments.includes(dept)}
                        onChange={() => handleCheckboxChange(dept)}
                      />
                    }
                    label={dept}
                    sx={{ display: "block", mb: 1 }}
                  />
                ))}
          </Box>

          {/* Show Submit Button ONLY if at least one department is selected */}
          {selectedDepartments.length > 0 && (
            <Box
              sx={{
                position: "sticky",
                bottom: 0,
                bgcolor: "white",
                p: 2,
                borderTop: "1px solid #ddd",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setAnchorEl(null); // Close Popover on submit
                  console.log("Selected Departments:", selectedDepartments);
                }}
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                }}
              >
                Submit
              </Button>
            </Box>
          )}
        </Box>
      </Popover>

      {/* Add Task Button */}
      <Button
        variant="outlined"
        startIcon={<AddIcon sx={{ fontSize: "20px" }} />}
        // onClick={() => setIsAddTaskOpen(true)}
        onClick={handleOpenAddTask}
        sx={{
          borderRadius: "8px",
          fontSize: "12px",
          border: "1px solid #aaa",
          color: activeAction === "task" ? "#fff" : "black",
          bgcolor: activeAction === "task" ? "black" : "transparent",
          "&:hover": { bgcolor: activeAction === "task" ? "#333" : "#f0f0f0" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Add Task
      </Button>

      {/* Add Task Popup */}
      <AddTask open={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} setTasks={setTasks} />

      {/* Add Members Button */}
      <Button
        variant="outlined"
        startIcon={<GroupAddIcon sx={{ fontSize: "20px" }} />}
        onClick={() => handleActionClick("members")}
        sx={{
          borderRadius: "8px",
          fontSize: "12px",
          border: "1px solid #aaa",
          color: activeAction === "members" ? "#fff" : "black",
          bgcolor: activeAction === "members" ? "black" : "transparent",
          "&:hover": { bgcolor: activeAction === "members" ? "#333" : "#f0f0f0" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Add Members
      </Button>

      {/* Add Department Button */}
      <Button
        variant="outlined"
        startIcon={<ApartmentIcon sx={{ fontSize: "20px" }} />}
        onClick={() => handleActionClick("department")}
        sx={{
          borderRadius: "8px",
          fontSize: "12px",
          border: "1px solid #aaa",
          color: activeAction === "department" ? "#fff" : "black",
          bgcolor: activeAction === "department" ? "black" : "transparent",
          "&:hover": { bgcolor: activeAction === "department" ? "#333" : "#f0f0f0" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Add Department
      </Button>
    </Box>
  );
};

export default QuickActionPanel;


// import { useState } from "react";
// import {
//   Box,
//   Button,
//   IconButton,
//   Popover,
//   FormControlLabel,
//   Checkbox,
//   Typography,
// } from "@mui/material";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import AddIcon from "@mui/icons-material/Add";
// import GroupAddIcon from "@mui/icons-material/GroupAdd";
// import ApartmentIcon from "@mui/icons-material/Apartment";
// import { departments } from "../../data/departments"; // Import department list
// import AddTask from "../addTask/AddTask";
// import { initialTasks } from "../../data/TaskData";
// import { Task } from "../../types/taskTypes"; // ✅ Ensure this path is correct


// const QuickActionPanel = () => {
//   const [activeAction, setActiveAction] = useState<string | null>(null);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
//   const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
//   const [tasks, setTasks] = useState<Task[]>(initialTasks); // ✅ Add Task type


//   const handleActionClick = (
//     action: string,
//     event?: React.MouseEvent<HTMLElement>
//   ) => {
//     if (action === "filter") {
//       setAnchorEl(event?.currentTarget || null);
//     }
//     setActiveAction((prev) => (prev === action ? null : action));
//   };

//   const handleCheckboxChange = (department: string) => {
//     setSelectedDepartments((prev) =>
//       prev.includes(department) ? prev.filter((d) => d !== department) : [...prev, department]
//     );
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         gap: 2,
//         border: "1px solid #ddd",
//         padding: "12px",
//         borderRadius: "8px",
//         justifyContent: "end",
//         background: "#fff",
//         mb: 3,
//       }}
//     >
//       {/* Filter IconButton */}
//       <IconButton
//         onClick={(event) => handleActionClick("filter", event)}
//         sx={{
//           borderRadius: "16%",
//           border: "1px solid #aaa",
//           color: activeAction === "filter" ? "#fff" : "black",
//           bgcolor: activeAction === "filter" ? "black" : "transparent",
//           "&:hover": { bgcolor: activeAction === "filter" ? "#333" : "#f0f0f0" },
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <FilterListIcon sx={{ fontSize: "20px" }} />
//       </IconButton>

//       {/* Popover for department filtering */}
//       <Popover
//         open={Boolean(anchorEl)}
//         anchorEl={anchorEl}
//         onClose={() => setAnchorEl(null)}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//       >
//         <Box
//           sx={{
//             minWidth: "250px",
//             maxHeight: "400px",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {/* Title */}
//           <Typography variant="subtitle1" sx={{ p: 2 }}>
//             Filter by Department
//           </Typography>

//           {/* Scrollable Checkbox List */}
//           <Box
//             sx={{
//               flexGrow: 1,
//               overflowY: "auto",
//               px: 2,
//               "&::-webkit-scrollbar": { width: "5px" },
//               "&::-webkit-scrollbar-track": { background: "#fde9b6", borderRadius: "12px" },
//               "&::-webkit-scrollbar-thumb": { background: "#005500", borderRadius: "12px" },
//               "&::-webkit-scrollbar-thumb:hover": { background: "#555" },
//             }}
//           >
//             {departments.map((dept, index) => (
//               <FormControlLabel
//                 key={index}
//                 control={
//                   <Checkbox
//                     checked={selectedDepartments.includes(dept)}
//                     onChange={() => handleCheckboxChange(dept)}
//                   />
//                 }
//                 label={dept}
//                 sx={{ display: "block", mb: 1 }}
//               />
//             ))}
//           </Box>

//           {/* Show Submit Button ONLY if at least one department is selected */}
//           {selectedDepartments.length > 0 && (
//             <Box
//               sx={{
//                 position: "sticky",
//                 bottom: 0,
//                 bgcolor: "white",
//                 p: 2,
//                 borderTop: "1px solid #ddd",
//                 display: "flex",
//                 justifyContent: "flex-end",
//               }}
//             >
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => {
//                   setAnchorEl(null); // Close Popover on submit
//                   console.log("Selected Departments:", selectedDepartments);
//                 }}
//                 sx={{
//                   borderRadius: "8px",
//                   textTransform: "none",
//                 }}
//               >
//                 Submit
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Popover>

//       {/* Add Task Button */}
//       <Button
//         variant="outlined"
//         startIcon={<AddIcon sx={{ fontSize: "20px" }} />}
//         onClick={() => setIsAddTaskOpen(true)}
//         sx={{
//           borderRadius: "8px",
//           fontSize: "12px",
//           border: "1px solid #aaa",
//           color: activeAction === "task" ? "#fff" : "black",
//           bgcolor: activeAction === "task" ? "black" : "transparent",
//           "&:hover": { bgcolor: activeAction === "task" ? "#333" : "#f0f0f0" },
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         Add Task
//       </Button>

//       {/* Add Task Popup */}
//       <AddTask open={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} setTasks={setTasks} />

//       {/* Add Members Button */}
//       <Button
//         variant="outlined"
//         startIcon={<GroupAddIcon sx={{ fontSize: "20px" }} />}
//         onClick={() => handleActionClick("members")}
//         sx={{
//           borderRadius: "8px",
//           fontSize: "12px",
//           border: "1px solid #aaa",
//           color: activeAction === "members" ? "#fff" : "black",
//           bgcolor: activeAction === "members" ? "black" : "transparent",
//           "&:hover": { bgcolor: activeAction === "members" ? "#333" : "#f0f0f0" },
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         Add Members
//       </Button>

//       {/* Add Department Button */}
//       <Button
//         variant="outlined"
//         startIcon={<ApartmentIcon sx={{ fontSize: "20px" }} />}
//         onClick={() => handleActionClick("department")}
//         sx={{
//           borderRadius: "8px",
//           fontSize: "12px",
//           border: "1px solid #aaa",
//           color: activeAction === "department" ? "#fff" : "black",
//           bgcolor: activeAction === "department" ? "black" : "transparent",
//           "&:hover": { bgcolor: activeAction === "department" ? "#333" : "#f0f0f0" },
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         Add Department
//       </Button>
//     </Box>
//   );
// };

// export default QuickActionPanel;



// import { useState } from "react";
// import { Box, Button, IconButton } from "@mui/material";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import AddIcon from "@mui/icons-material/Add";
// import GroupAddIcon from "@mui/icons-material/GroupAdd";
// import ApartmentIcon from "@mui/icons-material/Apartment";

// const QuickActionPanel = () => {
//   const [activeAction, setActiveAction] = useState<string | null>(null);

//   const handleActionClick = (action: string) => {
//     setActiveAction((prev) => (prev === action ? null : action)); // Toggle same action, else select new
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         gap: 2,
//         border: "1px solid #ddd",
//         padding: "12px",
//         borderRadius: "8px",
//         justifyContent: "end",
//         background: "#fff",
//         mb: 3,
//       }}
//     >
//       {/* Filter IconButton */}
//       <IconButton
//         onClick={() => handleActionClick("filter")}
//         sx={{
//           borderRadius: "16%",
//           border: "1px solid #aaa",
//           color: activeAction === "filter" ? "#fff" : "black",
//           bgcolor: activeAction === "filter" ? "black" : "transparent",
//           "&:hover": { bgcolor: activeAction === "filter" ? "#333" : "#f0f0f0" },
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <FilterListIcon sx={{ fontSize: "20px" }} />
//       </IconButton>

//       {/* Add Task Button */}
//       <Button
//         variant="outlined"
//         startIcon={<AddIcon sx={{ fontSize: "20px" }} />}
//         onClick={() => handleActionClick("task")}
//         sx={{
//           borderRadius: "8px",
//           fontSize: "12px",
//           border: "1px solid #aaa",
//           color: activeAction === "task" ? "#fff" : "black",
//           bgcolor: activeAction === "task" ? "black" : "transparent",
//           "&:hover": { bgcolor: activeAction === "task" ? "#333" : "#f0f0f0" },
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         Add Task
//       </Button>

//       {/* Add Members Button */}
//       <Button
//         variant="outlined"
//         startIcon={<GroupAddIcon sx={{ fontSize: "20px" }} />}
//         onClick={() => handleActionClick("members")}
//         sx={{
//           borderRadius: "8px",
//           fontSize: "12px",
//           border: "1px solid #aaa",
//           color: activeAction === "members" ? "#fff" : "black",
//           bgcolor: activeAction === "members" ? "black" : "transparent",
//           "&:hover": { bgcolor: activeAction === "members" ? "#333" : "#f0f0f0" },
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         Add Members
//       </Button>

//       {/* Add Department Button */}
//       <Button
//         variant="outlined"
//         startIcon={<ApartmentIcon sx={{ fontSize: "20px" }} />}
//         onClick={() => handleActionClick("department")}
//         sx={{
//           borderRadius: "8px",
//           fontSize: "12px",
//           border: "1px solid #aaa",
//           color: activeAction === "department" ? "#fff" : "black",
//           bgcolor: activeAction === "department" ? "black" : "transparent",
//           "&:hover": { bgcolor: activeAction === "department" ? "#333" : "#f0f0f0" },
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         Add Department
//       </Button>
//     </Box>
//   );
// };

// export default QuickActionPanel;

