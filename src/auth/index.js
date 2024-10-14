const authController = require('./auth.Controller.js')
const schemaValidator = require('../helpers/schemaValidator')
const {registerValidator,loginValidator,forgotPasswordValidator,resetPasswordValidator} = require('./auth.validator')


 class Auth{
    constructor(router,db){
        this.router = router;
        this.db = db;
        this.authInstance = new authController();
    }
    async routes(){
        await this.authInstance.init(this.db);

        /** user registration */
        this.router.post('/auth/signup',schemaValidator(registerValidator), (req,res)=>{
            this.authInstance.userRegistration(req,res)
        })
        /** user login */
        this.router.post('/auth/login',schemaValidator(loginValidator), (req,res)=>{
            this.authInstance.userLogin(req,res)
        })

        /** forgot password */
        this.router.put('/auth/user/forgot-password',schemaValidator(forgotPasswordValidator),(req,res)=>{
            this.authInstance.forgotPassword(req,res)
        })

        /** reset password */
        this.router.post('/auth/reset-password/:id/:token', schemaValidator(resetPasswordValidator),(req,res)=>{
            this.authInstance.resetPassword(req,res)
        })
    }
}

module.exports = Auth