import { createTransport } from 'nodemailer';
import { LoginDto } from 'src/modules/users/dtos/login.dto';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const sendNewPassword = async (data: LoginDto): Promise<void> => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: data.email,
    subject: 'Your new password',
    html: `<p>Your new password is ${data.password}</p>`,
  };

  return new Promise((res, rej) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) rej(err);
      res();
    });
  });
};
