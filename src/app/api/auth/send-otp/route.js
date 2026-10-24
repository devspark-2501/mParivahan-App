import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    await dbConnect();
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store/update OTP in MongoDB user record
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = await User.create({
        fullName: 'Citizen Applicant',
        email: email.toLowerCase(),
        password: otp, // Temporarily holding OTP for verification
      });
    } else {
      user.password = otp;
      await user.save();
    }

    // Configure Nodemailer Transport
    let transporter;
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Automatic fallback using Ethereal test account if SMTP is not configured
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // Send Email
    const mailOptions = {
      from: '"mParivahan Portal" <noreply@mparivahan.gov.in>',
      to: email,
      subject: 'mParivahan Portal Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #ea580c;">mParivahan Citizen Authentication</h2>
          <p>Your official 6-digit verification code for portal access is:</p>
          <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #0f172a; border-radius: 8px;">
            ${otp}
          </div>
          <p style="font-size: 12px; color: #64748b; margin-top: 15px;">This code is valid for 10 minutes. Please do not share it with anyone.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Nodemailer info:', info.messageId);

    return NextResponse.json({
      success: true,
      message: `OTP sent successfully to ${email}`,
      devOtp: otp, // For seamless testing during hackathon demo
    });

  } catch (error) {
    console.error('Send Email OTP Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send Email OTP.' },
      { status: 500 }
    );
  }
}