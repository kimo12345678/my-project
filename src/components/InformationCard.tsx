import React from "react";
import { Button, Typography, Box, Divider } from "@mui/material";

interface InformationCardProps {
  user: {
    firstName: string;
    fatherName: string;
    grandfatherName: string;
    familyName: string;
    nationalId: { idNumber: string; expiryDate: string };
    passport: { number: string; issueDate: string; expiryDate: string };
    maritalStatus: { name: string };
    dependants: number;
    contactInfo: { email: string; phone: string };
    emergencyContact: { name: string; relation: string; phone: string };
    address: {
      country: string;
      city: string;
      postalCode: string;
      building: string;
      street: string;
      floor: string;
      apartment: string;
    };
    drivingLicense: { hasLicense: boolean; type: string; expiryDate: string };
    militaryStatus: {
      requiresTravelPermit: boolean;
      status: string;
      document: string;
    };
    financial?: { bankName: string; iban: string }; // Optional financial data
  };
  selectedTab: string;
}

const InformationCard: React.FC<InformationCardProps> = ({
  user,
  selectedTab,
}) => {
  const renderSection = (title: string, content: React.ReactNode) => (
    <Box
      sx={{
        marginBottom: "2rem",
        backgroundColor: "#fff",
        padding: "1.5rem",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#007BFF", textTransform: "none" }}
        >
          Edit
        </Button>
      </Box>
      <Divider sx={{ marginY: "1rem" }} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
        }}
      >
        {content}
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "80%",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
      }}
    >
      {selectedTab === "personal" && (
        <>
          {/* Render personal information sections */}
          {renderSection(
            "Basic Information",
            <>
              <Typography>
                National ID Number: {user.nationalId.idNumber}
              </Typography>
              <Typography>
                National ID Expiry Date: {user.nationalId.expiryDate}
              </Typography>
              <Typography>First Name: {user.firstName}</Typography>
              <Typography>Father Name: {user.fatherName}</Typography>
              <Typography>Grand Father Name: {user.grandfatherName}</Typography>
              <Typography>Family Name: {user.familyName}</Typography>
              <Typography>Marital Status: {user.maritalStatus.name}</Typography>
              <Typography>Dependants: {user.dependants}</Typography>
            </>
          )}

          {renderSection(
            "Contact Information",
            <>
              <Typography>Personal Email: {user.contactInfo.email}</Typography>
              <Typography>Mobile: {user.contactInfo.phone}</Typography>
            </>
          )}

          {renderSection(
            "Emergency Contacts",
            <>
              <Typography>
                Emergency Contact Person Name: {user.emergencyContact.name}
              </Typography>
              <Typography>
                Emergency Relation: {user.emergencyContact.relation}
              </Typography>
              <Typography>
                Emergency Phone: {user.emergencyContact.phone}
              </Typography>
            </>
          )}

          {renderSection(
            "Address Details",
            <>
              <Typography>Country: {user.address.country}</Typography>
              <Typography>City: {user.address.city}</Typography>
              <Typography>Postal Code: {user.address.postalCode}</Typography>
              <Typography>Building: {user.address.building}</Typography>
              <Typography>Street: {user.address.street}</Typography>
              <Typography>Floor No.: {user.address.floor}</Typography>
              <Typography>Apartment: {user.address.apartment}</Typography>
            </>
          )}

          {renderSection(
            "Driving License Details",
            <>
              <Typography>
                Driving License: {user.drivingLicense.hasLicense ? "Yes" : "No"}
              </Typography>
              <Typography>
                Driving License Expiry Date: {user.drivingLicense.expiryDate}
              </Typography>
            </>
          )}

          {renderSection(
            "Military Status",
            <>
              <Typography>
                Require Travel Permit:{" "}
                {user.militaryStatus?.requiresTravelPermit ? "Yes" : "No"}
              </Typography>
              <Typography>
                Military Status: {user.militaryStatus?.status}
              </Typography>
              <Typography>Document: {user.militaryStatus?.document}</Typography>
            </>
          )}
        </>
      )}

      {selectedTab === "financial" && (
        <>
          {renderSection(
            "Bank Information",
            <>
              <Typography>
                Bank Name: {user.financial?.bankName || "CIB"}
              </Typography>
              <Typography>
                IBAN: {user.financial?.iban || "12346546413216446"}
              </Typography>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default InformationCard;
