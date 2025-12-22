import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buildApiUrl, API_CONFIG } from "../config/api";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "admin" as "admin" | "firm" | "candidate"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    let endpoint = "";
    switch (formData.userType) {
      case "admin":
        endpoint = buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN_LOGIN);
        break;
      case "firm":
        endpoint = buildApiUrl(API_CONFIG.ENDPOINTS.FIRM_LOGIN);
        break;
      case "candidate":
        endpoint = buildApiUrl(API_CONFIG.ENDPOINTS.CANDIDATE_LOGIN);
        break;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.userType === 'admin' ? formData.email : undefined
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('userType', formData.userType);
        
        // Store user data
        const userData = data.data.admin || data.data.firm || data.data.candidate;
        localStorage.setItem('userData', JSON.stringify(userData));

        // Show success message
        const userName = userData.username || userData.firmName || userData.fullName;
        alert(`Welcome back, ${userName}!`);

        // Redirect to appropriate dashboard
        switch (formData.userType) {
          case "admin":
            navigate('/admin-dashboard');
            break;
          case "firm":
            navigate('/firm-dashboard');
            break;
          case "candidate":
            navigate('/candidate-dashboard');
            break;
        }
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-28">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Login
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Access your account to continue
          </p>

          {/* Login Type Selection */}
          <div className="mb-8">
            <label className="mb-4 block text-lg font-semibold text-gray-700">
              Login As *
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, userType: "admin" })}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  formData.userType === "admin"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, userType: "firm" })}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  formData.userType === "firm"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                CA Firm
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, userType: "candidate" })}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  formData.userType === "candidate"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                Candidate
              </button>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              {formData.userType === "admin" && "Access admin dashboard and manage the platform"}
              {formData.userType === "firm" && "Access your firm dashboard and manage clients"}
              {formData.userType === "candidate" && "Access your profile and find opportunities"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Login Credentials */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Login Credentials</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    {formData.userType === 'admin' ? 'Username or Email' : 'Email'} *
                  </label>
                  <input
                    type={formData.userType === 'admin' ? 'text' : 'email'}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={formData.userType === 'admin' ? 'admin or admin@example.com' : 'you@example.com'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                {formData.userType === 'admin' && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="text-sm font-semibold text-blue-800 mb-2">Default Admin Credentials:</h4>
                    <p className="text-sm text-blue-700">Username: <span className="font-mono">admin@skassociates.com</span></p>
                    <p className="text-sm text-blue-700">Password: <span className="font-mono">admin123</span></p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-lg transition font-semibold text-lg ${
                isLoading 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Alternative Login Options */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition font-medium"
              >
                <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold">
                  G
                </div>
                Continue with Google
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}