import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import InformationCard from "./InformationCard";
import Header from "./Header";
import ProfileCard from "./ProfileCard";

// GraphQL query for fetching all user data
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
      contactInfo {
        email
        mobile
      }
      emergencyContact {
        name
        relation
        phone
      }
      address {
        country
        city
        postalCode
        building
        street
        floorNo
        apartment
      }
      drivingLicense {
        hasLicense
        type
        expiryDate
      }
    }
  }
`;

export const UserCard: React.FC<{ userId: number }> = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER_QUERY, {
    variables: { userId },
  });

  const [selectedTab, setSelectedTab] = useState("personal");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const user = data.user;

  return (
    <div
      className="flex flex-col h-screen"
      style={{
        backgroundColor: "rgb(244, 246, 249)",
      }}
    >
      <Header firstName={user.firstName} familyName={user.familyName} />

      <div style={{ display: "flex", height: "95%" }}>
        {/* Sidebar Section */}
        <div
          style={{
            width: "30%",
            padding: "1rem",
            borderRight: "2px solid #ddd",
          }}
        >
          <ProfileCard selectedTab={selectedTab} onTabChange={setSelectedTab} />
        </div>

        {/* Main Content Section */}
        <div
          style={{
            width: "70%",
            padding: "2rem",
            overflowY: "auto",
          }}
        >
          <InformationCard user={user} selectedTab={selectedTab} />
        </div>
      </div>
    </div>
  );
};
