import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";

interface Firm {
  _id: string;
  firmName: string;
  email: string;
  registrationNumber: string;
  firmType: string;
  status: string;
  createdAt: string;
  contactPerson: string;
  phone: string;
  address: string;
}

export default function ManageFirms() {
  const [firms, setFirms] = useState<Firm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchFirms();
  }, []);

  const fetchFirms = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/firms");
      const data = await response.json();
      setFirms(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching firms:", error);
      setLoading(false);
    }
  };

  const updateFirmStatus = async (firmId: string, status: string) => {
    try {
      await fetch(`http://localhost:8080/api/firms/${firmId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      fetchFirms();
      alert(`Firm ${status} successfully!`);
    } catch (error) {
      console.error("Error updating firm status:", error);
    }
  };

  const deleteFirm = async (firmId: string) => {
    if (window.confirm("Are you sure you want to delete this firm?")) {
      try {
        await fetch(`http://localhost:8080/api/firms/${firmId}`, {
          method: "DELETE"
        });
        fetchFirms();
        alert("Firm deleted successfully!");
      } catch (error) {
        console.error("Error deleting firm:", error);
      }
    }
  };

  const filteredFirms = firms.filter(firm => {
    const matchesSearch = firm.firmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         firm.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         firm.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || firm.status === statusFilter;
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
          <p className="text-gray-600">Review and manage registered CA firms</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Firms</h3>
            <p className="text-3xl font-bold text-blue-600">{firms.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Approved</h3>
            <p className="text-3xl font-bold text-green-600">
              {firms.filter(f => f.status === "approved").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {firms.filter(f => f.status === "pending").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Rejected</h3>
            <p className="text-3xl font-bold text-red-600">
              {firms.filter(f => f.status === "rejected").length}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Firms</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search by name, email, or registration number..."
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
          </div>
        </div>

        {/* Firms Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Registered Firms ({filteredFirms.length})
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
                    Contact
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
                        <div className="text-sm text-gray-500">{firm.firmType}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{firm.registrationNumber}</div>
                      <div className="text-sm text-gray-500">
                        Registered: {new Date(firm.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{firm.contactPerson || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{firm.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        firm.status === "approved" 
                          ? "bg-green-100 text-green-800"
                          : firm.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {firm.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {firm.status !== "approved" && (
                          <button
                            onClick={() => updateFirmStatus(firm._id, "approved")}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                        )}
                        {firm.status !== "rejected" && (
                          <button
                            onClick={() => updateFirmStatus(firm._id, "rejected")}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => deleteFirm(firm._id)}
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

        {filteredFirms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No firms found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}