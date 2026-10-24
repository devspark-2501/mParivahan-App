import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(request) {
  try {
    await dbConnect();
    const { email, otp } = await request.json();

    if (!email || !otp || otp.length !== 6) {
      return NextResponse.json(
        { success: false, message: 'Invalid request. Email and 6-digit OTP are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });

    if (!user || user.password !== otp) {
      return NextResponse.json(
        { success: false, message: 'Incorrect verification code. Please try again.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Citizen authenticated successfully.',
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });

    response.cookies.set('authToken', user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error while verifying code.' },
      { status: 500 }
    );
  }
}