import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { getAuthHeaders } from "../../utils/auth";
import { buildApiUrl, API_CONFIG } from "../../config/api";

export default function Reports() {
  const [stats, setStats] = useState({
    totalFirms: 0,
    totalCandidates: 0,
    pendingFirms: 0,
    pendingCandidates: 0,
    approvedFirms: 0,
    approvedCandidates: 0,
    rejectedFirms: 0,
    rejectedCandidates: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const headers = getAuthHeaders();
      
      // Fetch firms and candidates data
      const [firmsResponse, candidatesResponse] = await Promise.all([
        fetch(buildApiUrl(API_CONFIG.ENDPOINTS.FIRMS), { headers }),
        fetch(buildApiUrl(API_CONFIG.ENDPOINTS.CANDIDATES), { headers })
      ]);

      if (firmsResponse.ok && candidatesResponse.ok) {
        const firmsResult = await firmsResponse.json();
        const candidatesResult = await candidatesResponse.json();
        
        const firms = firmsResult.success ? firmsResult.data : [];
        const candidates = candidatesResult.success ? candidatesResult.data : [];

        setStats({
          totalFirms: firms.length,
          totalCandidates: candidates.length,
          pendingFirms: firms.filter((f: any) => f.status === 'Pending').length,
          pendingCandidates: candidates.filter((c: any) => c.status === 'Pending').length,
          approvedFirms: firms.filter((f: any) => f.status === 'Approved').length,
          approvedCandidates: candidates.filter((c: any) => c.status === 'Approved').length,
          rejectedFirms: firms.filter((f: any) => f.status === 'Rejected').length,
          rejectedCandidates: candidates.filter((c: any) => c.status === 'Rejected').length,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching report data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading reports...</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Platform statistics and performance metrics</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">
              {stats.totalFirms + stats.totalCandidates}
            </p>
            <p className="text-sm text-gray-500">Firms + Candidates</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Firms</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalFirms}</p>
            <p className="text-sm text-gray-500">Registered firms</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Candidates</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.totalCandidates}</p>
            <p className="text-sm text-gray-500">Registered candidates</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Pending Reviews</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {stats.pendingFirms + stats.pendingCandidates}
            </p>
            <p className="text-sm text-gray-500">Awaiting approval</p>
          </div>
        </div>

        {/* Detailed Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Firms Report */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Firms Report</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Total Registered</p>
                  <p className="text-sm text-gray-500">All firms in system</p>
                </div>
                <span className="text-2xl font-bold text-blue-600">{stats.totalFirms}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Approved</p>
                  <p className="text-sm text-gray-500">Active firms</p>
                </div>
                <span className="text-2xl font-bold text-green-600">{stats.approvedFirms}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Pending</p>
                  <p className="text-sm text-gray-500">Awaiting review</p>
                </div>
                <span className="text-2xl font-bold text-yellow-600">{stats.pendingFirms}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Rejected</p>
                  <p className="text-sm text-gray-500">Not approved</p>
                </div>
                <span className="text-2xl font-bold text-red-600">{stats.rejectedFirms}</span>
              </div>
            </div>
          </div>

          {/* Candidates Report */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Candidates Report</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Total Registered</p>
                  <p className="text-sm text-gray-500">All candidates in system</p>
                </div>
                <span className="text-2xl font-bold text-blue-600">{stats.totalCandidates}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Approved</p>
                  <p className="text-sm text-gray-500">Active candidates</p>
                </div>
                <span className="text-2xl font-bold text-green-600">{stats.approvedCandidates}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Pending</p>
                  <p className="text-sm text-gray-500">Awaiting review</p>
                </div>
                <span className="text-2xl font-bold text-yellow-600">{stats.pendingCandidates}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Rejected</p>
                  <p className="text-sm text-gray-500">Not approved</p>
                </div>
                <span className="text-2xl font-bold text-red-600">{stats.rejectedCandidates}</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">System Health</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl text-green-600 mb-2">✓</div>
              <p className="font-medium text-gray-900">Database</p>
              <p className="text-sm text-gray-500">Connected</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl text-green-600 mb-2">✓</div>
              <p className="font-medium text-gray-900">API Server</p>
              <p className="text-sm text-gray-500">Running</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl text-green-600 mb-2">✓</div>
              <p className="font-medium text-gray-900">Authentication</p>
              <p className="text-sm text-gray-500">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}