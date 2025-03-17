// export const departmentEmployees = {
//     "Agriculture": ["Aravi", "Krithika"],
//     "Education": ["Murugan", "Malini"],
//     "Labor": ["Siva", "Thamayandhi"],
//     "Co-operation & Food": ["Kumar", "Anitha"],
//     "Town Planning": ["Arun", "Sanjana"],
//     "Finance": ["Suresh", "Devi"],
//     "Customer Support": ["Ramachandran", "Kesavanandhini"],
//     "Legal": ["Venkatesh", "Janaki"],
//     "Support": ["Sethupathi", "Ramya"],
//     "Fine": ["Balaji", "Madhumitha"],
//     "Law and Order": ["Ezhilarasi", "Thayalan"],
//     "More": ["Balaji", "Madhumitha"],
//   };
  

import { departmentEmployeesDetails } from "./departmentEmployeesDetails";

// Generate departmentEmployees dynamically
export const departmentEmployees = departmentEmployeesDetails.reduce((acc, employee) => {
    const { department, name } = employee;

    // Initialize department array if not exists
    if (!acc[department]) {
        acc[department] = [];
    }

    // Add employee name to the respective department
    acc[department].push(name);

    return acc;
}, {});
