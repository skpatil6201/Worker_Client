import { useState } from "react";
import CandidateNavbar from "../../components/CandidateNavbar";

export default function MyApplications() {
  const [applications] = useState([
    {
      id: "1",
      jobTitle: "Senior Tax Consultant",
      company: "ABC Associates",
      appliedDate: "2024-03-15",
      status: "Under Review",
      salary: "₹8-12 LPA",
      location: "Mumbai"
    },
    {
      id: "2",
      jobTitle: "Audit Manager",
      company: "Tech Audit Firm",
      appliedDate: "2024-03-10",
      status: "Interview Scheduled",
      salary: "₹10-15 LPA",
      location: "Bangalore"
    },
    {
      id: "3",
      jobTitle: "Junior Accountant",
      company: "Startup Finance",
      appliedDate: "2024-03-05",
      status: "Rejected",
      salary: "₹3-5 LPA",
      location: "Pune"
    }
  ]);

  const [statusFilter, setStatusFilter] = useState("All");

  const filteredApplications = applications.filter(app => 
    statusFilter === "All" || app.status === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Interview Scheduled": return "bg-blue-100 text-blue-800";
      case "Rejected": return "bg-red-100 text-red-800";
      case "Accepted": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateNavbar />
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600">Track your job application status</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Applied</h3>
            <p className="text-3xl font-bold text-blue-600">{applications.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Under Review</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {applications.filter(a => a.status === "Under Review").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Interviews</h3>
            <p className="text-3xl font-bold text-blue-600">
              {applications.filter(a => a.status === "Interview Scheduled").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Success Rate</h3>
            <p className="text-3xl font-bold text-green-600">67%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="All">All Status</option>
                <option value="Under Review">Under Review</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Rejected">Rejected</option>
                <option value="Accepted">Accepted</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Applications ({filteredApplications.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{application.jobTitle}</div>
                        <div className="text-sm text-gray-500">{application.salary} • {application.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.appliedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-green-600 hover:text-green-900 mr-3">View</button>
                      <button className="text-blue-600 hover:text-blue-900">Follow Up</button>
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