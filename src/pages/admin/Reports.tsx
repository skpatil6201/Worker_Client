import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";

interface ReportData {
  totalFirms: number;
  totalCandidates: number;
  totalJobs: number;
  totalApplications: number;
  approvedFirms: number;
  approvedCandidates: number;
  activeJobs: number;
  pendingApplications: number;
  monthlyRegistrations: { month: string; firms: number; candidates: number }[];
  topFirms: { name: string; jobsPosted: number; applicationsReceived: number }[];
  popularLocations: { location: string; count: number }[];
}

export default function Reports() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");

  useEffect(() => {
    fetchReportData();
  }, [selectedPeriod]);

  const fetchReportData = async () => {
    try {
      // Mock data - in real app, fetch from API
      const mockData: ReportData = {
        totalFirms: 45,
        totalCandidates: 128,
        totalJobs: 67,
        totalApplications: 234,
        approvedFirms: 38,
        approvedCandidates: 115,
        activeJobs: 52,
        pendingApplications: 89,
        monthlyRegistrations: [
          { month: "Jan", firms: 5, candidates: 12 },
          { month: "Feb", firms: 8, candidates: 18 },
          { month: "Mar", firms: 6, candidates: 15 },
          { month: "Apr", firms: 9, candidates: 22 },
          { month: "May", firms: 7, candidates: 19 },
          { month: "Jun", firms: 10, candidates: 25 }
        ],
        topFirms: [
          { name: "ABC Associates", jobsPosted: 12, applicationsReceived: 45 },
          { name: "XYZ Consultants", jobsPosted: 8, applicationsReceived: 32 },
          { name: "PQR & Co", jobsPosted: 6, applicationsReceived: 28 },
          { name: "LMN Partners", jobsPosted: 5, applicationsReceived: 22 }
        ],
        popularLocations: [
          { location: "Mumbai", count: 45 },
          { location: "Delhi", count: 38 },
          { location: "Bangalore", count: 32 },
          { location: "Pune", count: 28 },
          { location: "Chennai", count: 25 }
        ]
      };
      
      setReportData(mockData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching report data:", error);
      setLoading(false);
    }
  };

  const exportReport = (format: 'pdf' | 'excel') => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
    // Implement export functionality
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Platform performance and usage statistics</p>
          </div>
          <div className="flex space-x-4">
            <select
              className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last3months">Last 3 Months</option>
              <option value="last6months">Last 6 Months</option>
              <option value="lastyear">Last Year</option>
            </select>
            <button
              onClick={() => exportReport('pdf')}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Export PDF
            </button>
            <button
              onClick={() => exportReport('excel')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Export Excel
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Firms</h3>
            <p className="text-3xl font-bold text-blue-600">{reportData?.totalFirms}</p>
            <p className="text-sm text-gray-500">
              {reportData?.approvedFirms} approved
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Candidates</h3>
            <p className="text-3xl font-bold text-green-600">{reportData?.totalCandidates}</p>
            <p className="text-sm text-gray-500">
              {reportData?.approvedCandidates} approved
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Job Postings</h3>
            <p className="text-3xl font-bold text-purple-600">{reportData?.totalJobs}</p>
            <p className="text-sm text-gray-500">
              {reportData?.activeJobs} active
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Applications</h3>
            <p className="text-3xl font-bold text-orange-600">{reportData?.totalApplications}</p>
            <p className="text-sm text-gray-500">
              {reportData?.pendingApplications} pending
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Registrations Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Registrations</h3>
            <div className="space-y-4">
              {reportData?.monthlyRegistrations.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{data.month}</span>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">Firms: {data.firms}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">Candidates: {data.candidates}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Firms */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Firms</h3>
            <div className="space-y-4">
              {reportData?.topFirms.map((firm, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{firm.name}</p>
                    <p className="text-sm text-gray-500">{firm.jobsPosted} jobs posted</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">{firm.applicationsReceived}</p>
                    <p className="text-sm text-gray-500">applications</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Locations */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Job Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {reportData?.popularLocations.map((location, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">{location.location}</p>
                <p className="text-2xl font-bold text-blue-600">{location.count}</p>
                <p className="text-sm text-gray-500">jobs</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Activity Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Registration Status</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Approved Firms</span>
                  <span className="text-sm font-medium text-green-600">
                    {reportData?.approvedFirms}/{reportData?.totalFirms}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Approved Candidates</span>
                  <span className="text-sm font-medium text-green-600">
                    {reportData?.approvedCandidates}/{reportData?.totalCandidates}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Jobs</span>
                  <span className="text-sm font-medium text-blue-600">
                    {reportData?.activeJobs}/{reportData?.totalJobs}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Application Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Applications</span>
                  <span className="text-sm font-medium text-gray-900">{reportData?.totalApplications}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pending Review</span>
                  <span className="text-sm font-medium text-yellow-600">{reportData?.pendingApplications}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Applications per Job</span>
                  <span className="text-sm font-medium text-gray-900">
                    {reportData?.totalJobs ? Math.round((reportData?.totalApplications || 0) / reportData.totalJobs) : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}