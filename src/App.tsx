import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { HomePage } from './pages/HomePage';
import { AddCompanyPage } from './pages/AddCompanyPage';
import { CompanyPage } from './pages/CompanyPage';
import { Toaster } from './components/ui/Toaster';

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-company" element={<AddCompanyPage />} />
            <Route path="/company/:id" element={<CompanyPage />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}