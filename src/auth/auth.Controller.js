const Services = require("./auth.services");
const bcrypt = require("bcrypt");
const uuid = require("uuid-v4");
const randomstring = require("randomstring");
const { secretKey }= require('../../config/keys')
const { RESPONSE_CODES, ROLES } = require("../../config/constants");
const {
  successResponse,
  errorResponse,
} = require("../../config/responseHelper");
const { CUSTOM_MESSAGES } = require("../../config/customMessages.js");
const { refreashToken , verifyToken} = require("../services/jwt");
const sendinBlue = require("../helpers/sendinblue");
const sendGridMail = require("../helpers/sendgrid");

//import demo from "../services/jwt"

class Auth {
  async init(db) {
    this.services = new Services();
    this.Models = db.models;
    await this.services.init(db);
  }
  async userRegistration(req, res) {
    const body = req.body;
  
    const { first_name, email, phone_number, password } = body;
    
    /** check user email */
    let checkUserEmail = await this.services.getByEmail(email);
    if (checkUserEmail) {
      return res.send(errorResponse( CUSTOM_MESSAGES.EMAIL_EXIST, null, null, RESPONSE_CODES.POST ) );
    }
    /** check user phone_number */
    let checkPhone = await this.services.getByPhone(phone_number);
    if (checkPhone) {
      return res.send( errorResponse( CUSTOM_MESSAGES.PHONE_NUMBER_EXIST, null, null, RESPONSE_CODES.POST ) );
    }

    if (!password) {
      body.password = randomstring.generate(7);
    }
    body.uuid = uuid();
    const userDetails = await this.services.createUser(body);
    delete userDetails.dataValues.password;

    const to = email;
    const subject = "Succesful user registration";
    const htmlContent = `<html><h1>${body.password}</h1>
                                  <h2>${body.first_name}</h2>  </html>`;
    /** sending mail for user registered successfully */
  
    const sendMail = await sendinBlue.sendinBlueMail(to, subject, htmlContent);
    // sendGridMail.sendMail({
    //   to: "Ramanrana795@yopmail.com",
    //   from: "rahul.chauhan@softradix.in",
    //   subject: "test mail",
    //   text: "test mail from sendGrid",
    // });
   
    return res.send( successResponse( CUSTOM_MESSAGES.USER_REGISTER_SUCCESS,null,userDetails,RESPONSE_CODES.POST ) );
  }
  async userLogin(req, res) {
    const body = req.body;
    const { email, password } = body;
    /** check user email */
    const checkEmail = await this.services.getByEmail(email);
    if (!checkEmail) {
      return res.send( errorResponse( CUSTOM_MESSAGES.INVALID_EMAIL, null, null,  RESPONSE_CODES.POST ) );
    }
    /** check user password */
    const checkPassword = await bcrypt.compare(password, checkEmail.password);
    if (!checkPassword) {
      return res.send( errorResponse( CUSTOM_MESSAGES.INVALID_PASSWORD,null,null,RESPONSE_CODES.POST) );
    }
    delete checkEmail.dataValues.password
    /** generate token */
    const token = refreashToken(checkEmail.dataValues,secretKey);

     return res.send(
      successResponse(CUSTOM_MESSAGES.LOGIN_SUCCESS,null,token,RESPONSE_CODES.POST ));
    }

  async forgotPassword(req, res) {
    const { email } = req.body;

    /** check user email */
    const checkEmail = await this.services.getByEmail(email);
    if (!checkEmail) {
      return res.send(errorResponse( CUSTOM_MESSAGES.INVALID_EMAIL, null,null,RESPONSE_CODES.POST ) );
    }
    const { first_name, id, phone_number } = checkEmail;
        const payload = {}
        payload.first_name = first_name
        payload.id = id
        payload.phone_number = phone_number
    /** generate token */
    const token = refreashToken(payload,checkEmail.dataValues.password);
    /** forgot password link */
    const forgotPasswordLink = `http://localhost:${process.env.PORT}reset_password/${id}/${token}`;

    const htmlContent = `<html> <h1>Here is your one time password link</h1>
        <a href="${forgotPasswordLink}">link text </a> </html>`;

    const subject = "forgot password link";

    await sendinBlue.sendinBlueMail(email, subject, htmlContent);

    res.send(successResponse(CUSTOM_MESSAGES.FORGOT_PASSWORD_LINK,null,forgotPasswordLink,RESPONSE_CODES.POST ) );
  }

  async resetPassword(req,res){

    const {params,body} = req

    const user = await this.services.getUserByID(params.id)
  
    
    const verify = verifyToken(params.token, user.dataValues.password)


  if(verify.id != params.id ){
   return res.send({status:0,msg:"invalid url"})
  }

    const updatePassword = await this.services.updateById({password:body.password},params.id)

    res.send(successResponse(CUSTOM_MESSAGES.PASSWORD_UPDATED,null,null,RESPONSE_CODES.POST))

  }
}

module.exports = Auth;

