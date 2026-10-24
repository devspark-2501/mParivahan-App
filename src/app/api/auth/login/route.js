import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { mobile, password } = body;

    if (!mobile || !password) {
      return NextResponse.json(
        { success: false, message: 'Mobile and password are required' },
        { status: 400 }
      );
    }

    // Query citizen in MongoDB
    const user = await User.findOne({ mobile });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { success: false, message: 'Invalid mobile number or password' },
        { status: 401 }
      );
    }

    // Create session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        mobile: user.mobile,
        state: user.state,
      },
    });

    response.cookies.set('authToken', user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error during authentication' },
      { status: 500 }
    );
  }
}