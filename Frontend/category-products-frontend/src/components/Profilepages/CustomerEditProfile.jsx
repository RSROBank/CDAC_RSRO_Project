import React, { useEffect, useState } from 'react';
import { MapPin, Image, Mail, Phone, BadgeCheck } from 'lucide-react';
import { toast } from 'react-toastify';

const UpdateCustomerProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    photo: null,
    photoId: '',
    address: '',
    mobileNo: '',
    email: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Simulated fetch profile (replace with actual API call)
  useEffect(() => {
    setTimeout(() => {
      const user = {
        fullName: 'Rahul Verma',
        dateOfBirth: '1998-05-20',
        gender: 'Male',
        nationality: 'Indian',
        photoId: 'DOC123456',
        address: '123, Gomti Nagar, Lucknow',
        mobileNo: '9876543210',
        email: 'rahul.verma@example.com',
        photo: 'src/assets/Images/Cardsampleimage.png',
      };
      setFormData(user);
      if (user.photo) setImagePreview(user.photo);
    }, 500);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Validation
    if (!formData.address || !formData.photoId || !formData.mobileNo || !formData.email) {
      toast.error('Please fill all editable fields');
      return;
    }

    // Simulated API call
    toast.success('Profile updaterequest submited!');
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Update Profile</h2>

        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <input
              type="text"
              value={formData.gender}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nationality</label>
            <input
              type="text"
              value={formData.nationality}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          {/* Editable Fields */}
          <div>
            <label className="flex gap-2 items-center text-sm font-medium mb-1">
              <MapPin size={16} /> Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="flex gap-2 items-center text-sm font-medium mb-1">
              <Image size={16} /> Upload New Photo
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 mt-2 object-cover border rounded"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo ID</label>
            <input
              type="text"
              name="photoId"
              value={formData.photoId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="flex gap-2 items-center text-sm font-medium mb-1">
              <Phone size={16} /> Mobile No.
            </label>
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="flex gap-2 items-center text-sm font-medium mb-1">
              <Mail size={16} /> Email ID
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </form>

        <div className="mt-6 flex gap-4 justify-end">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Update Request
          </button>
          <button
            type="reset"
            onClick={() => window.location.reload()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomerProfile;
