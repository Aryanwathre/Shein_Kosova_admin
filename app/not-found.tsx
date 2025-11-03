// app/not-found.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "../app/components/ui/button";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <AlertTriangle className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Button onClick={() => router.push("/")} className="rounded-full px-6">
          Go Back Home
        </Button>
      </motion.div>
    </div>
  );
}
