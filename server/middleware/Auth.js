import jwt from 'jsonwebtoken';
import Dbcreatation from '../../db';

const Auth = {

  async verifyToken(req, res, next) {
    const token = req.headers['access-token'];
    if (!token) {
      return res.status(400).send({ message: 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const getmeetup = 'SELECT * FROM users WHERE id = $1';
          Dbcreatation.pool.query(getmeetup, [decoded.user])
          .then((response) => {
            if (!response.rows) {
              return res.status(400).send({ message: 'The token you provided is invalid' });
            }
      })
      .catch((err) => {
          console.log(err.message);
      });
      // req.user = { id: decoded.user };
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default Auth;