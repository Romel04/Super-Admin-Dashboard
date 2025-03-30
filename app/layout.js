// app/layout.js
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/lib/auth";
import { LayoutProvider } from "@/components/LayoutProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Dashboard",
  description: "Super Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <LayoutProvider>
              {children}
              <Toaster position="top-right" />
            </LayoutProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}