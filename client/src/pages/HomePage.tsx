import { FormEvent } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const user = useSelector((state: any) => state.user.userInfo);
  const navigate = useNavigate();
  console.log(user);

  const handler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      quantity: { value: number };
      price: { value: number };
    };

    const name = target.name.value;
    const quantity = target.quantity.value;
    const price = target.price.value;

    const data = {
      name,
      quantity,
      price,
    };

    const res = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/product/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify(data),
    });

    const resp = await res.json();

    if (!resp.success) {
      toast.error(resp.message);
    }

    if (resp.success) {
      toast.success(resp.message);
      target.name.value = "";
      target.quantity.value = 0;
      target.price.value =0;
    }
  };

  return user ? (
    <div className="flex-1 flex min-w-screen min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-950">
      <div className="w-full max-w-2xl space-y-8">
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
            Add a new product
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Manage your product inventory and download invoices.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handler}>
          <div>
            <label
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="product-name"
            >
              Product Name
            </label>
            <input
              className="h-10 border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
              id="product-name"
              required
              placeholder="Enter product name"
              type="text"
              name="name"
            />
          </div>
          <div>
            <label
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              className="h-10 border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
              id="quantity"
              min="1"
              required
              placeholder="Enter quantity"
              name="quantity"
              type="number"
            />
          </div>
          <div>
            <label
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="h-10 border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
              id="price"
              step="0.01"
              min="0"
              required
              placeholder="Enter price"
              type="number"
              name="price"
            />
          </div>
          <div>
            <button
              className="items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-950"
              type="submit"
            >
              ADD PRODUCT
            </button>
          </div>
        </form>
        <button
          onClick={() => navigate('/products')}
          className="items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-950"
        >
          SEE ALL PRODUCTS
        </button>
      </div>
    </div>
  ) : (
    <div className="flex-1 min-w-screen min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-950">
      <div className="w-full max-w-2xl space-y-8">
        <div>
          {/* <img
            src="/placeholder.svg"
            alt="Logo"
            width="48"
            height="48"
            className="mx-auto h-12 w-auto"
            style={{ aspectRatio: '48 / 48', objectFit: 'cover' }}
          /> */}
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Please login to add products
          </h2>
          <div className="flex justify-center mt-6">
            <Link to={'/login'} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
