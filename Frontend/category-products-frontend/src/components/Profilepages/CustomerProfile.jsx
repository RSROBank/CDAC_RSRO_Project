import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 border-b pb-2">Customer Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        <div><strong>Full Name:</strong> {profile.fullName}</div>
        <div><strong>Date of Birth:</strong> {profile.dob}</div>
        <div><strong>Gender:</strong> {profile.gender}</div>
        <div><strong>Nationality:</strong> {profile.nationality}</div>
        <div><strong>Photo ID:</strong> {profile.photoId}</div>
        <div><strong>Status:</strong> {profile.status}</div>
        <div><strong>Mobile:</strong> {profile.mobile}</div>
        <div><strong>Email:</strong> {profile.email}</div>
        <div className="md:col-span-2"><strong>Address:</strong> {profile.address}</div>
        <div className="md:col-span-2">
          <img
            src={profile.photo}
            alt="User Document"
            className="w-40 h-40 object-cover rounded shadow border"
          />
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={() => navigate('/customereditprofile')}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default CustomerProfile;
