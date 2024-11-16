import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import Header from "./Header";
import ProfileCard, { ProfileCardProps } from "./ProfileCard";

const GET_USER_QUERY = gql`
  query User($userId: Int!) {
    user(userId: $userId) {
      firstName
      fatherName
      grandfatherName
      familyName
      localizedName {
        firstName
        fatherName
        grandfatherName
        familyName
      }
      nationalId {
        idNumber
        expiryDate
      }
      maritalStatus {
        name
      }
      dependants
    }
  }
`;

export const UserCard: React.FC<{ userId: number }> = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER_QUERY, {
    variables: { userId },
  });

  const { register, handleSubmit } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("personal");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const user = data.user;

  const onSave = (formData: any) => {
    console.log("Saving user data:", formData);
  };

  return (
    <div
      className="flex flex-col h-screen"
      style={{
        backgroundColor: "rgb(244, 246, 249)",
      }}
    >
      <Header firstName={user.firstName} familyName={user.familyName} />

      <div style={{ display: "flex", height: "95%" }}>
        {/* Replace Master Section with ProfileCard */}
        <div
          style={{
            width: "25%",
            padding: "1rem",
            borderRight: "2px solid #ddd",
          }}
        >
          <ProfileCard selectedTab={selectedTab} onTabChange={setSelectedTab} />
        </div>

        {/* Content Section Based on Selected Tab */}
        <div
          style={{
            width: "75%",
            padding: "2rem",
            overflowY: "auto",
          }}
        >
          {selectedTab === "personal" ? (
            <div>
              <Typography variant="h6">Basic Information</Typography>
              {isEditing ? (
                <form onSubmit={handleSubmit(onSave)}>
                  <TextField
                    label="First Name"
                    defaultValue={user.firstName}
                    {...register("firstName")}
                    className="my-2"
                  />
                  <TextField
                    label="Father's Name"
                    defaultValue={user.fatherName}
                    {...register("fatherName")}
                    className="my-2"
                  />
                  <TextField
                    label="Grandfather's Name"
                    defaultValue={user.grandfatherName}
                    {...register("grandfatherName")}
                    className="my-2"
                  />
                  <TextField
                    label="Family Name"
                    defaultValue={user.familyName}
                    {...register("familyName")}
                    className="my-2"
                  />
                  <TextField
                    label="National ID Number"
                    defaultValue={user.nationalId.idNumber}
                    {...register("idNumber")}
                    className="my-2"
                  />
                  <TextField
                    label="National ID Expiry Date"
                    defaultValue={user.nationalId.expiryDate}
                    {...register("expiryDate")}
                    className="my-2"
                  />
                  <TextField
                    label="Marital Status"
                    defaultValue={user.maritalStatus.name}
                    {...register("maritalStatus")}
                    className="my-2"
                  />
                  <TextField
                    label="Dependants"
                    defaultValue={user.dependants}
                    {...register("dependants")}
                    className="my-2"
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </form>
              ) : (
                <div>
                  <p>First Name: {user.firstName}</p>
                  <p>Father's Name: {user.fatherName}</p>
                  <p>Grandfather's Name: {user.grandfatherName}</p>
                  <p>Family Name: {user.familyName}</p>
                  <p>National ID Number: {user.nationalId.idNumber}</p>
                  <p>National ID Expiry Date: {user.nationalId.expiryDate}</p>
                  <p>Marital Status: {user.maritalStatus.name}</p>
                  <p>Dependants: {user.dependants}</p>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Typography variant="h6">
              Financial Information is not implemented yet.
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
