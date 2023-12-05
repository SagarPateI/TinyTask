const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Splitting the header to get the token
  const token = authHeader.split(' ')[1];

  try {
    // Verifying the token
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

    // Accessing user data from the decoded token
    const { userId } = decodedToken;

    // Fetching user data from the database
    const user = await User.findOne({ _id: userId }).select('_id');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;

    next();
  } catch (error) {
    // Token verification failed
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};