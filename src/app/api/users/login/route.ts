import { connectDB } from '@/config/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    // check if user exists
    const user = await User.findOne({ email: reqBody.email });
    if (!user) {
      throw new Error('User does not exists');
    }

    // compare password
    const validPassword = await bcrypt.compare(reqBody.password, user.password);

    if (!validPassword) {
      throw new Error('Invalid password');
    }

    // create token
    const dataToBeSigned = {
      userId: user._id,
      email: user.email,
    };

    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not defined');

    const token = jwt.sign(dataToBeSigned, process.env.JWT_SECRET as Secret, { expiresIn: '1d' });

    const response = NextResponse.json({ message: 'User login successful', success: true }, { status: 200 });

    // Set cookie
    response.cookies.set('__session-sharejobs', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000, // 1 day
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
