require('dotenv').config()

const sendGrid = require('@sendgrid/mail')

sendGrid.setApiKey(process.env.SENDGRID_API_KEY)
module.exports = {
    async sendMail (msg){
        try{
            await sendGrid.send(msg)
            console.log("msg send successfully")
        }catch(err){
            console.log(err)
        }
    }
    


}
