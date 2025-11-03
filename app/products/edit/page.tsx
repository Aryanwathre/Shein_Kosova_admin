'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditProductPage() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get('data');
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (dataParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(dataParam));
        setProduct(parsed);
      } catch (error) {
        console.error('Error parsing product data:', error);
      }
    }
  }, [dataParam]);

  if (!product) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-700">
          No product data found
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <div className="space-y-3">
        <p><strong>ID:</strong> {product.id}</p>
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Category:</strong> {product.category?.name}</p>

        <img
          src={product.mainImageUrl}
          alt={product.name}
          className="w-40 h-52 object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}
