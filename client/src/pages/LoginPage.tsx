import  { useState, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface Creds {
  email: string;
  password: string;
}

function LoginPage() {
  const [creds, setCreds] = useState<Creds>({ email: "", password: "" });
  const navigate = useNavigate();

  const submithandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    });

    const data = await res.json();

    if (!data.success) {
      toast.error(data.message);
      return;
    }

    if (data.success) {
      toast.success(data.message);
      localStorage.setItem("auth_token", data.token);
      navigate('/');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-w-full min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <div>
          {/* <img
            src="/placeholder.svg"
            alt="Logo"
            width="48"
            height="48"
            className="mx-auto h-12 w-auto"
            style={{ aspectRatio: '48 / 48', objectFit: 'cover' }}
          /> */}
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            To access your product management and invoicing tools
          </p>
        </div>
        <form className="space-y-6" onSubmit={submithandler}>
          <div>
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              className="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
              id="email"
              autoComplete="email"
              required
              placeholder="Email address"
              type="email"
              name="email"
              value={creds.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
              id="password"
              autoComplete="current-password"
              placeholder="Password"
              name="password"
              type="password"
              required
              value={creds.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-950"
              type="submit"
            >Sign In</button>
          </div>
          <br />
          <Link className="text-white hover:underline" to='/signup'>Don't Have any Account SignUp</Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
