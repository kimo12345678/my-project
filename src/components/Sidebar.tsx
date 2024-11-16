import React, { useState } from "react";
import { FaThLarge, FaClock, FaFileAlt, FaUsers, FaCube } from "react-icons/fa"; // Import necessary icons
import logo from "../assets/logo.png"; // Adjust relative path if necessary

const Sidebar: React.FC = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  // Handles setting active button
  const handleButtonClick = (index: number) => {
    setActiveButton(index);
  };

  return (
    <div
      style={{
        width: "5%", // Match width from image
        color: "#333", // Default icon color
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh", // Full height of viewport
        paddingTop: "1rem",
      }}
    >
      {/* Top Logo */}
      <div style={{ marginBottom: "2rem" }}>
        <img
          src={logo} // Replace with the correct path to your logo
          alt="Logo"
          style={{ width: "64px" }}
        />
      </div>

      {/* Icon Buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem", // Space between buttons
        }}
      >
        {[
          { icon: <FaThLarge />, index: 0 },
          { icon: <FaClock />, index: 1 },
          { icon: <FaFileAlt />, index: 2 },
          { icon: <FaUsers />, index: 3 },
          { icon: <FaCube />, index: 4 },
        ].map((item) => (
          <button
            key={item.index}
            onClick={() => handleButtonClick(item.index)}
            style={{
              backgroundColor:
                item.index === activeButton ? "#007BFF" : "transparent", // Highlight active button
              border: "none",
              color: item.index === activeButton ? "#fff" : "lightgray", // Change color for active button
              fontSize: "1.5rem",
              padding: "0.5rem",
              borderRadius: "31%", // Circular button style
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "32px",
              height: "32px",
            }}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
