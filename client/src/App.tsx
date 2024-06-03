import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './pages/components/Header'
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo} from './store/userSlice';
import { useEffect } from 'react';


function App() {

  const {pathname} = useLocation()
  const dispatch = useDispatch()

  const user = useSelector((state : any) => state.user.userInfo)




  const getuserInfo = async() =>{
    const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/user/getuser`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('auth_token')}`
      }
    })
    const data = await response.json()
    if (data.success) {
      dispatch(setUserInfo(data.user))
    
    }
  } 

useEffect(() => {

if (!user && localStorage.getItem('auth_token')) getuserInfo();

},[pathname])


  return (
    <>
    <Header/>
    <Toaster position='top-center'/>
    <Outlet/>
    </>
  )
} 

export default App
