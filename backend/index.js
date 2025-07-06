const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const admin = require('./src/firebase/firebaseAdmin');
require('dotenv').config({ path: '../.env' });
const app = express();
const port = process.env.PORT || 5000;
const itemRoutes = require('./src/routes/itemRoute');
const categoryRoute = require("./src/routes/categoryRoute");
// MongoDB connection
async function main() {
  await mongoose.connect(
    process.env.MONGODB_URI,
  );
}
main()
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", itemRoutes)
app.use("/api", categoryRoute);
app.use('/api/saved', require('./src/routes/savedRoutes'));
app.use('/api/users', require('./src/routes/userRoutes')); // ✅ corrected base path
app.use('/api/admin', require('./src/routes/adminRoutes'));
app.use('/api/submit-recipe', require('./src/routes/submitRecipeRoute'));
// Root route
app.get('/', (req, res) => {  
  res.send('🌱 Veggify backend running!');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
