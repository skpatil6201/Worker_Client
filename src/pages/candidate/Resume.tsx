import { useState } from "react";
import CandidateNavbar from "../../components/CandidateNavbar";

export default function Resume() {
  const [resume, setResume] = useState({
    personalInfo: {
      fullName: "John Doe",
      email: "john.doe@email.com",
      phone: "+91-9876543210",
      location: "Mumbai, Maharashtra",
      linkedin: "linkedin.com/in/johndoe",
      summary: "Experienced CA with 5+ years in tax consulting and audit services."
    },
    experience: [
      {
        id: "1",
        position: "Senior Tax Consultant",
        company: "ABC Associates",
        duration: "2022 - Present",
        description: "Led tax planning strategies for corporate clients, managed GST compliance."
      },
      {
        id: "2",
        position: "Tax Associate",
        company: "XYZ Firm",
        duration: "2020 - 2022",
        description: "Handled income tax returns, assisted in audit procedures."
      }
    ],
    education: [
      {
        id: "1",
        degree: "Chartered Accountant",
        institution: "ICAI",
        year: "2020",
        grade: "First Class"
      },
      {
        id: "2",
        degree: "Bachelor of Commerce",
        institution: "Mumbai University",
        year: "2018",
        grade: "First Class"
      }
    ],
    skills: ["Tax Planning", "GST", "Income Tax", "Audit", "Tally", "Excel", "Financial Analysis"],
    certifications: [
      "GST Practitioner Certificate",
      "Advanced Excel Certification",
      "Risk Management Certificate"
    ]
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert("Resume updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateNavbar />
      <div className="pt-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Resume</h1>
            <p className="text-gray-600">Manage your professional profile</p>
          </div>
          <div className="flex space-x-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Edit Resume
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Download PDF
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
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
                value={resume.personalInfo.fullName}
                onChange={(e) => setResume({
                  ...resume,
                  personalInfo: { ...resume.personalInfo, fullName: e.target.value }
                })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={resume.personalInfo.email}
                onChange={(e) => setResume({
                  ...resume,
                  personalInfo: { ...resume.personalInfo, email: e.target.value }
                })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={resume.personalInfo.phone}
                onChange={(e) => setResume({
                  ...resume,
                  personalInfo: { ...resume.personalInfo, phone: e.target.value }
                })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={resume.personalInfo.location}
                onChange={(e) => setResume({
                  ...resume,
                  personalInfo: { ...resume.personalInfo, location: e.target.value }
                })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
              <textarea
                value={resume.personalInfo.summary}
                onChange={(e) => setResume({
                  ...resume,
                  personalInfo: { ...resume.personalInfo, summary: e.target.value }
                })}
                disabled={!isEditing}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Work Experience</h3>
            {isEditing && (
              <button className="text-green-600 hover:text-green-700 text-sm">+ Add Experience</button>
            )}
          </div>
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                <p className="text-gray-600">{exp.company} • {exp.duration}</p>
                <p className="text-gray-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Education</h3>
            {isEditing && (
              <button className="text-green-600 hover:text-green-700 text-sm">+ Add Education</button>
            )}
          </div>
          <div className="space-y-4">
            {resume.education.map((edu) => (
              <div key={edu.id} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                <p className="text-gray-600">{edu.institution} • {edu.year}</p>
                <p className="text-gray-700">{edu.grade}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h3>
          <ul className="space-y-2">
            {resume.certifications.map((cert, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <span className="text-green-600 mr-2">✓</span>
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}