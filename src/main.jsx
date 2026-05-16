import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import ViewTrip from './view-trip/index.jsx'
import Header from './components/ui/custom/Header.jsx'
import { Toaster } from "sonner"

function Root() {
  return (
    <>
      <Header />
      <Toaster />
    </>
  )
}

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <><Header /><App /></>
  },
  { 
    path: '/create-trip', 
    element: <><Header /><CreateTrip /></>
  },
  { 
    path: '/view-trip/:tripId', 
    element: <><Header /><ViewTrip /></>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
)