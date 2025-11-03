'use client';

import { useState } from 'react';
import { createProduct, updateProduct } from '../lib/api';
import { useRouter } from 'next/navigation';

type ProductFormType = {
  productId: string;
  productCode: string;
  name: string;
  description: string;
  brand: string;
  price: string | number;
  averageRating: string | number;
  enabled: boolean;
  categoryId: string;
  mainImageUrl: string;
  detailImages: string[];
};

export default function ProductForm({ product }: { product?: any }) {
  const router = useRouter();
  const isEdit = !!product;

  const [form, setForm] = useState<ProductFormType>({
    productId: product?.productId || '',
    productCode: product?.productCode || '',
    name: product?.name || '',
    description: product?.description || '',
    brand: product?.brand || '',
    price: product?.price || '',
    averageRating: product?.averageRating || '',
    enabled: product?.enabled ?? true,
    categoryId: product?.categoryId || '',
    mainImageUrl: product?.mainImageUrl || '',
    detailImages: product?.detailImages?.map((i: any) => i.imageUrl) || [''],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (index: number, value: string) => {
    const updated = [...form.detailImages];
    updated[index] = value;
    setForm({ ...form, detailImages: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) await updateProduct(form.productId, form);
    else await createProduct(form);
    router.push('/products');
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>Product Code</label>
        <input name="productCode" value={form.productCode} onChange={handleChange} className="input" />
      </div>

      <div className="form-group">
        <label>Product Name</label>
        <input name="name" value={form.name} onChange={handleChange} className="input" />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="input textarea" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Brand</label>
          <input name="brand" value={form.brand} onChange={handleChange} className="input" />
        </div>
        <div className="form-group">
          <label>Category ID</label>
          <input name="categoryId" value={form.categoryId} onChange={handleChange} className="input" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Price ($)</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            className="input"
            type="number"
          />
        </div>
        <div className="form-group">
          <label>Average Rating</label>
          <input
            name="averageRating"
            value={form.averageRating}
            onChange={handleChange}
            className="input"
            type="number"
            step="0.1"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Main Image URL</label>
        <input
          name="mainImageUrl"
          value={form.mainImageUrl}
          onChange={handleChange}
          className="input"
        />
      </div>

      <div className="form-group">
        <label>Detail Images</label>
        {form.detailImages.map((img, i) => (
          <input
            key={i}
            value={img}
            onChange={(e) => handleImageChange(i, e.target.value)}
            placeholder={`Image URL ${i + 1}`}
            className="input"
          />
        ))}
        <button
          type="button"
          className="btn btn-green"
          onClick={() => setForm({ ...form, detailImages: [...form.detailImages, ''] })}
        >
          + Add More
        </button>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-blue">
          {isEdit ? 'Update Product' : 'Add Product'}
        </button>
        <button type="button" className="btn btn-yellow" onClick={() => router.push('/products')}>
          Cancel
        </button>
      </div>
    </form>
  );
}
