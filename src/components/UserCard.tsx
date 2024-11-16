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
    <div className="flex flex-col h-screen bg-gray-100 ">
      <Header firstName={user.firstName} familyName={user.familyName} />

      <div className="flex h-[95%] customdisplay">
        {/* Sidebar Section */}
        <div className="w-[30%] p-4 border-r-2 border-gray-300">
          <ProfileCard
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            firstName={user.firstName}
            familyName={user.familyName}
          />
        </div>

        {/* Main Content Section */}
        <div className="w-[70%] p-8 overflow-y-auto custommain">
          <InformationCard user={user} selectedTab={selectedTab} />
        </div>
      </div>
    </div>
  );
};
