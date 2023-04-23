import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/globals.css'

import Home from './pages/Home.tsx'
import Profile from './pages/Profile.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/:username',
    element: <Profile />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
