import React, { useState, useEffect } from 'react';
import type { Product, ProductInput } from '../api';
import Input from './Input';
import Button from './Button';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductInput) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState<ProductInput>(() => ({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    category: initialData?.category || '',
    isActive: initialData?.isActive ?? true,
  }));

  const [errors, setErrors] = useState<Partial<Record<keyof ProductInput, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProductInput, string>> = {};
    if (!formData.name) newErrors.name = 'Nama produk wajib diisi';
    if (formData.price < 0) newErrors.price = 'Harga tidak boleh negatif';
    if (formData.stock < 0) newErrors.stock = 'Stok tidak boleh negatif';
    if (!formData.category) newErrors.category = 'Kategori wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-2xl w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {initialData ? 'Edit Produk' : 'Tambah Produk Baru'}
      </h2>
      
      <Input
        label="Nama Produk"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        placeholder="Contoh: Laptop Pro X"
      />

      <Input
        label="Deskripsi"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        isTextArea
        placeholder="Jelaskan detail produk di sini..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Harga (Rp)"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          error={errors.price}
        />
        <Input
          label="Stok"
          type="number"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
          error={errors.stock}
        />
      </div>

      <Input
        label="Kategori"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        error={errors.category}
        placeholder="Contoh: Elektronik"
      />

      <div className="mb-8">
        <label className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            />
            <div className={`block w-14 h-8 rounded-full transition-colors ${formData.isActive ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${formData.isActive ? 'transform translate-x-6' : ''}`}></div>
          </div>
          <span className="text-sm font-medium text-gray-700">Produk Aktif</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {initialData ? 'Simpan Perubahan' : 'Tambah Produk'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
