import nodemailer from 'nodemailer';

export async function sendInvitationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const invitationUrl = `${process.env.BASE_URL}/Register?token=${token}`;

  await transporter.sendMail({
    from: `"UniHub" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Registration Invitation",
    html: `Click this link to complete your registration: <a href="${invitationUrl}">${invitationUrl}</a> (expires in 1 hour)`,
  });
}