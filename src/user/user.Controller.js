const Services =  require('./user.services.js')
const bcrypt =  require('bcrypt')
const uuid = require('uuid-v4')
const randomstring = require('randomstring')
const {RESPONSE_CODES,ROLES} = require('../../config/constants')
const {successResponse,errorResponse} = require('../../config/responseHelper')
const {CUSTOM_MESSAGES} = require('../../config/customMessages.js')
const {refreashToken} = require('../services/jwt')
const sendinBlue  = require("../helpers/sendinblue")
const request = require('request')

class User{
    async init(db){
        this.services = new Services();
        this.Models = db.models;
       await this.services.init(db)
    }

    
    async listUser(req,res){
        const {limit,length} = req.body;
        let response = {}
        let list = await this.services.getUserList(limit,length)
      
        const totalUser = await this.services.countUser()
        response = successResponse(CUSTOM_MESSAGES.SUCCESS, null,list,RESPONSE_CODES.POST)
        response.recordsTotal = totalUser

       return res.send(response)
    }

    async getAllUser(req,res){
        const user = await this.Models.Users.findAll({where:{role_id: 2}})
        return res.send({data:user})
                
    }
}

module.exports = User