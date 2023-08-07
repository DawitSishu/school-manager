import jwt from 'jsonwebtoken';

export default function userAuthChecker  (req, res, next)  {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    try {
      const decodedData = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decodedData;
      next();
    } catch (error) {
      const err = new Error('Not authorized to access this resource');
        err.statusCode = 401;
      throw err;
      
    }
  } else {
    const err = new Error('Not authorized to access this resource');
        err.statusCode = 401;
      throw err;
  }
  
};

