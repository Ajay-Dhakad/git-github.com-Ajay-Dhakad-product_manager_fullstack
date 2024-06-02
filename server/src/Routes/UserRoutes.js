import { Router } from "express";
import {User} from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const router = Router()


const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

router.post('/login', async(req, res) => {


    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10d' });
  
      res.status(200).json({success:true, message: 'Login successful', token });
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'Server error', error });
    }

    
})


router.post('/signup',async(req,res) => {
    
const { name, email, password } = req.body;

if (!isValidEmail(email)) {
  return res.status(400).json({ message: 'Invalid email address' });
}

if (!name ||!email ||!password) {
  return res.status(400).json({ message: 'Please enter all fields' });
}

try {

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword
  });

  await newUser.save();

  res.status(201).json({success:true, message: 'User registered successfully' });
} catch (error) {
  res.status(500).json({success:false, message: 'Server error', error });
}})

export default router;