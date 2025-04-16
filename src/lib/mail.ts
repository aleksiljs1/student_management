import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verificationUrl = `${process.env.BASE_URL}/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: `To verify your Account and gain acess to UniCit open the following link otherwise feel free to ignore : <a href="${verificationUrl}">${verificationUrl}</a>`,
  });
}