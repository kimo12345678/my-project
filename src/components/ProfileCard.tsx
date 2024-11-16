import React from "react";
import { Button, Typography } from "@mui/material";
import photo from "../assets/photo.jpg"; // Adjust relative path if necessary

export interface ProfileCardProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ selectedTab, onTabChange }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
        width: "100%",
        maxWidth: "320px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <img
          src= {photo}
          alt="Profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "4px solid #f0f8ff",
            marginBottom: "0.5rem",
          }}
        />
        <Typography variant="h6" style={{ fontWeight: 600 }}>
          John Smith
        </Typography>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: "0.25rem" }}>
          Senior Product Manager
        </Typography>
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Button
          variant={selectedTab === "personal" ? "contained" : "outlined"}
          color="primary"
          onClick={() => onTabChange("personal")}
          style={{
            justifyContent: "center",
            padding: "0.75rem",
            borderRadius: "8px",
            fontWeight: 500,
            backgroundColor: selectedTab === "personal" ? "#1976d2" : "white",
            color: selectedTab === "personal" ? "white" : "#1976d2",
            borderColor: "#1976d2",
          }}
        >
          Personal Information
        </Button>
        <Button
          variant={selectedTab === "financial" ? "contained" : "outlined"}
          color="primary"
          onClick={() => onTabChange("financial")}
          style={{
            justifyContent: "center",
            padding: "0.75rem",
            borderRadius: "8px",
            fontWeight: 500,
            backgroundColor: selectedTab === "financial" ? "#1976d2" : "white",
            color: selectedTab === "financial" ? "white" : "#1976d2",
            borderColor: "#1976d2",
          }}
        >
          Financial Information
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
