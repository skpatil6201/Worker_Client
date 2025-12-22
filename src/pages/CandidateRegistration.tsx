import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { buildApiUrl, API_CONFIG } from '../config/api';

export default function CandidateRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    mobileNumber: '',
    email: '',
    password: '',
    address: '',
    highestQualification: '',
    certifications: '',
    yearsOfExperience: '0-1' as '0-1' | '1-3' | '3-5' | '5+',
    currentPreviousEmployer: '',
    positionHeld: '',
    areasOfExpertise: [] as string[],
    softwareProficiency: [] as string[],
    otherSoftware: ''
  });

  const expertiseAreas = [
    'Tax Audit',
    'Internal Audit',
    'Compliance',
    'Tax Filing',
    'Accounting Software'
  ];

  const softwareOptions = [
    'Tally',
    'QuickBooks',
    'Excel'
  ];

  const handleExpertiseChange = (area: string) => {
    const updatedAreas = formData.areasOfExpertise.includes(area)
      ? formData.areasOfExpertise.filter(a => a !== area)
      : [...formData.areasOfExpertise, area];
    
    setFormData({ ...formData, areasOfExpertise: updatedAreas });
  };

  const handleSoftwareChange = (software: string) => {
    const updatedSoftware = formData.softwareProficiency.includes(software)
      ? formData.softwareProficiency.filter(s => s !== software)
      : [...formData.softwareProficiency, software];
    
    setFormData({ ...formData, softwareProficiency: updatedSoftware });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.CANDIDATE_REGISTER), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Candidate registration successful! Please wait for verification.');
        navigate('/login');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-32 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          CANDIDATE REGISTRATION FORM
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Personal Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Personal Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Date of Birth *</label>
                <input 
                  type="date" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Gender *</label>
                <select 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value as any})}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Mobile Number *</label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Password *</label>
                <input 
                  type="password" 
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Address *</label>
                <textarea 
                  required
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* 2. Professional Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Professional Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Highest Qualification *</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.highestQualification}
                  onChange={(e) => setFormData({...formData, highestQualification: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Certifications (CA/CPA/ACCA etc.) *</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.certifications}
                  onChange={(e) => setFormData({...formData, certifications: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Years of Experience *</label>
                <select 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.yearsOfExperience}
                  onChange={(e) => setFormData({...formData, yearsOfExperience: e.target.value as any})}
                >
                  <option value="0-1">0–1 years</option>
                  <option value="1-3">1–3 years</option>
                  <option value="3-5">3–5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Current/Previous Employer</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.currentPreviousEmployer}
                  onChange={(e) => setFormData({...formData, currentPreviousEmployer: e.target.value})}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Position Held</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.positionHeld}
                  onChange={(e) => setFormData({...formData, positionHeld: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* 3. Expertise & Skills */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Expertise & Skills</h3>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-3">Areas of Expertise (tick all that apply)</label>
              <div className="grid md:grid-cols-2 gap-4">
                {expertiseAreas.map((area) => (
                  <label key={area} className="flex items-center">
                    <input 
                      type="checkbox"
                      className="mr-2"
                      checked={formData.areasOfExpertise.includes(area)}
                      onChange={() => handleExpertiseChange(area)}
                    />
                    <span className="text-gray-700">{area}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-3">Software Proficiency</label>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                {softwareOptions.map((software) => (
                  <label key={software} className="flex items-center">
                    <input 
                      type="checkbox"
                      className="mr-2"
                      checked={formData.softwareProficiency.includes(software)}
                      onChange={() => handleSoftwareChange(software)}
                    />
                    <span className="text-gray-700">{software}</span>
                  </label>
                ))}
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Other Software</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.otherSoftware}
                  onChange={(e) => setFormData({...formData, otherSoftware: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Declaration */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Declaration</h3>
            <p className="text-gray-700 mb-4">
              I hereby declare that all information provided is true and accurate. 
              I authorize verification of my documents and background.
            </p>
            <label className="flex items-center">
              <input type="checkbox" required className="mr-2" />
              <span className="text-gray-700">I agree to the terms and conditions</span>
            </label>
          </div>

          <button 
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition font-semibold"
          >
            Submit Registration
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already registered?{' '}
          <Link to="/login" className="text-teal-600 hover:text-teal-700 font-semibold">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}