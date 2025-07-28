import React, { useEffect, useState } from 'react';
import GenericProfile from './GenericProfile';

const CustomerProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setProfile({
        fullName: 'Rahul Verma',
        dob: '1998-05-20',
        gender: 'Male',
        nationality: 'Indian',
        photoId: 'Doc123456',
        photo: 'src/assets/Images/Cardsampleimage.png',
        address: '123, Gomti Nagar, Lucknow, Uttar Pradesh',
        mobile: '9876543210',
        email: 'rahul.verma@example.com',
        status: 'Active',
      });
    }, 500);
  }, []);

  if (!profile) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  const fields = [
    { label: 'Full Name', value: profile.fullName },
    { label: 'Date of Birth', value: profile.dob },
    { label: 'Gender', value: profile.gender },
    { label: 'Nationality', value: profile.nationality },
    { label: 'Photo ID', value: profile.photoId },
    { label: 'Mobile', value: profile.mobile },
    { label: 'Email', value: profile.email },
    { label: 'Status', value: profile.status },
    { label: 'Address', value: profile.address, fullWidth: true },
  ];

  return (
    <GenericProfile
      title="Customer Profile"
      fields={fields}
      photo={profile.photo}
      onEdit="/customereditprofile"
    />
  );
};

export default CustomerProfile;
