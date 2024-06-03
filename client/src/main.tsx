import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'
import SignupPage from './pages/SignupPage.tsx'
import { Provider } from 'react-redux'
import store from './store/index.ts'
import HomePage from './pages/HomePage.tsx'
import ProductsPage from './pages/ProductsPage.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/',
        element: <HomePage/>,
      },{
        path: '/login',
        element:<LoginPage/>
      },{
        path: '/signup',  
        element: <SignupPage/>,
      },{ 
        path: '/products',
        element: <ProductsPage/>,
      }
    ]
  },
  ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
  <Provider store={store}> <RouterProvider router={router}/></Provider>

  </>
)
