
import React from 'react';
import { Outlet } from 'react-router-dom';
import ConfigurationSidebar from './Sidebar';

const ConfigLayout = () => {
  return (
    <div className="flex flex-grow w-full">
      <ConfigurationSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ConfigLayout;
