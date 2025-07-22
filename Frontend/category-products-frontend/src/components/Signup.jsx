import React, { useState } from 'react';
import { User, Calendar, Users, Flag, Image, MapPin, Phone, Mail, Lock, Shield, RotateCcw } from 'lucide-react';
import TestComponent from './TestComponent';
import '../cssfiles/Signupcss.css';
function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    photoId: null,
    address: '',
    mobileNo: '',
    emailId: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    captcha: ''
  });

  const [errors, setErrors] = useState({});
  const [captchaValue] = useState(Math.random().toString(36).substring(2, 8).toUpperCase());


   const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    if (!formData.photoId) newErrors.photoId = 'Photo ID is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = 'Mobile number is required';
    } else if (!/^\d{10,15}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = 'Invalid mobile number';
    }
    
    if (!formData.emailId.trim()) {
      newErrors.emailId = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      newErrors.emailId = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    if (formData.captcha !== captchaValue) {
      newErrors.captcha = 'Captcha does not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? e.target.checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        photoId: e.target.files[0]
      }));
      if (errors.photoId) {
        setErrors(prev => ({ ...prev, photoId: '' }));
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Form validation and submission logic would go here
    console.log('Sign up attempted with:', formData);
    // alert('Sign up functionality would be implemented here!');
    const isValid = validateForm();
    if (!isValid) {
      return; // Stop if validation fails
    }
    
    // setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'photoId') {
          formDataToSend.append(key, formData[key]);
        }
      });
      if (formData.photoId) {
        formDataToSend.append('photoId', formData.photoId);
      }
      
      // Replace with your actual API endpoint
      const response = await axios.post('https://your-api-endpoint.com/signup', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Signup successful:', response.data);
      alert('Signup successful! Please check your email for verification.');
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        photoId: null,
        address: '',
        mobileNo: '',
        emailId: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
        captcha: ''
      });
      
    } catch (error) {
      console.error('Signup error:', error);
      let errorMessage = 'Signup failed. Please try again.';
      
      if (error.response) {
        // Handle specific error messages from backend
        if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.errors) {
          // Handle validation errors from backend
          setErrors(error.response.data.errors);
          errorMessage = 'Please correct the errors in the form.';
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };



  const handleCancel = () => {
    setFormData({
      fullName: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      photoId: null,
      address: '',
      mobileNo: '',
      emailId: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
      captcha: ''
    });
  };

  const generateNewCaptcha = () => {
    // In a real app, this would generate a new captcha from the server
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100">
      {/* Header with Logo */}
      {/* <div className="bg-blue-200 px-8 py-6">
        <div className="flex items-center">
          <div className="bg-white rounded-full px-6 py-3 border-2 border-gray-800">
            <span className="text-gray-800 font-medium">logo</span>
          </div>
        </div>
      </div> */}
      {/* Title Section */}
      <div className="bg-blue-800 py-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Sign Up Page</h1>
      </div>

      {/* Main Form Section */}
      <div className="bg-yellow-50 min-h-screen px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-800 p-8">
            <form onSubmit={handleSignUp} className="grid grid-cols-1 gap-6">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
                {/* 1. Full Name */}
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-gray-700 w-4">1.</span>
                  <User className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    {errors.fieldName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fieldName}</p>
                        )}
                  </div>
                </div>

                {/* 2. Date of Birth */}
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-gray-700 w-4">2.</span>
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
                  </div>
                </div>

                {/* 3. Gender */}
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-gray-700 w-4">3.</span>
                  <Users className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                  </div>
                </div>

                {/* 4. Nationality */}
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-gray-700 w-4">4.</span>
                  <Flag className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    {errors.nationality && <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>}
                  </div>
                </div>

                {/* 5. Photo ID */}
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-gray-700 w-4">5.</span>
                  <Image className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Photo ID</label>
                    <input
                      type="file"
                      name="photoId"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    {errors.photoId && <p className="mt-1 text-sm text-red-600">{errors.photoId}</p>}
                  </div>
                </div>

                {/* 6. Address */}
                <div className="flex items-start space-x-4">
                  <span className="font-semibold text-gray-700 w-4">6.</span>
                  <MapPin className="w-5 h-5 text-gray-600 mt-2" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>
                </div>

                {/* 7. Mobile No. */}
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-gray-700 w-4">7.</span>
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No.</label>
                    <input
                      type="tel"
                      name="mobileNo"
                      value={formData.mobileNo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    {errors.mobileNo && <p className="mt-1 text-sm text-red-600">{errors.mobileNo}</p>}
                  </div>
                </div>

                {/* 8. Email ID */}
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-gray-700 w-4">8.</span>
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                    <input
                      type="email"
                      name="emailId"
                      value={formData.emailId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    {errors.emailId && <p className="mt-1 text-sm text-red-600">{errors.emailId}</p>}
                  </div>
                </div>

                {/* 9. Password */}
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-gray-700 w-4">9.</span>
                  <Lock className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                  </div>
                </div>

                {/* 10. Confirm Password */}
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-gray-700 w-4">10.</span>
                  <Lock className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              {/* Right Column - Terms, Captcha, and Buttons */}
              <div className="space-y-6 lg:pl-8">
                {/* Terms & Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    id="terms"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  {errors.termsAccepted && <p className="mt-1 text-sm text-red-600">{errors.termsAccepted}</p>}
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the <span className="text-blue-600 underline cursor-pointer hover:text-blue-800">Terms & Conditions</span>
                  </label>
                </div>

                {/* Captcha */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Captcha</span>
                  </div>
                  <div className="bg-gray-100 border-2 border-gray-300 rounded-md p-4 text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <span className="font-mono text-lg font-bold text-gray-800 bg-white px-4 py-2 rounded border-2 border-gray-400 tracking-wider">
                        {captchaValue}
                      </span>
                      <button
                        type="button"
                        onClick={generateNewCaptcha}
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-full transition-colors duration-200"
                        title="Generate new captcha"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="captcha"
                    value={formData.captcha}
                    onChange={handleInputChange}
                    placeholder="Enter captcha"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                  {errors.captcha && <p className="mt-1 text-sm text-red-600">{errors.captcha}</p>}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Sign Up
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup