import mongoose from 'mongoose';

// Define item schema for users
const itemSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true }
});

// Define balance schema for user balances
const balanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 } // Initialize balance with default value 0
});

// Create models for the schemas
const Balance = mongoose.model('Acccount', balanceSchema);
const User = mongoose.model('User', itemSchema);

// Export the models
export { Balance, User }; 
    