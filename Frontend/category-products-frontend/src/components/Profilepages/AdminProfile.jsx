import React, { useEffect, useState } from 'react';
import GenericProfile from './GenericProfile';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setProfile({
        adminId: 1,
        email: 'admin@example.com',
        phone: '9123456789',
        createdAt: '2023-12-01',
        modifiedAt: '2025-07-28',
      });
    }, 500);
  }, []);

  if (!profile) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  const fields = [
    { label: 'Admin ID', value: profile.adminId },
    { label: 'Email', value: profile.email },
    { label: 'Phone', value: profile.phone },
    { label: 'Created At', value: profile.createdAt },
    { label: 'Modified At', value: profile.modifiedAt },
  ];

  return (
    <GenericProfile
      title="Admin Profile"
      fields={fields}
      onEdit="/admineditprofile"
    />
  );
};

export default AdminProfile;
