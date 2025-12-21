import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";

interface Candidate {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  highestQualification: string;
  yearsOfExperience: string;
  status: string;
  createdAt: string;
  currentLocation: string;
  preferredLocation: string;
}

export default function ManageCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [qualificationFilter, setQualificationFilter] = useState("all");

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/candidates");
      const data = await response.json();
      setCandidates(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setLoading(false);
    }
  };

  const updateCandidateStatus = async (candidateId: string, status: string) => {
    try {
      await fetch(`http://localhost:8080/api/candidates/${candidateId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      fetchCandidates();
      alert(`Candidate ${status} successfully!`);
    } catch (error) {
      console.error("Error updating candidate status:", error);
    }
  };

  const deleteCandidate = async (candidateId: string) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        await fetch(`http://localhost:8080/api/candidates/${candidateId}`, {
          method: "DELETE"
        });
        fetchCandidates();
        alert("Candidate deleted successfully!");
      } catch (error) {
        console.error("Error deleting candidate:", error);
      }
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.mobileNumber.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter;
    const matchesQualification = qualificationFilter === "all" || candidate.highestQualification === qualificationFilter;
    return matchesSearch && matchesStatus && matchesQualification;
  });

  const qualifications = [...new Set(candidates.map(c => c.highestQualification))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading candidates...</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Manage Candidates</h1>
          <p className="text-gray-600">Review and manage registered candidates</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Candidates</h3>
            <p className="text-3xl font-bold text-blue-600">{candidates.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Approved</h3>
            <p className="text-3xl font-bold text-green-600">
              {candidates.filter(c => c.status === "approved").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {candidates.filter(c => c.status === "pending").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Rejected</h3>
            <p className="text-3xl font-bold text-red-600">
              {candidates.filter(c => c.status === "rejected").length}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Candidates</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Qualification</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={qualificationFilter}
                onChange={(e) => setQualificationFilter(e.target.value)}
              >
                <option value="all">All Qualifications</option>
                {qualifications.map(qual => (
                  <option key={qual} value={qual}>{qual}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Candidates Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Registered Candidates ({filteredCandidates.length})
            </h3>
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
                    Location
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
                {filteredCandidates.map((candidate) => (
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
                      <div className="text-sm text-gray-900">{candidate.currentLocation || 'N/A'}</div>
                      <div className="text-sm text-gray-500">Prefers: {candidate.preferredLocation || 'N/A'}</div>
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
                        {candidate.status !== "approved" && (
                          <button
                            onClick={() => updateCandidateStatus(candidate._id, "approved")}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                        )}
                        {candidate.status !== "rejected" && (
                          <button
                            onClick={() => updateCandidateStatus(candidate._id, "rejected")}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => deleteCandidate(candidate._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No candidates found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}