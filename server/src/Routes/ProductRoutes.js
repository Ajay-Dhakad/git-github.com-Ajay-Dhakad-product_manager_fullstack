import { Router } from "express";
import { Product } from "../models/ProductModel.js";
import userAuthVerification from "../middleware/authMiddleware.js";
import renderInvoiceTemplate from "../InvoiceTemplate/renderInvoiceTemplate.js";
import puppeteer from 'puppeteer'
const router = Router();

router.use(userAuthVerification)

router.post("/create", async(req, res) => {

    const { name, price, quantity } = req.body;
    
    if (!name ||!price ||!quantity) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    console.log(req.user._id)

  try {

    const newProduct = new Product({
      name,
      price,
      quantity,
      user:req.user._id
    });

    await newProduct.save();

    res.status(201).json({success:true, message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }


})

router.get("/getallproducts", async(req, res) => {
    try {

      const products = await Product.find({user:req.user._id}) || []

      console.log(products)

      if (!products){
        return res.status(404).json({ message: 'No products found' });
      }

      let Totalsum = 0;

      products?.map(product => {
        Totalsum += product.totalAmount 
      })

     return res.status(200).json({success:true, products,productTotal:Totalsum});
      

    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
})


router.post('/generateinvoice', async(req, res) => {
    try {
  
        const products = await Product.find({user:req.user._id})

        if (!products){
          return res.status(404).json({ message: 'No products found' });
        }

        let Totalsum = 0;
        
        products?.map(product => {
          Totalsum += product.totalAmount 
        })

        const browser = await puppeteer.launch({headless:true,args: ['--no-sandbox', '--disable-setuid-sandbox'],executablePath: process.env.CHROME_EXECUTABLE_PATH || '/opt/render/.cache/puppeteer/chrome/linux-125.0.6422.78/chrome-linux64/chrome'}); 
        
        const page = await browser.newPage();

        await page.setDefaultNavigationTimeout(60000); // Increase default navigation timeout to 60 seconds

      
      const htmlContent = await renderInvoiceTemplate(products,Totalsum); 

  
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  


      const pdfBuffer = await page.pdf({ format: 'A4',timeout:0,printBackground:true});

  
      await browser.close();
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
      return res.send(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF invoice:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

export default router;  