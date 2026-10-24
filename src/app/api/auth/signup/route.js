import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, mobile, password, state } = body;

    if (!fullName || !mobile || !password) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    // Response object
    const response = NextResponse.json({
      success: true,
      message: 'Citizen account registered successfully.',
      user: { fullName, mobile, state }
    });

    // Set authorization cookie
    response.cookies.set('authToken', 'sample_registered_user_jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error during registration.' },
      { status: 500 }
    );
  }
}