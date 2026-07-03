import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const services = [
    {
      title: "Accounting & Bookkeeping",
      image: "/img1.jpeg"
    },
    {
      title: "Audit & Assurance",
      image: "/img1.jpeg"
    },
    {
      title: "Direct Tax Services",
      image: "/img1.jpeg"
    },
    {
      title: "Indirect Tax (GST)",
      image: "/img1.jpeg"
    },
    {
      title: "Company Law & ROC Compliance",
      image: "/img1.jpeg"
    },
    {
      title: "Payroll & Labour Law",
      image: "/img1.jpeg"
    },
    {
      title: "Business & Startup Advisory",
      image: "/img1.jpeg"
    },
    {
      title: "Valuation & Certification",
      image: "/img1.jpeg"
    },
    {
      title: "Virtual CFO & Outsourcing",
      image: "/img1.jpeg"
    }
  ];

  const itemsPerSlide = 5;
  const totalSlides = Math.ceil(services.length / itemsPerSlide);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(timer);
  }, [totalSlides]);



  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800">
      {/* Hero Section with Image */}
      <div className="relative mt-32 h-[430px] w-full md:h-[500px] lg:h-[600px]">
        <img 
          src="/img1.jpeg" 
          alt="S.K. Associates - Professional CA Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl px-4 text-center text-white">
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              S.K. ASSOCIATES
            </h1>
            <h2 className="mb-5 text-lg text-gray-200 sm:text-xl md:text-2xl lg:text-3xl">
              Your Success, Our Expertise
            </h2>
            <p className="mx-auto mb-7 max-w-2xl text-base sm:text-lg md:text-xl">
              Professional CA Services for Your Business Growth
            </p>
            <Link
              to="/signup"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10 sm:py-16 lg:py-24">
        {/* Welcome Section */}
        <div className="mx-auto mb-12 max-w-3xl sm:mb-16">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-lg transition hover:shadow-xl hover:-translate-y-1 sm:p-8">
            <h2 className="mb-3 text-center text-2xl font-bold text-gray-900">
              Welcome to S.K. ASSOCIATES
            </h2>
            <p className="text-justify text-base leading-relaxed text-gray-600">
           S K ASSOCIATES is a professional services firm dedicated to providing highly skilled auditing candidates and end-to-end outsourcing solutions for accounting and Chartered Accountant services.
With a focus on accuracy, compliance, and efficiency, we help organizations streamline their financial operations and achieve long-term success.
            </p>
          </div>
        </div>

        {/* Services Carousel Section */}
        <div className="relative mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:mb-12 sm:text-3xl">Our Services</h2>
          
          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {services.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((service, index) => (
                      <Link 
                        key={index} 
                        to="/services"
                        className="group relative overflow-hidden rounded-xl shadow-md transition hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                      >
                        <div className="relative h-44 sm:h-48">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80 group-hover:to-black/30 transition-all"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-sm font-bold text-white text-center px-2">{service.title}</h3>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition duration-300 ${
                  index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)}
            className="absolute left-2 top-1/2 hidden -translate-y-1/2 transform rounded-full bg-white bg-opacity-80 p-2 text-gray-800 shadow-lg transition duration-300 hover:bg-opacity-100 sm:block"
            aria-label="Previous services"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % totalSlides)}
            className="absolute right-2 top-1/2 hidden -translate-y-1/2 transform rounded-full bg-white bg-opacity-80 p-2 text-gray-800 shadow-lg transition duration-300 hover:bg-opacity-100 sm:block"
            aria-label="Next services"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* View All Services Button */}
          <div className="text-center mt-8">
            <Link
              to="/services"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
            >
              View All Services
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto mt-12 max-w-4xl text-center sm:mt-16">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg sm:p-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Ready to Get Started?</h2>
            <p className="mb-6 text-base text-gray-600 sm:text-xl">Join our network of professionals or find the right CA for your business</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="inline-block border-2 border-green-600 text-green-600 font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 hover:bg-green-600 hover:text-white"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
