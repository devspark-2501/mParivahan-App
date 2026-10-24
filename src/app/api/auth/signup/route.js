import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { fullName, mobile, aadhaar, state, password } = body;

    // Validation
    if (!fullName || !mobile || !password) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields (fullName, mobile, or password)' },
        { status: 400 }
      );
    }

    // Check if citizen already exists
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this mobile number already exists.' },
        { status: 409 }
      );
    }

    // Create user in MongoDB
    const newUser = await User.create({
      fullName,
      mobile,
      aadhaar: aadhaar || '',
      state: state || 'Delhi',
      password, // Note: In production, hash with bcrypt before saving
    });

    // Generate Auth Cookie
    const response = NextResponse.json({
      success: true,
      message: 'Citizen account created successfully',
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        mobile: newUser.mobile,
        state: newUser.state,
      },
    });

    response.cookies.set('authToken', newUser._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Signup API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error during registration' },
      { status: 500 }
    );
  }
}