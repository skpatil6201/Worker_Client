import { useState } from 'react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
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
    },
    {
      id: 4,
      src: '/img1.jpeg',
      title: 'Audit Process',
      category: 'services',
      description: 'Professional audit services'
    },
    {
      id: 5,
      src: '/img1.jpeg',
      title: 'Tax Planning',
      category: 'services',
      description: 'Strategic tax planning sessions'
    },
    {
      id: 6,
      src: '/img1.jpeg',
      title: 'Office Reception',
      category: 'office',
      description: 'Welcome area for clients'
    },
    {
      id: 7,
      src: '/img1.jpeg',
      title: 'Team Collaboration',
      category: 'team',
      description: 'Working together for excellence'
    },
    {
      id: 8,
      src: '/img1.jpeg',
      title: 'Financial Reporting',
      category: 'services',
      description: 'Comprehensive financial analysis'
    },
    {
      id: 9,
      src: '/img1.jpeg',
      title: 'Conference Room',
      category: 'office',
      description: 'Modern meeting facilities'
    }
  ];



  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-80 mt-20">
        <img 
          src="/img1.jpeg" 
          alt="Gallery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-xl">Glimpses of Our Professional Journey</p>
          </div>
        </div>
      </div>

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Image Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl shadow-lg transition hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative h-64">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-200">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Count */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Showing {images.length} images
          </p>
        </div>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}