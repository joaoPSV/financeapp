import { createTransport } from 'nodemailer';
import { LoginDto } from 'src/modules/users/dtos/login.dto';

interface NodeMailerData {
  user: string;
  pass: string;
}

export const sendNewPassword = async (
  data: LoginDto,
  nodeMailerData: NodeMailerData,
): Promise<void> => {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: nodeMailerData.user,
      pass: nodeMailerData.pass,
    },
  });

  const mailOptions = {
    from: nodeMailerData.user,
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
