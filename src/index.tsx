import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { initializeApp } from 'firebase/app';

import './index.css';
import reportWebVitals from './reportWebVitals';

import Home from "./pages/home";
import Error403 from "./pages/error/403";
import Error404 from "./pages/error/404";
import Error500 from "./pages/error/500";
import Layout from './components/layout';

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

import ProjectList from "./pages/project/list";

// initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_apiKey,
//   authDomain: process.env.REACT_APP_FIREBASE_authDomain,
//   databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
//   projectId: process.env.REACT_APP_FIREBASE_projectId,
//   storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
//   messagingSenderId:   process.env.REACT_APP_FIREBASE_messagingSenderId,
//   appId: process.env.REACT_APP_FIREBASE_appId,
//   measurementId: process.env.REACT_APP_FIREBASE_measurementId,
// });

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
