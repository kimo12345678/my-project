import React, { useState } from "react";
import { FaBell, FaEnvelope, FaCog, FaUserCircle } from "react-icons/fa";
import photo from "../assets/photo.jpg"; // Adjust relative path if necessary

interface HeaderProps {
  firstName: string;
  familyName: string;
}

const Header: React.FC<HeaderProps> = ({ firstName, familyName }) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <div
      style={{
        height: "5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem", // Horizontal padding
        backgroundColor: "white",
      }}
    >
      {/* Breadcrumbs */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ margin: 0, fontWeight: "bold", color: "#1D3557" }}>
          {firstName} {familyName} Profile
        </h3>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "darkgray" }}>
          Dashboard <span style={{ color: " aquamarine" }}>&gt;</span> HR Manage{" "}
          <span style={{ color: " aquamarine" }}>&gt;</span> Employees{" "}
          <span style={{ color: " aquamarine" }}>&gt;</span>{" "}
          <span style={{ color: "#457B9D", fontWeight: "bold" }}>
            {firstName} {familyName} Profile
          </span>
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {[
          { icon: <FaBell />, id: "bell" },
          { icon: <FaEnvelope />, id: "envelope" },
          { icon: <FaCog />, id: "settings" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleButtonClick(item.id)}
            style={{
              backgroundColor:
                activeButton === item.id ? "transparent" : "transparent",
              color: activeButton === item.id ? "#457B9D" : "#457B9D",
              border: "none",
              fontSize: "1.2rem",
              borderRadius: "50%",
              padding: "0.5rem",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "40px",
              height: "40px",
              transition: "all 0.3s ease",
            }}
          >
            {item.icon}
          </button>
        ))}

        {/* Profile Avatar */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid #F1FAEE", // Border around profile
          }}
        >
          <img
            src={photo} // Replace with actual profile image path
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
