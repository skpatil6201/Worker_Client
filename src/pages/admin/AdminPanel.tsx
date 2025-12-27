import { useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';

// Gallery Management Interface
interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  description: string;
}

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // Gallery State
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: 1,
      src: '/img1.jpeg',
      title: 'Office Environment',
      category: 'office',
      description: 'Our professional office space'
    },
    {
      id: 2,
      src: '/img1.jpeg',
      title: 'Team Meeting',
      category: 'team',
      description: 'Collaborative team discussions'
    },
    {
      id: 3,
      src: '/img1.jpeg',
      title: 'Client Consultation',
      category: 'client',
      description: 'Professional client meetings'
    }
  ]);

  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [galleryFormData, setGalleryFormData] = useState({
    title: '',
    category: '',
    description: '',
    src: ''
  });

  // Settings State
  const [settings, setSettings] = useState({
    siteName: "S.K. Associates",
    siteDescription: "Your Success, Our Expertise",
    adminEmail: "admin@skassociates.com",
    supportEmail: "support@skassociates.com",
    autoApproval: false,
    emailNotifications: true,
    maintenanceMode: false,
    allowRegistrations: true,
    requireEmailVerification: true,
    requirePhoneVerification: true,
    requireDocuments: true
  });

  // Gallery Functions
  const handleAddImage = () => {
    setEditingImage(null);
    setGalleryFormData({ title: '', category: '', description: '', src: '' });
    setIsGalleryModalOpen(true);
  };

  const handleEditImage = (image: GalleryImage) => {
    setEditingImage(image);
    setGalleryFormData({
      title: image.title,
      category: image.category,
      description: image.description,
      src: image.src
    });
    setIsGalleryModalOpen(true);
  };

  const handleDeleteImage = (id: number) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setImages(images.filter(img => img.id !== id));
    }
  };

  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingImage) {
      setImages(images.map(img => 
        img.id === editingImage.id 
          ? { ...img, ...galleryFormData }
          : img
      ));
    } else {
      const newImage: GalleryImage = {
        id: Math.max(...images.map(img => img.id), 0) + 1,
        ...galleryFormData
      };
      setImages([...images, newImage]);
    }
    
    setIsGalleryModalOpen(false);
    setGalleryFormData({ title: '', category: '', description: '', src: '' });
    setEditingImage(null);
  };

  const handleGalleryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setGalleryFormData({
      ...galleryFormData,
      [e.target.name]: e.target.value
    });
  };

  // Settings Functions
  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
    // In a real app, this would save to the backend
    alert("Settings saved successfully!");
    console.log('Saved settings:', settings);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'gallery', label: 'Manage Gallery', icon: '🖼️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'content', label: 'Content Management', icon: '📝' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="pt-32 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg h-screen sticky top-32">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h2>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Dashboard Section */}
          {activeSection === 'dashboard' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Gallery Images</h3>
                  <p className="text-3xl font-bold text-blue-600">{images.length}</p>
                  <p className="text-sm text-gray-500">Total images</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
                  <p className="text-3xl font-bold text-green-600">✓</p>
                  <p className="text-sm text-gray-500">All systems operational</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
                  <p className="text-3xl font-bold text-purple-600">{Object.keys(settings).length}</p>
                  <p className="text-sm text-gray-500">Configuration options</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Maintenance</h3>
                  <p className="text-3xl font-bold text-yellow-600">
                    {settings.maintenanceMode ? '⚠️' : '✅'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {settings.maintenanceMode ? 'Maintenance mode' : 'Normal operation'}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveSection('gallery')}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="text-2xl mb-2">🖼️</div>
                    <h4 className="font-medium">Manage Gallery</h4>
                    <p className="text-sm text-gray-500">Add, edit, or delete gallery images</p>
                  </button>
                  <button
                    onClick={() => setActiveSection('settings')}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="text-2xl mb-2">⚙️</div>
                    <h4 className="font-medium">System Settings</h4>
                    <p className="text-sm text-gray-500">Configure system preferences</p>
                  </button>
                  <button
                    onClick={() => setActiveSection('content')}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="text-2xl mb-2">📝</div>
                    <h4 className="font-medium">Content Management</h4>
                    <p className="text-sm text-gray-500">Manage website content</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Management Section */}
          {activeSection === 'gallery' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Manage Gallery</h1>
                  <p className="text-gray-600 mt-2">Add, edit, and delete gallery images</p>
                </div>
                <button
                  onClick={handleAddImage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Add Image
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {images.map((image) => (
                  <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{image.category}</p>
                      <p className="text-sm text-gray-500 mb-4">{image.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditImage(image)}
                          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteImage(image.id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">System Settings</h1>
              
              <div className="space-y-8">
                {/* General Settings */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={settings.siteName}
                        onChange={(e) => handleSettingChange("siteName", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Description
                      </label>
                      <input
                        type="text"
                        value={settings.siteDescription}
                        onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Email
                      </label>
                      <input
                        type="email"
                        value={settings.adminEmail}
                        onChange={(e) => handleSettingChange("adminEmail", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Support Email
                      </label>
                      <input
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* System Settings */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">System Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Maintenance Mode</h4>
                        <p className="text-sm text-gray-500">Temporarily disable public access</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.maintenanceMode}
                          onChange={(e) => handleSettingChange("maintenanceMode", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Auto Approval</h4>
                        <p className="text-sm text-gray-500">Automatically approve new registrations</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.autoApproval}
                          onChange={(e) => handleSettingChange("autoApproval", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                        <p className="text-sm text-gray-500">Send email notifications for events</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => handleSettingChange("emailNotifications", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    onClick={saveSettings}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Save All Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* User Management Section */}
          {activeSection === 'users' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">User Management</h1>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">User management features will be implemented here.</p>
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium">Registration Settings</h4>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={settings.requireEmailVerification}
                          onChange={(e) => handleSettingChange("requireEmailVerification", e.target.checked)}
                          className="mr-2" 
                        />
                        Require email verification
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={settings.requirePhoneVerification}
                          onChange={(e) => handleSettingChange("requirePhoneVerification", e.target.checked)}
                          className="mr-2" 
                        />
                        Require phone verification
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={settings.requireDocuments}
                          onChange={(e) => handleSettingChange("requireDocuments", e.target.checked)}
                          className="mr-2" 
                        />
                        Require document upload
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Management Section */}
          {activeSection === 'content' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Content Management</h1>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">Content management features will be implemented here.</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium mb-2">Homepage Content</h4>
                    <p className="text-sm text-gray-500">Manage hero section, features, and testimonials</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium mb-2">About Page</h4>
                    <p className="text-sm text-gray-500">Update company information and team details</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium mb-2">Services</h4>
                    <p className="text-sm text-gray-500">Add, edit, or remove service offerings</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <p className="text-sm text-gray-500">Update contact details and office locations</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Section */}
          {activeSection === 'analytics' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h1>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">Analytics and reporting features will be implemented here.</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Website Traffic</h4>
                    <p className="text-2xl font-bold text-blue-600 mt-2">--</p>
                    <p className="text-sm text-blue-700">Monthly visitors</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">User Registrations</h4>
                    <p className="text-2xl font-bold text-green-600 mt-2">--</p>
                    <p className="text-sm text-green-700">This month</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900">Active Sessions</h4>
                    <p className="text-2xl font-bold text-purple-600 mt-2">--</p>
                    <p className="text-sm text-purple-700">Current users</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Gallery Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingImage ? 'Edit Image' : 'Add New Image'}
            </h2>
            
            <form onSubmit={handleGallerySubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={galleryFormData.title}
                  onChange={handleGalleryInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={galleryFormData.category}
                  onChange={handleGalleryInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="office">Office</option>
                  <option value="team">Team</option>
                  <option value="client">Client</option>
                  <option value="services">Services</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="src"
                  value={galleryFormData.src}
                  onChange={handleGalleryInputChange}
                  placeholder="/img1.jpeg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={galleryFormData.description}
                  onChange={handleGalleryInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingImage ? 'Update' : 'Add'} Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}