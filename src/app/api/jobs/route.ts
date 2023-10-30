import { connectDB } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import Job from '@/models/jobModel';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const userId = await validateJWT(request);
    const reqBody = await request.json();
    const job = await Job.create({ ...reqBody, user: userId });

    return NextResponse.json({
      message: 'Job created successfully',
      data: job,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // validateJWT(request);
    validateJWT(request);

    // fetch QUERY PARAMS
    const { searchParams } = new URL(request.url);
    const user = searchParams.get('user');

    const filtersObject: any = {};

    if (user) {
      filtersObject['user'] = user;
    }

    // Job filter based current user id OR all jobs
    // const jobs = await Job.find(user ? { user } : {}).sort('-createdAt');
    const jobs = await Job.find(filtersObject).populate('user');

    return NextResponse.json({
      message: 'Jobs fetched successfully',
      data: jobs,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
