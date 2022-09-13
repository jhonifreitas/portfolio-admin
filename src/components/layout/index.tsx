import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { CookieService } from '../../services/cookie.service';

import Sidebar from '../sidebar';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = CookieService.getCookie('token');
    if (!token) navigate('/entrar?returnUrl='+location.pathname);
  });

  return (
    <div className="layout flex">
      <Sidebar />
      <div className="flex-1 h-screen overflow-auto p-7 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}
