const Joi = require('@hapi/joi')

const listAllUser = Joi.object({
    limit:Joi.number().min(0).max(100),
    length:Joi.number()
  })

  
  module.exports = {listAllUser}