import { useState, useEffect } from 'react';
import { Plus, Package, RefreshCw } from 'lucide-react';
import { Product, ProductInput, fetchProducts, createProduct, updateProduct, deleteProduct } from './api';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import ConfirmModal from './components/ConfirmModal';
import Button from './components/Button';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // UI State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError('Gagal memuat produk. Pastikan backend berjalan.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreateProduct = async (data: ProductInput) => {
    try {
      setIsSubmitting(true);
      await createProduct(data);
      setIsFormOpen(false);
      loadProducts();
    } catch (err) {
      alert('Gagal menambah produk');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduct = async (data: ProductInput) => {
    if (!editingProduct) return;
    try {
      setIsSubmitting(true);
      await updateProduct(editingProduct.id, data);
      setEditingProduct(undefined);
      setIsFormOpen(false);
      loadProducts();
    } catch (err) {
      alert('Gagal mengubah produk');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (deletingId === null) return;
    try {
      setIsSubmitting(true);
      await deleteProduct(deletingId);
      setDeletingId(null);
      loadProducts();
    } catch (err) {
      alert('Gagal menghapus produk');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blue-600">
            <Package className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight text-gray-900">Munk Studio Product</span>
          </div>
          <Button onClick={() => setIsFormOpen(true)} className="shadow-lg shadow-blue-200">
            <Plus className="w-5 h-5 mr-1" />
            Produk Baru
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center justify-between animate-in slide-in-from-top duration-300">
            <p className="flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </p>
            <Button variant="ghost" onClick={loadProducts} className="text-red-700 hover:bg-red-100">
              <RefreshCw className="w-4 h-4 mr-1" /> Coba Lagi
            </Button>
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Daftar Produk</h1>
          <p className="text-sm text-gray-500">Total: {products.length} item</p>
        </div>

        <ProductTable 
          products={products} 
          onEdit={openEditForm} 
          onDelete={(id) => setDeletingId(id)}
          isLoading={isLoading}
        />
      </main>

      {/* Form Modal/Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <ProductForm 
            initialData={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
            onCancel={closeForm}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal 
        isOpen={deletingId !== null}
        title="Hapus Produk?"
        message="Tindakan ini tidak dapat dibatalkan. Produk akan dihapus secara permanen dari database."
        onConfirm={handleDeleteProduct}
        onCancel={() => setDeletingId(null)}
        isLoading={isSubmitting}
      />
    </div>
  );
}

export default App;
