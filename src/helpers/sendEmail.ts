import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, text, html }: any) => {
  try {
    const transporter = await nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: 'ShareJobs',
      to: to,
      subject,
      text,
      html,
    });
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
