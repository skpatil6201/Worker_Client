import { useState } from "react";
import FirmNavbar from "../../components/FirmNavbar";

export default function Projects() {
  const [projects] = useState([
    { id: "1", name: "Tax Filing 2024", client: "ABC Corp", status: "In Progress", deadline: "2024-03-31", progress: 75 },
    { id: "2", name: "Audit Services", client: "Tech Corp", status: "Completed", deadline: "2024-02-28", progress: 100 },
    { id: "3", name: "GST Compliance", client: "Startup Inc", status: "Pending", deadline: "2024-04-15", progress: 30 }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <FirmNavbar />
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage your ongoing projects</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Projects</h3>
            <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">In Progress</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {projects.filter(p => p.status === "In Progress").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
            <p className="text-3xl font-bold text-green-600">
              {projects.filter(p => p.status === "Completed").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">All Projects</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              New Project
            </button>
          </div>
          <div className="p-6 space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{project.name}</h4>
                    <p className="text-sm text-gray-500">Client: {project.client}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    project.status === "Completed" ? "bg-green-100 text-green-800" :
                    project.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Deadline: {project.deadline}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}