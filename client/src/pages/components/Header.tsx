import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUserInfo } from "../../store/userSlice";

function Header() {
  const user = useSelector((state: any) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="bg-gray-900 min-w-[100vw] text-white py-4 px-6 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {/* <a className="mr-6" href="#">
          <img
            src="/placeholder.svg"  
            alt="Logo"
            width="48"
            height="48" 
            style="aspect-ratio: 48 / 48; object-fit: cover;"
            className="h-8 w-auto"
          />
        </a> */}
          <nav className="font-bold text-xl">
            <Link to={"/"}>Levitation</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          {!user && (
            <>
              <Link
                to={"/login"}
                className="hover:bg-slate-700 text-white px-2 py-2 rounded transition-colors"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="hover:bg-slate-700 text-white px-2 py-2 rounded transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
          {user && (
            <>
              <button
                className="hover:bg-slate-700 text-white px-2 py-2 rounded transition-colors"
                onClick={() => navigate('/products')}
              >
                Products
              </button>
              <button
                className="hover:bg-slate-700 text-white px-2 py-2 rounded transition-colors"
                onClick={() => dispatch(clearUserInfo())}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
