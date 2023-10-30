import { connectDB } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import Application from '@/models/applicationModel';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const userId = await validateJWT(request);
    const reqBody = await request.json();
    const application = await Application.create({ ...reqBody, user: userId });

    return NextResponse.json({
      message: 'You have successfully applied for this job',
      data: application,
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
    const job = searchParams.get('job');

    const filtersObject: any = {};
    if (user) {
      filtersObject['user'] = user;
    }

    if(job) {
      filtersObject['job'] = job;
    }

    const applications = await Application.find(filtersObject).populate('user').populate('job');
    return NextResponse.json({
      message: 'Applications fetched successfully',
      data: applications,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
