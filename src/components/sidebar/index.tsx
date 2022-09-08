import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  ChartBarIcon,
  BriefcaseIcon,
  ChevronLeftIcon,
  BuildingOffice2Icon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const items = [
    { title: "Dashboard", icon: <ChartBarIcon className="h-6 w-6" />, url: "/" },
    { title: "Projetos", icon: <BriefcaseIcon className="h-6 w-6" />, url: "/projeto" },
    { title: "Empresas", icon: <BuildingOffice2Icon className="h-6 w-6" />, url: "empresa" },
  ];

  function logout() {
    navigate('/entrar?returnUrl='+location.pathname);
  }

  return (
    <div
      className={`sidebar relative h-screen flex flex-col bg-indigo-900
      duration-300 ${ open ? 'md:w-72 w-50' : 'w-20' }`}
    >
      <div
        onClick={() => setOpen(!open)}
        className={`cursor-pointer absolute -right-4 top-6 h-8 w-8 p-1 bg-white rounded-full
        border-4 border-indigo-900 text-indigo-900 duration-200 ${ !open && 'rotate-180'}`}
      >
        <ChevronLeftIcon className="stroke-2" />
      </div>

      <div className="p-5 pt-7">
        <h1 className={`text-white font-medium duration-200 ${ open ? 'text-xl' : 'text-sm' }`}>
          Painel Admin
        </h1>
      </div>

      <ul className="my-6 flex-1 overflow-x-auto space-y-1 px-5">
        {items.map((item, index) => (
          <li key={index}>
            <Link
              to={item.url}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-white/20 text-gray-300
              text-sm items-center gap-x-4 duration-200 ${ location.pathname === item.url && "bg-white/20" }`}
            >
              {item.icon}
              <span className={`${!open && "hidden"} origin-left`}>
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className={`flex px-5 py-3 gap-x-2 items-center bg-indigo-800/90 text-gray-300 ${!open && 'hidden'}`}>
        <img src="/assets/images/avatar.png" className="rounded-full h-10 w-100" alt="" />
        <div className="flex-1">
          <p className="text-sm">Jonathan Freitas</p>
          <p className="text-xs text-gray-500">Adminitrador</p>
        </div>
        <div className="cursor-pointer hover:bg-white/20 p-2 rounded-md duration-200" onClick={logout}>
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
