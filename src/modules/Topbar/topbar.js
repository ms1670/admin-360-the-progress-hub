
import React, { useState, useEffect } from "react";
import "./topbar.css";
import { FiSearch, FiBell, FiInbox, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import profileImage from "../../assets/profile-demo-img.png"; // Correct Import Path

const Topbar = () => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile, .profile-menu")) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="topbar">
      {/* ✅ Left: Logo & Title */}
      <div className="topbar-left">
        <img src="/logo192.png" alt="Logo" className="logo" />
        <h1 className="project-title">Task Manager</h1>
      </div>

      {/* ✅ Center: Search Bar */}
      <div className="topbar-center">
        <input type="text" className="search-input" placeholder="Search..." />
        <button className="search-btn">
          <FiSearch className="search-icon" />
        </button>
      </div>

      {/* ✅ Right: Icons & Profile */}
      <div className="topbar-right">
        <button className="icon-btn">
          <FiInbox />
        </button>
        <button className="icon-btn">
          <FiBell />
        </button>

        {/* ✅ Profile Section */}
        <div className="profile" onClick={toggleProfileMenu}>
          <img src={profileImage} alt="User" className="profile-img" />
          <span className="user-name">Pravin</span>
        </div>

        {/* ✅ Profile Menu Dropdown */}
        {isProfileMenuOpen && (
          <div className="profile-menu">
            <button className="profile-menu-item">
              <FiUser className="menu-icon" /> Profile
            </button>
            <button className="profile-menu-item">
              <FiSettings className="menu-icon" /> Settings
            </button>
            <button className="profile-menu-item logout">
              <FiLogOut className="menu-icon" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;

// import React from "react";
// import "./topbar.css";
// import { FiSearch, FiBell, FiInbox } from "react-icons/fi";
// import profileImage from "../../assets/profile-demo-img.png"; // Correct Import Path // Import the image

// const Topbar = () => {
//   return (
//     <div className="topbar">
//       {/* ✅ Left: Logo & Title */}
//       <div className="topbar-left">
//         <img src="/logo192.png" alt="Logo" className="logo" />
//         <h1 className="project-title">Task Manager</h1>
//       </div>

//       {/* ✅ Center: Search Bar */}
//       <div className="topbar-center">
//         <input type="text" className="search-input" placeholder="Search..." />
//         <button className="search-btn">
//           <FiSearch className="search-icon" />
//         </button>
//       </div>

//       {/* ✅ Right: Icons & Profile */}
//       <div className="topbar-right">
//         <button className="icon-btn">
//           <FiInbox />
//         </button>
//         <button className="icon-btn">
//           <FiBell />
//         </button>
//         <div className="profile">
//           <img src={profileImage} alt="User" className="profile-img" />
//           <span className="user-name">Pravin</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;
