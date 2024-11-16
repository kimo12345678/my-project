import React, { useState } from "react";
import { Button, Typography, Box, Divider, TextField } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
const UPDATE_USER = gql`
  mutation UpdateUser($userId: Int!, $updateUserData: UpdateUserInput!) {
    updateUser(userId: $userId, updateUserData: $updateUserData) {
      firstName
      fatherName
      grandfatherName
      familyName
      nationalId {
        idNumber
        expiryDate
      }
      passport {
        number
        issueDate
        expiryDate
      }
      maritalStatus {
        name
      }
      dependants
      contactInfo {
        email
        phone
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
        floor
        apartment
      }
      drivingLicense {
        hasLicense
        type
        expiryDate
      }
      militaryStatus {
        requiresTravelPermit
        status
        document
      }
      financial {
        bankName
        iban
      }
    }
  }
`;

interface InformationCardProps {
  user: {
    userId: number;
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [updateUser] = useMutation(UPDATE_USER);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Prepare the update data
      const updateUserData = {
        firstName: editedUser.firstName,
        fatherName: editedUser.fatherName,
        grandfatherName: editedUser.grandfatherName,
        familyName: editedUser.familyName,
        nationalId: {
          idNumber: editedUser.nationalId.idNumber,
          expiryDate: editedUser.nationalId.expiryDate,
        },
        passport: {
          number: editedUser.passport.number,
          issueDate: editedUser.passport.issueDate,
          expiryDate: editedUser.passport.expiryDate,
        },
        maritalStatus: {
          name: editedUser.maritalStatus.name,
        },
        dependants: editedUser.dependants,
        contactInfo: {
          email: editedUser.contactInfo.email,
          phone: editedUser.contactInfo.phone,
        },
        emergencyContact: {
          name: editedUser.emergencyContact.name,
          relation: editedUser.emergencyContact.relation,
          phone: editedUser.emergencyContact.phone,
        },
        address: {
          country: editedUser.address.country,
          city: editedUser.address.city,
          postalCode: editedUser.address.postalCode,
          building: editedUser.address.building,
          street: editedUser.address.street,
          floor: editedUser.address.floor,
          apartment: editedUser.address.apartment,
        },
        drivingLicense: {
          hasLicense: editedUser.drivingLicense.hasLicense,
          type: editedUser.drivingLicense.type,
          expiryDate: editedUser.drivingLicense.expiryDate,
        },
        militaryStatus: {
          requiresTravelPermit: editedUser.militaryStatus.requiresTravelPermit,
          status: editedUser.militaryStatus.status,
          document: editedUser.militaryStatus.document,
        },
        financial: editedUser.financial, // Optional field
      };

      // Call the mutation
      await updateUser({
        variables: {
          userId: user.userId, // Make sure `userId` is available
          updateUserData,
        },
      });

      // After saving, you can either show a success message, disable editing, or update the UI
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error appropriately (e.g., show a message)
    }
  };

  const handleChange = (field: string, value: string) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
        {!isEditing && (
          <Button
            variant="contained"
            sx={{ backgroundColor: "#007BFF", textTransform: "none" }}
            onClick={handleEditClick}
          >
            Edit
          </Button>
        )}
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
          {/* Render Basic Information */}
          {renderSection(
            "Basic Information",
            <>
              {isEditing ? (
                <>
                  <TextField
                    label="National ID Number"
                    value={editedUser.nationalId.idNumber}
                    onChange={(e) =>
                      handleChange("nationalId.idNumber", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="National ID Expiry Date"
                    value={editedUser.nationalId.expiryDate}
                    onChange={(e) =>
                      handleChange("nationalId.expiryDate", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="First Name"
                    value={editedUser.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Father Name"
                    value={editedUser.fatherName}
                    onChange={(e) => handleChange("fatherName", e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Grandfather Name"
                    value={editedUser.grandfatherName}
                    onChange={(e) =>
                      handleChange("grandfatherName", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Family Name"
                    value={editedUser.familyName}
                    onChange={(e) => handleChange("familyName", e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Marital Status"
                    value={editedUser.maritalStatus.name}
                    onChange={(e) =>
                      handleChange("maritalStatus.name", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Dependants"
                    type="number"
                    value={editedUser.dependants}
                    onChange={(e) => handleChange("dependants", e.target.value)}
                    fullWidth
                  />
                </>
              ) : (
                <>
                  <Typography>
                    National ID Number: {user.nationalId.idNumber}
                  </Typography>
                  <Typography>
                    National ID Expiry Date: {user.nationalId.expiryDate}
                  </Typography>
                  <Typography>First Name: {user.firstName}</Typography>
                  <Typography>Father Name: {user.fatherName}</Typography>
                  <Typography>
                    Grand Father Name: {user.grandfatherName}
                  </Typography>
                  <Typography>Family Name: {user.familyName}</Typography>
                  <Typography>
                    Marital Status: {user.maritalStatus.name}
                  </Typography>
                  <Typography>Dependants: {user.dependants}</Typography>
                </>
              )}
            </>
          )}

          {/* Render Contact Information */}
          {renderSection(
            "Contact Information",
            <>
              {isEditing ? (
                <>
                  <TextField
                    label="Personal Email"
                    value={editedUser.contactInfo.email}
                    onChange={(e) =>
                      handleChange("contactInfo.email", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Mobile"
                    value={editedUser.contactInfo.phone}
                    onChange={(e) =>
                      handleChange("contactInfo.phone", e.target.value)
                    }
                    fullWidth
                  />
                </>
              ) : (
                <>
                  <Typography>
                    Personal Email: {user.contactInfo.email}
                  </Typography>
                  <Typography>Mobile: {user.contactInfo.phone}</Typography>
                </>
              )}
            </>
          )}

          {/* Render Emergency Contacts */}
          {renderSection(
            "Emergency Contacts",
            <>
              {isEditing ? (
                <>
                  <TextField
                    label="Emergency Contact Name"
                    value={editedUser.emergencyContact.name}
                    onChange={(e) =>
                      handleChange("emergencyContact.name", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Emergency Relation"
                    value={editedUser.emergencyContact.relation}
                    onChange={(e) =>
                      handleChange("emergencyContact.relation", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Emergency Phone"
                    value={editedUser.emergencyContact.phone}
                    onChange={(e) =>
                      handleChange("emergencyContact.phone", e.target.value)
                    }
                    fullWidth
                  />
                </>
              ) : (
                <>
                  <Typography>
                    Emergency Contact Name: {user.emergencyContact.name}
                  </Typography>
                  <Typography>
                    Emergency Relation: {user.emergencyContact.relation}
                  </Typography>
                  <Typography>
                    Emergency Phone: {user.emergencyContact.phone}
                  </Typography>
                </>
              )}
            </>
          )}

          {/* Render Address Details */}
          {renderSection(
            "Address Details",
            <>
              {isEditing ? (
                <>
                  <TextField
                    label="Country"
                    value={editedUser.address.country}
                    onChange={(e) =>
                      handleChange("address.country", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="City"
                    value={editedUser.address.city}
                    onChange={(e) =>
                      handleChange("address.city", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Postal Code"
                    value={editedUser.address.postalCode}
                    onChange={(e) =>
                      handleChange("address.postalCode", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Building"
                    value={editedUser.address.building}
                    onChange={(e) =>
                      handleChange("address.building", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Street"
                    value={editedUser.address.street}
                    onChange={(e) =>
                      handleChange("address.street", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Floor"
                    value={editedUser.address.floor}
                    onChange={(e) =>
                      handleChange("address.floor", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Apartment"
                    value={editedUser.address.apartment}
                    onChange={(e) =>
                      handleChange("address.apartment", e.target.value)
                    }
                    fullWidth
                  />
                </>
              ) : (
                <>
                  <Typography>Country: {user.address.country}</Typography>
                  <Typography>City: {user.address.city}</Typography>
                  <Typography>
                    Postal Code: {user.address.postalCode}
                  </Typography>
                  <Typography>Building: {user.address.building}</Typography>
                  <Typography>Street: {user.address.street}</Typography>
                  <Typography>Floor: {user.address.floor}</Typography>
                  <Typography>Apartment: {user.address.apartment}</Typography>
                </>
              )}
            </>
          )}

          {/* Render Driving License Details */}
          {renderSection(
            "Driving License",
            <>
              {isEditing ? (
                <>
                  <TextField
                    label="Has License"
                    value={editedUser.drivingLicense.hasLicense ? "Yes" : "No"}
                    onChange={(e) =>
                      handleChange("drivingLicense.hasLicense", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="License Type"
                    value={editedUser.drivingLicense.type}
                    onChange={(e) =>
                      handleChange("drivingLicense.type", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="License Expiry Date"
                    value={editedUser.drivingLicense.expiryDate}
                    onChange={(e) =>
                      handleChange("drivingLicense.expiryDate", e.target.value)
                    }
                    fullWidth
                  />
                </>
              ) : (
                <>
                  <Typography>
                    Has License: {user.drivingLicense.hasLicense ? "Yes" : "No"}
                  </Typography>
                  <Typography>
                    License Type: {user.drivingLicense.type}
                  </Typography>
                  <Typography>
                    License Expiry Date: {user.drivingLicense.expiryDate}
                  </Typography>
                </>
              )}
            </>
          )}

          {/* Render Military Status */}
          {/* Render Military Status */}
          {renderSection(
            "Military Status",
            <>
              {isEditing ? (
                <>
                  <TextField
                    label="Requires Travel Permit"
                    value={
                      editedUser.militaryStatus?.requiresTravelPermit
                        ? "Yes"
                        : "No"
                    }
                    onChange={(e) =>
                      handleChange(
                        "militaryStatus.requiresTravelPermit",
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                  <TextField
                    label="Military Status"
                    value={editedUser.militaryStatus?.status || ""}
                    onChange={(e) =>
                      handleChange("militaryStatus.status", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Military Document"
                    value={editedUser.militaryStatus?.document || ""}
                    onChange={(e) =>
                      handleChange("militaryStatus.document", e.target.value)
                    }
                    fullWidth
                  />
                </>
              ) : (
                <>
                  <Typography>
                    Requires Travel Permit:{" "}
                    {user.militaryStatus?.requiresTravelPermit ? "Yes" : "No"}
                  </Typography>
                  <Typography>
                    Military Status:{" "}
                    {user.militaryStatus?.status || "Not Available"}
                  </Typography>
                  <Typography>
                    Military Document:{" "}
                    {user.militaryStatus?.document || "Not Available"}
                  </Typography>
                </>
              )}
            </>
          )}
        </>
      )}

      {/* Render Financial Information */}
      {selectedTab === "financial" && (
        <>
          {renderSection(
            "Bank Information",
            <>
              {isEditing ? (
                <>
                  <TextField
                    label="Bank Name"
                    value={editedUser.financial?.bankName || ""}
                    onChange={(e) =>
                      handleChange("financial.bankName", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="IBAN"
                    value={editedUser.financial?.iban || ""}
                    onChange={(e) =>
                      handleChange("financial.iban", e.target.value)
                    }
                    fullWidth
                  />
                </>
              ) : (
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
        </>
      )}

      {/* Save Button */}
      {isEditing && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#28a745",
            textTransform: "none",
            marginTop: "1rem",
          }}
          onClick={handleSaveClick}
        >
          Save
        </Button>
      )}
    </Box>
  );
};

export default InformationCard;
