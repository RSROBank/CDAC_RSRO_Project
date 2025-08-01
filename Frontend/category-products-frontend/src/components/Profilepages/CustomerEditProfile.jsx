import GenericEditProfile from './GenericEditProfile';
import { MapPin, Phone, Mail, Image } from 'lucide-react';

const CustomerEditProfile = () => {
  const fetchCustomerProfile = async () => {
    return {
      fullName: "Rahul Verma",
      dateOfBirth: "1998-05-20",
      gender: "Male",
      nationality: "Indian",
      photoId: "DOC123456",
      photo: "/assets/Images/Cardsampleimage.png",
      adrLine1: "bharat nagar",
      adrLine2: "babail Road",
      city: "panipat",
      state: "haryana",
      country: "India",
      pincode: "123456",
      mobileNo: "9876543210",
      email: "rahul.verma@example.com"
    };
  };

  const updateCustomerProfile = async (formData) => {
    console.log("Submitted data:", formData);
    return { success: true, message: "Customer profile updated successfully" };
  };
  return (
    <GenericEditProfile
      title="Update Customer Profile"
      fetchProfile={fetchCustomerProfile}
      onSubmit={updateCustomerProfile}
      readOnlyFields={[
        { label: "Full Name", key: "fullName" },
        { label: "Date of Birth", key: "dateOfBirth" },
        { label: "Gender", key: "gender" },
        { label: "Nationality", key: "nationality" },
        { label: "Photo ID", key: "photoId", icon: <Image /> },
        { label: "Email", key: "email", icon: <Mail />, type: "email" },
      ]}
      editableFields={[
        { label: "Address Line 1", key: "adrLine1", icon: <MapPin /> },
        { label: "Address Line 2", key: "adrLine2", icon: <MapPin /> },
        { label: "City", key: "city", icon: <MapPin /> },
        { label: "State", key: "state", icon: <MapPin /> },
        { label: "Country", key: "country", icon: <MapPin /> },
        { label: "Pin Code", key: "pincode", icon: <MapPin /> },
        { label: "Mobile No", key: "mobileNo", icon: <Phone /> },
      ]}
    />

  );
};

export default CustomerEditProfile;
