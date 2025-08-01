import React, { useEffect, useState } from 'react';
import GenericProfile from './GenericProfile';
import { getAdminProfileById } from '../../services/userService';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getAdminProfileById(1);
        console.log("Fetched profile data:", data);

        setProfile({
          adminId: data.id,
          mobile: data.phoneNumber,
          email: data.email,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile(); // Call the async function
  }, []);

  if (!profile) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  const fields = [
    { label: 'Admin ID', value: profile.adminId },
    { label: 'Email', value: profile.email },
    { label: 'Phone', value: profile.mobile }
  ];

  return (
    <GenericProfile
      title="Admin Profile"
      fields={fields}
      // onEdit="/admineditprofile"
    />
  );
};

export default AdminProfile;
