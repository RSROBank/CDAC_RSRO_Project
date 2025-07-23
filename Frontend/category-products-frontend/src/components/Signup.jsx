import React, { useState } from 'react';
import {
  User, Calendar, Users, Flag, Image, MapPin, Phone, Mail, Lock, Shield, RotateCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

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

  const [captchaValue] = useState(Math.random().toString(36).substring(2, 8).toUpperCase());
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        photoId: e.target.files[0]
      }));
    }
  };

  const handleSignUp = async (e) => {
    alert("handleSignUp called");
    e.preventDefault();
    alert("Submitted");
    console.log('Sign up attempted with:', formData);
    if (formData.fullName.trim().length === 0) {
      toast.warn('Please enter full name');
    } else if (formData.dateOfBirth.trim().length === 0) {
      toast.warn('Please enter date of birth');
    } else if (formData.gender.trim().length === 0) {
      toast.warn('Please select gender');
    } else if (formData.nationality.trim().length === 0) {
      toast.warn('Please enter nationality');
    } else if (!formData.photoId) {
      toast.warn('Please upload photo ID');
    } else if (formData.address.trim().length === 0) {
      toast.warn('Please enter address');
    } else if (formData.mobileNo.trim().length === 0) {
      toast.warn('Please enter mobile number');
    } else if (formData.emailId.trim().length === 0) {
      toast.warn('Please enter email ID');
    } else if (formData.password.trim().length === 0) {
      toast.warn('Please enter password');
    } else if (formData.confirmPassword.trim().length === 0) {
      toast.warn('Please confirm password');
    } else if (formData.password !== formData.confirmPassword) {
      toast.warn('Passwords do not match');
    } else if (!formData.termsAccepted) {
      toast.warn('Please accept the terms and conditions');
    } else if (formData.captcha.trim().length === 0) {
      toast.warn('Please enter captcha');
    } else if(formData.captcha != captchaValue){
      toast.warn('captcha do not mathc')
    }else {
      const {
        fullName,
        dateOfBirth,
        gender,
        nationality,
        photoId,
        address,
        mobileNo,
        emailId,
        password
      } = formData;

      // Call the registerUser function
      const result = await registerUser(
        fullName,
        dateOfBirth,
        gender,
        nationality,
        photoId,
        address,
        mobileNo,
        emailId,
        password
      );
      if (!result) {
        toast.error('Error while registering the user')
      } else {
        // check if result is "success" or "error"
        if (result['status'] == 'success') {
          toast.success('successfully registered a user')
          // go back
          navigate('login')
        } else {
          toast.error('Error while registering the user')
        }
      }
    }
  };

  const handleCancel = () => {
    toast.error("rerrodfs");
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
    window.location.reload(); // mock for now
  };

  const onBack = () => {
    // use back stack (which is implemented by browser)
    // -1: previous screen
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4 text-gray-800 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-blue-200 px-10 py-12">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">Sign Up</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <User className="w-4 h-4" /> Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Users className="w-4 h-4" /> Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Nationality */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Flag className="w-4 h-4" /> Nationality
            </label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Photo ID */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Image className="w-4 h-4" /> Photo ID
            </label>
            <input
              type="file"
              name="photoId"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Mobile No.
            </label>
            <input
              type="tel"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email ID */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email ID
            </label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Terms and Conditions */}
          <div className="col-span-full flex items-start gap-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <label className="text-sm text-gray-700">
              I agree to the{' '}
              <span className="text-blue-600 underline cursor-pointer hover:text-blue-800">
                Terms & Conditions
              </span>
            </label>
          </div>

          {/* Captcha */}
          <div className="col-span-full space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-700" />
              <span className="font-medium text-sm">Captcha</span>
            </div>
            <div className="flex items-center justify-between bg-blue-50 border border-blue-300 rounded-lg px-4 py-2">
              <span className="font-mono font-semibold tracking-widest text-blue-800">
                {captchaValue}
              </span>
              <button
                type="button"
                onClick={generateNewCaptcha}
                className="text-blue-600 hover:text-blue-800"
                title="Refresh Captcha"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              name="captcha"
              value={formData.captcha}
              onChange={handleInputChange}
              placeholder="Enter captcha"
              className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Buttons */}
          <div className='flex'>
            Already have an account?{' '}
            <button
              onClick={onBack}
              className='btn btn-link'
            >
              Login here
            </button>
          </div>
          <div className="col-span-full flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={handleSignUp}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
