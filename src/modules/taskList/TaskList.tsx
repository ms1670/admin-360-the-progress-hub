import { useState, useEffect } from "react";
import { 
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Link, Menu, MenuItem 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Task } from "../../types/taskTypes";
import dayjs from "dayjs";

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  openAddTask: boolean; // ✅ Added this
  handleOpenAddTask: () => void; // ✅ Added this
  handleCloseAddTask: () => void; // ✅ Added this
}

// ✅ Function to get the correct file icon
const getFileIcon = (fileName: string) => {
  if (!fileName) return <InsertDriveFileIcon sx={{ color: "green" }} />;
  const fileExtension = fileName.split(".").pop()?.toLowerCase();
  if (fileExtension === "pdf") return <PictureAsPdfIcon sx={{ color: "red" }} />;
  if (["jpg", "jpeg", "png"].includes(fileExtension || "")) return <ImageIcon sx={{ color: "gray" }} />;
  return <InsertDriveFileIcon sx={{ color: "green" }} />;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, handleOpenAddTask }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  // ✅ Automatically update task status from "New" → "Pending" after 1 hour
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    tasks.forEach((task) => {
      if (task.status === "New") {
        const timeLeft = dayjs(task.createdAt).add(1, "hour").diff(dayjs(), "milliseconds");

        if (timeLeft > 0) {
          const timer = setTimeout(() => {
            setTasks((prevTasks) =>
              prevTasks.map((t) => (t.id === task.id ? { ...t, status: "Pending" } : t))
            );
          }, timeLeft);
          timers.push(timer);
        }
      }
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [tasks, setTasks]);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, taskId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  return (
    <Box sx={{ mt: 3, borderRadius: "8px", border: "1px solid #aaa", padding: "16px" }}>
      {/* Title & Add Task Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">New Tasks</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddTask}>
          Add Task
        </Button>
      </Box>

      {/* Task Table */}
      <Box>
        <TableContainer component={Paper} sx={{ maxHeight: 350, overflowY: "auto" }}>
          <Table stickyHeader>
            {/* Table Header */}
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Member & Department</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {tasks.slice().map((task) => {  
                const fileName = task.attachment ? task.attachment.split("/").pop() : "";

                return (
                  <TableRow key={task.id}>
                    {/* Task Column (with File Attachment & Name) */}
                    <TableCell>
                      <Typography variant="body1">{task.title}</Typography>
                      {task.attachment && (
                        <Link href={task.attachment} target="_blank" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          {getFileIcon(fileName!)}
                          <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                            {fileName}
                          </Typography>
                        </Link>
                      )}
                    </TableCell>

                    {/* Member & Department (Stacked) */}
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {task.name} 
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {task.department}
                      </Typography>
                    </TableCell>

                    {/* Due Date */}
                    <TableCell>
                      <Typography variant="body2">{dayjs(task.dueDate).format("DD/MM/YYYY HH:mm")}</Typography>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          display: "inline-block",
                          backgroundColor:
                            task.status === "Completed"
                              ? "#c8e6c9"
                              : task.status === "In Progress"
                              ? "#ffecb3"
                              : task.status === "New"
                              ? "#bbdefb"
                              : "#ffcdd2",
                          color:
                            task.status === "Completed"
                              ? "green"
                              : task.status === "In Progress"
                              ? "orange"
                              : task.status === "New"
                              ? "blue"
                              : "red",
                        }}
                      >
                        {task.status}
                      </Typography>
                    </TableCell>

                    {/* Edit & More Options */}
                    <TableCell align="right">
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={(e) => handleMenuClick(e, task.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* View More Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="text" endIcon={<ArrowForwardIcon />}>
          View More Tasks
        </Button>
      </Box>

      {/* Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Edit Task</MenuItem>
        <MenuItem onClick={handleMenuClose}>In Progress</MenuItem>
        <MenuItem onClick={handleMenuClose}>Mark Completed</MenuItem>
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: "red" }}>
          Delete Task
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TaskList;


// import { useState, useEffect } from "react";
// import { 
//   Box, Button, Typography, Table, TableBody, TableCell, TableContainer, 
//   TableHead, TableRow, Paper, IconButton, Link, Menu, MenuItem 
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import ImageIcon from "@mui/icons-material/Image";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import AddIcon from "@mui/icons-material/Add";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { Task } from "../../types/taskTypes";
// import dayjs from "dayjs";

// interface TaskListProps {
//   tasks: Task[];
//   setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
//   openAddTask: boolean; // ✅ Added this
//   handleOpenAddTask: () => void; // ✅ Added this
//   handleCloseAddTask: () => void; // ✅ Added this
// }

// // ✅ Function to get the correct file icon
// const getFileIcon = (fileName: string) => {
//   if (!fileName) return <InsertDriveFileIcon sx={{ color: "green" }} />;
//   const fileExtension = fileName.split(".").pop()?.toLowerCase();
//   if (fileExtension === "pdf") return <PictureAsPdfIcon sx={{ color: "red" }} />;
//   if (["jpg", "jpeg", "png"].includes(fileExtension || "")) return <ImageIcon sx={{ color: "gray" }} />;
//   return <InsertDriveFileIcon sx={{ color: "green" }} />;
// };

// const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, handleOpenAddTask }) => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedTask, setSelectedTask] = useState<number | null>(null);

//   // ✅ Automatically update task status from "New" → "Pending" after 1 hour
//   useEffect(() => {
//     const timers: NodeJS.Timeout[] = [];

//     tasks.forEach((task) => {
//       if (task.status === "New") {
//         const timeLeft = dayjs(task.createdAt).add(1, "hour").diff(dayjs(), "milliseconds");

//         if (timeLeft > 0) {
//           const timer = setTimeout(() => {
//             setTasks((prevTasks) =>
//               prevTasks.map((t) => (t.id === task.id ? { ...t, status: "Pending" } : t))
//             );
//           }, timeLeft);
//           timers.push(timer);
//         }
//       }
//     });

//     return () => {
//       timers.forEach(clearTimeout);
//     };
//   }, [tasks, setTasks]);

//   const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, taskId: number) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedTask(taskId);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedTask(null);
//   };

//   return (
//     <Box sx={{ mt: 3, borderRadius: "8px", border: "1px solid #aaa", padding: "16px" }}>
//       {/* Title & Add Task Button */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//         <Typography variant="h6">New Tasks</Typography>
//         <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddTask}>
//           Add Task
//         </Button>
//       </Box>

//       {/* Task Table */}
//       <Box>
//         <TableContainer component={Paper} sx={{ maxHeight: 350, overflowY: "auto" }}>
//           <Table stickyHeader>
//             {/* Table Header */}
//             <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//               <TableRow>
//                 <TableCell>Task</TableCell>
//                 <TableCell>Member & Department</TableCell>
//                 <TableCell>Due Date</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell align="right">Actions</TableCell>
//               </TableRow>
//             </TableHead>

//             {/* Table Body */}
//             <TableBody>
//               {tasks.slice().map((task) => {  
//                 const fileName = task.attachment ? task.attachment.split("/").pop() : "";

//                 return (
//                   <TableRow key={task.id}>
//                     {/* Task Column (with File Attachment & Name) */}
//                     <TableCell>
//                       <Typography variant="body1">{task.title}</Typography>
//                       {task.attachment && (
//                         <Link href={task.attachment} target="_blank" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                           {getFileIcon(fileName!)}
//                           <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
//                             {fileName}
//                           </Typography>
//                         </Link>
//                       )}
//                     </TableCell>

//                     {/* Member & Department (Stacked) */}
//                     <TableCell>
//                       <Typography variant="body2" fontWeight="bold">
//                         {task.name} 
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         {task.department}
//                       </Typography>
//                     </TableCell>

//                     {/* Due Date */}
//                     <TableCell>
//                       <Typography variant="body2">{dayjs(task.dueDate).format("DD/MM/YYYY HH:mm")}</Typography>
//                     </TableCell>

//                     {/* Status */}
//                     <TableCell>
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           padding: "4px 8px",
//                           borderRadius: "4px",
//                           display: "inline-block",
//                           backgroundColor:
//                             task.status === "Completed"
//                               ? "#c8e6c9"
//                               : task.status === "In Progress"
//                               ? "#ffecb3"
//                               : task.status === "New"
//                               ? "#bbdefb"
//                               : "#ffcdd2",
//                           color:
//                             task.status === "Completed"
//                               ? "green"
//                               : task.status === "In Progress"
//                               ? "orange"
//                               : task.status === "New"
//                               ? "blue"
//                               : "red",
//                         }}
//                       >
//                         {task.status}
//                       </Typography>
//                     </TableCell>

//                     {/* Edit & More Options */}
//                     <TableCell align="right">
//                       <IconButton>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton onClick={(e) => handleMenuClick(e, task.id)}>
//                         <MoreVertIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>

//       {/* View More Button */}
//       <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//         <Button variant="text" endIcon={<ArrowForwardIcon />}>
//           View More Tasks
//         </Button>
//       </Box>

//       {/* Dropdown Menu */}
//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//         <MenuItem onClick={handleMenuClose}>Edit Task</MenuItem>
//         <MenuItem onClick={handleMenuClose}>In Progress</MenuItem>
//         <MenuItem onClick={handleMenuClose}>Mark Completed</MenuItem>
//         <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
//         <MenuItem onClick={handleMenuClose} sx={{ color: "red" }}>
//           Delete Task
//         </MenuItem>
//       </Menu>
//     </Box>
//   );
// };

// export default TaskList;




// import { useState } from "react";
// import { 
//   Box, Button, Typography, Table, TableBody, TableCell, TableContainer, 
//   TableHead, TableRow, Paper, IconButton, Link, Menu, MenuItem 
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import ImageIcon from "@mui/icons-material/Image";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import AddIcon from "@mui/icons-material/Add";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { Task } from "../../types/taskTypes"; // ✅ Use the correct Task type


// // ✅ Accept `tasks` & `setTasks` as props
// interface TaskListProps {
//   tasks: Task[];
//   setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
// }

// const getFileIcon = (fileName: string) => {
//   if (!fileName) return <InsertDriveFileIcon sx={{ color: "green" }} />;
//   const fileExtension = fileName.split(".").pop()?.toLowerCase();
//   if (fileExtension === "pdf") return <PictureAsPdfIcon sx={{ color: "red" }} />;
//   if (["jpg", "jpeg", "png"].includes(fileExtension || "")) return <ImageIcon sx={{ color: "gray" }} />;
//   return <InsertDriveFileIcon sx={{ color: "green" }} />;
// };

// const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedTask, setSelectedTask] = useState<number | null>(null);


//   const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, taskId: number) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedTask(taskId);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedTask(null);
//   };

//   return (
//     <Box sx={{ mt: 3, borderRadius: "8px", border: "1px solid #aaa", padding: "16px" }}>
//       {/* Title & Add Task Button */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//         <Typography variant="h6">New Tasks</Typography>
//         <Button variant="contained" startIcon={<AddIcon />}>
//           Add Task
//         </Button>
//       </Box>

//       {/* Task Table */}
//       <Box>
//         <TableContainer component={Paper} sx={{ maxHeight: 350, overflowY: "auto" }}>
//           <Table stickyHeader>
//             {/* Table Header */}
//             <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//               <TableRow>
//                 <TableCell>Task</TableCell>
//                 <TableCell>Member & Department</TableCell>
//                 <TableCell>Due Date</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell align="right">Actions</TableCell>
//               </TableRow>
//             </TableHead>

//             {/* Table Body */}
//             <TableBody>
//               {tasks.slice().map((task) => {  // ✅ Reversing the list here
//                 const fileName = task.attachment ? task.attachment.split("/").pop() : "";

//                 return (
//                   <TableRow key={task.id}>
//                     {/* Task Column (with File Attachment & Name) */}
//                     <TableCell>
//                       <Typography variant="body1">{task.title}</Typography>
//                       {task.attachment && (
//                         <Link href={task.attachment} target="_blank" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                           {getFileIcon(fileName!)}
//                           <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
//                             {fileName}
//                           </Typography>
//                         </Link>
//                       )}
//                     </TableCell>

//                     {/* Member & Department (Stacked) */}
//                     <TableCell>
//                       <Typography variant="body2" fontWeight="bold">
//                         {task.name}
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         {task.department}
//                       </Typography>
//                     </TableCell>

//                     {/* Due Date */}
//                     <TableCell>
//                       <Typography variant="body2">{task.dueDate}</Typography>
//                     </TableCell>

//                     {/* Status */}
//                     <TableCell>
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           padding: "4px 8px",
//                           borderRadius: "4px",
//                           display: "inline-block",
//                           backgroundColor:
//                             task.status === "Completed"
//                               ? "#c8e6c9"
//                               : task.status === "In Progress"
//                               ? "#ffecb3"
//                               : "#ffcdd2",
//                           color:
//                             task.status === "Completed"
//                               ? "green"
//                               : task.status === "In Progress"
//                               ? "orange"
//                               : "red",
//                         }}
//                       >
//                         {task.status}
//                       </Typography>
//                     </TableCell>

//                     {/* Edit & More Options */}
//                     <TableCell align="right">
//                       <IconButton>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton onClick={(e) => handleMenuClick(e, task.id)}>
//                         <MoreVertIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>

//       {/* View More Button */}
//       <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//         <Button variant="text" endIcon={<ArrowForwardIcon />}>
//           View More Tasks
//         </Button>
//       </Box>

//       {/* Dropdown Menu */}
//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//         <MenuItem onClick={handleMenuClose}>Edit Task</MenuItem>
//         <MenuItem onClick={handleMenuClose}>In Progress</MenuItem>
//         <MenuItem onClick={handleMenuClose}>Mark Completed</MenuItem>
//         <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
//         <MenuItem onClick={handleMenuClose} sx={{ color: "red" }}>
//           Delete Task
//         </MenuItem>
//       </Menu>
//     </Box>
//   );
// };

// export default TaskList;
