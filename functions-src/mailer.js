const nodemailer = require('nodemailer');

const clientId = '591711810893-klfh0ukhj1ivhpeppqcq0h74jv82lkll.apps.googleusercontent.com';
const refreshToken = '1/W7v1vtRvgP5XwRYcmY64zXUnnGuYsYEVbyCMG16XofUBO0GxkDN61FfgdLdT3sJg';

exports.handler = function(event, context, callback) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'sorenbaird@gmail.com',
      clientId: clientId,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: refreshToken
    }
  });

  const body = JSON.parse(event.body);
  const mailOptions = {
    to: 'soren@sorenbaird.com',
    subject: `New Website Message From ${body.name}`,
    text: `Sender Name: ${body.name}, Sender Email: ${body.email}, Sender Message: ${body.message}`,
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify(error)
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(info.response)
      })
    }
  })
}
