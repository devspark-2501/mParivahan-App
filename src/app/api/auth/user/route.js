import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';

// GET: Fetch Current Logged-in Citizen Profile
export async function GET(request) {
  try {
    await dbConnect();

    const authToken = request.cookies.get('authToken')?.value;

    if (!authToken) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const user = await User.findById(authToken).select('-password');

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Citizen profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('User Fetch API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve user data' },
      { status: 500 }
    );
  }
}

// DELETE: Citizen Logout Endpoint
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  // Clear authentication cookie
  response.cookies.set('authToken', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}