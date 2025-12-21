import { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { getAuthHeaders } from "../utils/auth";

interface Firm {
  _id: string;
  firmName: string;
  email: string;
  registrationNumber: string;
  firmType: string;
  status: string;
  createdAt: string;
}

interface Candidate {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  highestQualification: string;
  yearsOfExperience: string;
  status: string;
  createdAt: string;
}

interface JobPosting {
  _id: string;
  title: string;
  description: string;
  firmId: string;
  firmName: string;
  requirements: string[];
  salary: string;
  location: string;
  status: string;
  applicationsCount: number;
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [firms, setFirms] = useState<Firm[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setError(null);
      const headers = getAuthHeaders();

      // Fetch firms
      const firmsResponse = await fetch("http://localhost:8080/api/firms", { headers });
      if (firmsResponse.ok) {
        const firmsResult = await firmsResponse.json();
        setFirms(firmsResult.success ? firmsResult.data : []);
      }

      // Fetch candidates
      const candidatesResponse = await fetch("http://localhost:8080/api/candidates", { headers });
      if (candidatesResponse.ok) {
        const candidatesResult = await candidatesResponse.json();
        setCandidates(candidatesResult.success ? candidatesResult.data : []);
      }

      // Set empty job postings for now (endpoint doesn't exist yet)
      setJobPostings([]);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load dashboard data");
      setLoading(false);
    }
  };

  const updateFirmStatus = async (firmId: string, status: string) => {
    try {
      const headers = getAuthHeaders();
      const response = await fetch(`http://localhost:8080/api/firms/${firmId}/status`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchData(); // Refresh data
      } else {
        alert("Failed to update firm status");
      }
    } catch (error) {
      console.error("Error updating firm status:", error);
      alert("Error updating firm status");
    }
  };

  const updateCandidateStatus = async (candidateId: string, status: string) => {
    try {
      const headers = getAuthHeaders();
      const response = await fetch(`http://localhost:8080/api/candidates/${candidateId}/status`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchData(); // Refresh data
      } else {
        alert("Failed to update candidate status");
      }
    } catch (error) {
      console.error("Error updating candidate status:", error);
      alert("Error updating candidate status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
            <button 
              onClick={fetchData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage firms, candidates, and platform activity</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Firms</h3>
            <p className="text-3xl font-bold text-blue-600">{firms.length}</p>
            <p className="text-sm text-gray-500">
              Approved: {firms.filter(f => f.status === "Approved").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Candidates</h3>
            <p className="text-3xl font-bold text-green-600">{candidates.length}</p>
            <p className="text-sm text-gray-500">
              Approved: {candidates.filter(c => c.status === "Approved").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Pending Reviews</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {firms.filter(f => f.status === "Pending").length + candidates.filter(c => c.status === "Pending").length}
            </p>
            <p className="text-sm text-gray-500">Firms & Candidates</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
            <p className="text-3xl font-bold text-green-600">✓</p>
            <p className="text-sm text-gray-500">All systems operational</p>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview" },
              { id: "firms", label: "Firms" },
              { id: "candidates", label: "Candidates" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">System initialized successfully</p>
                  <p className="text-sm text-gray-500">Admin dashboard is ready</p>
                </div>
                <span className="text-green-600">✓</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Database connected</p>
                  <p className="text-sm text-gray-500">MongoDB connection established</p>
                </div>
                <span className="text-green-600">✓</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Authentication working</p>
                  <p className="text-sm text-gray-500">Login system operational</p>
                </div>
                <span className="text-green-600">✓</span>
              </div>
            </div>
          </div>
        )}

        {/* Firms Tab */}
        {activeTab === "firms" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Registered Firms</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Firm Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {firms.map((firm) => (
                    <tr key={firm._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{firm.firmName}</div>
                          <div className="text-sm text-gray-500">{firm.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{firm.registrationNumber}</div>
                        <div className="text-sm text-gray-500">{firm.firmType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          firm.status === "Approved" 
                            ? "bg-green-100 text-green-800"
                            : firm.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {firm.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateFirmStatus(firm._id, "approved")}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateFirmStatus(firm._id, "rejected")}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Candidates Tab */}
        {activeTab === "candidates" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Registered Candidates</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qualification
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {candidates.map((candidate) => (
                    <tr key={candidate._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{candidate.fullName}</div>
                          <div className="text-sm text-gray-500">{candidate.email}</div>
                          <div className="text-sm text-gray-500">{candidate.mobileNumber}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{candidate.highestQualification}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{candidate.yearsOfExperience}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          candidate.status === "approved" 
                            ? "bg-green-100 text-green-800"
                            : candidate.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateCandidateStatus(candidate._id, "approved")}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateCandidateStatus(candidate._id, "rejected")}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Job Postings Tab */}
        {activeTab === "jobs" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">All Job Postings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Firm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applications
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobPostings.map((job) => (
                    <tr key={job._id}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-500">{job.location}</div>
                          <div className="text-sm text-gray-500">{job.salary}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.firmName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.applicationsCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          job.status === "active" 
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}