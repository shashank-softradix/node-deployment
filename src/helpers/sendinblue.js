const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

module.exports = {
  async sendinBlueMail(mail, subject,htmlContent) {
    
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sender = {
      email: "rahul.chauhan@softradix.in",
    };
    const receiver = [
      {
        email:mail

      },
    ]
    apiInstance.sendTransacEmail({
        sender,
        to: receiver,
        subject: "confirmation mail",
        htmlContent
      })
      .then(
        function (data) {
          console.log("API called successfully. Returned data: " + data);
        },
        function (error) {
          console.error(error);
        }
      );
  },
};