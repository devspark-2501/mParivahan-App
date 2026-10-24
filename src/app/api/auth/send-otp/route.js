import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    await dbConnect();

    // Drop old indexes if they exist to prevent validation issues
    try {
      await User.collection.dropIndex('mobile_1');
    } catch (e) {
      // Ignore if index doesn't exist
    }

    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Find or create user without triggering mobile validation
    let user = await User.findOne({ email: cleanEmail });
    if (!user) {
      user = new User({
        fullName: 'Citizen Applicant',
        email: cleanEmail,
        password: otp,
      });
      await user.save({ validateBeforeSave: false }); // Bypass old cached validations
    } else {
      user.password = otp;
      await user.save({ validateBeforeSave: false });
    }

    // Configure Nodemailer Transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send Email
    await transporter.sendMail({
      from: `"mParivahan Portal" <${process.env.EMAIL_USER}>`,
      to: cleanEmail,
      subject: 'mParivahan Single Sign-On Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #1e293b; max-width: 480px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #ea580c; margin-top: 0;">mParivahan Identity Verification</h2>
          <p style="font-size: 14px; color: #475569; line-height: 1.5;">Your 6-digit security code for official portal access is:</p>
          <div style="background: #f8fafc; padding: 18px; text-align: center; font-size: 32px; font-weight: 900; letter-spacing: 6px; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 8px; margin: 20px 0;">
            ${otp}
          </div>
          <p style="font-size: 12px; color: #94a3b8;">This code is valid for 10 minutes. Do not share this code with anyone.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: `OTP sent successfully to ${cleanEmail}`,
      devOtp: otp,
    });

  } catch (error) {
    console.error('Nodemailer SMTP Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send OTP email.' },
      { status: 500 }
    );
  }
}