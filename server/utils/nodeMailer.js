import nodemail from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemail.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PWD,
  },
  secure: false,
});

export function sendThankYouMail(fromUser) {
  const message = {
    from: process.env.MAIL_EMAIL,
    to: process.env.TEMP_EMAIL,
    subject: "Greetings developer",
    html: `<b>Your user, ${fromUser}, thanks you for your hard work</b>`,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}
