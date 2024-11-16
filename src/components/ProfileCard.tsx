import React from "react";
import { Button, Typography } from "@mui/material";

export interface ProfileCardProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ selectedTab, onTabChange }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "300px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            marginBottom: "0.5rem",
          }}
        />
        <Typography variant="h6">John Smith</Typography>
        <Typography variant="body2" color="textSecondary">
          Senior Product Manager
        </Typography>
      </div>

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Button
          variant={selectedTab === "personal" ? "contained" : "text"}
          color="primary"
          onClick={() => onTabChange("personal")}
          style={{
            justifyContent: "flex-start",
            backgroundColor: selectedTab === "personal" ? "#f0f8ff" : "white",
          }}
        >
          Personal Information
        </Button>
        <Button
          variant={selectedTab === "financial" ? "contained" : "text"}
          color="primary"
          onClick={() => onTabChange("financial")}
          style={{
            justifyContent: "flex-start",
            backgroundColor: selectedTab === "financial" ? "#f0f8ff" : "white",
          }}
        >
          Financial Information
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
