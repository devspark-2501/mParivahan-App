import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';

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

    // Check if user already exists or create temporary record storing the OTP
    let user = await User.findOne({ mobile });
    if (!user) {
      user = await User.create({
        fullName: 'Citizen Applicant',
        mobile,
        password: otp, // Temporarily storing OTP as password field for verification demo
      });
    } else {
      user.password = otp;
      await user.save();
    }

    // [Simulated WhatsApp Gateway integration - e.g., Twilio / Meta Cloud API]
    console.log(`[WhatsApp Gateway] Sending OTP ${otp} to +91 ${mobile}`);

    return NextResponse.json({
      success: true,
      message: `WhatsApp OTP sent successfully to +91 ${mobile}`,
      // For testing convenience during development/hackathon presentation:
      devOtp: otp, 
    });
  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send WhatsApp OTP.' },
      { status: 500 }
    );
  }
}