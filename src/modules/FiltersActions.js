import React, { useState, useEffect, useRef } from "react";
import "./FiltersActions.css";
import { FiFilter, FiPlus, FiUsers, FiBriefcase } from "react-icons/fi";
import { departments } from "../data/departments"; // ✅ Corrected import
import AddTask from "../components/AddTask/AddTask"; // Import the AddTask component

const FiltersActions = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleCheckboxChange = (dept) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const handleAddTaskClick = () => {
    setIsAddTaskOpen(true); // Open the "Add Task" popup
  };

  const handleClosePopup = () => {
    setIsAddTaskOpen(false); // Close the "Add Task" popup
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="filters-actions">
      <div className="actions">
        {/* Filter Button */}
        <div className="filters" ref={dropdownRef}>
          <button className="filter-btn" onClick={toggleDropdown}>
            <FiFilter />
          </button>
          {isDropdownOpen && (
            <div className="dropdown">
              {departments.map((dept) => (
                <label key={dept} className="dropdown-item">
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(dept)}
                    onChange={() => handleCheckboxChange(dept)}
                  />
                  {dept}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <button className="action-btn" onClick={handleAddTaskClick}>
          <FiPlus /> Add Task
        </button>
        <button className="action-btn">
          <FiUsers /> Add Members
        </button>
        <button className="action-btn">
          <FiBriefcase /> Add Department
        </button>
      </div>

      {/* Add Task Popup */}
      <AddTask isOpen={isAddTaskOpen} onClose={handleClosePopup} />
    </div>
  );
};

export default FiltersActions;



// import React, { useState, useEffect, useRef } from "react";
// import "./FiltersActions.css";
// import { FiFilter, FiPlus, FiUsers, FiBriefcase } from "react-icons/fi";
// import { departments } from "../data/departments"; // ✅ Corrected import

// const FiltersActions = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedDepartments, setSelectedDepartments] = useState([]);
//   const dropdownRef = useRef(null);

//   const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

//   const handleCheckboxChange = (dept) => {
//     setSelectedDepartments((prev) =>
//       prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
//     );
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     if (isDropdownOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isDropdownOpen]);

//   return (
//     <div className="filters-actions">
//       <div className="actions">
//         {/* Filter Button */}
//         <div className="filters" ref={dropdownRef}>
//           <button className="filter-btn" onClick={toggleDropdown}>
//             <FiFilter />
//           </button>
//           {isDropdownOpen && (
//             <div className="dropdown">
//               {departments.map((dept) => (
//                 <label key={dept} className="dropdown-item">
//                   <input
//                     type="checkbox"
//                     checked={selectedDepartments.includes(dept)}
//                     onChange={() => handleCheckboxChange(dept)}
//                   />
//                   {dept}
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <button className="action-btn">
//           <FiPlus /> Add Task
//         </button>
//         <button className="action-btn">
//           <FiUsers /> Add Members
//         </button>
//         <button className="action-btn">
//           <FiBriefcase /> Add Department
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FiltersActions;



// import React, { useState, useEffect, useRef } from "react";
// import "./FiltersActions.css";
// import { FiFilter, FiPlus, FiUsers, FiBriefcase } from "react-icons/fi";

// const FiltersActions = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedDepartments, setSelectedDepartments] = useState([]);
//   const dropdownRef = useRef(null);

//   const departments = ["HR", "Engineering", "Marketing", "Sales", "Finance"];

//   const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

//   const handleCheckboxChange = (dept) => {
//     setSelectedDepartments((prev) =>
//       prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
//     );
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     if (isDropdownOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isDropdownOpen]);

//   return (
//     <div className="filters-actions">
//       {/* ✅ Filters & Actions aligned properly */}
//       <div className="actions">
//         {/* Filter Button (Before "Add Task") */}
//         <div className="filters" ref={dropdownRef}>
//           <button className="filter-btn" onClick={toggleDropdown}>
//             <FiFilter />
//           </button>
//           {isDropdownOpen && (
//             <div className="dropdown">
//               {departments.map((dept) => (
//                 <label key={dept} className="dropdown-item">
//                   <input
//                     type="checkbox"
//                     checked={selectedDepartments.includes(dept)}
//                     onChange={() => handleCheckboxChange(dept)}
//                   />
//                   {dept}
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <button className="action-btn">
//           <FiPlus /> Add Task
//         </button>
//         <button className="action-btn">
//           <FiUsers /> Add Members
//         </button>
//         <button className="action-btn">
//           <FiBriefcase /> Add Department
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FiltersActions;
