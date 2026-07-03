import { useState } from "react";
import CandidateNavbar from "../../components/CandidateNavbar";
import { getUserData } from "../../utils/auth";

const splitList = (value?: string) => {
  return value
    ? value.split(",").map(item => item.trim()).filter(Boolean)
    : [];
};

const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

export default function Resume() {
  const candidate = getUserData();
  const [resume, setResume] = useState({
    personalInfo: {
      fullName: candidate?.fullName || candidate?.username || "Candidate Name",
      email: candidate?.email || "",
      phone: candidate?.mobileNumber || candidate?.phone || "",
      location: candidate?.address || "",
      linkedin: "linkedin.com/in/johndoe",
      summary: `Finance professional with ${candidate?.yearsOfExperience || "relevant"} experience in ${candidate?.areasOfExpertise?.join(", ") || "accounting, taxation, and audit support"}.`
    },
    experience: [
      {
        id: "1",
        position: candidate?.positionHeld || "Professional Experience",
        company: candidate?.currentPreviousEmployer || "Current / Previous Employer",
        duration: candidate?.yearsOfExperience || "Experience details",
        description: `Worked across ${candidate?.areasOfExpertise?.join(", ") || "accounting, compliance, taxation, and audit-related responsibilities"}.`
      }
    ],
    education: [
      {
        id: "1",
        degree: candidate?.highestQualification || "Highest Qualification",
        institution: "Candidate Provided Details",
        year: "",
        grade: candidate?.certifications || "Certifications"
      }
    ],
    skills: [
      ...(candidate?.areasOfExpertise || []),
      ...(candidate?.softwareProficiency || []),
      ...splitList(candidate?.otherSoftware)
    ].length
      ? [
        ...(candidate?.areasOfExpertise || []),
        ...(candidate?.softwareProficiency || []),
        ...splitList(candidate?.otherSoftware)
      ]
      : ["Accounting", "Taxation", "Audit", "GST", "Excel"],
    certifications: splitList(candidate?.certifications).length
      ? splitList(candidate?.certifications)
      : [candidate?.highestQualification || "Professional Certification"]
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert("Resume updated successfully!");
  };

  const handleDownloadResume = () => {
    const skills = resume.skills.map(skill => `<span>${escapeHtml(skill)}</span>`).join("");
    const certifications = resume.certifications.map(cert => `<li>${escapeHtml(cert)}</li>`).join("");
    const experience = resume.experience.map(exp => `
      <section class="entry">
        <h3>${escapeHtml(exp.position)}</h3>
        <p class="meta"><strong>${escapeHtml(exp.company)}</strong>${exp.duration ? ` | ${escapeHtml(exp.duration)}` : ""}</p>
        <p class="body-text">${escapeHtml(exp.description)}</p>
      </section>
    `).join("");
    const education = resume.education.map(edu => `
      <section class="entry">
        <h3>${escapeHtml(edu.degree)}</h3>
        <p class="meta">${escapeHtml(edu.institution)}${edu.year ? ` | ${escapeHtml(edu.year)}` : ""}</p>
        <p class="body-text">${escapeHtml(edu.grade)}</p>
      </section>
    `).join("");

    const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(resume.personalInfo.fullName)} Resume</title>
  <style>
    @page { size: A4; margin: 12mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #eef2f7;
      color: #172033;
      font-family: Inter, Arial, sans-serif;
      line-height: 1.45;
    }
    .page {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      background: #ffffff;
      display: grid;
      grid-template-columns: 72mm 1fr;
      box-shadow: 0 20px 60px rgba(15, 23, 42, 0.15);
    }
    .sidebar {
      background: #0f2f2c;
      color: #ffffff;
      padding: 28px 24px;
    }
    .main {
      padding: 30px 34px;
    }
    .avatar {
      width: 74px;
      height: 74px;
      border-radius: 50%;
      background: #20b486;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 26px;
      font-weight: 800;
      margin-bottom: 20px;
      letter-spacing: 0;
    }
    h1 {
      margin: 0;
      color: #111827;
      font-size: 34px;
      line-height: 1.05;
      letter-spacing: 0;
    }
    .role {
      margin: 8px 0 22px;
      color: #166534;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
    }
    h2 {
      margin: 24px 0 12px;
      color: #111827;
      font-size: 14px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-bottom: 2px solid #20b486;
      padding-bottom: 7px;
    }
    .sidebar h2 {
      color: #d1fae5;
      border-color: rgba(209, 250, 229, 0.45);
    }
    h3 {
      margin: 0 0 3px;
      color: #172033;
      font-size: 15px;
    }
    .sidebar p,
    .sidebar li {
      color: #e5f4ef;
      font-size: 12px;
      overflow-wrap: anywhere;
    }
    .contact-line {
      margin: 0 0 10px;
    }
    .summary {
      color: #374151;
      font-size: 13px;
      margin: 0 0 8px;
    }
    .entry {
      margin-bottom: 15px;
      break-inside: avoid;
    }
    .meta {
      color: #64748b;
      font-size: 12px;
      margin: 0 0 5px;
    }
    .body-text {
      color: #374151;
      font-size: 13px;
      margin: 0;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }
    .chips span {
      background: #dcfce7;
      color: #166534;
      border-radius: 999px;
      padding: 6px 10px;
      font-size: 11px;
      font-weight: 700;
    }
    ul {
      margin: 8px 0 0;
      padding-left: 18px;
    }
    li {
      margin-bottom: 6px;
      font-size: 13px;
    }
    .detail {
      margin: 0 0 10px;
    }
    .detail strong {
      display: block;
      color: #d1fae5;
      font-size: 11px;
      text-transform: uppercase;
      margin-bottom: 2px;
    }
    @media print {
      body { background: #ffffff; }
      .page {
        width: auto;
        min-height: auto;
        margin: 0;
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <aside class="sidebar">
      <div class="avatar">${escapeHtml(resume.personalInfo.fullName.split(" ").map(name => name[0]).join("").slice(0, 2).toUpperCase())}</div>
      <h2>Contact</h2>
      <p class="contact-line">${escapeHtml(resume.personalInfo.email || "Email not provided")}</p>
      <p class="contact-line">${escapeHtml(resume.personalInfo.phone || "Phone not provided")}</p>
      <p class="contact-line">${escapeHtml(resume.personalInfo.location || "Location not provided")}</p>
      <h2>Candidate Details</h2>
      <p class="detail"><strong>Qualification</strong>${escapeHtml(candidate?.highestQualification || "Not provided")}</p>
      <p class="detail"><strong>Experience</strong>${escapeHtml(candidate?.yearsOfExperience || "Not provided")}</p>
      <p class="detail"><strong>Employer</strong>${escapeHtml(candidate?.currentPreviousEmployer || "Not provided")}</p>
      <p class="detail"><strong>Position</strong>${escapeHtml(candidate?.positionHeld || "Not provided")}</p>
      <h2>Certifications</h2>
      <ul>${certifications}</ul>
    </aside>
    <main class="main">
      <h1>${escapeHtml(resume.personalInfo.fullName)}</h1>
      <p class="role">${escapeHtml(candidate?.positionHeld || candidate?.highestQualification || "Finance Professional")}</p>
      <h2>Professional Summary</h2>
      <p class="summary">${escapeHtml(resume.personalInfo.summary)}</p>
      <h2>Work Experience</h2>
      ${experience}
      <h2>Education</h2>
      ${education}
      <h2>Skills</h2>
      <div class="chips">${skills}</div>
    </main>
  </div>
  <script>
    window.onload = function () {
      window.focus();
      window.print();
    };
  </script>
</body>
</html>`;

    const printWindow = window.open("", "_blank", "width=900,height=1100");
    if (!printWindow) {
      alert("Please allow popups to download the resume PDF.");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
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
                <button
                  onClick={handleDownloadResume}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
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

        {/* Candidate Details */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Candidate Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Qualification</p>
              <p className="font-medium text-gray-900">{candidate?.highestQualification || "Not provided"}</p>
            </div>
            <div>
              <p className="text-gray-500">Experience</p>
              <p className="font-medium text-gray-900">{candidate?.yearsOfExperience || "Not provided"}</p>
            </div>
            <div>
              <p className="text-gray-500">Current / Previous Employer</p>
              <p className="font-medium text-gray-900">{candidate?.currentPreviousEmployer || "Not provided"}</p>
            </div>
            <div>
              <p className="text-gray-500">Position Held</p>
              <p className="font-medium text-gray-900">{candidate?.positionHeld || "Not provided"}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-500">Address</p>
              <p className="font-medium text-gray-900">{candidate?.address || "Not provided"}</p>
            </div>
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
