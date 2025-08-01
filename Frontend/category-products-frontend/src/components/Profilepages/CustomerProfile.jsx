import React, { useEffect, useState } from 'react';
import GenericProfile from './GenericProfile';
import { getCustomerProfileById } from '../../services/userService';

const CustomerProfile = () => {
  const [profile, setProfile] = useState(null);

  const getProfile = async()=>{
    const result = await getCustomerProfileById(userId);
    console.log("result in Customer profile: ", result);
    return result;
  }
  useEffect(() => {
    const user = getProfile();
    setProfile({
      fullName: 'John',
      dob: '1998-05-20',
      gender: 'Male',
      nationality: 'Indian',
      photoId: 'Doc123456',
      photo: 'src/assets/Images/Cardsampleimage.png',
      adrLine1: "bharat nagar",
      adrLine2: "babail Road",
      city: "panipat",
      state: "haryana",
      country: "India",
      pincode: "123456",
      mobile: '9876543210',
      email: 'rahul.verma@example.com',
      status: 'Active',
    });
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
    { label: 'Address Line 1', value: profile.adrLine1 },
    { label: 'Address Line 2', value: profile.adrLine2 },
    { label: 'City', value: profile.city },
    { label: 'State', value: profile.state },
    { label: 'Country', value: profile.country },
    { label: 'Pin Code', value: profile.pincode },
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
