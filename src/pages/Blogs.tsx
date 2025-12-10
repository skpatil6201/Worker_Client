export default function Blogs() {
  return (
    <div className="pt-32 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Blogs</h1>
          <p className="text-lg text-gray-600 mb-8">
            Stay updated with the latest insights, news, and updates from S.K. Associates LLP.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Coming Soon</h2>
            <p className="text-gray-600">
              We're working on bringing you valuable content. Check back soon for our latest articles and insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
