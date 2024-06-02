import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/',
        element: <h1>home</h1>,
      },{
        path: '/login',
        element: <h1>about</h1>,
      },{
        path: '/signup',  
        element: <h1>about</h1>,
      }
    ]
  },
  ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router}/>
  </>
)
