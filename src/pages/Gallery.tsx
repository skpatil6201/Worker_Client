import { useState, useEffect } from 'react';
import { galleryService, type GalleryImage } from '../services/galleryService';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      setLoading(true);
      setError(null);
      // Only get active images for public gallery
      const fetchedImages = await galleryService.getAllImages({ isActive: true });
      setImages(fetchedImages);
    } catch (err) {
      setError('Failed to load gallery images');
      console.error('Error loading gallery images:', err);
    } finally {
      setLoading(false);
    }
  };



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
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
            <button 
              onClick={loadGalleryImages}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Image Grid */}
        {!loading && !error && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {images.map((image) => (
                <div
                  key={image._id || image.id}
                  className="group relative overflow-hidden rounded-xl shadow-lg transition hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="relative h-64">
                    <img
                      src={image.src}
                      alt={image.alt || image.title}
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

            {/* Empty State */}
            {images.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🖼️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No images available</h3>
                <p className="text-gray-500">Gallery images will appear here once they are added.</p>
              </div>
            )}
          </>
        )}
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