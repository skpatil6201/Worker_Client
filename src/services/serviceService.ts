import { buildApiUrl } from '../config/api';
import { getAuthHeaders } from '../utils/auth';

export interface ServiceItem {
  _id?: string;
  title: string;
  description: string;
  image: string;
  details: string[];
  isActive?: boolean;
  order?: number;
}

const BASE = '/services';

export const serviceService = {
  async getAll(): Promise<ServiceItem[]> {
    const res = await fetch(buildApiUrl(BASE));
    const result = await res.json();
    return result.success ? result.data : [];
  },

  async getAllAdmin(): Promise<ServiceItem[]> {
    const res = await fetch(buildApiUrl(`${BASE}/admin/all`), { headers: getAuthHeaders() });
    const result = await res.json();
    return result.success ? result.data : [];
  },

  async create(data: Omit<ServiceItem, '_id'>): Promise<ServiceItem> {
    const res = await fetch(buildApiUrl(BASE), {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!result.success) throw new Error(result.message);
    return result.data;
  },

  async update(id: string, data: Partial<ServiceItem>): Promise<ServiceItem> {
    const res = await fetch(buildApiUrl(`${BASE}/${id}`), {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!result.success) throw new Error(result.message);
    return result.data;
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(buildApiUrl(`${BASE}/${id}`), {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const result = await res.json();
    if (!result.success) throw new Error(result.message);
  }
};
