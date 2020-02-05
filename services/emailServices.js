const nodemailer = require("nodemailer");
const nodemailerMailgun = require("nodemailer-mailgun-transport");
const { mailgun_api_key, mailgunDomain } = require("../config/keys_dev");

///// Email setting ( Mailgun transporter )
// const mailAuth = {
//   auth: {
//     api_key: mailgun_api_key,
//     domain: mailgunDomain
//   }
// };
// const transporter = nodemailer.createTransport(nodemailerMailgun(mailAuth));

//////////////////// Google source tested ///////////////////////////////
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "kleurrijker.test@gmail.com",
//     pass: "shadi771984"
//   }
// });

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "elinore.marquardt@ethereal.email",
    pass: "1WxYzZbbgpgje9kQ6P"
  }
});

module.exports = (mail, callBackFunc) => {
  const template = require(mail.template);
  const mailOptions = {
    from: `Kleurrijker mailserver <${mail.from}>`,
    to: mail.to,
    subject: mail.subject,
    html: template({
      name: mail.userName,
      token: mail.token
    })
  };

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      callBackFunc(err, null);
    } else {
      callBackFunc(null, response);
    }
  });
};
