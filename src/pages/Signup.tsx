import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buildApiUrl, API_CONFIG } from "../config/api";

interface Partner {
  name: string;
  qualification: string;
  membershipNo: string;
  designation: string;
  contact?: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Common fields
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    userType: "candidate" as "candidate" | "firm",
    
    // Candidate specific fields
    dateOfBirth: "",
    gender: "Male" as "Male" | "Female" | "Other",
    highestQualification: "",
    certifications: "",
    yearsOfExperience: "0-1" as "0-1" | "1-3" | "3-5" | "5+",
    currentPreviousEmployer: "",
    positionHeld: "",
    areasOfExpertise: [] as string[],
    softwareProficiency: [] as string[],
    otherSoftware: "",
    
    // Firm specific fields
    registrationNumber: "",
    dateOfRegistration: "",
    panGstNumber: "",
    firmType: "Partnership" as "Partnership" | "LLP" | "Private Ltd" | "Others",
    firmTypeOther: "",
    cityStatePin: "",
    website: "",
    partners: [] as Partner[],
    areasOfPractice: [] as string[],
    otherPracticeArea: ""
  });

  const [currentPartner, setCurrentPartner] = useState<Partner>({
    name: "",
    qualification: "",
    membershipNo: "",
    designation: "",
    contact: ""
  });

  const expertiseAreas = [
    "Tax Audit",
    "Internal Audit", 
    "Compliance",
    "Tax Filing",
    "Accounting Software"
  ];

  const softwareOptions = [
    "Tally",
    "QuickBooks", 
    "Excel"
  ];

  const practiceAreas = [
    "Tax Audit",
    "Internal Audit",
    "GST / VAT / Sales Tax Compliance", 
    "Accounting & Bookkeeping",
    "Tax Filing & Advisory",
    "Risk & Financial Consulting"
  ];

  const addPartner = () => {
    if (currentPartner.name && currentPartner.qualification) {
      setFormData({
        ...formData,
        partners: [...formData.partners, currentPartner]
      });
      setCurrentPartner({
        name: "",
        qualification: "",
        membershipNo: "",
        designation: "",
        contact: ""
      });
    }
  };

  const removePartner = (index: number) => {
    setFormData({
      ...formData,
      partners: formData.partners.filter((_, i) => i !== index)
    });
  };

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

  const handlePracticeAreaChange = (area: string) => {
    const updatedAreas = formData.areasOfPractice.includes(area)
      ? formData.areasOfPractice.filter(a => a !== area)
      : [...formData.areasOfPractice, area];
    
    setFormData({ ...formData, areasOfPractice: updatedAreas });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let endpoint = "";
    let payload = {};

    if (formData.userType === "candidate") {
      endpoint = buildApiUrl(API_CONFIG.ENDPOINTS.CANDIDATE_REGISTER);
      payload = {
        fullName: formData.name,
        dateOfBirth: formData.dateOfBirth || "1990-01-01",
        gender: formData.gender,
        mobileNumber: formData.phone,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        highestQualification: formData.highestQualification || "Graduate",
        certifications: formData.certifications || "None",
        yearsOfExperience: formData.yearsOfExperience,
        currentPreviousEmployer: formData.currentPreviousEmployer,
        positionHeld: formData.positionHeld,
        areasOfExpertise: formData.areasOfExpertise,
        softwareProficiency: [...formData.softwareProficiency, formData.otherSoftware].filter(Boolean),
        documents: []
      };
    } else {
      endpoint = buildApiUrl(API_CONFIG.ENDPOINTS.FIRM_REGISTER);
      payload = {
        firmName: formData.name,
        registrationNumber: formData.registrationNumber || "REG001",
        dateOfRegistration: formData.dateOfRegistration || "2024-01-01",
        panGstNumber: formData.panGstNumber || "PAN001",
        firmType: formData.firmType === "Others" ? formData.firmTypeOther : formData.firmType,
        headOfficeAddress: formData.address,
        cityStatePin: formData.cityStatePin || "City, State, 000000",
        firmContactNumber: formData.phone,
        email: formData.email,
        password: formData.password,
        website: formData.website,
        partners: formData.partners,
        areasOfPractice: [...formData.areasOfPractice, formData.otherPracticeArea].filter(Boolean),
        documents: []
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Registration successful! Please wait for verification.");
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Registration Form
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Complete your registration details below
          </p>

          {/* Registration Type Selection */}
          <div className="mb-8">
            <label className="mb-4 block text-lg font-semibold text-gray-700 text-center">
              Select Registration Type *
            </label>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, userType: "candidate" })}
                className={`p-4 rounded-lg border-2 text-base font-medium transition-all ${
                  formData.userType === "candidate"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                Individual Candidate
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, userType: "firm" })}
                className={`p-4 rounded-lg border-2 text-base font-medium transition-all ${
                  formData.userType === "firm"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                CA Firm
              </button>
            </div>
            <p className="mt-3 text-sm text-gray-500 text-center">
              {formData.userType === "candidate" 
                ? "Register as an individual professional" 
                : "Register your CA firm for business services"
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    {formData.userType === "candidate" ? "Full Name" : "Firm Name"} *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={formData.userType === "candidate" ? "Full name" : "Firm name"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {formData.userType === "candidate" && (
                  <>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Date of Birth *</label>
                      <input
                        type="date"
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Gender *</label>
                      <select
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </>
                )}

                {formData.userType === "firm" && (
                  <>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Registration Number *</label>
                      <input
                        type="text"
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ICAI/ROC Registration Number"
                        value={formData.registrationNumber}
                        onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Date of Registration *</label>
                      <input
                        type="date"
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.dateOfRegistration}
                        onChange={(e) => setFormData({ ...formData, dateOfRegistration: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">PAN / GST Number *</label>
                      <input
                        type="text"
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="PAN/GST Number"
                        value={formData.panGstNumber}
                        onChange={(e) => setFormData({ ...formData, panGstNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Firm Type *</label>
                      <select
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.firmType}
                        onChange={(e) => setFormData({ ...formData, firmType: e.target.value as any })}
                      >
                        <option value="Partnership">Partnership</option>
                        <option value="LLP">LLP</option>
                        <option value="Private Ltd">Private Ltd</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    {formData.firmType === "Others" && (
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Specify Other Type</label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={formData.firmTypeOther}
                          onChange={(e) => setFormData({ ...formData, firmTypeOther: e.target.value })}
                        />
                      </div>
                    )}
                  </>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Phone *</label>
                  <input
                    type="tel"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+91 1234567890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Password *</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                {formData.userType === "firm" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">City / State / PIN *</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="City, State, PIN"
                      value={formData.cityStatePin}
                      onChange={(e) => setFormData({ ...formData, cityStatePin: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">Address *</label>
                <textarea
                  required
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              {formData.userType === "firm" && (
                <div className="mt-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">Website</label>
                  <input
                    type="url"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>
              )}
            </div>

            {/* Professional Details for Candidates */}
            {formData.userType === "candidate" && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Professional Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Highest Qualification *</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., B.Com, CA, CPA"
                      value={formData.highestQualification}
                      onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Certifications *</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="CA/CPA/ACCA etc."
                      value={formData.certifications}
                      onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Years of Experience *</label>
                    <select
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.yearsOfExperience}
                      onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value as any })}
                    >
                      <option value="0-1">0–1 years</option>
                      <option value="1-3">1–3 years</option>
                      <option value="3-5">3–5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Current/Previous Employer</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Company name"
                      value={formData.currentPreviousEmployer}
                      onChange={(e) => setFormData({ ...formData, currentPreviousEmployer: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">Position Held</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your position/role"
                    value={formData.positionHeld}
                    onChange={(e) => setFormData({ ...formData, positionHeld: e.target.value })}
                  />
                </div>

                <div className="mt-6">
                  <label className="mb-3 block text-sm font-medium text-gray-700">Areas of Expertise</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {expertiseAreas.map((area) => (
                      <label key={area} className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          className="mr-2 rounded"
                          checked={formData.areasOfExpertise.includes(area)}
                          onChange={() => handleExpertiseChange(area)}
                        />
                        {area}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="mb-3 block text-sm font-medium text-gray-700">Software Proficiency</label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {softwareOptions.map((software) => (
                      <label key={software} className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          className="mr-2 rounded"
                          checked={formData.softwareProficiency.includes(software)}
                          onChange={() => handleSoftwareChange(software)}
                        />
                        {software}
                      </label>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Other software (comma separated)"
                    value={formData.otherSoftware}
                    onChange={(e) => setFormData({ ...formData, otherSoftware: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Firm Details */}
            {formData.userType === "firm" && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Partners / Directors</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={currentPartner.name}
                    onChange={(e) => setCurrentPartner({ ...currentPartner, name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Qualification"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={currentPartner.qualification}
                    onChange={(e) => setCurrentPartner({ ...currentPartner, qualification: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Membership No."
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={currentPartner.membershipNo}
                    onChange={(e) => setCurrentPartner({ ...currentPartner, membershipNo: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Designation"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={currentPartner.designation}
                    onChange={(e) => setCurrentPartner({ ...currentPartner, designation: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Contact (Optional)"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={currentPartner.contact}
                    onChange={(e) => setCurrentPartner({ ...currentPartner, contact: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={addPartner}
                    className="rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition px-4 py-2"
                  >
                    Add Partner
                  </button>
                </div>

                {formData.partners.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Added Partners:</h4>
                    <div className="space-y-2">
                      {formData.partners.map((partner, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                          <span className="text-sm">{partner.name} - {partner.qualification}</span>
                          <button
                            type="button"
                            onClick={() => removePartner(index)}
                            className="text-red-600 text-sm hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">Areas of Practice</label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {practiceAreas.map((area) => (
                      <label key={area} className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          className="mr-2 rounded"
                          checked={formData.areasOfPractice.includes(area)}
                          onChange={() => handlePracticeAreaChange(area)}
                        />
                        {area}
                      </label>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Other practice areas"
                    value={formData.otherPracticeArea}
                    onChange={(e) => setFormData({ ...formData, otherPracticeArea: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Declaration */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Declaration</h3>
              <label className="flex items-start text-sm">
                <input type="checkbox" required className="mr-3 mt-1 rounded" />
                <span className="text-gray-700">
                  I hereby declare that all information provided is true and accurate. 
                  I authorize verification of my documents and background and agree to the terms and conditions.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
            >
              Complete Registration
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}