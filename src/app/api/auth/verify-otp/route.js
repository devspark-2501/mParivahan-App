import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(request) {
  try {
    await dbConnect();
    const { mobile, otp } = await request.json();

    if (!mobile || !otp || otp.length !== 6) {
      return NextResponse.json(
        { success: false, message: 'Invalid mobile number or 6-digit OTP.' },
        { status: 400 }
      );
    }

    // Find user and match OTP
    const user = await User.findOne({ mobile });

    if (!user || user.password !== otp) {
      return NextResponse.json(
        { success: false, message: 'Incorrect OTP. Please try again.' },
        { status: 401 }
      );
    }

    // Authentication successful, generate secure session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Citizen authenticated and signed in successfully.',
      user: {
        id: user._id,
        mobile: user.mobile,
        fullName: user.fullName,
      },
    });

    response.cookies.set('authToken', user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day session
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error during verification.' },
      { status: 500 }
    );
  }
}