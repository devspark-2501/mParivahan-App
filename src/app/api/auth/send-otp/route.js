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

    // Check if user already exists or create temporary record
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

    // Send real WhatsApp message via Twilio Sandbox
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:+91${mobile}`,
      body: `Your mParivahan login OTP is: ${otp}. Valid for 10 minutes. Do not share this with anyone.`,
    });

    return NextResponse.json({
      success: true,
      message: `WhatsApp OTP sent successfully to +91 ${mobile}`,
    });

  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send WhatsApp OTP. Please ensure your number is linked.' },
      { status: 500 }
    );
  }
}