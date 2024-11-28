const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Assuming you have the Admin model

const adminMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user is an admin
    // const admin = await Admin.findById(decoded.id);
    // if (!admin || !admin.isAdmin) {
    //   return res.status(403).json({ message: 'Access denied, admin privileges required' });
    // }



    // Check if the user is an admin by checking the role or isAdmin flag
    const admin = await Admin.findById(decoded.id);
    if (!admin || admin.role !== 'admin') {  // Check admin role here
      return res.status(403).json({ message: 'Access denied, admin privileges required' });
    }




    req.admin = admin; // Attach the admin object to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = adminMiddleware;
