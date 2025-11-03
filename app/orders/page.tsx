'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Table, THead, TBody, TR, TH, TD } from '../components/ui/table';

// Mock data for now
const mockOrders = Array.from({ length: 32 }, (_, i) => ({
  id: `ORD-${1000 + i}`,
  customer: `Customer ${i + 1}`,
  total: (Math.random() * 200 + 50).toFixed(2),
  date: new Date(2025, 10, i + 1).toLocaleDateString(),
  status: ['Pending', 'Processing', 'Completed', 'Cancelled'][i % 4],
}));

export default function OrdersPage() {
  const [orders] = useState(mockOrders);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const nextPage = () => setPage((p) => Math.min(p + 1, Math.ceil(filtered.length / perPage)));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));

  const statusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'status-badge green';
      case 'Cancelled':
        return 'status-badge red';
      case 'Processing':
        return 'status-badge blue';
      default:
        return 'status-badge gray';
    }
  };

  return (
    <div className="dashboard-container">
      <div className="heading-page">Orders</div>

      {/* Top controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Search by ID or Customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
          style={{ width: '280px' }}
        />
      </div>

      <div className="card">
        <div className="card-title">All Orders</div>
        <Table>
          <THead>
            <TR>
              <TH>#</TH>
              <TH>Order ID</TH>
              <TH>Customer</TH>
              <TH>Total (€)</TH>
              <TH>Date</TH>
              <TH>Status</TH>
              <TH style={{ textAlign: 'right' }}>Actions</TH>
            </TR>
          </THead>

          <TBody>
            {paginated.map((order, i) => (
              <TR key={order.id}>
                <TD>{(page - 1) * perPage + i + 1}</TD>
                <TD>{order.id}</TD>
                <TD>{order.customer}</TD>
                <TD>€{order.total}</TD>
                <TD>{order.date}</TD>
                <TD>
                  <span className={statusColor(order.status)}>{order.status}</span>
                </TD>
                <TD style={{ textAlign: 'right' }}>
                  <div className="table-actions">
                    <button className="btn btn-yellow">View</button>
                    <button className="btn btn-blue">Edit</button>
                    <button className="btn btn-red">Delete</button>
                  </div>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </div>

      {/* Pagination */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '15px',
        }}
      >
        <span className="text-sm text-gray-600">
          Page {page} of {Math.ceil(filtered.length / perPage)}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-gray" onClick={prevPage} disabled={page === 1}>
            <ChevronLeft size={16} /> Prev
          </button>
          <button
            className="btn btn-gray"
            onClick={nextPage}
            disabled={page === Math.ceil(filtered.length / perPage)}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
