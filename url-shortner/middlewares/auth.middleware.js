import { validateUserToken } from "../utils/token.js";


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return next();

    if(!authHeader.startsWith("Bearer")){
        return res.status(400).json({error: "Authorization header must starts with a Bearer"})
    }

    const [_ , token] = authHeader.split(' ') //Bearer, <token>

    const payload = validateUserToken(token)
    req.user = payload
    next()
}

function ensureAuthenticated(req, res, next) {
    if(!req.user || !req.user.id){
        return res.status(401).json({error: "You must be logged in to access this resource"})
    }

    next()
}

export {authMiddleware, ensureAuthenticated}