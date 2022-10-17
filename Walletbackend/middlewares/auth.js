import Config from "../config/config";
import jwt from 'jsonwebtoken'
import User from "../models/User";


export const authorize = (...roles) => async (req, res, next) => {
  
  let token = req.headers['x-access-token'] || req.headers.authorization
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }
    try {
      if (!token) {
        if (roles.length === 0 || !roles) {
          return next()
        }
        return res.sendStatus(401)
      }
      const data =jwt.verify(
        token,
        Config.ACCESS_TOKEN_SECRET,
    );
         
        const user = await User.findById(data.UserInfo.id || data.UserInfo._id).select('-password')
        if(!user) res.status(404).send({ msg: "User not found "})
         
        req.user = user
        req.roles = user.roles
          
        if (roles.length > 0 && (!req.roles || !roles.some( r => req.roles.includes(r)))) {
         return res.sendStatus(401)
        }
        next()
    } catch (err) {
      res.send(err)
    }
  }
