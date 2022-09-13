import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import reportWebVitals from './reportWebVitals';

import Home from "./pages/home";
import Error403 from "./pages/error/403";
import Error404 from "./pages/error/404";
import Error500 from "./pages/error/500";
import Layout from './components/layout';

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

import SkillList from "./pages/skill/list";
import SocialList from "./pages/social/list";
import ServiceList from "./pages/service/list";
import ProjectList from "./pages/project/list";
import CompanyList from "./pages/company/list";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* PROJECT */}
          <Route path="projeto" element={<ProjectList />} />

          {/* COMPANY */}
          <Route path="empresa" element={<CompanyList />} />

          {/* SERVICE */}
          <Route path="servico" element={<ServiceList />} />

          {/* SKILL */}
          <Route path="habilidade" element={<SkillList />} />

          {/* SOCIAL */}
          <Route path="social" element={<SocialList />} />
        </Route>

        {/* AUTH */}
        <Route path="entrar" element={<Login />} />
        <Route path="cadastre-se" element={<Register />} />

        {/* ERROR */}
        <Route path="*" element={<Error404 />} />
        <Route path="erro/403" element={<Error403 />} />
        <Route path="erro/500" element={<Error500 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
