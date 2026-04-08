import { useState, useEffect } from "react";
import CandidateNavbar from "../../components/CandidateNavbar";
import { buildApiUrl } from "../../config/api";
import { getAuthHeaders } from "../../utils/auth";

interface Application {
  _id: string;
  jobTitle: string;
  firmName: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired";
  createdAt: string;
  coverLetter?: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending:     "bg-yellow-100 text-yellow-800",
  reviewed:    "bg-blue-100 text-blue-800",
  shortlisted: "bg-purple-100 text-purple-800",
  rejected:    "bg-red-100 text-red-800",
  hired:       "bg-green-100 text-green-800",
};

export default function MyApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(buildApiUrl("/applications/candidate/current"), {
          headers: getAuthHeaders(),
        });
        if (!res.ok) throw new Error("Failed to fetch applications");
        const result = await res.json();
        setApplications(result.success ? result.data : []);
      } catch (err) {
        setError("Could not load applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const filtered = applications.filter(
    (a) => statusFilter === "All" || a.status === statusFilter
  );

  const count = (status: string) =>
    applications.filter((a) => a.status === status).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateNavbar />
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600">Track your job application status</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-semibold text-gray-600">Total Applied</h3>
            <p className="text-3xl font-bold text-blue-600">{applications.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-semibold text-gray-600">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{count("pending")}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-semibold text-gray-600">Shortlisted</h3>
            <p className="text-3xl font-bold text-purple-600">{count("shortlisted")}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-semibold text-gray-600">Hired</h3>
            <p className="text-3xl font-bold text-green-600">{count("hired")}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <label className="text-sm font-medium text-gray-700 mr-3">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Applications ({filtered.length})
            </h3>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-3 text-gray-500">Loading...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No applications found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map((app) => (
                    <tr key={app._id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.jobTitle}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{app.firmName}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${STATUS_COLORS[app.status] || "bg-gray-100 text-gray-800"}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
