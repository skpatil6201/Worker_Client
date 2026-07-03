import { useState, useEffect } from "react";
import CandidateNavbar from "../../components/CandidateNavbar";
import { buildApiUrl, API_CONFIG } from "../../config/api";
import { getAuthHeaders } from "../../utils/auth";

interface Job {
  _id: string;
  title: string;
  firmName: string;
  location: string;
  salary: string;
  jobType: string;
  requirements: string[];
  description: string;
  createdAt: string;
  hasApplied?: boolean;
}

interface Application {
  jobId: string | { _id?: string; id?: string };
}

const getApplicationJobId = (application: Application) => {
  if (typeof application.jobId === "string") return application.jobId;
  return application.jobId?._id || application.jobId?.id || "";
};

export default function FindJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyingJobIds, setApplyingJobIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const headers = getAuthHeaders();
      const [jobsResponse, applicationsResponse] = await Promise.all([
        fetch(buildApiUrl(API_CONFIG.ENDPOINTS.JOBS), { headers }),
        fetch(buildApiUrl(API_CONFIG.ENDPOINTS.CANDIDATE_APPLICATIONS), { headers })
      ]);

      const jobsResult = jobsResponse.ok ? await jobsResponse.json() : { success: false, data: [] };
      const applicationsResult = applicationsResponse.ok ? await applicationsResponse.json() : { success: false, data: [] };
      const applications = applicationsResult.success ? applicationsResult.data : [];
      const appliedJobIds = new Set(applications.map(getApplicationJobId).filter(Boolean));
      const fetchedJobs = jobsResult.success ? jobsResult.data : [];

      setJobs(fetchedJobs.map((job: Job) => ({
        ...job,
        hasApplied: job.hasApplied || appliedJobIds.has(job._id)
      })));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  const applyForJob = async (jobId: string) => {
    try {
      setApplyingJobIds(prev => [...prev, jobId]);
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.APPLY_JOB(jobId)), {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ coverLetter: "" })
      });

      if (response.ok) {
        setJobs(prev => prev.map(job => (
          job._id === jobId ? { ...job, hasApplied: true } : job
        )));
        alert("Application submitted successfully!");
        fetchJobs();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Error submitting application");
    } finally {
      setApplyingJobIds(prev => prev.filter(id => id !== jobId));
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.firmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = locationFilter === "All" || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CandidateNavbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateNavbar />
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Jobs</h1>
          <p className="text-gray-600">Discover opportunities that match your skills</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Jobs</label>
              <input
                type="text"
                placeholder="Search by title, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="All">All Locations</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Pune">Pune</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Advanced Search
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.map((job) => (
            <div key={job._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-1">{job.firmName} • {job.location}</p>
                  <p className="text-gray-600 mb-1">{job.salary} • {job.jobType}</p>
                  <p className="text-sm text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => applyForJob(job._id)}
                    disabled={job.hasApplied || applyingJobIds.includes(job._id)}
                    className={`px-4 py-2 rounded-lg ${
                      job.hasApplied
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {job.hasApplied ? "Applied" : applyingJobIds.includes(job._id) ? "Applying..." : "Apply Now"}
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                    Save Job
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-700 text-sm">{job.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
