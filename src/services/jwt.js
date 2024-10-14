const jwt = require('jsonwebtoken')
const { secretKey } = require('../../config/keys')


const refreashToken = (payload,secretKey)=> jwt.sign(payload,secretKey,{expiresIn:'24hr'})

const verifyToken = (token,secretKey) => jwt.verify(token,secretKey , function(err,verifyToken){
    if(err){
       return err
    }else{
        return verifyToken
    }
})

module.exports = {refreashToken , verifyToken}