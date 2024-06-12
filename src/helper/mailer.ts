import User from '@/model/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email,emailType,userId}:any) => {
    try {
      const token = await bcryptjs.hash(userId.toString(),10);

      if(emailType === 'VERIFY') {
        await User.findByIdAndUpdate(userId,
          {
            $set:{
              verifyToken: token, 
              verifyTokenExpiry: Date.now() + 60*60*1000
            }
          }
        )
      } else if (emailType === 'RESET') {
        await User.findByIdAndUpdate(userId,
          {
            $set: {
              forgotPasswordToken: token, 
              forgotPasswordTokenExpiry: Date.now() + 60*60*1000
            }
          }
        )
      }
        
        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_SECRET
          }
        });

          const mailOptions = {
            from: 'srdtuofficial@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password" ,
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${token}">here</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"} or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemail?token=${token} </p>`,
          }

          const mailResponse = await transporter.sendMail(mailOptions);

          return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}