const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 
//require('dotenv').config({ path: './env' }); // Adjust path to find .env
const mongoose = require('mongoose');
const connectDB = require('../config/db123.js');

// Load Models
const Product = require('../models/Product.js');
const User = require('../models/User.js');

// Load Data
const products = require('./products.js');
const users = require('./users.js');

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Cleared...');

    // Insert sample users
    await User.insertMany(users);
    console.log('Users Imported!');

    // We need to get the admin user's ID to associate it with the products (optional for now, but good practice)
    // const adminUser = await User.findOne({ role: 'admin' });

    // For now, we'll insert products without a user reference
    await Product.insertMany(products);
    console.log('Products Imported!');

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destruction: ${error}`);
    process.exit(1);
  }
};

// Check for command line arguments to decide whether to import or destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}