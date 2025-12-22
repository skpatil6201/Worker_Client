import { useState, useEffect } from "react";
import CandidateNavbar from "../components/CandidateNavbar";
import { getAuthHeaders } from "../utils/auth";
import { buildApiUrl, API_CONFIG } from "../config/api";

interface JobPosting {
  _id: string;
  title: string;
  description: string;
  firmName: string;
  firmId: string;
  requirements: string[];
  salary: string;
  location: string;
  jobType: string;
  status: string;
  createdAt: string;
  hasApplied?: boolean;
}

interface Application {
  _id: string;
  jobId: string;
  jobTitle: string;
  firmName: string;
  status: string;
  appliedAt: string;
  updatedAt: string;
}

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Mock candidate data - in real app, get from auth context
  const candidateData = {
    fullName: "John Doe",
    email: "john@example.com",
    qualification: "CA",
    experience: "3-5 years"
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = getAuthHeaders();

      // Fetch available job postings
      const jobsResponse = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.JOBS), { headers });
      if (jobsResponse.ok) {
        const jobsResult = await jobsResponse.json();
        setJobPostings(jobsResult.success ? jobsResult.data : []);
      }

      // Fetch candidate's applications
      const applicationsResponse = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.CANDIDATE_APPLICATIONS), { headers });
      if (applicationsResponse.ok) {
        const applicationsResult = await applicationsResponse.json();
        setMyApplications(applicationsResult.success ? applicationsResult.data : []);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const applyForJob = async (jobId: string) => {
    try {
      const headers = getAuthHeaders();
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.APPLY_JOB(jobId)), {
        method: "POST",
        headers,
        body: JSON.stringify({ coverLetter: "" })
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        fetchData(); // Refresh data
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Error submitting application");
    }
  };

  const withdrawApplication = async (applicationId: string) => {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.DELETE_APPLICATION(applicationId)), {
        method: "DELETE"
      });

      if (response.ok) {
        alert("Application withdrawn successfully!");
        fetchData(); // Refresh data
      } else {
        alert("Failed to withdraw application");
      }
    } catch (error) {
      console.error("Error withdrawing application:", error);
      alert("Error withdrawing application");
    }
  };

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.firmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "" || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CandidateNavbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateNavbar />
      
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Candidate Dashboard</h1>
          <p className="text-gray-600">Welcome, {candidateData.fullName} • {candidateData.qualification} • {candidateData.experience}</p>
        </div>
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "jobs", label: "Available Jobs" },
              { id: "applications", label: "My Applications" },
              { id: "profile", label: "Profile" }
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

        {/* Available Jobs Tab */}
        {activeTab === "jobs" && (
          <div>
            {/* Search and Filter */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Jobs</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search by job title, company, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Filter by location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div key={job._id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{job.title}</h3>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 ml-2">
                        {job.status}
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium text-sm">{job.firmName}</p>
                    <p className="text-gray-600 text-sm">{job.location} • {job.jobType}</p>
                    <p className="text-green-600 font-medium text-sm">{job.salary}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{job.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2 text-sm">Requirements:</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {req}
                        </span>
                      ))}
                      {job.requirements.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                          +{job.requirements.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    {job.hasApplied && (
                      <div className="text-xs text-green-600 font-medium">
                        ✓ Already Applied
                      </div>
                    )}
                    <button
                      onClick={() => applyForJob(job._id)}
                      disabled={job.hasApplied}
                      className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition ${
                        job.hasApplied
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {job.hasApplied ? "Applied" : "Apply Now"}
                    </button>
                  </div>
                </div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No jobs found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* My Applications Tab */}
        {activeTab === "applications" && (
          <div>
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Application Status Overview</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{myApplications.length}</p>
                    <p className="text-sm text-gray-500">Total Applications</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">
                      {myApplications.filter(app => app.status === "pending").length}
                    </p>
                    <p className="text-sm text-gray-500">Pending</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {myApplications.filter(app => app.status === "accepted").length}
                    </p>
                    <p className="text-sm text-gray-500">Accepted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">
                      {myApplications.filter(app => app.status === "rejected").length}
                    </p>
                    <p className="text-sm text-gray-500">Rejected</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Applications List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">My Applications</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied Date
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
                    {myApplications.map((application) => (
                      <tr key={application._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{application.jobTitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{application.firmName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(application.appliedAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            application.status === "accepted" 
                              ? "bg-green-100 text-green-800"
                              : application.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {application.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {application.status === "pending" && (
                            <button
                              onClick={() => withdrawApplication(application._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Withdraw
                            </button>
                          )}
                          {application.status === "accepted" && (
                            <span className="text-green-600">Congratulations!</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {myApplications.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">You haven't applied to any jobs yet.</p>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Browse Jobs
                </button>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={candidateData.fullName}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={candidateData.email}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={candidateData.qualification}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={candidateData.experience}
                  readOnly
                />
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}