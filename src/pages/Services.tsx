import { Link } from 'react-router-dom';
import { useState } from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  details: string[];
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };
  const services: Service[] = [
    {
      id: 'accounting-bookkeeping',
      title: 'Accounting & Bookkeeping',
      description: 'We provide complete accounting and bookkeeping solutions including maintenance of books, preparation of financial statements, MIS reporting, and compliance with accounting standards to help businesses maintain accurate financial records.',
      image: '/img1.jpeg',
      details: [
        'Bookkeeping (Monthly / Quarterly / Annual)',
        'Finalization of Accounts',
        'MIS & Financial Reporting',
        'Bank Reconciliation',
        'Fixed Asset Accounting'
      ]
    },
    {
      id: 'audit-assurance',
      title: 'Audit & Assurance',
      description: 'We deliver independent audit and assurance services such as statutory audit, tax audit, internal audit, and forensic audit to enhance transparency, compliance, and governance.',
      image: '/img1.jpeg',
      details: [
        'Statutory Audit (Companies / LLPs)',
        'Tax Audit (u/s 44AB)',
        'Internal Audit',
        'GST Audit',
        'Stock / Concurrent / Forensic Audit'
      ]
    },
    {
      id: 'direct-tax',
      title: 'Direct Tax Services',
      description: 'Our firm offers comprehensive direct tax services including tax planning, return filing, compliance, assessments, and litigation support to ensure timely compliance and tax efficiency.',
      image: '/img1.jpeg',
      details: [
        'Income Tax Return Filing (Individuals, Firms, Companies)',
        'TDS/TCS Returns & Compliance',
        'Advance Tax Calculation',
        'Tax Planning & Advisory',
        'Income Tax Scrutiny & Notices',
        'Appeals & Representation (CIT(A), ITAT)'
      ]
    },
    {
      id: 'gst-services',
      title: 'Indirect Tax (GST)',
      description: 'Our firm offers end-to-end indirect tax services including GST compliance, return filing, assessments, and litigation support to ensure timely compliance and tax efficiency.',
      image: '/img1.jpeg',
      details: [
        'GST Registration',
        'Monthly / Quarterly GST Returns',
        'Annual GST Return & Audit',
        'GST Reconciliation',
        'GST Notices & Litigation',
        'Refunds & LUT Filing'
      ]
    },
    {
      id: 'company-law',
      title: 'Company Law & ROC Compliance',
      description: 'We assist companies and LLPs with incorporation, annual ROC filings, director compliance, restructuring, and regulatory approvals under the Companies Act.',
      image: '/img1.jpeg',
      details: [
        'Company / LLP Incorporation',
        'ROC Annual Filing',
        'Director KYC',
        'Share Capital Changes',
        'Company Closure & Strike-off'
      ]
    },
    {
      id: 'payroll-labour',
      title: 'Payroll & Labour Law',
      description: 'We provide comprehensive payroll processing and labour law compliance services to ensure your business meets all statutory requirements.',
      image: '/img1.jpeg',
      details: [
        'Payroll Processing',
        'PF / ESI / PT Registration & Returns',
        'Labour Law Compliance'
      ]
    },
    {
      id: 'business-advisory',
      title: 'Business & Startup Advisory',
      description: 'Our advisory services help startups and growing businesses with financial planning, cash flow management, and strategic decision-making.',
      image: '/img1.jpeg',
      details: [
        'Startup Registration (DPIIT)',
        'Business Structuring',
        'Financial Projections',
        'Budgeting & Forecasting'
      ]
    },
    {
      id: 'valuation-certification',
      title: 'Valuation & Certification',
      description: 'We provide professional valuation and certification services for various business and compliance requirements.',
      image: '/img1.jpeg',
      details: [
        'Business & Share Valuation',
        'Net Worth Certificates',
        'Turnover Certificates',
        'CA Certificates (Visa, Bank, Tender)'
      ]
    },
    {
      id: 'virtual-cfo',
      title: 'Virtual CFO & Outsourcing',
      description: 'Our advisory services help startups and growing businesses with financial planning, cash flow management, valuation, and strategic decision-making through Virtual CFO support.',
      image: '/img1.jpeg',
      details: [
        'Virtual CFO Services',
        'Finance & Compliance Outsourcing',
        'Cash Flow & Investor Reporting'
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-80 mt-20">
        <img 
          src="/img1.jpeg" 
          alt="Our Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl">Comprehensive CA Services for Your Business</p>
          </div>
        </div>
      </div>

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg transition hover:shadow-xl hover:-translate-y-1 flex flex-col">
              <div className="relative h-56 mb-6 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
              
              <div className="flex-grow">
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">{service.description}</p>
                
                {/* Read More Button */}
                <div className="mb-4">
                  <button
                    onClick={() => openModal(service)}
                    className="text-green-600 hover:text-green-700 font-medium text-sm transition duration-300 hover:underline"
                  >
                    Read More
                  </button>
                </div>
              </div>
              
              <Link
                to="/signup"
                className="inline-block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-lg transition duration-300 mt-auto"
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mx-auto mt-16 max-w-4xl text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Need Professional CA Services?</h2>
            <p className="text-xl mb-6">Contact us today to discuss your requirements and get a customized solution</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-block bg-white text-green-600 font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Get Quote
              </Link>
              <Link
                to="/"
                className="inline-block border-2 border-white text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 hover:bg-white hover:text-green-600"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full p-2 transition duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal content */}
            <div className="p-6">
              {/* Service image */}
              <div className="relative h-56 mb-6 rounded-xl overflow-hidden">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-3xl font-bold text-white">{selectedService.title}</h2>
                </div>
              </div>

              {/* Service description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">About This Service</h3>
                <p className="text-gray-600 leading-relaxed text-base">{selectedService.description}</p>
              </div>

              {/* Service details */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Services Include:</h3>
                <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
                  {selectedService.details.map((detail: string, index: number) => (
                    <div key={index} className="flex items-start bg-gray-50 p-3 rounded-lg">
                      <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm font-medium">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <Link
                  to="/signup"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center"
                  onClick={closeModal}
                >
                  Get Started
                </Link>
                <button
                  onClick={closeModal}
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}