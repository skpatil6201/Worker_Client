import CandidateNavbar from '../../components/CandidateNavbar';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <CandidateNavbar />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              My Profile
            </h1>
            <p className="text-xl text-gray-600">
              Manage your personal information and preferences
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mr-6">
                <span className="text-green-600 font-semibold text-2xl">JD</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
                <p className="text-gray-600">Chartered Accountant</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium mt-2">
                  Change Profile Picture
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  defaultValue="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  defaultValue="Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  defaultValue="john.doe@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input 
                  type="tel" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  defaultValue="+91-9876543210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input 
                  type="date" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  defaultValue="1995-06-15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                  defaultValue="123 Main Street, Mumbai, Maharashtra 400001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>CA (Chartered Accountant)</option>
                  <option>CS (Company Secretary)</option>
                  <option>CMA (Cost and Management Accountant)</option>
                  <option>CPA (Certified Public Accountant)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>0-1 years</option>
                  <option>2-3 years</option>
                  <option>4-5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Audit & Assurance</option>
                  <option>Taxation</option>
                  <option>Corporate Law</option>
                  <option>Financial Planning</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Salary (LPA)</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="e.g., 600000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Salary (LPA)</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="e.g., 800000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Immediately</option>
                  <option>Within 15 days</option>
                  <option>Within 1 month</option>
                  <option>Within 2 months</option>
                </select>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-green-600 mr-3" defaultChecked />
                  <span className="text-gray-700">Email notifications for new job matches</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-green-600 mr-3" defaultChecked />
                  <span className="text-gray-700">SMS notifications for interview updates</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-green-600 mr-3" />
                  <span className="text-gray-700">Weekly job digest emails</span>
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                Cancel
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}