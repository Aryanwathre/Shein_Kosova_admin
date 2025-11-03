'use client';

import { useRouter } from 'next/navigation';
import { deleteProduct } from '../lib/api';

export function ProductTable({ products, onDelete }: any) {
  const router = useRouter();

  if (!products || products.length === 0) {
    return <div className="no-products">No products found.</div>;
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      onDelete();
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/products/edit/${id}`);
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price (€)</th>
            <th>Rating</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p: any, i: number) => (
            <tr key={p.id || i}>
              <td>{i + 1}</td>

              <td>
                <img
                  src={p.mainImageUrl || '/no-image.png'}
                  alt={p.name}
                  width={50}
                  height={50}
                  style={{ borderRadius: '6px', objectFit: 'cover' }}
                />
              </td>

              <td style={{ maxWidth: '280px' }}>{p.name}</td>
              <td>{p.brand}</td>
              <td>{p.category?.name || '-'}</td>
              <td>€{p.price?.toFixed(2)}</td>
              <td>{p.averageRating || '—'}</td>

              <td>
                <span
                  style={{
                    color: p.enabled ? '#16a34a' : '#ef4444',
                    fontWeight: 500,
                  }}
                >
                  {p.enabled ? 'Active' : 'Disabled'}
                </span>
              </td>

              <td style={{ textAlign: 'right' }}>
                {/* <button
                  className="btn btn-yellow"
                  onClick={() => handleEdit(p.id)}
                  style={{ marginRight: '6px' }}
                >
                  Edit
                </button> */}

                <button
                  className="btn btn-red"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
