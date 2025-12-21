import FirmNavbar from '../../components/FirmNavbar';

export default function Billing() {
  const invoices = [
    { id: 1, client: 'ABC Corporation', amount: 50000, status: 'Paid', date: '2024-02-15', dueDate: '2024-02-28' },
    { id: 2, client: 'XYZ Industries', amount: 35000, status: 'Pending', date: '2024-02-20', dueDate: '2024-03-05' },
    { id: 3, client: 'Tech Solutions Ltd', amount: 75000, status: 'Overdue', date: '2024-01-30', dueDate: '2024-02-15' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <FirmNavbar />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Billing & Invoices
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage your billing and track payments
            </p>
          </div>

          <div className="flex justify-end mb-8">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
              Create Invoice
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{invoice.client}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹{invoice.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{invoice.dueDate}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold text-green-600">₹2,50,000</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Pending</h3>
              <p className="text-3xl font-bold text-yellow-600">₹35,000</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Overdue</h3>
              <p className="text-3xl font-bold text-red-600">₹75,000</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">This Month</h3>
              <p className="text-3xl font-bold text-blue-600">₹1,20,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}