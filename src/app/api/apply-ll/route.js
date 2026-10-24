import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Application from '@/models/Application';

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const {
      fullName, parentName, email, mobile, state, city,
      address, aadhaar, dob, age, licenseCategory,
      birthCertFileName, aadhaarCopyFileName
    } = body;

    if (!fullName || !email || !aadhaar || !dob) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const application = await Application.create({
      fullName, parentName, email, mobile, state, city,
      address, aadhaar, dob, age, licenseCategory,
      birthCertFileName: birthCertFileName || 'birth_certificate.pdf',
      aadhaarCopyFileName: aadhaarCopyFileName || 'aadhaar_card.pdf'
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application._id
    });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit application' }, { status: 500 });
  }
}