import { useState, useEffect } from 'react';
import { galleryService, type GalleryImage } from '../../services/galleryService';

export default function ManageGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    src: ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedImages = await galleryService.getAllImages();
      setImages(fetchedImages);
    } catch (err) {
      setError('Failed to load gallery images');
      console.error('Error loading gallery images:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = () => {
    setEditingImage(null);
    setFormData({ title: '', category: '', description: '', src: '' });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleEditImage = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      category: image.category,
      description: image.description,
      src: image.src
    });
    setImagePreview(image.src);
    setIsModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setFormData(prev => ({ ...prev, src: base64 }));
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        setLoading(true);
        await galleryService.deleteImage(id);
        await loadGalleryImages();
      } catch (err) {
        setError('Failed to delete image');
        console.error('Error deleting image:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);

      if (editingImage) {
        await galleryService.updateImage(editingImage._id!, formData);
      } else {
        await galleryService.createImage(formData);
      }
      
      setIsModalOpen(false);
      setFormData({ title: '', category: '', description: '', src: '' });
      setEditingImage(null);
      setImagePreview(null);
      await loadGalleryImages();
    } catch (err) {
      setError(editingImage ? 'Failed to update image' : 'Failed to create image');
      console.error('Error saving image:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-32">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
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

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button 
              onClick={() => setError(null)}
              className="float-right text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        )}

        {/* Images Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <div key={image._id || image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <img
                  src={image.src}
                  alt={image.alt || image.title}
                  className="w-full h-full object-cover"
                />
                {!image.isActive && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                    Inactive
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                <p className="text-sm text-gray-600 mb-2 capitalize">{image.category}</p>
                <p className="text-sm text-gray-500 mb-4">{image.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditImage(image)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteImage(image._id || image.id!.toString())}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && images.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🖼️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
            <p className="text-gray-500 mb-4">Start by adding your first gallery image</p>
            <button
              onClick={handleAddImage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add First Image
            </button>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingImage ? 'Edit Image' : 'Add New Image'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
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
                    value={formData.category}
                    onChange={handleInputChange}
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
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={!editingImage}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-2 h-32 w-full object-cover rounded-md border border-gray-200"
                    />
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
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
    </div>
  );
}