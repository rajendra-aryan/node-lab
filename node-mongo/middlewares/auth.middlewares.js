import jwt from "jsonwebtoken"


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */


export const authMiddleware = async(req,res,next)=>{
    try {
        const tokenHeaders = req.headers["authorization"]
        if(!tokenHeaders){
            return next()
        }

        if(!tokenHeaders.startsWith('Bearer')){
            return res.status(400).json({error:"Authorization header must begin with Bearer"})
        }

        const token = tokenHeaders.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        return next()
        
    } catch (error) {
        next()
    }
}

export const ensureAuthenticated = async (req, res, next) => {
    if(!req.user){
        return res.status(401).json({error: "You must be authenticated to access this"})
    }

    next()

}