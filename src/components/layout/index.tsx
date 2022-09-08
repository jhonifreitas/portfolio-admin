import { Outlet } from 'react-router-dom';

import Sidebar from '../sidebar';

export default function Layout() {
  return (
    <div className="layout flex">
      <Sidebar />
      <div className="flex-1 h-screen overflow-auto p-7 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}
