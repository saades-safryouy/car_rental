import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Compenents/global/Header.jsx/Header';
import { ModeToggle } from '../Compenents/global/Header.jsx/mode-toogle';
import Footer from '../Compenents/global/Footer/Footer'

export default function GuestLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Header global */}
      <Header />

      {/* Contenu principal en full width & height */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* Mode sombre / clair */}
      <div className="fixed bottom-4 right-4 z-50">
        <ModeToggle />
      </div>
      <Footer/>
    </div>
  );
}
