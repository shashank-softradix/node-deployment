const userController = require('./user.Controller')

const schemaValidator = require('../helpers/schemaValidator')
const {listAllUser} = require('./user.validator')



class User{
    constructor(router,db){
        this.router = router;
        this.db = db;
        this.userInstance = new userController()
    }
    async routes(){
        await this.userInstance.init(this.db)

        /** list all users */
        this.router.post('/users/list',schemaValidator(listAllUser) ,(req,res)=>{ 
            this.userInstance.listUser(req,res)
        })

        this.router.get('/user',(req,res)=>{
            this.userInstance.getAllUser(req,res)
        })

    }
}


module.exports = User
