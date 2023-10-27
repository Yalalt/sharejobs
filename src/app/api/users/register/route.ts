import { connectDB } from '@/config/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const user = await User.findOne({ email: reqBody.email });
    if (user) {
      throw new Error('User already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);
    reqBody.password = hashedPassword;

    // create user
    await User.create(reqBody);
    return NextResponse.json({ message: 'User created successfully', success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
