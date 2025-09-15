const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    passwordHash: bcrypt.hashSync('123456', 10), // Hashing the password
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    passwordHash: bcrypt.hashSync('123456', 10), // Hashing the password
    role: 'customer',
  },
];

module.exports = users;