import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Home from './pages/Home.tsx'
import Stream from './pages/Stream.tsx'
import VerifyAccount from './pages/VerifyAccount.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound.tsx'

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
    path: '/verify',
    element: <VerifyAccount />
  },
  
  // handle 404 error
  {
    path: '/*',
    element: <NotFound />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
