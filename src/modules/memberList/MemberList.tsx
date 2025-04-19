import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

// Matching structure of departmentEmployeesDetails
type Member = {
  id: number;
  name: string;
  email: string;
  department: string;
  designation: string;
};

type MemberListProps = {
  members: Member[];
  onEdit?: (member: Member) => void;
  onDelete?: (member: Member) => void;
};

const MemberList: React.FC<MemberListProps> = ({ members, onEdit, onDelete }) => {
  return (
    <Card sx={{ marginTop: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Member List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Member Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Register No.</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member, index) => {
              const registerNumber = `${member.department}-${member.designation}-${member.name}-${member.id}`;
              return (
                <TableRow key={index}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.designation}</TableCell>
                  <TableCell>{registerNumber}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell align="center">
                    {onEdit && (
                      <IconButton onClick={() => onEdit(member)}>
                        <Edit fontSize="small" />
                      </IconButton>
                    )}
                    {onDelete && (
                      <IconButton onClick={() => onDelete(member)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MemberList;
