import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Project from './components/Project/Project.jsx'
import About from './components/About/About.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/"  element={<App />}>
      <Route path="/" element={<Project/>} />
      <Route path = "/about" element ={<About />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <RouterProvider router={router}/>
    
  </StrictMode>,
)
