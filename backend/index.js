import express from 'express';
import connectDB from './connectDB.js';
import { Balance, User } from './db.js';
import cors from 'cors'; // cors to link backend to frontend on same URL
import argon2 from 'argon2'; // argon2 used for hashing and verifying/comparing
import userZodSchema from './zod.js';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON
connectDB(); // Connect to the database

// Filter search ?search="whatever"
app.get('/api/items', async (req, res) => {
  try {
    const items = await User.find();
    // const object = items.map((value, index, array) => (value.username)); // For particular data output
    let filteredItems = items; // Default to all items
    // Filtering function to search/filter with any word
    if (req.query.search) {
      filteredItems = items.filter(item => item.username.includes(req.query.search));
    }
    // res.json({items})  data.map is not a function it sends array inside an object {items/array_data} to break use response.data.items in frontend
    setTimeout(() => {
      res.send({ items: filteredItems });
    }, 2000);
  } catch (err) {
    res.status(500).send(err);
  }
});


// balance
app.get('/api/balance/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const balance = await Balance.findOne({ userId });
    if (!balance) {
      return res.status(404).json({ message: 'Balance not found' });
    }
    res.json({ balance: balance.balance });
  } catch (err) {
    console.error('Error fetching balance:', err);
    res.status(500).send(err);
  }
});


// dashboard
app.get('/api/dashboard', async (req, res) => {
  const { userId } = req.query; // Extract userId from query params

  try {
      const user = await User.findById(userId);
      const balance = await Balance.findOne({ userId });
      
      if (!user || !balance) {
          return res.status(404).json({ message: 'User or balance not found' });
      }

      res.json({ success: true, user, balance: balance.balance });
  } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


// send money
app.post('/api/sendMoney', async (req, res) => {
  const { userId, amount } = req.body;
  try {
      // Find the user's balance
      const balanceDoc = await Balance.findOne({ userId });

      if (!balanceDoc) {
          return res.status(404).json({ message: 'User balance not found' });
      }

      // Update the balance
      balanceDoc.balance += amount;
      await balanceDoc.save();

      res.json({ success: true, message: 'Money sent successfully', newBalance: balanceDoc.balance });
  } catch (error) {
      console.error('Error during money transfer:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


// Register endpoint to hash password and save a new user
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, username } = userZodSchema.parse(req.body);
    // console.log('Raw password:', password); // Log to verify raw password
    const hashedPassword = await argon2.hash(password); // It is used for hashing
    // console.log('Hashed password:', hashedPassword); // Log to verify hashed password
    const user1 = await User.findOne({ email });
    if (user1) {
      return res.status(400).json({ message: 'Email already exists' });
    } else {
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      // Create a balance document for the new user
      const newBalance = new Balance({ userId: newUser._id, balance: 1000 });
      await newBalance.save();
      // Create and sign a token for letting user logged in for the time you decide
      const token1 = jwt.sign({ id: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' }); // This is more secure than only {newUser} because it contains only id, not email, pass, username
      res.status(201).json({ token1, message: 'User registered successfully' });
    }
  } catch (err) {
    console.error('Signup error:', err); // Log the error
    res.status(500).send(err);
  }
});


// Signin endpoint to verify password
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (await argon2.verify(user.password, password)) {
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '5s' });
      const balance = await Balance.findOne({ userId: user._id });
      res.json({ success: true, message: "Login successful", token, userId: user._id, balance: balance.balance });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 

// Default way of req.body
// app.post('/api/Signup', async (req, res) => {
//   const newItem = new Item(req.body);
//   try {
//     const savedItem = await newItem.save();
//     res.status(201).json(savedItem);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// Simple password check/comparison not hashing way
// if (user && bcrypt.compareSync(password, user.password)) {
//   res.json({ message: 'Login successful' });
// } else {
//   res.status(401).json({ message: 'Invalid email or password' });
// }

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
