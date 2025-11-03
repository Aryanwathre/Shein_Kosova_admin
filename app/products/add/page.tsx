'use client';

import ProductForm from '../../components/ProductForm';

export default function AddProductPage() {
  return (
    <div className="dashboard-container">
      <div className="heading-page">Add New Product</div>
      <ProductForm />
    </div>
  );
}
