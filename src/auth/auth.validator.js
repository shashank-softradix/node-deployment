const Joi = require('@hapi/joi')

const registerValidator = Joi.object({
  first_name: Joi.string().pattern(new RegExp(/^[a-z,A-Z]{2,100}$/)).trim().required(),
  last_name:Joi.string().min(2).max(200).trim(),
   gender:Joi.string().optional().valid("male","female"),
   email: Joi.string().max(50).email().lowercase().trim().required(),
   phone_number: Joi.string().pattern(new RegExp(/^[0-9]{10}$/)).message("password must be of 10 digits").required(),
   password: Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/)).message("please enter strong password")
})

const loginValidator = Joi.object({
  email:Joi.string().email().trim().required(),
  password:Joi.string().required()
})

const forgotPasswordValidator = Joi.object().keys({
  email: Joi.string().email().max(50).required(),
})
 
const resetPasswordValidator =  Joi.object().keys({
  password: Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/)).message("please enter strong password").required()
})


module.exports = {registerValidator,loginValidator,forgotPasswordValidator,resetPasswordValidator}