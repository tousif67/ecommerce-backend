const jwt = require("jsonwebtoken");

const secret_key ="kingofpirates";

const generateToken=(userId)=>{
    const token=jwt.sign({userId},secret_key,{expiresIn:"48h"})
    return token;
}

const getUserIdFromToken=(token)=>{
    const decodedToken=jwt.verify(token,secret_key)
    return decodedToken.userId;
}

module.exports={generateToken,getUserIdFromToken};
