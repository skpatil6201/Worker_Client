import { useState, useEffect } from 'react';
import { serviceService, type ServiceItem } from '../../services/serviceService';

const EMPTY_FORM = { title: '', description: '', image: '', details: [''], isActive: true, order: 0 };

export default function ManageServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try { setServices(await serviceService.getAllAdmin()); }
    catch { setError('Failed to load services'); }
    finally { setLoading(false); }
  };

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const openEdit = (s: ServiceItem) => {
    setEditing(s);
    setForm({ title: s.title, description: s.description, image: s.image, details: s.details.length ? s.details : [''], isActive: s.isActive ?? true, order: s.order ?? 0 });
    setImagePreview(s.image);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this service?')) return;
    setLoading(true);
    try { await serviceService.delete(id); await load(); }
    catch { setError('Failed to delete'); }
    finally { setLoading(false); }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result as string;
      setForm(f => ({ ...f, image: b64 }));
      setImagePreview(b64);
    };
    reader.readAsDataURL(file);
  };

  const handleDetailChange = (i: number, val: string) => {
    const d = [...form.details];
    d[i] = val;
    setForm(f => ({ ...f, details: d }));
  };

  const addDetail = () => setForm(f => ({ ...f, details: [...f.details, ''] }));
  const removeDetail = (i: number) => setForm(f => ({ ...f, details: f.details.filter((_, idx) => idx !== i) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = { ...form, details: form.details.filter(d => d.trim()) };
      if (editing) await serviceService.update(editing._id!, payload);
      else await serviceService.create(payload);
      setIsModalOpen(false);
      setEditing(null);
      setImagePreview(null);
      await load();
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-32">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
            <p className="text-gray-600 mt-1">Add, edit, and delete services</p>
          </div>
          <button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Add Service
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error} <button onClick={() => setError(null)} className="float-right">×</button>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(s => (
            <div key={s._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 relative">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                {!s.isActive && <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Inactive</span>}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{s.description}</p>
                <p className="text-xs text-gray-400 mb-3">{s.details.length} detail items</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(s)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm font-medium" disabled={loading}>Edit</button>
                  <button onClick={() => handleDelete(s._id!)} className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-medium" disabled={loading}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && services.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛠️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
            <button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">Add First Service</button>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">{editing ? 'Edit Service' : 'Add New Service'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <input type="file" accept="image/*" onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" required={!editing} />
                  {imagePreview && <img src={imagePreview} alt="preview" className="mt-2 h-28 w-full object-cover rounded-md border" />}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Detail Items</label>
                  {form.details.map((d, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input type="text" value={d} onChange={e => handleDetailChange(i, e.target.value)}
                        placeholder={`Detail ${i + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <button type="button" onClick={() => removeDetail(i)} className="text-red-500 hover:text-red-700 px-2">✕</button>
                    </div>
                  ))}
                  <button type="button" onClick={addDetail} className="text-blue-600 hover:text-blue-800 text-sm font-medium">+ Add Detail</button>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                    <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
                      Active
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Cancel</button>
                  <button type="submit" disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
                    {editing ? 'Update' : 'Add'} Service
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
