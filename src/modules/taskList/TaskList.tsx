import { useState, useEffect } from "react";
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Link, Menu, MenuItem, CircularProgress
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import dayjs from "dayjs";
import { Task } from "../../types/taskTypes";
import { fetchTasks, deleteTask } from "../../api/taskApi";
import axios from "axios";


interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  openAddTask: boolean;
  handleOpenAddTask: () => void;
  handleCloseAddTask: () => void;
  hideAddTask?: boolean;
}

// Function to get the correct file icon
const getFileIcon = (fileName: string) => {
  if (!fileName) return <InsertDriveFileIcon sx={{ color: "green" }} />;
  const fileExtension = fileName.split(".").pop()?.toLowerCase();
  if (fileExtension === "pdf") return <PictureAsPdfIcon sx={{ color: "red" }} />;
  if (["jpg", "jpeg", "png"].includes(fileExtension || "")) return <ImageIcon sx={{ color: "gray" }} />;
  return <InsertDriveFileIcon sx={{ color: "green" }} />;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  setTasks,
  openAddTask,
  handleOpenAddTask,
  handleCloseAddTask,
  hideAddTask = false,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  // Fetch tasks from the API
  // useEffect(() => {
  //   const loadTasks = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await fetchTasks();
  //       setTasks(data);
  //       setError(null);
  //     } catch (err) {
  //       console.error("Error fetching tasks:", err);
  //       setError("Failed to fetch tasks. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadTasks();
  // }, [setTasks]);

 //  Fetch tasks from the API
   useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();  // fetchTasks might return unknown type
        setTasks(data as Task[]);  // Cast to Task[] to satisfy TypeScript
        setError(null);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [setTasks]);  

  
 //  Fetch tasks from the local file
  // useEffect(() => {
  //   if (tasks.length === 0) {
  //     const loadTasks = async () => {
  //       try {
  //         setLoading(true);
  //         const data = await fetchTasks();
  //         setTasks(data as Task[]);
  //         setError(null);
  //       } catch (err) {
  //         console.error("Error fetching tasks:", err);
  //         setError("Failed to fetch tasks. Please try again later.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     loadTasks();
  //   } else {
  //     setLoading(false);
  //   }
  // }, [tasks, setTasks]);
  

  // Handle menu opening
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, taskId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(taskId);
  };

  // Handle menu closing
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  // Handle task deletion
  const handleDeleteTask = async () => {
    if (selectedTask !== null) {
      try {
        await deleteTask(selectedTask);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask));
        handleMenuClose();
      } catch (err) {
        console.error("Error deleting task:", err);
        setError("Failed to delete task. Please try again.");
      }
    }
  };

  return (
    <Box sx={{ mt: 3, borderRadius: "8px", border: "1px solid #aaa", padding: "16px" }}>
      {/* Title & Add Task Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">Tasks</Typography>
        {!hideAddTask && (
          <Button variant="contained" onClick={handleOpenAddTask}>
            Add Task
          </Button>
        )}
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: 350, overflowY: "auto" }}>
          <Table stickyHeader>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Member & Department</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => {
                const fileName = task.attachment ? task.attachment.split("/").pop() : "";
                return (
                  <TableRow key={task.id}>
                    <TableCell>
                      <Typography variant="body1">{task.title}</Typography>
                      {task.attachment && (
                        <Link href={task.attachment} target="_blank" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          {getFileIcon(task.attachment)}
                          <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                            {task.attachment.split("/").pop()}
                          </Typography>
                        </Link>
                      )}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {task.member_name} {/* Updated */}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {task.department}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {dayjs(task.due_date).format("DD/MM/YYYY HH:mm")} {/* Updated */}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {/* <Typography variant="body2" sx={{ padding: "4px 8px", borderRadius: "4px", display: "inline-block" }}>
                            {task.status}
                          </Typography> */}
                          <Typography
                              variant="body2"
                              sx={{
                                padding: "4px 8px",
                                borderRadius: "4px",
                                display: "inline-block",
                                backgroundColor:
                                  task.status === "Completed"
                                    ? "#d1e7dd"
                                    : task.status === "In Progress"
                                    ? "#fff3cd"
                                    : "#f8d7da",
                                color:
                                  task.status === "Completed"
                                    ? "#0f5132"
                                    : task.status === "In Progress"
                                    ? "#664d03"
                                    : "#842029",
                              }}
                            >
                              {task.status}
                            </Typography>
                        </TableCell>

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
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="text" endIcon={<ArrowForwardIcon />}>
          View More Tasks
        </Button>
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Edit Task</MenuItem>
        <MenuItem onClick={handleMenuClose}>In Progress</MenuItem>
        <MenuItem onClick={handleMenuClose}>Mark Completed</MenuItem>
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        <MenuItem onClick={handleDeleteTask} sx={{ color: "red" }}>
          Delete Task
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TaskList;





// import { useState, useEffect } from "react";
// import axios from "axios";
// import { 
//   Box, Button, Typography, Table, TableBody, TableCell, TableContainer, 
//   TableHead, TableRow, Paper, IconButton, Link, Menu, MenuItem, CircularProgress
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import ImageIcon from "@mui/icons-material/Image";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { Task } from "../../types/taskTypes";
// import dayjs from "dayjs";

// interface TaskListProps {
//   tasks: Task[];
//   setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
//   openAddTask: boolean;
//   handleOpenAddTask: () => void;
//   handleCloseAddTask: () => void;
//   hideAddTask?: boolean;
// }

// // Function to get the correct file icon
// const getFileIcon = (fileName: string) => {
//   if (!fileName) return <InsertDriveFileIcon sx={{ color: "green" }} />;
//   const fileExtension = fileName.split(".").pop()?.toLowerCase();
//   if (fileExtension === "pdf") return <PictureAsPdfIcon sx={{ color: "red" }} />;
//   if (["jpg", "jpeg", "png"].includes(fileExtension || "")) return <ImageIcon sx={{ color: "gray" }} />;
//   return <InsertDriveFileIcon sx={{ color: "green" }} />;
// };

// const TaskList: React.FC<TaskListProps> = ({
//   tasks,
//   setTasks,
//   openAddTask,
//   handleOpenAddTask,
//   handleCloseAddTask,
//   hideAddTask = false,
// }) => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedTask, setSelectedTask] = useState<number | null>(null);

//   // Fetch tasks from the API
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/api/tasks");
//         setTasks(response.data);
//       } catch (err) {
//         setError("Failed to fetch tasks. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTasks();
//   }, [setTasks]);

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
//         <Typography variant="h6">Tasks</Typography>
//         {!hideAddTask && (
//           <Button variant="contained" onClick={handleOpenAddTask}>
//             Add Task
//           </Button>
//         )}
//       </Box>

//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//           <CircularProgress />
//         </Box>
//       ) : error ? (
//         <Typography color="error" sx={{ textAlign: "center" }}>
//           {error}
//         </Typography>
//       ) : (
//         <TableContainer component={Paper} sx={{ maxHeight: 350, overflowY: "auto" }}>
//           <Table stickyHeader>
//             <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//               <TableRow>
//                 <TableCell>Task</TableCell>
//                 <TableCell>Member & Department</TableCell>
//                 <TableCell>Due Date</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell align="right">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tasks.map((task) => {
//                 const fileName = task.attachment ? task.attachment.split("/").pop() : "";
//                 return (
//                   <TableRow key={task.id}>
//                     <TableCell>
//                       <Typography variant="body1">{task.title}</Typography>
//                       {task.attachment && (
//                         <Link href={task.attachment} target="_blank" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                           {getFileIcon(fileName || "")}
//                           <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
//                             {fileName}
//                           </Typography>
//                         </Link>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" fontWeight="bold">
//                         {task.name}
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         {task.department}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2">
//                         {dayjs(task.dueDate).format("DD/MM/YYYY HH:mm")}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" sx={{ padding: "4px 8px", borderRadius: "4px", display: "inline-block" }}>
//                         {task.status}
//                       </Typography>
//                     </TableCell>
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
//       )}

//       <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//         <Button variant="text" endIcon={<ArrowForwardIcon />}>
//           View More Tasks
//         </Button>
//       </Box>

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
//   hideAddTask?: boolean;  // ✅ Optional prop to hide Add Task button
// }

// // ✅ Function to get the correct file icon
// const getFileIcon = (fileName: string) => {
//   if (!fileName) return <InsertDriveFileIcon sx={{ color: "green" }} />;
//   const fileExtension = fileName.split(".").pop()?.toLowerCase();
//   if (fileExtension === "pdf") return <PictureAsPdfIcon sx={{ color: "red" }} />;
//   if (["jpg", "jpeg", "png"].includes(fileExtension || "")) return <ImageIcon sx={{ color: "gray" }} />;
//   return <InsertDriveFileIcon sx={{ color: "green" }} />;
// };

// const TaskList: React.FC<TaskListProps> = ({ 
//   tasks,
//   setTasks,
//   openAddTask,
//   handleOpenAddTask,
//   handleCloseAddTask,
//   hideAddTask = false,  // ✅ Default to false
// }) => {
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
//         {!hideAddTask && (  // ✅ Conditionally render the button
//                 <Button variant="contained" onClick={handleOpenAddTask}>
//                     Add Task
//                 </Button>
//             )}
//         {/* <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddTask}>
//           Add Task
//         </Button> */}
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
//   hideAddTask?: boolean;  // ✅ Optional prop to hide Add Task button
// }

// // ✅ Function to get the correct file icon
// const getFileIcon = (fileName: string) => {
//   if (!fileName) return <InsertDriveFileIcon sx={{ color: "green" }} />;
//   const fileExtension = fileName.split(".").pop()?.toLowerCase();
//   if (fileExtension === "pdf") return <PictureAsPdfIcon sx={{ color: "red" }} />;
//   if (["jpg", "jpeg", "png"].includes(fileExtension || "")) return <ImageIcon sx={{ color: "gray" }} />;
//   return <InsertDriveFileIcon sx={{ color: "green" }} />;
// };

// const TaskList: React.FC<TaskListProps> = ({ 
//   tasks,
//   setTasks,
//   openAddTask,
//   handleOpenAddTask,
//   handleCloseAddTask,
//   hideAddTask = false,  // ✅ Default to false
// }) => {
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
//         {!hideAddTask && (  // ✅ Conditionally render the button
//                 <Button variant="contained" onClick={handleOpenAddTask}>
//                     Add Task
//                 </Button>
//             )}
//         {/* <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddTask}>
//           Add Task
//         </Button> */}
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
