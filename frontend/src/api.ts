import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  isActive: boolean;
}

export const fetchProducts = async () => {
  const response = await api.get<Product[]>('/products/');
  return response.data;
};

export const createProduct = async (data: ProductInput) => {
  const response = await api.post<Product>('/products/', data);
  return response.data;
};

export const updateProduct = async (id: number, data: Partial<ProductInput>) => {
  const response = await api.put<Product>(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  await api.delete(`/products/${id}`);
};
