
import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Select, FormControl,
  Typography, Box, IconButton, Grid, Paper
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Task } from "../../types/taskTypes"; // ✅ Correct import

// ✅ Updated Interface to Include setTasks

interface AddTaskProps {
    open: boolean;
    onClose: () => void;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>; // ✅ Make sure this is correct
  }

const AddTask: React.FC<AddTaskProps> = ({ open, onClose, setTasks }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [dueTime, setDueTime] = useState<string>("");
  const [toastShown, setToastShown] = useState<boolean>(false); // Track toast status

  const [errors, setErrors] = useState({
    department: false,
    employee: false,
    taskTitle: false,
    dueTime: false,
  });

  // Extract unique departments
//   const departments = Array.from(new Set(departmentEmployeesDetails.map((item) => item.department)));

  // Extract unique department names using filter
        const departments = departmentEmployeesDetails
        .map((item) => item.department)
        .filter((dept, index, self) => self.indexOf(dept) === index);


  // Get employees of selected department
  const employees = departmentEmployeesDetails.filter((item) => item.department === selectedDepartment);

  // Handle File Selection (Optional)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachment(event.target.files[0]);
    }
  };


  // ✅ Updated handleSubmit to Add Task
  const handleSubmit = () => {

    const toastId = toast.success("Task Added Successfully!", { autoClose: 2000 });
  
    setTimeout(() => {
      toast.dismiss(toastId); // Close manually
      handleClose();
    }, 2000);

    let newErrors = {
      department: !selectedDepartment,
      employee: !selectedEmployee,
      taskTitle: !taskTitle,
      dueTime: !dueTime,
    };


    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }
    
     // ✅ Extract only the Date (YYYY-MM-DD)
      const formattedDueDate = new Date(dueTime).toISOString().split("T")[0];

      const newTask: Task = {
        id: Date.now(), // Unique ID
        title: taskTitle,
        name: selectedEmployee,
        department: selectedDepartment,
        status: "New", // ✅ Set as "New" first
        dueDate: formattedDueDate, // ✅ Store only the date (No Time)
        attachment: attachment ? attachment.name : "No Attachment",
        createdAt: new Date().toISOString(), // ✅ Store timestamp for tracking
      };
      

    // const newTask: Task = {
    //   id: Date.now(), // Unique ID
    //   title: taskTitle,
    //   name: selectedEmployee,
    //   department: selectedDepartment,
    //   status: "Pending", // Default status
    //   //dueDate: dueTime, // ✅ Use 'dueDate' instead of 'date'
    //   dueDate: formattedDueDate, // ✅ Store only the date (No Time)
    //   attachment: attachment ? attachment.name : "No Attachment",
    // };

    setTasks((prevTasks) => [newTask, ...prevTasks]); // ✅ Add new task at the top

  //  toast.success("Task Added Successfully!", { autoClose: 1000 });

      
    handleClose();
  };

  // Reset form on Close
  const handleClose = () => {
    setSelectedDepartment("");
    setSelectedEmployee("");
    setTaskTitle("");
    setAttachment(null);
    setDueTime("");
  
    setErrors({
      department: false,
      employee: false,
      taskTitle: false,
      dueTime: false,
    });
  
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", bgcolor: "#f5f5f5" }}>
        Add New Task
        <IconButton onClick={handleClose} sx={{ position: "absolute", right: 10, top: 10 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: "10px" }}>
          <Grid container spacing={2}>

            {/* Department Dropdown */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
                  Select Department
                </Typography>
                <Select
                  value={selectedDepartment}
                  onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                    setSelectedEmployee(""); // Reset Employee selection
                    setErrors((prev) => ({ ...prev, department: false }));
                  }}
                  displayEmpty
                  renderValue={(selected) =>
                    selected ? selected : <span style={{ color: "#aaa" }}>Select Department</span>
                  } // Placeholder in lighter color
                >
                  <MenuItem value="" disabled>Select Department</MenuItem>
                  {departments.map((dept, index) => (
                    <MenuItem key={index} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Employee Dropdown */}
            <Grid item xs={12}>
              <FormControl fullWidth disabled={!selectedDepartment}>
                <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
                  Select Employee
                </Typography>
                <Select
                  value={selectedEmployee}
                  onChange={(e) => {
                    setSelectedEmployee(e.target.value);
                    setErrors((prev) => ({ ...prev, employee: false }));
                  }}
                  displayEmpty
                  renderValue={(selected) =>
                    selected ? selected : <span style={{ color: "#aaa" }}>Select Employee</span>
                  } // Placeholder in lighter color
                >
                  <MenuItem value="" disabled>Select Employee</MenuItem>
                  {employees.map((emp) => (
                    <MenuItem key={emp.id} value={emp.name}>
                      {emp.name} - {emp.designation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* <ToastContainer position="top-right" autoClose={2000} hideProgressBar /> */}

            
            {/* Task Title */}
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>Task Title</Typography>
              <TextField
                fullWidth
                placeholder="Enter Task"
                value={taskTitle}
                onChange={(e) => {
                  setTaskTitle(e.target.value);
                  setErrors((prev) => ({ ...prev, taskTitle: false }));
                }}
                error={errors.taskTitle}
                helperText={errors.taskTitle ? "* Task Title is required" : ""}
              />
            </Grid>

            {/* File Upload */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<UploadFileIcon />}
                  sx={{ bgcolor: "#1976D2", color: "white" }}
                >
                  Upload File
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {attachment && (
                  <Typography variant="body2" color="textSecondary">
                    {attachment.name}
                  </Typography>
                )}
              </Box>
            </Grid>

            {/* Due Date & Time */}
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>Due Date</Typography>
              <TextField
                fullWidth
                // type="datetime-local" // This includes both Date & Time
                type="date" // This keeps only the date
                value={dueTime}
                onChange={(e) => {
                  setDueTime(e.target.value);
                  setErrors((prev) => ({ ...prev, dueTime: false }));
                }}
                error={errors.dueTime}
                helperText={errors.dueTime ? "* Due Date is required" : ""}
              />
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", p: 2 }}>
        <Button onClick={handleClose} color="secondary" variant="outlined">Close</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTask;



// import { useState } from "react";
// import {
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   Button, TextField, MenuItem, Select, FormControl,
//   Typography, Box, IconButton, Grid, Paper
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Task } from "../../types/taskTypes"; // ✅ Correct import

// // ✅ Updated Interface to Include setTasks

// interface AddTaskProps {
//     open: boolean;
//     onClose: () => void;
//     setTasks: React.Dispatch<React.SetStateAction<Task[]>>; // ✅ Make sure this is correct
//   }

// const AddTask: React.FC<AddTaskProps> = ({ open, onClose, setTasks }) => {
//   const [selectedDepartment, setSelectedDepartment] = useState<string>("");
//   const [selectedEmployee, setSelectedEmployee] = useState<string>("");
//   const [taskTitle, setTaskTitle] = useState<string>("");
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const [dueTime, setDueTime] = useState<string>("");
//   const [toastShown, setToastShown] = useState<boolean>(false); // Track toast status

//   const [errors, setErrors] = useState({
//     department: false,
//     employee: false,
//     taskTitle: false,
//     dueTime: false,
//   });

//   // Extract unique departments
// //   const departments = Array.from(new Set(departmentEmployeesDetails.map((item) => item.department)));

//   // Extract unique department names using filter
//         const departments = departmentEmployeesDetails
//         .map((item) => item.department)
//         .filter((dept, index, self) => self.indexOf(dept) === index);


//   // Get employees of selected department
//   const employees = departmentEmployeesDetails.filter((item) => item.department === selectedDepartment);

//   // Handle File Selection (Optional)
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setAttachment(event.target.files[0]);
//     }
//   };


//   // ✅ Updated handleSubmit to Add Task
//   const handleSubmit = () => {

//     const toastId = toast.success("Task Added Successfully!", { autoClose: 2000 });
  
//     setTimeout(() => {
//       toast.dismiss(toastId); // Close manually
//       handleClose();
//     }, 2000);

//     let newErrors = {
//       department: !selectedDepartment,
//       employee: !selectedEmployee,
//       taskTitle: !taskTitle,
//       dueTime: !dueTime,
//     };


//     setErrors(newErrors);
//     if (Object.values(newErrors).some((error) => error)) {
//       return;
//     }
    
//      // ✅ Extract only the Date (YYYY-MM-DD)
//       const formattedDueDate = new Date(dueTime).toISOString().split("T")[0];

//       const newTask: Task = {
//         id: Date.now(), // Unique ID
//         title: taskTitle,
//         name: selectedEmployee,
//         department: selectedDepartment,
//         status: "New", // ✅ Set as "New" first
//         dueDate: formattedDueDate, // ✅ Store only the date (No Time)
//         attachment: attachment ? attachment.name : "No Attachment",
//         createdAt: new Date().toISOString(), // ✅ Store timestamp for tracking
//       };
      

//     // const newTask: Task = {
//     //   id: Date.now(), // Unique ID
//     //   title: taskTitle,
//     //   name: selectedEmployee,
//     //   department: selectedDepartment,
//     //   status: "Pending", // Default status
//     //   //dueDate: dueTime, // ✅ Use 'dueDate' instead of 'date'
//     //   dueDate: formattedDueDate, // ✅ Store only the date (No Time)
//     //   attachment: attachment ? attachment.name : "No Attachment",
//     // };

//     setTasks((prevTasks) => [newTask, ...prevTasks]); // ✅ Add new task at the top

//   //  toast.success("Task Added Successfully!", { autoClose: 1000 });

      
//     handleClose();
//   };

//   // Reset form on Close
//   const handleClose = () => {
//     setSelectedDepartment("");
//     setSelectedEmployee("");
//     setTaskTitle("");
//     setAttachment(null);
//     setDueTime("");
  
//     setErrors({
//       department: false,
//       employee: false,
//       taskTitle: false,
//       dueTime: false,
//     });
  
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//       <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", bgcolor: "#f5f5f5" }}>
//         Add New Task
//         <IconButton onClick={handleClose} sx={{ position: "absolute", right: 10, top: 10 }}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent sx={{ p: 3 }}>
//         <Paper elevation={3} sx={{ p: 3, borderRadius: "10px" }}>
//           <Grid container spacing={2}>

//             {/* Department Dropdown */}
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
//                   Select Department
//                 </Typography>
//                 <Select
//                   value={selectedDepartment}
//                   onChange={(e) => {
//                     setSelectedDepartment(e.target.value);
//                     setSelectedEmployee(""); // Reset Employee selection
//                     setErrors((prev) => ({ ...prev, department: false }));
//                   }}
//                   displayEmpty
//                   renderValue={(selected) =>
//                     selected ? selected : <span style={{ color: "#aaa" }}>Select Department</span>
//                   } // Placeholder in lighter color
//                 >
//                   <MenuItem value="" disabled>Select Department</MenuItem>
//                   {departments.map((dept, index) => (
//                     <MenuItem key={index} value={dept}>{dept}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Employee Dropdown */}
//             <Grid item xs={12}>
//               <FormControl fullWidth disabled={!selectedDepartment}>
//                 <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
//                   Select Employee
//                 </Typography>
//                 <Select
//                   value={selectedEmployee}
//                   onChange={(e) => {
//                     setSelectedEmployee(e.target.value);
//                     setErrors((prev) => ({ ...prev, employee: false }));
//                   }}
//                   displayEmpty
//                   renderValue={(selected) =>
//                     selected ? selected : <span style={{ color: "#aaa" }}>Select Employee</span>
//                   } // Placeholder in lighter color
//                 >
//                   <MenuItem value="" disabled>Select Employee</MenuItem>
//                   {employees.map((emp) => (
//                     <MenuItem key={emp.id} value={emp.name}>
//                       {emp.name} - {emp.designation}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             {/* <ToastContainer position="top-right" autoClose={2000} hideProgressBar /> */}

            
//             {/* Task Title */}
//             <Grid item xs={12}>
//               <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>Task Title</Typography>
//               <TextField
//                 fullWidth
//                 placeholder="Enter Task"
//                 value={taskTitle}
//                 onChange={(e) => {
//                   setTaskTitle(e.target.value);
//                   setErrors((prev) => ({ ...prev, taskTitle: false }));
//                 }}
//                 error={errors.taskTitle}
//                 helperText={errors.taskTitle ? "* Task Title is required" : ""}
//               />
//             </Grid>

//             {/* File Upload */}
//             <Grid item xs={12}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Button
//                   variant="contained"
//                   component="label"
//                   startIcon={<UploadFileIcon />}
//                   sx={{ bgcolor: "#1976D2", color: "white" }}
//                 >
//                   Upload File
//                   <input type="file" hidden onChange={handleFileChange} />
//                 </Button>
//                 {attachment && (
//                   <Typography variant="body2" color="textSecondary">
//                     {attachment.name}
//                   </Typography>
//                 )}
//               </Box>
//             </Grid>

//             {/* Due Date & Time */}
//             <Grid item xs={12}>
//               <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>Due Date</Typography>
//               <TextField
//                 fullWidth
//                 // type="datetime-local" // This includes both Date & Time
//                 type="date" // This keeps only the date
//                 value={dueTime}
//                 onChange={(e) => {
//                   setDueTime(e.target.value);
//                   setErrors((prev) => ({ ...prev, dueTime: false }));
//                 }}
//                 error={errors.dueTime}
//                 helperText={errors.dueTime ? "* Due Date is required" : ""}
//               />
//             </Grid>
//           </Grid>
//         </Paper>
//       </DialogContent>

//       <DialogActions sx={{ justifyContent: "space-between", p: 2 }}>
//         <Button onClick={handleClose} color="secondary" variant="outlined">Close</Button>
//         <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddTask;



// import { useState } from "react";
// import {
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   Button, TextField, MenuItem, Select, FormControl,
//   InputLabel, Typography, Box, IconButton, Grid, Paper
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// interface AddTaskProps {
//   open: boolean;
//   onClose: () => void;
// }

// const AddTask: React.FC<AddTaskProps> = ({ open, onClose }) => {
//   const [selectedDepartment, setSelectedDepartment] = useState<string>("");
//   const [selectedEmployee, setSelectedEmployee] = useState<string>("");
//   const [taskTitle, setTaskTitle] = useState<string>("");
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const [dueTime, setDueTime] = useState<string>("");
//   const [toastShown, setToastShown] = useState<boolean>(false); // Track toast status

//   const [errors, setErrors] = useState({
//     department: false,
//     employee: false,
//     taskTitle: false,
//     dueTime: false,
//   });
  

//   // Extract unique departments
//   const departments = Array.from(new Set(departmentEmployeesDetails.map((item) => item.department)));

//   // Get employees of selected department
//   const employees = departmentEmployeesDetails.filter((item) => item.department === selectedDepartment);

//   // Handle File Selection (Optional)
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setAttachment(event.target.files[0]);
//     }
//   };

//   // Submit Task
// //   const handleSubmit = () => {
// //     console.log({
// //       department: selectedDepartment,
// //       employee: selectedEmployee,
// //       taskTitle,
// //       attachment: attachment ? attachment.name : "No Attachment", // Optional File Upload
// //       dueTime,
// //     });
// //     handleClose(); // Reset form after submission
// //   };

//   // Reset form on Close
//   const handleClose = () => {
//     setSelectedDepartment("");
//     setSelectedEmployee("");
//     setTaskTitle("");
//     setAttachment(null);
//     setDueTime("");
  
//     // Reset error messages when closing the popup
//     setErrors({
//       department: false,
//       employee: false,
//       taskTitle: false,
//       dueTime: false,
//     });
  
//     onClose();
//   };
  
//   const handleSubmit = () => {
//     let newErrors = {
//       department: !selectedDepartment,
//       employee: !selectedEmployee,
//       taskTitle: !taskTitle,
//       dueTime: !dueTime,
//     };
  
//     setErrors(newErrors); // Update error state
  
//     if (Object.values(newErrors).some((error) => error)) {
//       return; // Stop form submission if there are errors
//     }
  
//     console.log({
//       department: selectedDepartment,
//       employee: selectedEmployee,
//       taskTitle,
//       attachment: attachment ? attachment.name : "No Attachment",
//       dueTime,
//     });
  
//     handleClose(); // Reset form
//   };
  
  

// //   toast.configure();

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//       <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", bgcolor: "#f5f5f5" }}>
//         Add New Task
//         <IconButton onClick={handleClose} sx={{ position: "absolute", right: 10, top: 10 }}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent sx={{ p: 3 }}>
//         <Paper elevation={3} sx={{ p: 3, borderRadius: "10px" }}>
//           <Grid container spacing={2}>

//             {/* Department Dropdown */}
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//               <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
//                 Select Department
//                 </Typography>
//                 <Select
//                   value={selectedDepartment}
//                   onChange={(e) => {
//                     setSelectedDepartment(e.target.value);
//                     setSelectedEmployee(""); // Reset Employee Selection
//                     setErrors((prev) => ({ ...prev, department: false })); // Clear error

//                   }}
//                   displayEmpty
//                   renderValue={(selected) =>
//                     selected ? selected : <span style={{ color: "#aaa" }}>Select Department</span>
//                   } // Placeholder in lighter color

//                 >
//                     <MenuItem value="" disabled>
//                         Select Department
//                     </MenuItem>
//                   {departments.map((dept, index) => (
//                     <MenuItem key={index} value={dept}>
//                       {dept}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//            {/* Employee Dropdown */}
//                     <Grid item xs={12}>
//                     <FormControl fullWidth disabled={!selectedDepartment}>
//                         <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
//                         Select Employee
//                         </Typography>
//                         <Select
//                         value={selectedEmployee}
//                         onChange={(e) => {
//                             setSelectedEmployee(e.target.value);
//                             setErrors((prev) => ({ ...prev, employee: false })); // Clear error
//                           }}
//                         displayEmpty
//                         renderValue={(selected) =>
//                             selected ? selected : <span style={{ color: "#aaa" }}>Select Employee</span>
//                         }
//                         onMouseEnter={() => {
//                             if (!selectedDepartment && !toastShown) {
//                                 setToastShown(true); // Prevent multiple toasts
//                                 toast.warning("Please select a department first.", {
//                                   position: "top-right",
//                                   autoClose: 2000,
//                                   hideProgressBar: true,
//                                   closeOnClick: true,
//                                   pauseOnHover: false,
//                                   draggable: true,
//                                   theme: "colored",
//                                   onClose: () => setToastShown(false), // Reset after toast disappears
//                                 });
//                             }
//                         }}
//                         >
//                         <MenuItem value="" disabled>
//                             Select Employee
//                         </MenuItem>
//                         {employees.map((emp) => (
//                             <MenuItem key={emp.id} value={emp.name}>
//                             {emp.name} - {emp.designation}
//                             </MenuItem>
//                         ))}
//                         </Select>
//                     </FormControl>
//                     </Grid>
//                     <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

//             {/* Task Title */}
//             <Grid item xs={12}>
//             <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
//                 Task Title    
//             </Typography>
//               <TextField
//                 fullWidth
//                 // label="Task Title"
//                 placeholder="Enter Task"
//                 value={taskTitle}
//                 onChange={(e) => {
//                     setTaskTitle(e.target.value);
//                     setErrors((prev) => ({ ...prev, taskTitle: false })); // Clear error
//                   }}
//                   error={errors.taskTitle}
//                   helperText={errors.taskTitle ? "* Task Title is required" : ""}
                
//               />
//             </Grid>

//             {/* File Upload (Optional) */}
//             <Grid item xs={12}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Button
//                   variant="contained"
//                   component="label"
//                   startIcon={<UploadFileIcon />}
//                   sx={{ bgcolor: "#1976D2", color: "white" }}
//                 >
//                   Upload File
//                   <input type="file" hidden onChange={handleFileChange} />
//                 </Button>
//                 {attachment && (
//                   <Typography variant="body2" color="textSecondary">
//                     {attachment.name}
//                   </Typography>
//                 )}
//               </Box>
//             </Grid>

//             {/* Due Date & Time */}
//             <Grid item xs={12}>
//             <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
//                 Due date           
//              </Typography>
//               <TextField
//                 fullWidth
//                 type="datetime-local"
//                 value={dueTime}
//                 onChange={(e) => {
//                     setDueTime(e.target.value);
//                     setErrors((prev) => ({ ...prev, dueTime: false })); // Clear error
//                   }}
//                   error={errors.dueTime}
//                   helperText={errors.dueTime ? "* Due Date is required" : ""}
//               />
//             </Grid>
//           </Grid>
//         </Paper>
//       </DialogContent>

//       <DialogActions sx={{ justifyContent: "space-between", p: 2 }}>
//         <Button onClick={handleClose} color="secondary" variant="outlined">
//           Close
//         </Button>
//         {/* <Button
//           onClick={handleSubmit}
//           variant="contained"
//           color="primary"
//           disabled={!selectedDepartment || !selectedEmployee || !taskTitle}
//         >
//           Submit
//         </Button> */}
//             <Button
//             onClick={handleSubmit}
//             variant="contained"
//             color="primary"
//             >
//             Submit
//             </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddTask;
