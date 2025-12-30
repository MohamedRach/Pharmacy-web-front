import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RegisterUserPage  from "./pages/RegisterUserPage.jsx"
import LoginUserPage from "./pages/LoginUserPage.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <RegisterUserPage />,
  },
  {
    path: "/login",
    element: <LoginUserPage />,
  },
]);

createRoot(document.getElementById('root')).render(
 <RouterProvider router={router} />,
)
