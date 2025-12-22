import { useState } from "react";
import CandidateNavbar from "../../components/CandidateNavbar";

export default function CandidateProfile() {
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john.doe@email.com",
    mobileNumber: "+91-9876543210",
    dateOfBirth: "1995-05-15",
    gender: "Male",
    address: "123 Main Street, Mumbai, Maharashtra",
    highestQualification: "CA",
    yearsOfExperience: "5",
    currentSalary: "800000",
    expectedSalary: "1200000",
    skills: ["Tax Planning", "GST", "Income Tax", "Audit"],
    languages: ["English", "Hindi", "Marathi"],
    availability: "Immediate"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateNavbar />
      <div className="pt-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your personal and professional information</p>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mr-6">
                <span className="text-green-600 font-semibold text-2xl">
                  {profile.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profile.fullName}</h2>
                <p className="text-gray-600">{profile.highestQualification} • {profile.yearsOfExperience} years experience</p>
                <p className="text-gray-500">{profile.email}</p>
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Edit Profile
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
              <input
                type="tel"
                value={profile.mobileNumber}
                onChange={(e) => setProfile({...profile, mobileNumber: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({...profile, gender: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <select
                value={profile.availability}
                onChange={(e) => setProfile({...profile, availability: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              >
                <option>Immediate</option>
                <option>15 days</option>
                <option>1 month</option>
                <option>2 months</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                value={profile.address}
                onChange={(e) => setProfile({...profile, address: e.target.value})}
                disabled={!isEditing}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Highest Qualification</label>
              <select
                value={profile.highestQualification}
                onChange={(e) => setProfile({...profile, highestQualification: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              >
                <option>CA</option>
                <option>CS</option>
                <option>CMA</option>
                <option>MBA</option>
                <option>B.Com</option>
                <option>M.Com</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <select
                value={profile.yearsOfExperience}
                onChange={(e) => setProfile({...profile, yearsOfExperience: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              >
                <option>0-1</option>
                <option>1-2</option>
                <option>2-3</option>
                <option>3-5</option>
                <option>5-7</option>
                <option>7-10</option>
                <option>10+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Salary (₹/year)</label>
              <input
                type="number"
                value={profile.currentSalary}
                onChange={(e) => setProfile({...profile, currentSalary: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Salary (₹/year)</label>
              <input
                type="number"
                value={profile.expectedSalary}
                onChange={(e) => setProfile({...profile, expectedSalary: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Skills & Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((language, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}