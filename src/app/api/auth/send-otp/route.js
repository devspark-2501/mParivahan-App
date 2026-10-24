import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(request) {
  try {
    await dbConnect();
    const { mobile } = await request.json();

    if (!mobile || mobile.length !== 10) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }

    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save or update OTP in MongoDB
    let user = await User.findOne({ mobile });
    if (!user) {
      user = await User.create({
        fullName: 'Citizen Applicant',
        mobile,
        password: otp,
      });
    } else {
      user.password = otp;
      await user.save();
    }

    // Try sending via Twilio WhatsApp Sandbox, with safety fallback for sandbox text restrictions
    try {
      await client.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: `whatsapp:+91${mobile}`,
        // Using Twilio sandbox join prefix or standard text format
        body: `Your mParivahan login OTP is ${otp}. Valid for 10 minutes.`,
      });
    } catch (twilioErr) {
      console.warn('Twilio Sandbox restriction notice (falling back to dev hint):', twilioErr.message);
    }

    return NextResponse.json({
      success: true,
      message: `WhatsApp OTP generated for +91 ${mobile}`,
      devOtp: otp, // Ensures hackathon testing works smoothly even if sandbox blocks raw text
    });

  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process WhatsApp OTP.' },
      { status: 500 }
    );
  }
}