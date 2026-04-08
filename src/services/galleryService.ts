import { buildApiUrl } from '../config/api';
import { getAuthHeaders } from '../utils/auth';

export interface GalleryImage {
  _id?: string;
  id?: number;
  title: string;
  description: string;
  category: string;
  src: string;
  alt?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE = '/gallery';

export const galleryService = {
  // Get all gallery images
  async getAllImages(params?: { category?: string; isActive?: boolean }): Promise<GalleryImage[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.append('category', params.category);
      if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
      
      const url = `${API_BASE}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetch(buildApiUrl(url));
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.success ? result.data : [];
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      return [];
    }
  },

  // Get gallery images by category
  async getImagesByCategory(category: string): Promise<GalleryImage[]> {
    try {
      const response = await fetch(buildApiUrl(`${API_BASE}/category/${category}`));
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.success ? result.data : [];
    } catch (error) {
      console.error('Error fetching gallery images by category:', error);
      return [];
    }
  },

  // Get single gallery image
  async getImageById(id: string): Promise<GalleryImage | null> {
    try {
      const response = await fetch(buildApiUrl(`${API_BASE}/${id}`));
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.success ? result.data : null;
    } catch (error) {
      console.error('Error fetching gallery image:', error);
      return null;
    }
  },

  // Create new gallery image (admin only)
  async createImage(imageData: Omit<GalleryImage, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<GalleryImage | null> {
    try {
      const headers = getAuthHeaders();
      const response = await fetch(buildApiUrl(API_BASE), {
        method: 'POST',
        headers,
        body: JSON.stringify(imageData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.success ? result.data : null;
    } catch (error) {
      console.error('Error creating gallery image:', error);
      throw error;
    }
  },

  // Update gallery image (admin only)
  async updateImage(id: string, imageData: Partial<GalleryImage>): Promise<GalleryImage | null> {
    try {
      const headers = getAuthHeaders();
      const response = await fetch(buildApiUrl(`${API_BASE}/${id}`), {
        method: 'PUT',
        headers,
        body: JSON.stringify(imageData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.success ? result.data : null;
    } catch (error) {
      console.error('Error updating gallery image:', error);
      throw error;
    }
  },

  // Delete gallery image (admin only)
  async deleteImage(id: string): Promise<boolean> {
    try {
      const headers = getAuthHeaders();
      const response = await fetch(buildApiUrl(`${API_BASE}/${id}`), {
        method: 'DELETE',
        headers
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      throw error;
    }
  },

  // Toggle image active status (admin only)
  async toggleImageStatus(id: string): Promise<GalleryImage | null> {
    try {
      const headers = getAuthHeaders();
      const response = await fetch(buildApiUrl(`${API_BASE}/${id}/toggle-status`), {
        method: 'PATCH',
        headers
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.success ? result.data : null;
    } catch (error) {
      console.error('Error toggling gallery image status:', error);
      throw error;
    }
  }
};