import { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    siteName: "S.K. Associates",
    siteDescription: "Your Success, Our Expertise",
    adminEmail: "admin@skassociates.com",
    supportEmail: "support@skassociates.com",
    autoApproval: false,
    emailNotifications: true,
    maintenanceMode: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
    // In a real app, this would save to the backend
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage system configuration and preferences</p>
        </div>

        {/* Settings Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "general", label: "General" },
              { id: "users", label: "User Management" },
              { id: "notifications", label: "Notifications" },
              { id: "security", label: "Security" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* General Settings */}
        {activeTab === "general" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>
            <div className="space-y-6">
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
        )}

        {/* User Management Settings */}
        {activeTab === "users" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">User Management</h3>
            <div className="space-y-6">
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
              <div className="border-t pt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Registration Requirements</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-3" />
                    <span className="text-sm text-gray-700">Email verification required</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-3" />
                    <span className="text-sm text-gray-700">Phone verification required</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-3" />
                    <span className="text-sm text-gray-700">Document upload required</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Settings */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Send email notifications for important events</p>
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
              <div className="border-t pt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Notification Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-3" />
                    <span className="text-sm text-gray-700">New user registrations</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-3" />
                    <span className="text-sm text-gray-700">Status changes</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-3" />
                    <span className="text-sm text-gray-700">System alerts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
            <div className="space-y-6">
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
              <div className="border-t pt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Security Features</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-3" />
                    <span className="text-sm text-gray-700">Two-factor authentication</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-3" />
                    <span className="text-sm text-gray-700">Session timeout</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-3" />
                    <span className="text-sm text-gray-700">Login attempt limits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={saveSettings}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}