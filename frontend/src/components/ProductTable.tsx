import React from 'react';
import { Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import type { Product } from '../api';
import Button from './Button';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-500">Belum ada produk. Silakan tambah produk baru.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Nama</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Kategori</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-right">Harga</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">Stok</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">Status</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{product.name}</div>
                <div className="text-xs text-gray-500 line-clamp-1">{product.description}</div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                  {product.category}
                </span>
              </td>
              <td className="px-6 py-4 text-right font-mono text-gray-900">
                Rp {product.price.toLocaleString('id-ID')}
              </td>
              <td className="px-6 py-4 text-center">
                <span className={`text-sm ${product.stock < 10 ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
                  {product.stock}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                {product.isActive ? (
                  <div className="flex items-center justify-center text-green-600" title="Aktif">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-gray-400" title="Nonaktif">
                    <XCircle className="w-5 h-5" />
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" className="p-2 h-auto" onClick={() => onEdit(product)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" className="p-2 h-auto text-red-600 hover:bg-red-50" onClick={() => onDelete(product.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
