"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProducts } from "../../lib/api";
import { ProductTable } from "../../components/ProductTable";
import BulkUploadModal from "@/components/BulkUploadModal";


export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const router = useRouter();

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="heading-page">Products</div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          className="btn btn-green"
          onClick={() => setShowBulkUpload(true)}
        >
          Bulk Upload
        </button>
        <button
          className="btn btn-blue"
          onClick={() => router.push("/products/add")}
        >
          Add Product
        </button>
      </div>

      <div className="card">
        <div className="card-title">All Products</div>
        <ProductTable products={products} onDelete={fetchProducts} />
      </div>

      {showBulkUpload && (
        <BulkUploadModal
          onClose={() => {
            setShowBulkUpload(false);
            fetchProducts();
          }}
        />
      )}
    </div>
  );
}
