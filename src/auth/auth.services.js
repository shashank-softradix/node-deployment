const {sequelize,QueryTypes} = require("sequelize");

//const Op = sequelize.Op;

class Auth {
  async init(db) {
    this.Models = db.models;
    this.sql = db.sqlClient
  }
  /** create user */
  createUser = async (data) => {
    return this.Models.Users.create(data);
  };
  /** getUser by email */
  getByEmail = async (email) => {
    
    // const ans =  await this.sql.query(
    //   'SELECT * FROM users',{ type: QueryTypes.SELECT }  );

    return this.Models.Users.findOne({ where: { email: email } });
  };

  getByPhone = async (phone_number) => {
    return this.Models.Users.findOne({ where: { phone_number: phone_number } });
  };



  getUserByID = async (userId) =>{
    return this.Models.Users.findOne({where:{id:userId}})
  }
  updateById = async(data,id)=>{
    return this.Models.Users.update(data,{where:{id:id}})
  }
}

module.exports = Auth;