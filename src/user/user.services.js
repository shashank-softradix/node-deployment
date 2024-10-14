const sequelize = require("sequelize");

const Op = sequelize.Op;

class User{
    async init(db) {
        this.Models = db.models;
      }

      countUser = async () => {
        const query = { role_id: 2, is_deleted: 0 };
        return this.Models.Users.count({ where: query });
      };
    
    getUserList = async (limit,length) => {
        const query = { role_id: 2};
        
        return this.Models.Users.findAll({
          where: query,
          attributes: {
            exclude: ["password"],
          },
          attributes: ["id", "first_name"],
          limit: limit,
          offset: length,
         // order:[['id','desc']]
        });
      };
}

module.exports = User;
