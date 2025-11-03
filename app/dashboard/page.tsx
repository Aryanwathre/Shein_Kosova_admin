"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Percent, ShoppingBag } from "lucide-react";
import { getProducts, getMarkup } from "@/app/lib/api"; // ✅ use api.ts helpers

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [markup, setMarkup] = useState(0);
  const [orders, setOrders] = useState(0);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return router.push("/login");

    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ Fetch both products & markup
        const [productsRes, markupRes] = await Promise.all([
          getProducts(),
          getMarkup(),
        ]);

        let markupValue = 0;
        if (typeof markupRes === "number") {
          markupValue = markupRes;
        } else if (typeof markupRes === "string") {
          markupValue = parseFloat(markupRes);
        } else if (markupRes?.percentage) {
          markupValue = markupRes.percentage;
        } else if (markupRes?.markup) {
          markupValue = markupRes.markup;
        }

        setTotalProducts(productsRes?.length || 0);
        setMarkup(isNaN(markupValue) ? 0 : markupValue);
        setOrders(172); // static for now
        setTopProducts(productsRes?.slice(0, 5) || []);
      } catch (err) {
        console.warn("API unavailable, using mock data...");

        const mockProducts = [
          { id: 1, name: "Cotton T-shirt", price: 19.99, stock: 120 },
          { id: 2, name: "Denim Jeans", price: 49.99, stock: 75 },
          { id: 3, name: "Leather Jacket", price: 129.99, stock: 30 },
          { id: 4, name: "Sneakers", price: 89.99, stock: 50 },
          { id: 5, name: "Formal Shirt", price: 39.99, stock: 60 },
        ];

        setTotalProducts(mockProducts.length);
        setMarkup(15);
        setOrders(172);
        setTopProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <div className="loading">Loading Dashboard...</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon={<Package />}
          label="Total Products"
          value={totalProducts}
          color="blue"
          onClick={() => router.push("/products")}
        />
        <StatCard
          icon={<Percent />}
          label="Markup"
          value={`${markup}%`}
          color="green"
          onClick={() => router.push("/markup")}
        />
        <StatCard
          icon={<ShoppingBag />}
          label="Total Orders"
          value={orders}
          color="orange"
          onClick={() => router.push("/orders")}
        />
      </div>

      {/* Top Products */}
      <div className="card">
        <h2 className="card-title">Top Selling Products</h2>
        {topProducts.length ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price ($)</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.price?.toFixed(2)}</td>
                  <td>{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-products">No products found yet.</p>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  onClick: () => void;
}) {
  return (
    <div className={`stat-card ${color}`} onClick={onClick}>
      <div className="stat-icon">{icon}</div>
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}
