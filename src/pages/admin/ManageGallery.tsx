import { useState } from 'react';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  description: string;
}

export default function ManageGallery() {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    src: ''
  });

  const handleAddImage = () => {
    setEditingImage(null);
    setFormData({ title: '', category: '', description: '', src: '' });
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
    setIsModalOpen(true);
  };

  const handleDeleteImage = (id: number) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setImages(images.filter(img => img.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingImage) {
      // Update existing image
      setImages(images.map(img => 
        img.id === editingImage.id 
          ? { ...img, ...formData }
          : img
      ));
    } else {
      // Add new image
      const newImage: GalleryImage = {
        id: Math.max(...images.map(img => img.id), 0) + 1,
        ...formData
      };
      setImages([...images, newImage]);
    }
    
    setIsModalOpen(false);
    setFormData({ title: '', category: '', description: '', src: '' });
    setEditingImage(null);
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

        {/* Images Grid */}
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
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="src"
                    value={formData.src}
                    onChange={handleInputChange}
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