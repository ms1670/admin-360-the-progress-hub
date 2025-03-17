import React, { useState } from "react";
import "./sidebar.css";
import { FiMenu, FiSettings, FiLogOut } from "react-icons/fi";
import { MdDashboard, MdBusiness, MdTask, MdBarChart, MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation
import { departments } from "../../data/departments"; // Import department list

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleMenuClick = (item, path) => {
    setActiveItem(item);
    if (path) {
      navigate(path);
    }

    // Only toggle departments submenu
    if (item === "Department") {
      setIsDeptOpen(!isDeptOpen);
    } else {
      setIsDeptOpen(false); // Close submenu if other menu items are clicked
    }
  };

  const handleDepartmentClick = (dept) => {
    setActiveItem(dept);  // Highlight active department
    navigate(`/departments/${dept}`);  // Navigate to department page
  };

  return (
    <div className={`sidebar ${isOpen ? "" : "closed"}`}>
      <div className="sidebar-body">
        <ul className="top-menu">
          {[ 
            { name: "Dashboard", icon: <MdDashboard />, path: "/" },
            { name: "Department", icon: <MdBusiness />, hasSubmenu: true },
            { name: "Task", icon: <MdTask />, path: "/tasks" },
            { name: "Report", icon: <MdBarChart />, path: "/reports" },
          ].map((item) => (
            <React.Fragment key={item.name}>
              <li
                className={`menu-item ${isOpen ? "expanded" : ""} ${activeItem === item.name ? "active" : ""}`}
                onClick={() => handleMenuClick(item.name, item.path)}
              >
                <span className="icon-sidebar">{item.icon}</span>
                {isOpen && <span className="menu-text">{item.name}</span>}
                {item.hasSubmenu && isOpen && (
                  <span className="submenu-icon material-symbols-outlined">
                    {isDeptOpen ? "arrow_drop_up" : "arrow_drop_down"}
                  </span>
                )}
              </li>

              {/* ✅ Department Submenu */}
              {item.hasSubmenu && isDeptOpen && isOpen && (
                <ul className="sub-menu">
                  {departments.map((dept) => (
                    <li
                      key={dept}
                      className={`submenu-item ${activeItem === dept ? "active" : ""}`}
                      onClick={() => handleDepartmentClick(dept)}
                    >
                      {dept}
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>

        <ul className="bottom-menu">
          {[ 
            { name: "Settings", icon: <FiSettings />, path: "/settings" },
            { name: "Logout", icon: <FiLogOut />, path: "/logout" },
          ].map((item) => (
            <li
              key={item.name}
              className={`menu-item ${isOpen ? "expanded" : ""} ${activeItem === item.name ? "active" : ""}`}
              onClick={() => handleMenuClick(item.name, item.path)}
            >
              <span className="icon-sidebar">{item.icon}</span>
              {isOpen && <span className="menu-text">{item.name}</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <MdArrowBackIosNew /> : <FiMenu />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


// import React, { useState } from "react";
// import "./sidebar.css";
// import { FiMenu, FiSettings, FiLogOut } from "react-icons/fi";
// import { MdDashboard, MdBusiness, MdTask, MdBarChart, MdArrowBackIosNew } from "react-icons/md";
// import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation
// import { departments } from "../../data/departments"; // Import departments list

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const [activeItem, setActiveItem] = useState("Dashboard");
//   const [isDeptOpen, setIsDeptOpen] = useState(false);
//   const navigate = useNavigate();  // Initialize useNavigate hook

//   const handleMenuClick = (item, path) => {
//     setActiveItem(item);
//     if (path) {
//       navigate(path);
//     }

//     // Only toggle departments submenu
//     if (item === "Department") {
//       setIsDeptOpen(!isDeptOpen);
//     } else {
//       setIsDeptOpen(false); // Close submenu if other menu items are clicked
//     }
//   };

//   const handleDepartmentClick = (dept) => {
//     setActiveItem(dept);  // Highlight active department
//     navigate(`/departments/${dept}`);  // Navigate to department page
//   };

//   return (
//     <div className={`sidebar ${isOpen ? "" : "closed"}`}>
//       <div className="sidebar-body">
//         <ul className="top-menu">
//           {[
//             { name: "Dashboard", icon: <MdDashboard />, path: "/" },
//             { name: "Department", icon: <MdBusiness />, hasSubmenu: true },
//             { name: "Task", icon: <MdTask />, path: "/tasks" },
//             { name: "Report", icon: <MdBarChart />, path: "/reports" },
//           ].map((item) => (
//             <React.Fragment key={item.name}>
//               <li
//                 className={`menu-item ${isOpen ? "expanded" : ""} ${activeItem === item.name ? "active" : ""}`}
//                 onClick={() => handleMenuClick(item.name, item.path)}
//               >
//                 <span className="icon-sidebar">{item.icon}</span>
//                 {isOpen && <span className="menu-text">{item.name}</span>}
//                 {item.hasSubmenu && isOpen && (
//                   <span className="submenu-icon material-symbols-outlined">
//                     {isDeptOpen ? "arrow_drop_up" : "arrow_drop_down"}
//                   </span>
//                 )}
//               </li>

//               {/* ✅ Department Submenu */}
//               {item.hasSubmenu && isDeptOpen && isOpen && (
//                 <ul className="sub-menu">
//                   {departments.map((dept) => (
//                     <li
//                       key={dept}
//                       className={`submenu-item ${activeItem === dept ? "active" : ""}`}
//                       onClick={() => handleDepartmentClick(dept)}
//                     >
//                       {dept}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </React.Fragment>
//           ))}
//         </ul>

//         <ul className="bottom-menu">
//           {[
//             { name: "Settings", icon: <FiSettings />, path: "/settings" },
//             { name: "Logout", icon: <FiLogOut />, path: "/logout" },
//           ].map((item) => (
//             <li
//               key={item.name}
//               className={`menu-item ${isOpen ? "expanded" : ""} ${activeItem === item.name ? "active" : ""}`}
//               onClick={() => handleMenuClick(item.name, item.path)}
//             >
//               <span className="icon-sidebar">{item.icon}</span>
//               {isOpen && <span className="menu-text">{item.name}</span>}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="sidebar-header">
//         <button className="toggle-btn" onClick={toggleSidebar}>
//           {isOpen ? <MdArrowBackIosNew /> : <FiMenu />}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


// import React, { useState } from "react";
// import "./sidebar.css";
// import { FiMenu, FiSettings, FiLogOut } from "react-icons/fi";
// import { MdDashboard, MdBusiness, MdTask, MdBarChart, MdArrowBackIosNew } from "react-icons/md";
// import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation
// import { departments } from "../../data/departments"; //  Import departments list

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const [activeItem, setActiveItem] = useState("Dashboard");
//   const [isDeptOpen, setIsDeptOpen] = useState(false);
//   const navigate = useNavigate();  // Initialize the useNavigate hook

//   const handleMenuClick = (item) => {
//     setActiveItem(item);
//     if (item === "Department") {
//       setIsDeptOpen(!isDeptOpen);
//     } else if (item === "Dashboard") {
//       // Navigate to the root path when "Dashboard" is clicked
//       navigate("/"); 
//     }
//   };

//   const handleDepartmentClick = (dept) => {
//     setActiveItem(dept);  // Set the department as active
//     navigate(`/departments/${dept}`);  // Navigate to the department page
//   };

//   return (
//     <div className={`sidebar ${isOpen ? "" : "closed"}`}>
//       <div className="sidebar-body">
//         <ul className="top-menu">
//           {[
//             { name: "Dashboard", icon: <MdDashboard /> },
//             { name: "Department", icon: <MdBusiness />, hasSubmenu: true },
//             { name: "Task", icon: <MdTask /> },
//             { name: "Report", icon: <MdBarChart /> },
//           ].map((item) => (
//             <React.Fragment key={item.name}>
//               <li
//                 className={`menu-item ${isOpen ? "expanded" : ""} ${activeItem === item.name ? "active" : ""}`}
//                 onClick={() => handleMenuClick(item.name)}
//               >
//                 <span className="icon-sidebar">{item.icon}</span>
//                 {isOpen && <span className="menu-text">{item.name}</span>}
//                 {item.hasSubmenu && isOpen && (
//                   <span className="submenu-icon material-symbols-outlined">
//                     {isDeptOpen ? "arrow_drop_up" : "arrow_drop_down"}
//                   </span>
//                 )}
//               </li>

//               {item.hasSubmenu && isDeptOpen && isOpen && (
//                 <ul className="sub-menu">
//                   {departments.map((dept) => (
//                     <li
//                       key={dept}
//                       className={`submenu-item ${activeItem === dept ? "active" : ""}`}
//                       onClick={() => handleDepartmentClick(dept)}  // Use handleDepartmentClick for department selection
//                     >
//                       {dept}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </React.Fragment>
//           ))}
//         </ul>

//         <ul className="bottom-menu">
//           {[
//             { name: "Settings", icon: <FiSettings /> },
//             { name: "Logout", icon: <FiLogOut /> },
//           ].map((item) => (
//             <li
//               key={item.name}
//               className={`menu-item ${isOpen ? "expanded" : ""} ${activeItem === item.name ? "active" : ""}`}
//               onClick={() => handleMenuClick(item.name)}
//             >
//               <span className="icon-sidebar">{item.icon}</span>
//               {isOpen && <span className="menu-text">{item.name}</span>}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="sidebar-header">
//         <button className="toggle-btn" onClick={toggleSidebar}>
//           {isOpen ? <MdArrowBackIosNew /> : <FiMenu />}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const [activeItem, setActiveItem] = useState("Dashboard"); // Track active menu
//   const [isDeptOpen, setIsDeptOpen] = useState(false); // Track department submenu state

//   const handleMenuClick = (item) => {
//     setActiveItem(item);
//     if (item === "Department") {
//       setIsDeptOpen(!isDeptOpen); // Toggle Department Submenu
//     }
//   };

//   return (
//     <div className={`sidebar ${isOpen ? "" : "closed"}`}>
//       {/* ✅ Sidebar Body */}
//       <div className="sidebar-body">
//         {/* ✅ Top Menu Items */}
//         <ul className="menu">
//           {[
//             { name: "Dashboard", icon: <MdDashboard /> },
//             { name: "Department", icon: <MdBusiness />, hasSubmenu: true },
//             { name: "Task", icon: <MdTask /> },
//             { name: "Report", icon: <MdBarChart /> },
//           ].map((item) => (
//             <React.Fragment key={item.name}>
//               <li
//                 className={`menu-item ${isOpen ? "expanded" : ""} ${
//                   activeItem === item.name ? "active" : ""
//                 }`}
//                 onClick={() => handleMenuClick(item.name)}
//               >
//                 <span className="icon">{item.icon}</span>
//                 {isOpen && <span className="menu-text">{item.name}</span>}
//                 {item.hasSubmenu && isOpen && (
//                   <span className="submenu-icon">
//                     {isDeptOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
//                   </span>
//                 )}
//               </li>

//               {/* ✅ Department Submenu (Only Show When Expanded) */}
//               {item.hasSubmenu && isDeptOpen && isOpen && (
//                 <ul className="submenu">
//                   {["HR", "IT", "Finance", "Marketing"].map((dept) => (
//                     <li
//                       key={dept}
//                       className={`submenu-item ${
//                         activeItem === dept ? "active" : ""
//                       }`}
//                       onClick={() => handleMenuClick(dept)}
//                     >
//                       {dept}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </React.Fragment>
//           ))}
//         </ul>

//         {/* ✅ Bottom Menu Items (Sticky) */}
//         <ul className="bottom-menu">
//           {[
//             { name: "Settings", icon: <FiSettings /> },
//             { name: "Logout", icon: <FiLogOut /> },
//           ].map((item) => (
//             <li
//               key={item.name}
//               className={`menu-item ${isOpen ? "expanded" : ""} ${
//                 activeItem === item.name ? "active" : ""
//               }`}
//               onClick={() => handleMenuClick(item.name)}
//             >
//               <span className="icon">{item.icon}</span>
//               {isOpen && <span className="menu-text">{item.name}</span>}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* ✅ Sidebar Toggle Button */}
//       <div className="sidebar-header">
//         <button className="toggle-btn" onClick={toggleSidebar}>
//           {isOpen ? <MdArrowBackIosNew /> : <FiMenu />}
//         </button>
//       </div>
//     </div>
//   );
// };
