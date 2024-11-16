import React from "react";
import { Button, Typography } from "@mui/material";

interface InformationCardProps {
    user: {
      firstName: string;
      fatherName: string;
      grandfatherName: string;
      familyName: string;
      nationalId: {
        idNumber: string;
        expiryDate: string;
      };
      passport: {
        number: string;
        issueDate: string;
        expiryDate: string;
      };
      maritalStatus: {
        name: string;
      };
      dependants: number;
      contactInfo: {
        email: string;
        phone: string;
      };
      emergencyContact: {
        name: string;
        relation: string;
        phone: string;
      };
      address: {
        country: string;
        city: string;
        postalCode: string;
        building: string;
        street: string;
        floor: string;
        apartment: string;
      };
      drivingLicense: {
        hasLicense: boolean;
        type: string;
        expiryDate: string;
      };
    };
    selectedTab: string; // New property for selected tab
  }
  
  const InformationCard: React.FC<InformationCardProps> = ({ user, selectedTab }) => {
    return (
      <div style={{ backgroundColor: "#fff", padding: "1rem", borderRadius: "8px" }}>
        {/* Conditionally render sections based on selectedTab */}
        {selectedTab === "personal" && (
          <section>
            <Typography variant="h6">Basic Information</Typography>
            <p>First Name: {user.firstName}</p>
            <p>Father's Name: {user.fatherName}</p>
            <p>Grandfather's Name: {user.grandfatherName}</p>
            <p>Family Name: {user.familyName}</p>
            <p>National ID Number: {user.nationalId.idNumber}</p>
            <p>National ID Expiry Date: {user.nationalId.expiryDate}</p>
            <p>Marital Status: {user.maritalStatus.name}</p>
            <p>Dependants: {user.dependants}</p>
          </section>
        )}
  
        {selectedTab === "personal" && (
          <section>
            <Typography variant="h6">Contact Information</Typography>
            <p>Email: {user.contactInfo.email}</p>
            <p>Phone: {user.contactInfo.phone}</p>
          </section>
        )}
  
        {selectedTab === "personal" && (
          <section>
            <Typography variant="h6">Emergency Contacts</Typography>
            <p>Name: {user.emergencyContact.name}</p>
            <p>Relation: {user.emergencyContact.relation}</p>
            <p>Phone: {user.emergencyContact.phone}</p>
          </section>
        )}
  
        {selectedTab === "personal" && (
          <section>
            <Typography variant="h6">Address Details</Typography>
            <p>Country: {user.address.country}</p>
            <p>City: {user.address.city}</p>
            <p>Postal Code: {user.address.postalCode}</p>
            <p>Building: {user.address.building}</p>
            <p>Street: {user.address.street}</p>
            <p>Floor: {user.address.floor}</p>
            <p>Apartment: {user.address.apartment}</p>
          </section>
        )}
  
        {selectedTab === "personal" && (
          <section>
            <Typography variant="h6">Driving License Details</Typography>
            <p>Has License: {user.drivingLicense.hasLicense ? "Yes" : "No"}</p>
            <p>Type: {user.drivingLicense.type}</p>
            <p>Expiry Date: {user.drivingLicense.expiryDate}</p>
          </section>
        )}
      </div>
    );
  };
  
  export default InformationCard;
  