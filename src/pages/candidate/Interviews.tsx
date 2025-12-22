import { useState } from "react";
import CandidateNavbar from "../../components/CandidateNavbar";

export default function Interviews() {
  const [interviews] = useState([
    {
      id: "1",
      jobTitle: "Senior Tax Consultant",
      company: "ABC Associates",
      date: "2024-03-25",
      time: "10:00 AM",
      type: "Video Call",
      status: "Scheduled",
      interviewer: "Mr. Sharma",
      round: "Technical Round"
    },
    {
      id: "2",
      jobTitle: "Audit Manager",
      company: "Tech Audit Firm",
      date: "2024-03-20",
      time: "2:00 PM",
      type: "In-Person",
      status: "Completed",
      interviewer: "Ms. Patel",
      round: "HR Round"
    },
    {
      id: "3",
      jobTitle: "Financial Analyst",
      company: "Finance Corp",
      date: "2024-03-30",
      time: "11:30 AM",
      type: "Phone Call",
      status: "Scheduled",
      interviewer: "Mr. Kumar",
      round: "Initial Screening"
    }
  ]);

  const upcomingInterviews = interviews.filter(i => i.status === "Scheduled");
  const completedInterviews = interviews.filter(i => i.status === "Completed");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video Call": return "📹";
      case "In-Person": return "🏢";
      case "Phone Call": return "📞";
      default: return "📋";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateNavbar />
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Interviews</h1>
          <p className="text-gray-600">Manage your interview schedule</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Interviews</h3>
            <p className="text-3xl font-bold text-blue-600">{interviews.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming</h3>
            <p className="text-3xl font-bold text-yellow-600">{upcomingInterviews.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
            <p className="text-3xl font-bold text-green-600">{completedInterviews.length}</p>
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h3>
          </div>
          <div className="p-6">
            {upcomingInterviews.length > 0 ? (
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">{getTypeIcon(interview.type)}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900">{interview.jobTitle}</h4>
                            <p className="text-sm text-gray-600">{interview.company}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Date:</span> {interview.date}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span> {interview.time}
                          </div>
                          <div>
                            <span className="font-medium">Type:</span> {interview.type}
                          </div>
                          <div>
                            <span className="font-medium">Round:</span> {interview.round}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          <span className="font-medium">Interviewer:</span> {interview.interviewer}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(interview.status)}`}>
                          {interview.status}
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 text-sm">
                            Join/View
                          </button>
                          <button className="text-green-600 hover:text-green-900 text-sm">
                            Reschedule
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No upcoming interviews scheduled.</p>
            )}
          </div>
        </div>

        {/* Interview History */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Interview History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Round</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {interviews.map((interview) => (
                  <tr key={interview.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{interview.jobTitle}</div>
                        <div className="text-sm text-gray-500">{interview.company}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{interview.date}</div>
                      <div className="text-sm text-gray-500">{interview.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getTypeIcon(interview.type)} {interview.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {interview.round}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(interview.status)}`}>
                        {interview.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-green-600 hover:text-green-900">View Details</button>
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