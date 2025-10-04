import type { ReactNode } from "react";
import Navbar from "../components/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="flex-grow">{children}</main>

      <footer className="text-center py-4 text-gray-400 text-sm border-t border-gray-700">
        © {new Date().getFullYear()} Mi App - Todos los derechos reservados
      </footer>
    </div>
  );
}
