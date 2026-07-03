import { useEffect, useState } from "react";
import CandidateNavbar from "../../components/CandidateNavbar";
import { getAuthHeaders, getUserData } from "../../utils/auth";
import { API_CONFIG, buildApiUrl } from "../../config/api";

interface Interview {
  id: string;
  applicationId?: string;
  candidateId?: string;
  candidateName?: string;
  candidateEmail?: string;
  firmId?: string;
  jobTitle: string;
  company: string;
  date: string;
  time: string;
  type: string;
  status: string;
  interviewer: string;
  round: string;
  meetingLink?: string;
  location?: string;
  notes?: string;
}

export default function Interviews() {
  const candidate = getUserData();
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filterForCandidate = (records: Interview[]) => {
      return records.filter(interview => {
      const matchesEmail = candidate?.email && interview.candidateEmail === candidate.email;
      const matchesId = (candidate?._id || candidate?.id) && interview.candidateId === (candidate._id || candidate.id);
      return matchesEmail || matchesId;
      });
    };

    const loadInterviews = async () => {
      try {
        const params = new URLSearchParams();
        if (candidate?._id || candidate?.id) params.set("candidateId", candidate._id || candidate.id || "");
        if (candidate?.email) params.set("candidateEmail", candidate.email);

        const response = await fetch(`${buildApiUrl(API_CONFIG.ENDPOINTS.CANDIDATE_INTERVIEWS)}?${params.toString()}`, {
          headers: getAuthHeaders()
        });

        if (!response.ok) throw new Error("Failed to load interviews");

        const result = await response.json();
        if (result.success) {
          setInterviews(result.data);
          return;
        }
      } catch {
        const storedInterviews: Interview[] = JSON.parse(localStorage.getItem("scheduledInterviews") || "[]");
        setInterviews(filterForCandidate(storedInterviews));
      } finally {
        setLoading(false);
      }
    };

    loadInterviews();
  }, [candidate?._id, candidate?.id, candidate?.email]);

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

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(Number(hours), Number(minutes || 0));
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateNavbar />
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Interviews</h1>
          <p className="text-gray-600">Manage your interview schedule</p>
        </div>

        {loading && (
          <div className="mb-8 rounded-lg bg-white p-6 text-center shadow">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-green-600"></div>
            <p className="mt-3 text-gray-500">Loading interviews...</p>
          </div>
        )}

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
                            <span className="font-medium">Time:</span> {formatTime(interview.time)}
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
                        {interview.location && (
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Location:</span> {interview.location}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(interview.status)}`}>
                          {interview.status}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedInterview(interview)}
                            className="text-blue-600 hover:text-blue-900 text-sm"
                          >
                            Join/View
                          </button>
                          {interview.meetingLink && (
                            <a
                              href={interview.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-900 text-sm"
                            >
                              Join
                            </a>
                          )}
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
                      <div className="text-sm text-gray-500">{formatTime(interview.time)}</div>
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
                      <button
                        onClick={() => setSelectedInterview(interview)}
                        className="text-green-600 hover:text-green-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedInterview.jobTitle}</h2>
                <p className="text-sm text-gray-600">{selectedInterview.company}</p>
              </div>
              <button
                onClick={() => setSelectedInterview(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div>
                <p className="text-gray-500">Date</p>
                <p className="font-medium text-gray-900">{selectedInterview.date}</p>
              </div>
              <div>
                <p className="text-gray-500">Time</p>
                <p className="font-medium text-gray-900">{formatTime(selectedInterview.time)}</p>
              </div>
              <div>
                <p className="text-gray-500">Type</p>
                <p className="font-medium text-gray-900">{selectedInterview.type}</p>
              </div>
              <div>
                <p className="text-gray-500">Round</p>
                <p className="font-medium text-gray-900">{selectedInterview.round}</p>
              </div>
              <div>
                <p className="text-gray-500">Interviewer</p>
                <p className="font-medium text-gray-900">{selectedInterview.interviewer}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-medium text-gray-900">{selectedInterview.status}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500">Location</p>
                <p className="font-medium text-gray-900">{selectedInterview.location || "Not provided"}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500">Meeting Link</p>
                {selectedInterview.meetingLink ? (
                  <a
                    href={selectedInterview.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all font-medium text-blue-600 hover:text-blue-800"
                  >
                    {selectedInterview.meetingLink}
                  </a>
                ) : (
                  <p className="font-medium text-gray-900">Not provided</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500">Notes</p>
                <p className="font-medium text-gray-900">{selectedInterview.notes || "No notes added"}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedInterview(null)}
                className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
