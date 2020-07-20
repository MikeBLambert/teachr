import jwt from 'jsonwebtoken';
import _ from 'lodash';

const authenticate = (req) => {
  try {
    const authHeader = _.get(req, 'headers.authorization');
    const token = authHeader && authHeader.split('Bearer ')[1];
    const user = token && jwt.verify(token.trim(), process.env.APP_SECRET);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export default authenticate;
