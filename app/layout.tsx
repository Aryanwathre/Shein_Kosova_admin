import "./globals.css";
import ClientLayout from "../components/ClientLayout";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Admin Panel",
  description: "Next.js E-Commerce Admin Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
         <Toaster position="top-right" />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
