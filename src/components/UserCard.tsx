import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';

const GET_USER_QUERY = gql`
  query User($userId: Int!) {
    user(userId: $userId) {
      firstName
      fatherName
      grandfatherName
      familyName
      nationalities {
        country {
          id
          name
        }
        countryId
      }
    }
  }
`;

interface User {
  firstName: string;
  fatherName: string;
  grandfatherName: string;
  familyName: string;
  localizedName: {
    firstName: string;
    fatherName: string;
    grandfatherName: string;
    familyName: string;
  };
  nationalId: {
    idNumber: string;
    expiryDate: string;
  };
  nationalities: { country: { name: string }; countryId: number }[];
  maritalStatus: { name: string };
  dependants: number;
}

export const UserCard: React.FC<{ userId: number }> = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER_QUERY, {
    variables: { userId },
  });

  const { register, handleSubmit, setValue } = useForm();
  const [isEditing, setIsEditing] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const user: User = data.user;

  // Handle the save functionality
  const onSave = (data: any) => {
    console.log("Saving user data:", data);
    // Here, you would send the data to the backend to save it
  };

  return (
    <div className="p-4">
      <Typography variant="h6">Basic Information</Typography>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSave)}>
          <TextField
            label="First Name"
            defaultValue={user.firstName}
            {...register('firstName')}
            className="my-2"
          />
          <TextField
            label="Father's Name"
            defaultValue={user.fatherName}
            {...register('fatherName')}
            className="my-2"
          />
          <TextField
            label="Grandfather's Name"
            defaultValue={user.grandfatherName}
            {...register('grandfatherName')}
            className="my-2"
          />
          <TextField
            label="Family Name"
            defaultValue={user.familyName}
            {...register('familyName')}
            className="my-2"
          />
          <Button type="submit" variant="contained" color="primary">Save</Button>
        </form>
      ) : (
        <div>
          <p>First Name: {user.firstName}</p>
          <p>Father's Name: {user.fatherName}</p>
          <p>Grandfather's Name: {user.grandfatherName}</p>
          <p>Family Name: {user.familyName}</p>
          <Button variant="contained" color="secondary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};
