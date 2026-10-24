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

    // Store or update OTP in MongoDB
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = await User.create({
        fullName: 'Citizen Applicant',
        email: email.toLowerCase(),
        password: otp,
      });
    } else {
      user.password = otp;
      await user.save();
    }

    // Configure Nodemailer using your Gmail App Password credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send Email to the user who requested the OTP
    await transporter.sendMail({
      from: `"mParivahan Portal" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'mParivahan Citizen Portal Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b; max-width: 500px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #ea580c; margin-bottom: 8px;">mParivahan Single Sign-On</h2>
          <p style="font-size: 14px; color: #64748b;">Your 6-digit verification code to sign into the portal is:</p>
          <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 28px; font-weight: 900; letter-spacing: 6px; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 8px; margin: 16px 0;">
            ${otp}
          </div>
          <p style="font-size: 12px; color: #94a3b8;">This code is valid for 10 minutes. Please do not share it with anyone.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: `OTP successfully sent to ${email}`,
      devOtp: otp, // For quick testing during presentation
    });

  } catch (error) {
    console.error('Nodemailer Send Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send OTP email. Please check your SMTP settings.' },
      { status: 500 }
    );
  }
}