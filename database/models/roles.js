module.exports = (sequelize,DataTypes)=>{
    const roles = sequelize.define('roles',{
        id:{
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
            type:DataTypes.INTEGER
        },
        role_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        role:{
            type:DataTypes.STRING(15),
            allowNull:false,
        }
    },{timeStamps:true})
    return roles;
}




   