import { validateJWT } from "@/helpers/validateJWT";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const userId = await validateJWT(request);
        const reqBody = await request.json();
        const job = await Job.create({ ...reqBody, user: userId });

        return NextResponse.json({
            message: "Job created successfully",
            data: job
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}