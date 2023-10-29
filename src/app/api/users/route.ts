import { connectDB } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function PUT(request: NextRequest) {
  try {
    await validateJWT(request);

    const reqBody = await request.json();
    const updateUser = await User.findByIdAndUpdate(reqBody._id, reqBody, { new: true }).select('-password');

    if (!updateUser) {
      throw new Error('User not found');
    }
    return NextResponse.json({ message: 'User updated successfully', data: updateUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 403 });
  }
}
