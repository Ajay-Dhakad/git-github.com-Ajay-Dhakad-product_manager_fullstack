import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../store/productSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { saveAs } from 'file-saver';
import { useNavigate } from "react-router-dom";

interface Product {
  name: string;
  quantity: number;
  price: number;
  totalAmount: number;
}

function ProductsPage() {
  const dispatch = useDispatch();
  const [total, setTotal] = useState<number>(0);
  const navigate = useNavigate();

  const products = useSelector((state: any) => state.product.products);
  const user = useSelector((state: any) => state.user.userInfo);



//   if (!user) {
//     navigate('/');
//   }

  const downloadInvoice = async () => {

    if (!user) return;
    const loadingtoast = toast.loading('Downloading Invoice!...');

    const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/product/generateinvoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    });

    const data = await response.blob();

    if (!data) {
      toast.error('Something Went Wrong!', {
        id: loadingtoast
      });
      return;
    }

    saveAs(data, 'ProductInvoice.pdf');

    toast.success('Invoice Downloaded Successfully!', {
      id: loadingtoast
    });
  };

  const getAllProducts = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/product/getallproducts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    });

    const responseJson = await response.json();

    console.log(responseJson);

    if (!responseJson.success) {
      toast.error('Products Not Found!');
    } else {
      toast.success(`${responseJson.products.length} Products Found!`);
    }

    dispatch(setProducts(responseJson.products));
    setTotal(responseJson.productTotal);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

 


  return  products?.length > 0 ? (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md sm:p-8">
      <br />
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">YOUR PRODUCTS</h1>
        <div className="mt-4 text-right sm:mt-0">
          <h2 className="text-xl font-semibold">Levitation</h2>
          <p className="text-sm">InfoTech</p>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500"></p>
      </div>
      <div className="relative w-full overflow-auto">
        <table className="mb-6 w-full caption-bottom text-sm">
          <thead className="[&amp;_tr]:border-b">
            <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
              <th className="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium">Product</th>
              <th className="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium">Qty</th>
              <th className="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium">Rate</th>
              <th className="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="[&amp;_tr:last-child]:border-0">
            {products?.map((product: Product) => (
              <tr key={product.name} className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">{product.name}</td>
                <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">{product.quantity}</td>
                <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">{product.price}</td>
                <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">INR {product.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-6">
        <div className="flex justify-between">
          <p>Total</p>
          <p>INR {total}</p>
        </div>
        <div className="flex justify-between">
          <p>GST</p>
          <p>18%</p>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex justify-between">
          <p className="font-bold">Grand Total</p>
          <p className="font-bold">₹ {total + (total * 0.18)}</p>
        </div>    
        <div className="border-t border-black"></div>
      </div>
      <div className="mb-6 flex justify-evenly">
        <p className="text-sm">Valid until: 03/06/24</p>
        <button onClick={() => downloadInvoice()} className="px-2 py-1 hover:bg-black transition-all duration-300 text-white rounded-lg text-lg bg-red-700 border-none">Download Invoice</button>
      </div>
      <div className="mb-6">
        <div className="rounded-full bg-black px-8 py-4 text-white">
          <div className="mb-1 text-lg font-bold">Terms And Conditions</div>
          We are happy to supply any further information you may need and trust that you call on us to fill your order which will receive our prompt and careful attention.
        </div>
      </div>
    </div>
  ) : (
   

        <div className="w-full h-full flex justify-center items-center flex-col bg-slate-800">
            <h1 className="text-white py-2 text-xl">Please Add A New Product To Generate Invoice!</h1>
            <button onClick={() => navigate('/')} className="bg-indigo-600 px-5 py-2 rounded-lg text-white font-bold">Add Product</button>
        </div>

  )
}

export default ProductsPage;
