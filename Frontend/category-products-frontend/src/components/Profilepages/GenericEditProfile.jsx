// GenericEditProfile.jsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const GenericEditProfile = ({
  title,
  fetchProfile,
  onSubmit,
  readOnlyFields = [],
  editableFields = [],
}) => {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProfile().then((data) => {
      setFormData(data);
      if (data.photo) setImagePreview(data.photo);
    });
  }, [fetchProfile]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const mobileRegex = /^\d{10}$/;
    const pincodeRegex = /^\d{6}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.email && !emailRegex.test(formData.email)) {
      toast.error('Invalid email format');
      return false;
    }
    if (formData.mobileNo && !mobileRegex.test(formData.mobileNo)) {
      toast.error('Mobile number must be 10 digits');
      return false;
    }
    if (formData.pinCode && !pincodeRegex.test(formData.pinCode)) {
      toast.error('Pin Code must be 6 digits');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await onSubmit(formData);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">{title}</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          {readOnlyFields.map(({ label, key }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type="text"
                value={formData[key] || ''}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>
          ))}

          {editableFields.map(({ label, key, icon, type = 'text' }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                {icon} {label}
              </label>
              <input
                type={type}
                name={key}
                value={formData[key] || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">Upload New Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
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
        </form>

        <div className="mt-6 flex gap-4 justify-end">
          <button
            onClick={handleSubmit}
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

export default GenericEditProfile;
