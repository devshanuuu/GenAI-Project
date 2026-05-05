const jwt = require('jsonwebtoken');

async function authUser(req,res,next) {
    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({
            message: 'Token not found'
        })
    }
    
    // Check if token is blacklisted
    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })

    if(isTokenBlacklisted) {
        return res.status(401).json({
            message: 'Token is invalid' 
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // Attach user info to request
        next()
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token'
        })
    }
 }

 module.exports = {authUser}