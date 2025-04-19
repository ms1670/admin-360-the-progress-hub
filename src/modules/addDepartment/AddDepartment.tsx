import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { departmentData } from "../../data/departmentCategoryData";
import { toast } from "react-toastify";

interface AddDepartmentProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; category: string }) => void;
}

const AddDepartment: React.FC<AddDepartmentProps> = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = () => {
    if (name && selectedCategory) {
      onSubmit({ name, category: selectedCategory });
      toast.success("Department added successfully!");
      setName("");
      setSelectedCategory("");
      onClose();
    } else {
      toast.warning("Please fill in all fields.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Department</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Department Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            {departmentData.map((item, index) => (
              <MenuItem key={index} value={item.category}>
                {item.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDepartment;
