import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/globals.css'

import Home from './pages/Home.tsx'
import Stream from './pages/Stream.tsx'
import Login from './pages/Login.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/:username',
    element: <Stream />,
  },
  {
    path: '/login',
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
