import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { departmentData } from "../../data/departmentCategoryData";
import { SelectChangeEvent } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AddMemberProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (member: {
    name: string;
    category: string;
    department: string;
    designation: string;
    registerNumber: string;
    email: string;
  }) => void;
};

const AddMember: React.FC<AddMemberProps> = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [email, setEmail] = useState("");

  const departments =
    departmentData.find((cat) => cat.category === selectedCategory)?.departments || [];

    useEffect(() => {
        if (selectedDepartment && designation && name) {
          const register = `${selectedDepartment} - ${designation} - ${name} - 001`;
          setRegisterNumber(register);
        }
      
        if (name && selectedDepartment) {
          const deptMail = selectedDepartment.replace(/\s+/g, "").toLowerCase();
          const nameMail = name.replace(/\s+/g, "").toLowerCase();
          setEmail(`${nameMail}@${deptMail}.com`);
        }
      }, [name, designation, selectedDepartment]);

      
//   useEffect(() => {
//     // Generate placeholders dynamically when values are selected
//     if (selectedDepartment && designation) {
//       const deptShort = selectedDepartment.replace(/\s+/g, "-").toLowerCase();
//       const desigShort = designation.replace(/\s+/g, "-").toLowerCase();
//       setRegisterNumber(`${selectedDepartment} - ${designation} - 001`);
//     }

//     if (name && selectedDepartment) {
//       const deptMail = selectedDepartment.replace(/\s+/g, "").toLowerCase();
//       const nameMail = name.replace(/\s+/g, "").toLowerCase();
//       setEmail(`${nameMail}@${deptMail}.com`);
//     }
//   }, [name, designation, selectedDepartment]);

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setSelectedCategory(e.target.value);
    setSelectedDepartment("");
  };

  const handleSubmit = () => {
    if (name && selectedCategory && selectedDepartment && designation && registerNumber && email) {
      onSubmit({
        name,
        category: selectedCategory,
        department: selectedDepartment,
        designation,
        registerNumber,
        email,
      });

      toast.success(`${name} added to ${selectedDepartment} (${selectedCategory})`);

      setName("");
      setSelectedCategory("");
      setSelectedDepartment("");
      setDesignation("");
      setRegisterNumber("");
      setEmail("");
      onClose();
    } else {
      toast.error("Please fill in all fields!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Member</DialogTitle>
      <DialogContent>
        <TextField
          label="Member Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Department Category</InputLabel>
          <Select value={selectedCategory} onChange={handleCategoryChange} label="Department Category">
            {departmentData.map((cat) => (
              <MenuItem key={cat.category} value={cat.category}>
                {cat.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={!selectedCategory}>
          <InputLabel>Department Name</InputLabel>
          <Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            label="Department Name"
          >
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.name}>
                {dept.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Register Number"
          value={registerNumber}
          placeholder="Auto-generated based on selection"
          fullWidth
          margin="normal"
          disabled
        />

        <TextField
          label="Email ID"
          value={email}
          placeholder="Auto-generated based on name & department"
          fullWidth
          margin="normal"
          disabled
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!name || !selectedDepartment || !designation}
        >
          Add Member
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMember;



// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Typography,
// } from "@mui/material";
// import { departmentData } from "../../data/departmentCategoryData";
// import { SelectChangeEvent } from "@mui/material";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// type AddMemberProps = {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (member: { name: string; category: string; department: string }) => void;
// };
  

// const AddMember: React.FC<AddMemberProps> = ({ open, onClose, onSubmit }) => {
//   const [name, setName] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState("");

// //   const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
// //     setSelectedCategory(e.target.value as string);
// //     setSelectedDepartment(""); // reset department when category changes
// //   };

//   const handleCategoryChange = (e: SelectChangeEvent<string>) => {
//     setSelectedCategory(e.target.value);
//     setSelectedDepartment("");
//   };
  

// //   const handleSubmit = () => {
// //     if (name && selectedCategory && selectedDepartment) {
// //       onSubmit({ name, category: selectedCategory, department: selectedDepartment });
// //       setName("");
// //       setSelectedCategory("");
// //       setSelectedDepartment("");
// //       onClose();
// //     }
// //   };

// const handleSubmit = () => {
//     if (name && selectedCategory && selectedDepartment) {
//       onSubmit({
//         name,
//         category: selectedCategory,
//         department: selectedDepartment,
//       });
  
//       toast.success(`${name} added to ${selectedDepartment} (${selectedCategory})`);
  
//       setName("");
//       setSelectedCategory("");
//       setSelectedDepartment("");
//       onClose();
//     } else {
//       toast.error("Please fill in all fields!");
//     }
//   };
  

//   const departments =
//     departmentData.find((cat) => cat.category === selectedCategory)?.departments || [];

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>Add Member</DialogTitle>
//       <DialogContent>
//         <TextField
//           label="Member Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           fullWidth
//           margin="normal"
//         />

//         <FormControl fullWidth margin="normal">
//           <InputLabel>Department Category</InputLabel>
//           <Select value={selectedCategory} onChange={handleCategoryChange} label="Department Category">
//             {departmentData.map((cat) => (
//               <MenuItem key={cat.category} value={cat.category}>
//                 {cat.category}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth margin="normal" disabled={!selectedCategory}>
//           <InputLabel>Department Name</InputLabel>
//           <Select
//             value={selectedDepartment}
//             onChange={(e) => setSelectedDepartment(e.target.value)}
//             label="Department Name"
//           >
//             {departments.map((dept) => (
//               <MenuItem key={dept.id} value={dept.name}>
//                 {dept.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={onClose}>Close</Button>
//         <Button onClick={handleSubmit} variant="contained" disabled={!name || !selectedDepartment}>
//           Add Member
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };


// export default AddMember;
