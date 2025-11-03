"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { bulkUploadProducts } from "../lib/api";
import { useRouter } from "next/navigation";

export default function BulkUploadModal({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a CSV file first!");
      return;
    }

    try {
      setUploading(true);
      await bulkUploadProducts(file);

      toast.success("Bulk upload successful!");
      setTimeout(() => {
        router.refresh(); // ✅ refresh the products page
        onClose(); // close the modal
      }, 800);
    } catch (err: unknown) {
      console.error(err);
      toast.error("Upload failed. Please check your CSV file and try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="card" style={{ width: "400px", textAlign: "center" }}>
        <div className="card-title">Bulk Upload Products</div>

        <div style={{ margin: "20px 0" }}>
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button className="btn btn-green" onClick={onClose} disabled={uploading}>
            Close
          </button>
          <button className="btn btn-blue" onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
