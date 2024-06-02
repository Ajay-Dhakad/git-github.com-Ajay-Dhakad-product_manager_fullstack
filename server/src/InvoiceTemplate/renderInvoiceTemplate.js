export default function renderInvoiceTemplate(products,Totalsum){

    const product_All = products?.map(product => 
        `<tr class="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
        <td class="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">${product.name}</td>
        <td class="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">${product.quantity}</td>
        <td class="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">${product.price}</td>
        <td class="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">INR ${product.totalAmount}</td>
      </tr>
        `
    ).join('')

    const template = `
    <html>
    <head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

    </head>
    <body>
   
    <div class="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md sm:p-8">
    <div class="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h1 class="text-2xl font-bold sm:text-3xl">YOUR PRODUCTS</h1>
      <div class="mt-4 text-right sm:mt-0">
        <h2 class="text-xl font-semibold">Levitation</h2>
        <p class="text-sm">InfoTech</p>
      </div>
    </div>
    <div class="mb-6">
      <p class="text-sm font-semibold text-gray-500"></p>
    </div>
    <div class="relative w-full overflow-auto">
      <table class="mb-6 w-full caption-bottom text-sm">
        <thead class="[&amp;_tr]:border-b">
          <tr class="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
            <th class="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium">Product</th>
            <th class="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium">Qty</th>
            <th class="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium">Rate</th>
            <th class="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium">Total</th>
          </tr>
        </thead>
        <tbody class="[&amp;_tr:last-child]:border-0">
         ${product_All}
        </tbody>
      </table>
    </div>
    <div class="mb-6">
      <div class="flex justify-between">
        <p>Total</p>
        <p>INR ${Totalsum}</p>
      </div>
      <div class="flex justify-between">
        <p>GST</p>
        <p>18%</p>
      </div>
    </div>
    <div class="mb-6">
      <div class="flex justify-between">
        <p class="font-bold">Grand Total</p>
        <p class="font-bold">₹ ${Totalsum + (Totalsum * 0.18)}</p>
      </div>
      <div class="border-t border-black"></div>
    </div>
    <div class="mb-6">
      <p class="text-sm">Valid until: 03/06/24</p>
    </div>
    <div class="mb-6">
      <div class="rounded-full bg-black px-8 py-4 text-white">
        <div class="mb-1 text-lg font-bold">Terms And Conditions</div>
        We are happy to supply any further information you may need and trust that you call on us to fill your order which will receive our prompt and careful attention.
      </div>
    </div>
  </div>
  </body>
  </html>
  `

  return template
}

