import CandidateNavbar from '../../components/CandidateNavbar';

export default function FindJobs() {
  const jobs = [
    {
      id: 1,
      title: 'Senior Auditor',
      company: 'ABC Corporation',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹8-12 LPA',
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Tax Consultant',
      company: 'XYZ Associates',
      location: 'Delhi',
      type: 'Contract',
      experience: '2-4 years',
      salary: '₹6-10 LPA',
      posted: '1 week ago'
    },
    {
      id: 3,
      title: 'Financial Analyst',
      company: 'Tech Solutions Ltd',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '1-3 years',
      salary: '₹5-8 LPA',
      posted: '3 days ago'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <CandidateNavbar />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Find Jobs
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exciting career opportunities in accounting and finance
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input 
                  type="text" 
                  placeholder="Search jobs..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>All Locations</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Bangalore</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Any Experience</option>
                  <option>0-2 years</option>
                  <option>3-5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
                  Search Jobs
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                    <p className="text-lg text-gray-600 mb-1">{job.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {job.location}
                      </span>
                      <span>{job.type}</span>
                      <span>{job.experience}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600">{job.salary}</p>
                    <p className="text-sm text-gray-500">{job.posted}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                      Apply Now
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition">
                      Save Job
                    </button>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Jobs</h3>
              <p className="text-3xl font-bold text-blue-600">156</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">New This Week</h3>
              <p className="text-3xl font-bold text-green-600">23</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Applications</h3>
              <p className="text-3xl font-bold text-yellow-600">8</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Interviews</h3>
              <p className="text-3xl font-bold text-purple-600">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}