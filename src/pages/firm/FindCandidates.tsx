import FirmNavbar from '../../components/FirmNavbar';

export default function FindCandidates() {
  const candidates = [
    { 
      id: 1, 
      name: 'Rajesh Kumar', 
      qualification: 'CA, CPA', 
      experience: '5 years', 
      specialization: 'Audit & Taxation',
      location: 'Mumbai',
      availability: 'Available'
    },
    { 
      id: 2, 
      name: 'Priya Sharma', 
      qualification: 'CA, CS', 
      experience: '3 years', 
      specialization: 'Corporate Law',
      location: 'Delhi',
      availability: 'Available'
    },
    { 
      id: 3, 
      name: 'Amit Patel', 
      qualification: 'CA', 
      experience: '7 years', 
      specialization: 'Financial Planning',
      location: 'Ahmedabad',
      availability: 'Busy'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <FirmNavbar />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Find Candidates
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover qualified CA professionals for your projects
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>All Qualifications</option>
                  <option>CA</option>
                  <option>CS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Any Experience</option>
                  <option>0-2 years</option>
                  <option>3-5 years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>All Locations</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-lg">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-800">{candidate.name}</h3>
                    <p className="text-sm text-gray-600">{candidate.qualification}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{candidate.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{candidate.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      candidate.availability === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {candidate.availability}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition text-sm">
                    View Profile
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition text-sm">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}