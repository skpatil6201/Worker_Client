import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { getAuthHeaders } from "../../utils/auth";
import { buildApiUrl, API_CONFIG } from "../../config/api";

interface Firm {
  _id: string;
  firmName: string;
  email: string;
  registrationNumber: string;
  firmType: string;
  status: string;
  createdAt: string;
}

export default function ManageFirms() {
  const [firms, setFirms] = useState<Firm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchFirms();
  }, []);

  const fetchFirms = async () => {
    try {
      setError(null);
      const headers = getAuthHeaders();
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.FIRMS), { headers });
      
      if (response.ok) {
        const result = await response.json();
        setFirms(result.success ? result.data : []);
      } else {
        setError("Failed to fetch firms");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching firms:", error);
      setError("Failed to load firms");
      setLoading(false);
    }
  };

  const updateFirmStatus = async (firmId: string, status: string) => {
    try {
      const headers = getAuthHeaders();
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.FIRM_STATUS(firmId)), {
        method: "PUT",
        headers,
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchFirms();
      } else {
        alert("Failed to update firm status");
      }
    } catch (error) {
      console.error("Error updating firm status:", error);
      alert("Error updating firm status");
    }
  };

  const filteredFirms = firms.filter(firm => {
    const matchesSearch = firm.firmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         firm.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || firm.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading firms...</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Manage Firms</h1>
          <p className="text-gray-600">Review and manage firm registrations</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Firms</label>
              <input
                type="text"
                placeholder="Search by firm name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Firms</h3>
            <p className="text-3xl font-bold text-blue-600">{firms.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {firms.filter(f => f.status === "Pending").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Approved</h3>
            <p className="text-3xl font-bold text-green-600">
              {firms.filter(f => f.status === "Approved").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Rejected</h3>
            <p className="text-3xl font-bold text-red-600">
              {firms.filter(f => f.status === "Rejected").length}
            </p>
          </div>
        </div>

        {/* Firms Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Firms ({filteredFirms.length})
            </h3>
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
                {filteredFirms.map((firm) => (
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
                          onClick={() => updateFirmStatus(firm._id, "Approved")}
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateFirmStatus(firm._id, "Rejected")}
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
      </div>
    </div>
  );
}