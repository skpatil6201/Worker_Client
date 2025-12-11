import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Partner {
  name: string;
  qualification: string;
  membershipNo: string;
  designation: string;
  contact: string;
}

export default function FirmRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firmName: '',
    registrationNumber: '',
    dateOfRegistration: '',
    panGstNumber: '',
    firmType: 'Partnership' as 'Partnership' | 'LLP' | 'Private Ltd' | 'Others',
    firmTypeOther: '',
    headOfficeAddress: '',
    cityStatePin: '',
    firmContactNumber: '',
    email: '',
    password: '',
    website: '',
    partners: [] as Partner[],
    areasOfPractice: [] as string[],
    otherPracticeArea: ''
  });

  const [currentPartner, setCurrentPartner] = useState<Partner>({
    name: '',
    qualification: '',
    membershipNo: '',
    designation: '',
    contact: ''
  });

  const practiceAreas = [
    'Tax Audit',
    'Internal Audit', 
    'GST / VAT / Sales Tax Compliance',
    'Accounting & Bookkeeping',
    'Tax Filing & Advisory',
    'Risk & Financial Consulting'
  ];

  const addPartner = () => {
    if (currentPartner.name && currentPartner.qualification) {
      setFormData({
        ...formData,
        partners: [...formData.partners, currentPartner]
      });
      setCurrentPartner({
        name: '',
        qualification: '',
        membershipNo: '',
        designation: '',
        contact: ''
      });
    }
  };

  const removePartner = (index: number) => {
    setFormData({
      ...formData,
      partners: formData.partners.filter((_, i) => i !== index)
    });
  };

  const handlePracticeAreaChange = (area: string) => {
    const updatedAreas = formData.areasOfPractice.includes(area)
      ? formData.areasOfPractice.filter(a => a !== area)
      : [...formData.areasOfPractice, area];
    
    setFormData({ ...formData, areasOfPractice: updatedAreas });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/api/firms/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Firm registration successful! Please wait for verification.');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-32 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          CA FIRM REGISTRATION FORM
        </h2>
        <p className="text-center text-gray-600 mb-8">Tax Consultancy / Auditing</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Firm Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Firm Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Firm Name *</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.firmName}
                  onChange={(e) => setFormData({...formData, firmName: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Registration Number (ICAI/ROC) *</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Date of Registration *</label>
                <input 
                  type="date" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.dateOfRegistration}
                  onChange={(e) => setFormData({...formData, dateOfRegistration: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">PAN / GST Number *</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.panGstNumber}
                  onChange={(e) => setFormData({...formData, panGstNumber: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Firm Type *</label>
                <select 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.firmType}
                  onChange={(e) => setFormData({...formData, firmType: e.target.value as any})}
                >
                  <option value="Partnership">Partnership</option>
                  <option value="LLP">LLP</option>
                  <option value="Private Ltd">Private Ltd</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {formData.firmType === 'Others' && (
                <div>
                  <label className="block text-gray-700 mb-2">Specify Other Type</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.firmTypeOther}
                    onChange={(e) => setFormData({...formData, firmTypeOther: e.target.value})}
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Head Office Address *</label>
                <textarea 
                  required
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.headOfficeAddress}
                  onChange={(e) => setFormData({...formData, headOfficeAddress: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">City / State / PIN *</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.cityStatePin}
                  onChange={(e) => setFormData({...formData, cityStatePin: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Firm Contact Number *</label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.firmContactNumber}
                  onChange={(e) => setFormData({...formData, firmContactNumber: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Website (if any)</label>
                <input 
                  type="url"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* 2. Key Partners / Directors */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Key Partners / Directors</h3>
            
            <div className="grid md:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={currentPartner.name}
                  onChange={(e) => setCurrentPartner({...currentPartner, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Qualification</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={currentPartner.qualification}
                  onChange={(e) => setCurrentPartner({...currentPartner, qualification: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Membership No. (ICAI)</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={currentPartner.membershipNo}
                  onChange={(e) => setCurrentPartner({...currentPartner, membershipNo: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Designation</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={currentPartner.designation}
                  onChange={(e) => setCurrentPartner({...currentPartner, designation: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Contact</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={currentPartner.contact}
                  onChange={(e) => setCurrentPartner({...currentPartner, contact: e.target.value})}
                />
              </div>
            </div>
            
            <button 
              type="button"
              onClick={addPartner}
              className="mb-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Add Partner
            </button>

            {formData.partners.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2">Name</th>
                      <th className="border border-gray-300 px-4 py-2">Qualification</th>
                      <th className="border border-gray-300 px-4 py-2">Membership No.</th>
                      <th className="border border-gray-300 px-4 py-2">Designation</th>
                      <th className="border border-gray-300 px-4 py-2">Contact</th>
                      <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.partners.map((partner, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">{partner.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{partner.qualification}</td>
                        <td className="border border-gray-300 px-4 py-2">{partner.membershipNo}</td>
                        <td className="border border-gray-300 px-4 py-2">{partner.designation}</td>
                        <td className="border border-gray-300 px-4 py-2">{partner.contact}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button 
                            type="button"
                            onClick={() => removePartner(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 3. Areas of Practice */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Areas of Practice</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {practiceAreas.map((area) => (
                <label key={area} className="flex items-center">
                  <input 
                    type="checkbox"
                    className="mr-2"
                    checked={formData.areasOfPractice.includes(area)}
                    onChange={() => handlePracticeAreaChange(area)}
                  />
                  <span className="text-gray-700">{area}</span>
                </label>
              ))}
            </div>
            
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">Other (specify)</label>
              <input 
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.otherPracticeArea}
                onChange={(e) => setFormData({...formData, otherPracticeArea: e.target.value})}
              />
            </div>
          </div>

          {/* Declaration */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Declaration</h3>
            <p className="text-gray-700 mb-4">
              We hereby declare that the information provided above is accurate and true. 
              We authorize verification of the firm and its partners by the concerned authority.
            </p>
            <label className="flex items-center">
              <input type="checkbox" required className="mr-2" />
              <span className="text-gray-700">I agree to the terms and conditions</span>
            </label>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Submit Registration
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already registered?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}