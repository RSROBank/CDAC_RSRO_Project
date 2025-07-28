import React, { useEffect, useState } from 'react';
import GenericProfile from './GenericProfile';

const EmployeeProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setProfile({
        empId: 101,
        name: 'Sudhir Singh',
        dob: '1996-02-14',
        gender: 'Male',
        govtId: 'Aadhar12345',
        photoId: 'PhotoID_56789',
        email: 'sudhir.singh@example.com',
        phone: '9876543210',
        status: 'Active',
        createdAt: '2024-01-10',
        modifiedAt: '2025-07-25',
        photo: 'src/assets/Images/Cardsampleimage.png'
      });
    }, 500);
  }, []);

  if (!profile) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  const fields = [
    { label: 'Employee ID', value: profile.empId },
    { label: 'Name', value: profile.name },
    { label: 'DOB', value: profile.dob },
    { label: 'Gender', value: profile.gender },
    { label: 'Govt ID', value: profile.govtId },
    { label: 'Photo ID', value: profile.photoId },
    { label: 'Phone', value: profile.phone },
    { label: 'Email', value: profile.email },
    { label: 'Status', value: profile.status },
    { label: 'Created At', value: profile.createdAt },
    { label: 'Modified At', value: profile.modifiedAt },
  ];

  return (
    <GenericProfile
      title="Employee Profile"
      fields={fields}
      photo={profile.photo}
      onEdit="/employeeeditprofile"
    />
  );
};

export default EmployeeProfile;
